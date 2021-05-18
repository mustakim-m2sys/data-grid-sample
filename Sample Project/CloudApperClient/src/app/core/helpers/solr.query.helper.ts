import { FormGroup } from '@angular/forms';
import {
    EnumControlType,
    EnumDataType,
    FilterGroupOperatorsEnum,
    GlobalFilterConstants,
    GridCustomOperationDescriptions,
    GridFilterComparisonOperatorsEnum,
    IBrowseRecordCompositeIdViewModel,
    ICalendarConfiguration,
    ICalendarLoadOption,
    IFieldViewModel,
    IFormViewVM,
    IGridFilterObject,
    IGridSortObject,
    IMenuViewModel,
    ISchemaViewModel,
    IUserInfoViewModel,
    SolrControlNameConstants,
    SolrQueryHelperConstants,
    SorlGroupOperatorsEnum,
} from '@CloudApperClients/app-model';
import { TranslocoService } from '@ngneat/transloco';
import { filter, isNumber, isString } from 'lodash';

import {
    convertDateToSolrDate,
    formatDateTimeToTimeStringLocal,
    getCurrentDateTimeString,
    getCurrentDayEndDateTimeString,
    getCurrentDayStartDateTimeString,
    getCurrentMonthEndDateTimeString,
    getCurrentMonthStartDateTimeString,
    getCurrentYearEndDateTimeString,
    getCurrentYearStartDateTimeString,
    getInvitationStatusText,
} from '.';
import { StaticDependencyInjector } from '../services';
import { RecordsUserQuery, SchemaQuery, SessionQuery } from '../states';
import {
    DeepClone,
    HasWhiteSpace,
    IsNullOrUndefined,
    IsValidDate,
    NormalizeSpecialCharacters,
    ReplaceAll,
    ReplaceAllSpacesWithPlus,
    ReplaceBracketsAtStartEnd,
    ReplaceMultipleSpacesWithSingleSpace,
    TryParseJSON,
} from '../utils/object.helper';

export function generateSolrFilterQuery(schema: ISchemaViewModel, filterArray: any[], fields: IFieldViewModel[], isRecursion?: boolean, preserveCustomoperator?: boolean): string {
    let filterQuery = '';
    filterQuery = isRecursion ? filterQuery + '(' : filterQuery;
    if (filterArray && filterArray.length) {
        //check filter array self type
        if (isFilterObject(filterArray)) {
            const filterObject = convertToFilterObject(filterArray);
            const field = fields.find(x => x.Name === filterObject.fieldName);
            //NOTE: do not check field is null or not null here as it is handled in generateSolrQueryFromFilterObject method
            filterQuery = filterQuery + generateSolrQueryFromFilterObject(schema, filterObject, field, preserveCustomoperator);
        }
        //iterate filter array and check member type
        filterArray.forEach(filter => {
            //determine filter is IGridFilterObject or FilterGroupOperatorsEnum or child filter Array
            if (isFilterObject(filter)) {
                const filterObject = convertToFilterObject(filter);
                const field = fields.find(x => x.Name === filterObject.fieldName);
                //NOTE: do not check field is null or not null here as it is handled in generateSolrQueryFromFilterObject method
                filterQuery = filterQuery + generateSolrQueryFromFilterObject(schema, filterObject, field, preserveCustomoperator);
            } else if (isFilterGroupOperators(filter)) {
                if (filter === FilterGroupOperatorsEnum.And) {
                    filterQuery = filterQuery + ' ' + SorlGroupOperatorsEnum.And + ' ';
                } else if (filter === FilterGroupOperatorsEnum.Or) {
                    filterQuery = filterQuery + ' ' + SorlGroupOperatorsEnum.Or + ' ';
                } else if (filter === FilterGroupOperatorsEnum.Not) {
                    filterQuery = filterQuery + ' ' + SorlGroupOperatorsEnum.Not;
                }
            } else if (isChildFilterArray(filter)) {
                //if child filter array then run recurssion
                filterQuery = filterQuery + generateSolrFilterQuery(schema, filter, fields, true);
            }
        });
    }
    filterQuery = isRecursion ? filterQuery + ')' : filterQuery;
    return filterQuery;
}


export function generateSolrFilterQueryForCalendar(schema: ISchemaViewModel, calendarLoadOption: ICalendarLoadOption, config: ICalendarConfiguration, view: IFormViewVM, predefinedFilterQuery?: string, menu?: IMenuViewModel): string {
    const predefinedSolrFilterQueryLocal = mergePredefinedFilterQueryWithViewAndMenuFilterQuery(schema, predefinedFilterQuery, view, menu);
    let solrFilterQueryForCalendar = "";
    const calendarScheduleStartDateFieldName = config?.fieldNamesConfig?.calendarScheduleStartDateFieldName ?
        config.fieldNamesConfig.calendarScheduleStartDateFieldName : "";
    //if valid calendarScheduleStartDateFieldName and start,end date then continue
    if (calendarScheduleStartDateFieldName?.trim() && calendarLoadOption?.startDate && calendarLoadOption?.endDate) {
        //by default consider utc time flow
        let utcEnabled = true;
        //first check utc enabled or not for the selected field
        const field = schema?.Fields?.find(x => x.Name === calendarScheduleStartDateFieldName);
        if (field && !field.IsUTCTime) utcEnabled = false;
        //force enable utc time for created date and last modified date
        if (field && (field?.Name === SolrControlNameConstants.CREATE_DATE || field?.Name === SolrControlNameConstants.LAST_MODIFY_DATE)) utcEnabled = true;
        let startDateString = "";
        let endDateString = "";
        //first check if the start date is date object or string(as some browser returns date as object)
        if (calendarLoadOption.startDate instanceof Date) {
            //convert to utc datetime string if its a utc enabled field or convert to local datetime string
            startDateString = utcEnabled ? calendarLoadOption.startDate.toISOString() : convertDateToSolrDate(calendarLoadOption.startDate.toLocaleString("en-US"));
        } else if (isString(calendarLoadOption.startDate)) {
            //first convert to date and remove Z for local datetime field before making a date object
            const startDate = new Date(utcEnabled ? calendarLoadOption.startDate : calendarLoadOption.startDate.replace('Z', ''));
            //then convert to utc datetime string if its a utc enabled field or convert to local datetime string
            startDateString = utcEnabled ? startDate?.toISOString() : convertDateToSolrDate(startDate?.toLocaleString("en-US"));
        }
        //check if the end date is date object or string(as some browser returns date as object)
        if (calendarLoadOption.endDate instanceof Date) {
            //convert to utc datetime string if its a utc enabled field or convert to local datetime string
            endDateString = utcEnabled ? calendarLoadOption.endDate.toISOString() : convertDateToSolrDate(calendarLoadOption.endDate.toLocaleString("en-US"));
        } else {
            //first convert to date and remove Z for local datetime field before making a date object
            const endDate = new Date(utcEnabled ? calendarLoadOption.endDate : calendarLoadOption.endDate.replace('Z', ''));
            //then convert to utc datetime string if its a utc enabled field or convert to local datetime string
            endDateString = utcEnabled ? endDate?.toISOString() : convertDateToSolrDate(endDate?.toLocaleString("en-US"));
        }
        //if valid start and end date after formatting
        if (startDateString?.trim() && endDateString?.trim()) {
            solrFilterQueryForCalendar = '(' + calendarScheduleStartDateFieldName + ':[' + startDateString + ' TO ' + endDateString + '])';
        }
    }
    return formatQueryBracketsAndSpaces(mergeFilterQueries(predefinedSolrFilterQueryLocal, solrFilterQueryForCalendar), true);
}

export function generateSolrSortQuery(sort: IGridSortObject | []): string {
    let sortString = '';
    if (Array.isArray(sort)) {
        sort.forEach((sortObj: IGridSortObject, index) => {
            if (index === sort.length - 1) {
                sortString = sortObj.desc ? sortString + sortObj.selector + ' desc' : sortString + sortObj.selector + ' asc';
            } else {
                sortString = sortObj.desc ? sortString + sortObj.selector + ' desc, ' : sortString + sortObj.selector + ' asc, ';
            }
        });
    } else {
        sortString = sort.desc ? sort.selector + ' desc' : sort.selector + ' asc';
    }
    return sortString;
}

export function generateGlobalFilterQuery(globalSearchText: string): string {
    let globalFilterQuery = "";
    if (globalSearchText && globalSearchText.trim()) {
        globalSearchText = globalSearchText.trim();
        //check is text between quoto or not
        if ((globalSearchText.startsWith('\'') && globalSearchText.endsWith('\'')) ||
            (globalSearchText.startsWith('\"') && globalSearchText.endsWith('\"'))) {
            //first remove the starting quotation
            if (globalSearchText.startsWith('\'')) {
                globalSearchText = globalSearchText.replace("\'", "");
            } else if (globalSearchText.startsWith('\"')) {
                globalSearchText = globalSearchText.replace("\"", "");
            }
            //then remove the last quotation
            if (globalSearchText.endsWith('\'')) {
                globalSearchText = globalSearchText.substring(0, globalSearchText.lastIndexOf('\''));
            } else if (globalSearchText.endsWith('\"')) {
                globalSearchText = globalSearchText.substring(0, globalSearchText.lastIndexOf('\"'));
            }
            globalFilterQuery = 'text:"' + NormalizeSpecialCharacters(globalSearchText) + '"'; //for exact string match
        } else {
            //if search text contains space then replace those with plus else wrap it between *
            if (HasWhiteSpace(globalSearchText)) {
                globalSearchText = NormalizeSpecialCharacters(globalSearchText);
                globalFilterQuery = 'text:' + ReplaceAllSpacesWithPlus(globalSearchText) + ''; // for word match
            } else {
                //TODO: NEED TO HANDLE SPECIAL CHARACTER NORMALIZATION FOR WILDCARD SEARCH
                //NOW IT IS HANDLED IN SERVER
                globalFilterQuery = 'text:*' + globalSearchText + '*'; //for partial letter match
            }
        }
    }
    return globalFilterQuery;
}

export function findAndClearGlobalSearchFilterArray(filterArray: any[], globalSearchText: string): any[] {
    if (filterArray && Array.isArray(filterArray) && filterArray.length) {
        //self check
        if (isGlobalSearchFilterArray(filterArray, globalSearchText)) {
            filterArray = [];
        } else {
            //element check
            filterArray.forEach((element, index) => {
                if (isGlobalSearchFilterArray(element, globalSearchText)) {
                    filterArray[index] = "Remove"; //replace it with Remove tag
                    //if previous index is FilterGroupOperatorsEnum "and" then replace it with Remove tag
                    if (filterArray[index - 1] === FilterGroupOperatorsEnum.And) {
                        filterArray[index - 1] = "Remove";
                    } else if (filterArray[index + 1] === FilterGroupOperatorsEnum.And) {
                        //else if next index is FilterGroupOperatorsEnum "and" then replace it with Remove tag
                        filterArray[index + 1] = "Remove";
                    }
                }
            });
            //finally remove the elments with Remove tag
            filterArray = filterArray.filter(x => x !== "Remove");
        }
    }
    return filterArray;
}

export function isGlobalSearchFilterArray(filterArray: any, globalSearchText: string): boolean {
    let isGlobalSearchFilterArrayType = true;
    //find "or" condition position and count is symetric AND all other filter array contains same filterValue as globalSearchText
    if (filterArray && Array.isArray(filterArray) && filterArray.length) {
        for (let i = 0; i < filterArray.length; i++) {
            if (i % 2 === 0) {
                //even item will be filterObject
                if (isFilterObject(filterArray[i])) {
                    const filterObject: IGridFilterObject = convertToFilterObject(filterArray[i]);
                    //as all filter object contains same filterValue as globalSearchText
                    if (filterObject.value !== globalSearchText) {
                        isGlobalSearchFilterArrayType = false;
                        break;
                    }
                } else {
                    isGlobalSearchFilterArrayType = false;
                    break;
                }
            } else {
                //odd item will be FilterGroupOperatorsEnum or
                if (filterArray[i] !== FilterGroupOperatorsEnum.Or) {
                    isGlobalSearchFilterArrayType = false;
                    break;
                }
            }
        }
    } else {
        isGlobalSearchFilterArrayType = false;
    }
    return isGlobalSearchFilterArrayType;
}

//#region query merger
export function mergePredefinedFilterQueryWithViewAndMenuFilterQuery(schema: ISchemaViewModel, predefinedFilterQuery: string, view: IFormViewVM, menu?: IMenuViewModel): string {
    let mergedFilterQuery = "";
    //merge predefined filter query
    if (predefinedFilterQuery) {
        console.log("filter query from global filter builder in datagrid: ", predefinedFilterQuery);
        mergedFilterQuery = mergeFilterQueries(mergedFilterQuery, predefinedFilterQuery);
    }
    //merge menu filter query
    if (menu && menu.FilterQuery) {
        console.log("filter query from menu: ", menu.FilterQuery);
        mergedFilterQuery = mergeFilterQueries(mergedFilterQuery, menu.FilterQuery);
    }
    //merge view filter query if has valid filter configuration
    if (view && view?.ViewDefinition?.FilterConfiguration) {
        const filterArray = [''];
        const viewFilterQuery = generateSolrFilterQuery(schema, filterArray, schema?.Fields);
        console.log("filter query from view: ", viewFilterQuery);
        mergedFilterQuery = mergeFilterQueries(mergedFilterQuery, viewFilterQuery);
    }
    return formatQueryBracketsAndSpaces(mergedFilterQuery, true);
}

export function mergePredefinedSortQueryWithViewAndMenuSortQuery(predefinedSortQuery: string, view: IFormViewVM, menu?: IMenuViewModel): string {
    let mergedSortQuery = "";
    //merge predefined sort query
    if (predefinedSortQuery) {
        console.log("sort query from global filter builder in datagrid: ", predefinedSortQuery);
        mergedSortQuery = mergeSortQueries(mergedSortQuery, predefinedSortQuery);
    }
    //merge menu sort query only for system views
    if (view && view.IsSystemView && menu && menu.SortQuery) {
        console.log("sort query from menu: ", menu.SortQuery);
        mergedSortQuery = mergeSortQueries(mergedSortQuery, menu.SortQuery);
    }
    //merge view sort query only for custom views
    if (view && !view.IsSystemView && view.SortQuery) {
        console.log("sort query from view: ", view.SortQuery);
        mergedSortQuery = mergeSortQueries(mergedSortQuery, view.SortQuery);
    }
    return formatQueryBracketsAndSpaces(mergedSortQuery, false);
}

export function mergeFilterQueries(baseQuery: string, newQuery: string): string {
    let mergedQueries = "";
    baseQuery = formatQueryBracketsAndSpaces(baseQuery, true);
    newQuery = formatQueryBracketsAndSpaces(newQuery, true);
    if (newQuery) {
        mergedQueries = baseQuery ? baseQuery + " AND " + newQuery : newQuery;
    } else {
        mergedQueries = baseQuery ? baseQuery : "";
    }
    return mergedQueries;
}

export function mergeSortQueries(baseQuery: string, newQuery: string): string {
    let mergedQueries = "";
    baseQuery = formatQueryBracketsAndSpaces(baseQuery, false);
    newQuery = formatQueryBracketsAndSpaces(newQuery, false);
    if (newQuery) {
        mergedQueries = baseQuery ? baseQuery + " , " + newQuery : newQuery;
    } else {
        mergedQueries = baseQuery ? baseQuery : "";
    }
    return mergedQueries;
}

export function formatQueryBracketsAndSpaces(query: string, wrapWithBrackets: boolean): string {
    if (query) {
        //first format brackets
        query = ReplaceBracketsAtStartEnd(query, wrapWithBrackets);
        //finally format query with empty brackets
        query = query.replace(/\(\(\(\)\)\)/g, '');
        query = query.replace(/\(\(\)\)/g, '');
        query = query.replace(/\(\)/g, '');
        //now replace multiple spaces with one and then trim
        query = query.replace(/  +/g, ' ').trim();
    }
    return query;
}
//#endregion

//#region helper methods for solr query generator
export function modifyFilterQueryForNotSentFilterDefaultUser(query: string) {
    if (query.includes("UserLoginStatus:0")) {
        const replaceQuery = "(UserLoginStatus:0 OR ( " + SolrQueryHelperConstants.IS_NOT_EQUAL_QUERY + "UserLoginStatus:1 AND " + SolrQueryHelperConstants.IS_NOT_EQUAL_QUERY + "UserLoginStatus:2 AND " + SolrQueryHelperConstants.IS_NOT_EQUAL_QUERY + "UserLoginStatus:3 AND " + SolrQueryHelperConstants.IS_NOT_EQUAL_QUERY + "UserLoginStatus:4))"
        query = query.replace("UserLoginStatus:0", replaceQuery);
    }
    return query;
}

export function normalizeGlobalFilters(query: string, loggedInUser: IUserInfoViewModel, recordUserId: string): string {
    let normalizedQuery = "";
    if (query?.trim()) {
        //return query field
        normalizedQuery = query;
        //replace all AND operator by ';'
        query = ReplaceAll(query, 'AND', ';');
        //replace all OR operator by ';'
        query = ReplaceAll(query, 'OR', ';');
        //filter query array by spliting query string
        const filterQueryArray = query.split(';');
        //iterate over filter query array to normalize
        if (filterQueryArray?.length) {
            filterQueryArray.forEach(singleQuery => {
                //normalize every single query
                const normalizedSingleQuery = normalizeSingleFilterQuery(singleQuery, loggedInUser, recordUserId);
                //update return query field by replacing with normalized query
                normalizedQuery = normalizedQuery.replace(singleQuery, normalizedSingleQuery);
            });
        }
    }
    return normalizedQuery;
}

export function normalizeSingleFilterQuery(query: string, loggedInUser: IUserInfoViewModel, recordUserId: string): string {
    let normalizedQuery = "";
    if (query) {
        normalizedQuery = query;
        if (normalizedQuery.includes(GlobalFilterConstants.CURRENT_USER_STRING)) {
            if ((recordUserId && recordUserId !== '') && !normalizedQuery.includes(SolrControlNameConstants.USER_ID)) {
                normalizedQuery = normalizedQuery.replace(GlobalFilterConstants.CURRENT_USER_STRING, recordUserId);
            } else if ((recordUserId && recordUserId !== '') && normalizedQuery.includes(SolrControlNameConstants.USER_ID)) {
                normalizedQuery = normalizedQuery.replace(GlobalFilterConstants.CURRENT_USER_STRING, loggedInUser.Id);
            } else {
                //allowing all data fetch if the user have not any record user id (for admin of the app)
                normalizedQuery = normalizedQuery.replace(GlobalFilterConstants.CURRENT_USER_STRING, '*');
            }
        }

        if (normalizedQuery.includes(GlobalFilterConstants.CREATED_BY_ME_STRING)) {
            normalizedQuery = normalizedQuery.replace(GlobalFilterConstants.CREATED_BY_ME_STRING, " " + SolrControlNameConstants.CREATED_BY_ID + ":" + loggedInUser.Id);
        }
        if (normalizedQuery.includes(GlobalFilterConstants.MODIFIED_BY_ME_STRING)) {
            normalizedQuery = normalizedQuery.replace(GlobalFilterConstants.MODIFIED_BY_ME_STRING, " " + SolrControlNameConstants.LAST_MODIFY_BY_ID + ":" + loggedInUser.Id);
        }

        if (normalizedQuery.includes(GlobalFilterConstants.DATE_NOW_STRING)) {
            normalizedQuery = normalizedQuery.replace(GlobalFilterConstants.DATE_NOW_STRING, "[" + getCurrentDateTimeString(true) + " TO " + getCurrentDateTimeString(true) + "]");
        }

        if (normalizedQuery.includes(GlobalFilterConstants.THIS_MONTH)) {
            if (normalizedQuery.includes(":"))//if query generate global filter with control dependent ex.@DateOfBirth:_ThisMonth
                normalizedQuery = normalizedQuery.replace(GlobalFilterConstants.THIS_MONTH, "[" + getCurrentMonthStartDateTimeString(true) + " TO " + getCurrentMonthEndDateTimeString(true) + "]");
            else
                normalizedQuery = normalizedQuery.replace(GlobalFilterConstants.THIS_MONTH, " " + SolrControlNameConstants.CREATE_DATE + ":[" + getCurrentMonthStartDateTimeString(true) + " TO " + getCurrentMonthEndDateTimeString(true) + "]"); //_ThisMonth

        }
        if (normalizedQuery.includes(GlobalFilterConstants.THIS_YEAR)) {
            if (normalizedQuery.includes(":")) //if query generate global filter with control dependent ex.@DateOfBirth:_ThisYear
                normalizedQuery = normalizedQuery.replace(GlobalFilterConstants.THIS_YEAR, "[" + getCurrentYearStartDateTimeString(true) + " TO " + getCurrentYearEndDateTimeString(true) + "]");
            else
                normalizedQuery = normalizedQuery.replace(GlobalFilterConstants.THIS_YEAR, " " + SolrControlNameConstants.CREATE_DATE + ":[" + getCurrentYearStartDateTimeString(true) + " TO " + getCurrentYearEndDateTimeString(true) + "]"); //_ThisYear

        }

        if (normalizedQuery.includes(GlobalFilterConstants.TODAY)) {
            if (normalizedQuery.includes(":")) //if query generate global filter with control dependent ex.@DateOfBirth:_ThisDay
                normalizedQuery = normalizedQuery.replace(GlobalFilterConstants.TODAY, "[" + getCurrentDayStartDateTimeString(true) + " TO " + getCurrentDayEndDateTimeString(true) + "]");
            else
                normalizedQuery = normalizedQuery.replace(GlobalFilterConstants.TODAY, " " + SolrControlNameConstants.CREATE_DATE + ":[" + getCurrentDayStartDateTimeString(true) + " TO " + getCurrentDayEndDateTimeString(true) + "]"); //_ThisDay
        }

        if (normalizedQuery.includes(GlobalFilterConstants.ACTIVE_STRING)) {
            normalizedQuery = normalizedQuery.replace(GlobalFilterConstants.ACTIVE_STRING, " " + SolrControlNameConstants.STATUS + ":2");
        }

        if (normalizedQuery.includes(GlobalFilterConstants.CURRENT_LOCATION)) {
            const location = StaticDependencyInjector?.Injector?.get(SessionQuery)?.getUserLocationInString();
            normalizedQuery = normalizedQuery.replace(GlobalFilterConstants.CURRENT_LOCATION, location ? location : '0,0');
        }

        //replace multiple spaces with one
        normalizedQuery = ReplaceMultipleSpacesWithSingleSpace(normalizedQuery);
    }
    return normalizedQuery;
}

export function generateSolrQueryFromFilterObject(schema: ISchemaViewModel, filterObject: IGridFilterObject, originalField: IFieldViewModel, preserveCustomoperator?: boolean) {
    //first deep clone field to avoid read only issue and then format if needed
    let field;
    if (originalField) {
        /*custom store can't be cloned using deep clone.. thats why we are copying original field into another field first
        and then remove custom store value and clone field into field to avoid cloning issue*/
        field = { ...originalField };
        field.BrowseControlCustomStore = null;
        field = DeepClone<IFieldViewModel>({}, field);
        //format field for create date field /modified date field / parent entity
        if (field.Name === SolrControlNameConstants.CREATE_DATE || field.Name === SolrControlNameConstants.LAST_MODIFY_DATE) {
            field.ControlType = EnumControlType.DateTime;
            field.IsUTCTime = true; //force enable utc time
        } else if (field.Name.includes(SolrControlNameConstants.PARENT_ID + '_')) {
            //change the field names to "ParentId"
            filterObject.fieldName = SolrControlNameConstants.PARENT_ID;
            field.Name = SolrControlNameConstants.PARENT_ID;
        }
    }
    let solrQuery = '';
    if (filterObject?.fieldName && filterObject?.comparisonOperator && field) {
        //check and format filterobject for custom operators if needed
        if (filterObject.comparisonOperator === GridFilterComparisonOperatorsEnum.CurrentUser ||
            filterObject.comparisonOperator === GridFilterComparisonOperatorsEnum.Today ||
            filterObject.comparisonOperator === GridFilterComparisonOperatorsEnum.CurrentMonth ||
            filterObject.comparisonOperator === GridFilterComparisonOperatorsEnum.CurrentYear) {
            //move the custom operator to value field
            filterObject.value = filterObject.comparisonOperator;
            //set equals operator to the comparisonOperator field
            filterObject.comparisonOperator = GridFilterComparisonOperatorsEnum.Equals;
        }
        //first format the value if not null or undefined or not a custom operator
        if (!IsNullOrUndefined(filterObject.value) && (filterObject.value !== GridFilterComparisonOperatorsEnum.CurrentUser &&
            filterObject.value !== GridFilterComparisonOperatorsEnum.Today && filterObject.value !== GridFilterComparisonOperatorsEnum.CurrentMonth &&
            filterObject.value !== GridFilterComparisonOperatorsEnum.CurrentYear)) {
            //for time control format date time string back to time string
            if (field.ControlType === EnumControlType.TimeOnly) {
                filterObject.value = formatDateTimeToTimeStringLocal(filterObject.value);
            } else if (field.ControlType === EnumControlType.DateOnly || field.ControlType === EnumControlType.DateTime) {
                //for date or datetime control check Z exists in the string otherwise append it to the last to meet server datetime format
                if (isString(filterObject.value)) {
                    if (!filterObject.value.endsWith('Z')) filterObject.value = filterObject.value + "Z";
                    //Note:for handling date in format "2021/03/31" convert to date object first then convert to string
                    if (filterObject.value.includes('/')) {
                        const filterDate: Date = new Date(field.IsUTCTime ? filterObject.value : filterObject.value.replace('Z', ''));
                        filterObject.value = field.IsUTCTime ? filterDate.toISOString() : convertDateToSolrDate(filterDate.toLocaleString("en-US"));
                    }
                } else if (Array.isArray(filterObject.value) && filterObject.value.length) {
                    filterObject.value = filterObject.value.map(valueItem => {
                        if (valueItem) {
                            if (valueItem instanceof Date) {
                                //convert to utc datetime if its a utc enabled field or convert to local datetime
                                valueItem = field.IsUTCTime ? valueItem.toISOString() : convertDateToSolrDate(valueItem.toLocaleString("en-US"));
                            } else {
                                if (!valueItem.endsWith('Z')) valueItem = valueItem + "Z";
                            }
                        }
                        return valueItem;
                    });
                } else if (filterObject.value instanceof Date) {
                    // if value is date object then convert to string
                    //convert to utc datetime if its a utc enabled field or convert to local datetime
                    filterObject.value = field.IsUTCTime ? filterObject.value.toISOString() : convertDateToSolrDate(filterObject.value.toLocaleString("en-US"));
                }
            } else if (field.ControlType === EnumControlType.Entity) {
                //first format filterObject field name if it is not parent entity
                if (!filterObject.fieldName.includes(SolrControlNameConstants.REFERENCE_ID) && !filterObject.fieldName.includes(SolrControlNameConstants.PARENT_ID)) {
                    //for browse control field name will be like stringField0ReferenceId
                    filterObject.fieldName = filterObject.fieldName + SolrControlNameConstants.REFERENCE_ID;
                }
                //now format filterObject field value
                //if the value is a composite browse record id then assign real id in the value
                const valueObj = <IBrowseRecordCompositeIdViewModel>TryParseJSON(filterObject.value, true);
                if (valueObj?.Id) {
                    filterObject.value = valueObj.Id;
                }
            } else if (isString(filterObject.value) && field.Name !== SolrControlNameConstants.ROLE_ID) {
                //sanitize the filter object value only if string but not for other string data type control(date,datetime or default user role id)
                filterObject.value = sanitizeFilterObjectValue(filterObject.value);
            }
        }
        //then build the query based on comparison operator
        if (filterObject.comparisonOperator === GridFilterComparisonOperatorsEnum.Equals) {
            //first check null value then check for custom operators
            if (IsNullOrUndefined(filterObject.value)) {
                //for browse control field name will be like stringField0ReferenceId
                if (field?.ControlType === EnumControlType.Entity &&
                    !filterObject?.fieldName.includes(SolrControlNameConstants.REFERENCE_ID) && !filterObject?.fieldName.includes(SolrControlNameConstants.PARENT_ID)) {
                    filterObject.fieldName = filterObject.fieldName + SolrControlNameConstants.REFERENCE_ID;
                }
                //for is empty
                solrQuery = SolrQueryHelperConstants.IS_NOT_EQUAL_QUERY + filterObject.fieldName + ':[* TO *]';
            } else if (filterObject.value === GridFilterComparisonOperatorsEnum.CurrentUser) {
                //if we have to preserve the custom operator then do nto process value directly put the operator field
                const currentUser = <IUserInfoViewModel>StaticDependencyInjector.Injector.get(SessionQuery).getUser();
                let recordUserId = "";
                //if field name is created/modified by then replace it with created/modified by id
                if (filterObject.fieldName === SolrControlNameConstants.CREATED_BY) {
                    filterObject.fieldName = SolrControlNameConstants.CREATED_BY_ID;
                } else if (filterObject.fieldName === SolrControlNameConstants.LAST_MODIFY_BY) {
                    filterObject.fieldName = SolrControlNameConstants.LAST_MODIFY_BY_ID;
                }
                //if default user flow enabled for ReferenceTypeId then replace field name with name+ReferenceId
                let defaultUseFlowEnabled = false;
                if (field.ReferenceTypeId) {
                    const referenceSchema = StaticDependencyInjector?.Injector?.get(SchemaQuery)?.getEntity(field.ReferenceTypeId);
                    if (referenceSchema?.IsDefaultUser) {
                        defaultUseFlowEnabled = true;
                        filterObject.fieldName = filterObject.fieldName + SolrControlNameConstants.REFERENCE_ID;
                        //TODO: For inherited schema we need to decide if we should pass the Owner appid or appid
                        //find record user id
                        const recordUser = StaticDependencyInjector?.Injector?.get(RecordsUserQuery)?.getRecordUserByApp(schema?.AppId);
                        recordUserId = recordUser?.RecordId ? recordUser.RecordId : "";
                    }
                }
                //if we have to preserve the custom operator then directly put the  filter value
                if (preserveCustomoperator) {
                    solrQuery = filterObject.fieldName + ':' + filterObject.value;
                } else {
                    //if default user flow enabled put record user id in place of value else put current user id
                    if (defaultUseFlowEnabled) {
                        if (recordUserId?.trim()) {
                            solrQuery = filterObject.fieldName + ':' + recordUserId;
                        } else {
                            //allowing all data fetch if the user have not any record user id (for admin of the app)
                            solrQuery = filterObject.fieldName + ':*';
                        }
                    } else {
                        solrQuery = filterObject.fieldName + ':' + (currentUser && currentUser.Id ? currentUser.Id : "''");
                    }
                }
            } else if (filterObject.value === GridFilterComparisonOperatorsEnum.Today) {
                //if we have to preserve the custom operator then do nto process value directly put the operator field
                if (preserveCustomoperator) {
                    solrQuery = filterObject.fieldName + ':' + filterObject.value;
                } else {
                    solrQuery = filterObject.fieldName + ':[' + getCurrentDayStartDateTimeString(field.IsUTCTime) + ' TO ' + getCurrentDayEndDateTimeString(field.IsUTCTime) + ']';
                }
            } else if (filterObject.value === GridFilterComparisonOperatorsEnum.CurrentMonth) {
                //if we have to preserve the custom operator then do nto process value directly put the operator field
                if (preserveCustomoperator) {
                    solrQuery = filterObject.fieldName + ':' + filterObject.value;
                } else {
                    solrQuery = filterObject.fieldName + ':[' + getCurrentMonthStartDateTimeString(field.IsUTCTime) + ' TO ' + getCurrentMonthEndDateTimeString(field.IsUTCTime) + ']';
                }
            } else if (filterObject.value === GridFilterComparisonOperatorsEnum.CurrentYear) {
                //if we have to preserve the custom operator then do nto process value directly put the operator field
                if (preserveCustomoperator) {
                    solrQuery = filterObject.fieldName + ':' + filterObject.value;
                } else {
                    solrQuery = filterObject.fieldName + ':[' + getCurrentYearStartDateTimeString(field.IsUTCTime) + ' TO ' + getCurrentYearEndDateTimeString(field.IsUTCTime) + ']';
                }
            } else if (isString(filterObject.value) && (field.ControlType === EnumControlType.DateOnly || field.ControlType === EnumControlType.DateTime)
                && IsValidDate(filterObject.value)) {
                //for date and datetime control
                //remove Z for local datetime field before making a date object
                const startDate: Date = new Date(field.IsUTCTime ? filterObject.value : filterObject.value.replace('Z', ''));
                const endDate: Date = new Date(field.IsUTCTime ? filterObject.value : filterObject.value.replace('Z', ''));
                if (field.ControlType === EnumControlType.DateOnly) {
                    //for date query range will be in (hh:mm:ss) from 00:00:00 to 23:59:59
                    startDate.setHours(0, 0, 0);
                    endDate.setHours(23, 59, 59);
                }
                else if (field.ControlType === EnumControlType.DateTime) {
                    //for date time query range will be only in seconds from 00 to 59
                    startDate.setSeconds(0);
                    endDate.setSeconds(59);
                }
                //convert to utc datetime if its a utc enabled field or convert to local datetime before generating a solr query
                const startDateString = field.IsUTCTime ? startDate.toISOString() : convertDateToSolrDate(startDate.toLocaleString("en-US"));
                const endDateString = field.IsUTCTime ? endDate.toISOString() : convertDateToSolrDate(endDate.toLocaleString("en-US"));
                solrQuery = filterObject.fieldName + ':[' + startDateString + ' TO ' + endDateString + ']';
            } else {
                solrQuery = filterObject.fieldName + ':' + filterObject.value;
            }
        } else if (filterObject.comparisonOperator === GridFilterComparisonOperatorsEnum.NotEquals) {
            if (IsNullOrUndefined(filterObject.value)) {
                //for browse control field name will be like stringField0ReferenceId
                if (field?.ControlType === EnumControlType.Entity &&
                    !filterObject?.fieldName.includes(SolrControlNameConstants.REFERENCE_ID) && !filterObject?.fieldName.includes(SolrControlNameConstants.PARENT_ID)) {
                    filterObject.fieldName = filterObject.fieldName + SolrControlNameConstants.REFERENCE_ID;
                }
                //for is not empty
                solrQuery = filterObject.fieldName + ':[* TO *]';
            }
            else {
                solrQuery = SolrQueryHelperConstants.IS_NOT_EQUAL_QUERY + filterObject.fieldName + ':' + filterObject.value;
            }
        } else if (filterObject.comparisonOperator === GridFilterComparisonOperatorsEnum.Contains) {
            solrQuery = filterObject.fieldName + ':*' + filterObject.value + '*';
        } else if (filterObject.comparisonOperator === GridFilterComparisonOperatorsEnum.NotContains) {
            solrQuery = SolrQueryHelperConstants.IS_NOT_EQUAL_QUERY + filterObject.fieldName + ':*' + filterObject.value + '*';
        } else if (filterObject.comparisonOperator === GridFilterComparisonOperatorsEnum.StartsWith) {
            solrQuery = filterObject.fieldName + ':' + filterObject.value + '*';
        } else if (filterObject.comparisonOperator === GridFilterComparisonOperatorsEnum.EndsWith) {
            solrQuery = filterObject.fieldName + ':*' + filterObject.value;
        } else if (filterObject.comparisonOperator === GridFilterComparisonOperatorsEnum.Gt) {
            //for date and dattime control
            if (isString(filterObject.value) && (field.ControlType === EnumControlType.DateOnly || field.ControlType === EnumControlType.DateTime)
                && IsValidDate(filterObject.value)) {
                //remove Z for local datetime field before making a date object
                const date: Date = new Date(field.IsUTCTime ? filterObject.value : filterObject.value.replace('Z', ''));
                if (field.ControlType === EnumControlType.DateOnly) {
                    //for date increase current date by 1 day
                    date.setDate(date.getDate() + 1);
                }
                else if (field.ControlType === EnumControlType.DateTime) {
                    //for datetime increase current datetime by 1 sec
                    date.setTime(date.getTime() + 1000);
                }
                //convert to utc datetime if its a utc enabled field or convert to local datetime before generating a solr query
                const dateString = field.IsUTCTime ? date.toISOString() : convertDateToSolrDate(date.toLocaleString("en-US"));
                solrQuery = filterObject.fieldName + ':[' + dateString + ' TO *]';
            } else if (isNumber(filterObject.value)) {
                solrQuery = filterObject.fieldName + ':[' + (Number(filterObject.value) + 1) + ' TO *]';
            }
        } else if (filterObject.comparisonOperator === GridFilterComparisonOperatorsEnum.Gte) {
            solrQuery = filterObject.fieldName + ':[' + filterObject.value + ' TO *]';
        } else if (filterObject.comparisonOperator === GridFilterComparisonOperatorsEnum.Lt) {
            //if date
            if (isString(filterObject.value) && (field.ControlType === EnumControlType.DateOnly || field.ControlType === EnumControlType.DateTime) &&
                IsValidDate(filterObject.value)) {
                //remove Z for local datetime field before making a date object
                const date: Date = new Date(field.IsUTCTime ? filterObject.value : filterObject.value.replace('Z', ''));
                if (field.ControlType === EnumControlType.DateOnly) {
                    //for date decrease current date by 1 day
                    date.setDate(date.getDate() - 1);
                    date.setHours(23, 59, 59);
                }
                else if (field.ControlType === EnumControlType.DateTime) {
                    //for datetime decrease current datetime by 1 sec
                    date.setTime(date.getTime() - 1000);
                }
                //convert to utc datetime if its a utc enabled field or convert to local datetime before generating a solr query
                const dateString = field.IsUTCTime ? date.toISOString() : convertDateToSolrDate(date.toLocaleString("en-US"));
                solrQuery = filterObject.fieldName + ':[* TO ' + dateString + ']';
            } else if (isNumber(filterObject.value)) {
                solrQuery = filterObject.fieldName + ':[* TO ' + (Number(filterObject.value) - 1) + ']';
            }
        } else if (filterObject.comparisonOperator === GridFilterComparisonOperatorsEnum.Lte) {
            solrQuery = filterObject.fieldName + ':[* TO ' + filterObject.value + ']';
        } else if (filterObject.comparisonOperator === GridFilterComparisonOperatorsEnum.Between) {
            //for between value must be an array with length 2 and at least one valid element
            if (Array.isArray(filterObject.value) && filterObject.value.length && filterObject.value.length === 2 && (filterObject.value[0] || filterObject.value[1])) {
                const startValue = filterObject.value[0] ? filterObject.value[0] : '*';
                const endValue = filterObject.value[1] ? filterObject.value[1] : '*';
                solrQuery = filterObject.fieldName + ':[' + startValue + ' TO ' + endValue + ']';
            }
        } else if (filterObject.comparisonOperator === GridFilterComparisonOperatorsEnum.NotInBetween) {
            //for not in between value must be an array with length 2 and at least one valid element
            if (Array.isArray(filterObject.value) && filterObject.value.length && filterObject.value.length === 2 && (filterObject.value[0] || filterObject.value[1])) {
                const startValue = filterObject.value[0] ? filterObject.value[0] : '*';
                const endValue = filterObject.value[1] ? filterObject.value[1] : '*';
                solrQuery = filterObject.fieldName + SolrQueryHelperConstants.IS_NOT_EQUAL_QUERY + '[' + startValue + ' TO ' + endValue + ']';
            }
        }
    }
    return solrQuery;
}

export function sanitizeFilterObjectValue(value: string) {
    let sanitizedValue = "";
    if (isString(value)) {
        //first check and normalize special characters
        sanitizedValue = NormalizeSpecialCharacters(value);
        //check and replace white space
        if (HasWhiteSpace(sanitizedValue)) {
            sanitizedValue = sanitizedValue.split(' ').join('\\ ');
        }
    }
    return sanitizedValue;
}

export function isFilterObject(value: string | any[]) {
    let valueIsFilterObject = false;
    if (Array.isArray(value) && value.length === 2) {
        //for custom operators value is array with length 2 and 2nd index will be a custom operator
        if (value[1] === GridFilterComparisonOperatorsEnum.CurrentUser || value[1] === GridFilterComparisonOperatorsEnum.Today ||
            value[1] === GridFilterComparisonOperatorsEnum.CurrentMonth || value[1] === GridFilterComparisonOperatorsEnum.CurrentYear) {
            valueIsFilterObject = true;
        }
    } else if (Array.isArray(value) && value.length === 3) {
        //for other operators value is array with length 3 and 2nd index is in GridFilterComparisonOperatorsEnum
        if (Object.values(GridFilterComparisonOperatorsEnum).includes(<any>value[1])) {
            valueIsFilterObject = true;
        }
    }
    return valueIsFilterObject;
}

export function convertToFilterObject(filterArray: any[]): IGridFilterObject {
    let filterObject = <IGridFilterObject>{
        fieldName: '',
        comparisonOperator: GridFilterComparisonOperatorsEnum.Equals,
        value: null
    };

    if (Array.isArray(filterArray) && filterArray.length === 2 && filterArray[1] === GridFilterComparisonOperatorsEnum.CurrentUser ||
        filterArray[1] === GridFilterComparisonOperatorsEnum.Today || filterArray[1] === GridFilterComparisonOperatorsEnum.CurrentMonth ||
        filterArray[1] === GridFilterComparisonOperatorsEnum.CurrentYear) {
        //for custom operators value is array with length 2 and 2nd index will be a custom operator
        //assign equals operators for the custom operators and move custom operators to the value field
        filterObject = <IGridFilterObject>{
            fieldName: filterArray[0] ? filterArray[0] : '',
            comparisonOperator: GridFilterComparisonOperatorsEnum.Equals,
            value: filterArray[1] //save value as it is for keeping value like false/null
        };
    } else if (Array.isArray(filterArray) && filterArray.length === 3) {
        //for other operators value is array with length 3
        filterObject = <IGridFilterObject>{
            fieldName: filterArray[0] ? filterArray[0] : '',
            comparisonOperator: filterArray[1] ? filterArray[1] : '',
            value: filterArray[2] //save value as it is  for keeping value like false/null
        };
    }

    return filterObject;
}

export function isFilterGroupOperators(value: string | any[]) {
    //value is not arrary(is string) and value is in FilterGroupOperatorsEnum
    return !Array.isArray(value) && Object.values(FilterGroupOperatorsEnum).includes(<any>value);
}

export function isChildFilterArray(value: string | any[]) {
    //value is array and 2nd member is not in GridFilterComparisonOperatorsEnum
    return Array.isArray(value) && !Object.values(GridFilterComparisonOperatorsEnum).includes(<any>value[1]);
}

export function generateSolrFilterQueryForBrowseControl(filterQuery: string, replaceFilterQueryPartsWithCurrentSchemaFormValue?: boolean, currentSchemaForm?: FormGroup) {
    //for filter builder browse control, skip host/parent form and current form record related filter query part
    if (filterQuery?.trim() && !replaceFilterQueryPartsWithCurrentSchemaFormValue) {
        /* if there is a field with # sign, we can determine it has host/parent form and current form record related filter query
         and it will be a single query so just clear it */
        if (filterQuery.includes('#')) {
            filterQuery = '';
        }
    } else if (filterQuery?.trim() && replaceFilterQueryPartsWithCurrentSchemaFormValue && currentSchemaForm) {
        //for regular browse control, replace host/parent form and current form record related filter query part with current form record value
        const schemaFormValue = currentSchemaForm.getRawValue();
        /* if there is a field with # sign, we can determine it has host/parent form and current form record related filter query
        and it will be a single query */
        if (filterQuery.includes('#')) {
            //split the single query with : to get single query parts array
            const singleQueryParts = filterQuery.split(':');
            if (singleQueryParts?.length) {
                singleQueryParts.forEach((singleQueryPart) => {
                    // replace single query part  by current schema form value or parendId if it contains # sign
                    if (singleQueryPart.includes('#')) {
                        singleQueryPart = singleQueryPart.trim();
                        //for parent field query
                        if (singleQueryPart.includes('#Parent')) {
                            //get parent id from current schema form
                            const parentId = schemaFormValue?.ParentId;
                            if (parentId?.trim()) {
                                //replacing parent value in the single query
                                filterQuery = filterQuery.replace('#Parent', parentId);
                            }
                            else {
                                // if there is no parentId in current schema form,then main single query will be cleared
                                filterQuery = '';
                            }
                        } else {
                            //get  field name by removing # sign from single query part
                            const fieldName = singleQueryPart.replace(/#/i, '');
                            //get field value from schema form
                            const fieldValue = schemaFormValue[fieldName];
                            if (!IsNullOrUndefined(fieldValue)) {
                                // replacing single query part with field value in the single query
                                filterQuery = filterQuery.replace(singleQueryPart, fieldValue);
                            } else {
                                // if there is no value in field,then main single query will be cleared
                                filterQuery = '';
                            }
                        }
                    }
                });
            }
        }
    }
    return filterQuery;
}
 //#endregion