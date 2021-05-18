import {
  DataGridDataTypeEnum,
  DataGridDisplayTemplateEnum,
  DataGridEditorTemplateEnum,
  DataGridHorizontalAlignmentEnum,
  DataGridInternalFieldNameEnum,
  DefaultItems,
  EnumControlType,
  EnumDataType,
  EnumUserInvitationStatus,
  GridFilterComparisonOperatorsEnum,
  HiddenInUIModeConstants,
  IDataGridEditorOptions,
  IDisplayAndEditTemplateRendererInfo,
  IFieldViewModel,
  IRecordViewModel,
  IRoleViewModel,
  ISchemaViewModel,
  SolrControlNameConstants,
} from '@CloudApperClients/app-model';
import { TranslocoService } from '@ngneat/transloco';
import { isNull, isString } from 'lodash';

import {
  formatDateTimeStringLocal,
  formatDateTimeToTimeStringLocal,
  formatTimeToDateTimeStringLocal,
  replaceDateSecondMiliSecondWithZero,
} from '.';
import { RecordService, StaticDependencyInjector } from '../services';
import { RoleQuery, SchemaQuery } from '../states';
import { DeepClone } from '../utils/object.helper';

//format data type,default value,editor options for dx data grid
export function formatFieldForDatagrid(field: IFieldViewModel, appId: string, clientId: number): IFieldViewModel {
  //get transloco service instance
  const translocoService = StaticDependencyInjector?.Injector?.get(TranslocoService);
  //setting default config values
  field.GridDataType = DataGridDataTypeEnum.String;
  field.FilterOperations = getFilterOperationsForDataTypeString();
  field.AllowGridView = isViewEnabledInGrid(field.HiddenInUI);
  field.AllowGridEditing = isEditingEnabledInGrid(field.DisabledInUI, field.HiddenInUI);
  field.AllowGridSorting = true;
  field.AllowGridFiltering = true;
  field.AllowFilterBuilderFiltering = true;
  field.AllowGridSearch = true;
  field.AllowGridGrouping = true;
  field.GridHorizontalAlignment = DataGridHorizontalAlignmentEnum.Center;
  field.GridColumnWidth = 100;

  //first if control is lookup then transform its control and data type as the lookup one
  if (field.ControlType === EnumControlType.Lookup) {
    field.IsLookUpControl = true;
    field.ControlType = field.LookupControlType;
    field.DataType = field.LookupDataType;
    field.AllowGridEditing = false; //disable editing,sorting,filtering,searching for lookup control
    field.AllowGridSorting = false;
    field.AllowGridFiltering = false;
    field.AllowFilterBuilderFiltering = false;
    field.AllowGridSearch = false;
    field.AllowGridGrouping = false;
  }

  //format control type for create date field / date created field
  if (field.Name === SolrControlNameConstants.CREATE_DATE || field.Name === SolrControlNameConstants.DATE_CREATED) {
    field.Name = SolrControlNameConstants.CREATE_DATE;
    field.AllowGridEditing = false;
    field.ControlType = EnumControlType.DateTime;
    field.FilterOperations = getFilterOperationsForDataTypeDate();
    field.IsUTCTime = true; //force enable utc time for create date field / date created field
  }

  //format control type for modified date field
  if (field.Name === SolrControlNameConstants.LAST_MODIFY_DATE) {
    field.Name = SolrControlNameConstants.LAST_MODIFY_DATE;
    field.AllowGridEditing = false;
    field.ControlType = EnumControlType.DateTime;
    field.FilterOperations = getFilterOperationsForDataTypeDate();
    field.IsUTCTime = true; //force enable utc time for modified date field
  }

  if (field.ControlType === EnumControlType.Entity) {
    field.GridDataType = DataGridDataTypeEnum.Object; //for lookup
    field.GridCellTemplateName = DataGridDisplayTemplateEnum.EntityDetailsTemplate;
    field.GridHorizontalAlignment = DataGridHorizontalAlignmentEnum.Left;
    // field.GridColumnWidth = 200;
    field.AllowGridEditing = false; //grid editing is disabled for now
    field.AllowGridFiltering = false; //filtering is enabled in filter builder but not in data grid
    field.FilterOperations = getFilterOperationsForBrowseControls();
    //add current user custom operator in filter operations if default user flow enabled for ReferenceTypeId
    if (field.ReferenceTypeId) {
      const referenceSchema = StaticDependencyInjector?.Injector?.get(SchemaQuery)?.getEntity(field.ReferenceTypeId);
      if (referenceSchema?.IsDefaultUser) {
        field.FilterOperations = field.FilterOperations?.length ? [...field.FilterOperations, GridFilterComparisonOperatorsEnum.CurrentUser] : [GridFilterComparisonOperatorsEnum.CurrentUser];
      }
    }
  } else if (field.ControlType === EnumControlType.MultiMedia) {
    field.IsAsyncRenderEnabled = false;
    field.Label = field.EnableDisplayPicture ? translocoService?.translate('Photo') : field.Label; //renaming label if display picture enabled
    field.GridCellTemplateName = DataGridDisplayTemplateEnum.PhotoTemplate;
    field.AllowGridEditing = false; //disable editing,sorting,filtering,searching for multimedia control
    field.AllowGridSorting = false;
    field.AllowGridFiltering = false;
    field.AllowFilterBuilderFiltering = false;
    field.AllowGridSearch = false;
    field.AllowGridGrouping = false;
  } else if (field.ControlType === EnumControlType.TextBox) {
    field.GridEditorOptions = <IDataGridEditorOptions>{
      // placeholder: field.Hint, Note: disabled palceholder to show the plachoder of operations in filter row
      showClearButton: true
    };
    if (field.DataType === EnumDataType.Text) {
      field.GridCellTemplateName = DataGridDisplayTemplateEnum.TextFieldTemplate;
      field.GridHorizontalAlignment = DataGridHorizontalAlignmentEnum.Left;
      // field.GridColumnWidth = 150;
    } else if (field.DataType === EnumDataType.Email) {
      field.GridCellTemplateName = DataGridDisplayTemplateEnum.TextFieldTemplate;
      field.GridHorizontalAlignment = DataGridHorizontalAlignmentEnum.Left;
      // field.GridColumnWidth = 175;
    } else if (field.DataType === EnumDataType.Integer) {
      field.GridDataType = DataGridDataTypeEnum.Number;
      field.FilterOperations = getFilterOperationsForDataTypeNum();
      field.GridEditorOptions = <IDataGridEditorOptions>{ format: '###0' };
    } else if (field.DataType === EnumDataType.Numeric) {
      field.GridDataType = DataGridDataTypeEnum.Number;
      field.FilterOperations = getFilterOperationsForDataTypeNum();
      field.GridEditorOptions = <IDataGridEditorOptions>{ format: 'decimal' };
    } else if (field.DataType === EnumDataType.Random) {
      field.GridHorizontalAlignment = DataGridHorizontalAlignmentEnum.Left;
      // field.GridColumnWidth = 150;
    } else if (field.DataType === EnumDataType.Map) {
      field.GridCellTemplateName = DataGridDisplayTemplateEnum.TextFieldTemplate; // for now this will change after map control implementation
      field.AllowGridEditing = false; //for now
      field.GridHorizontalAlignment = DataGridHorizontalAlignmentEnum.Left;
      field.GridColumnWidth = 150;
    }
  } else if (field.ControlType === EnumControlType.PhoneNumber) {
    field.GridEditorOptions = <IDataGridEditorOptions>{
      // placeholder: field.Hint, Note: disabled palceholder to show the plachoder of operations in filter row
      showClearButton: true
    };
    field.GridCellTemplateName = DataGridDisplayTemplateEnum.TextFieldTemplate;
    field.GridHorizontalAlignment = DataGridHorizontalAlignmentEnum.Left;
  } else if (field.ControlType === EnumControlType.TextArea) {
    field.GridEditorOptions = <IDataGridEditorOptions>{
      //  placeholder: field.Hint Note: disabled palceholder to show the plachoder of operations in filter row
    };
    field.GridCellTemplateName = DataGridDisplayTemplateEnum.TextFieldTemplate;
    field.GridEditTemplateName = DataGridEditorTemplateEnum.TextAreaEditTemplate;
    //add template rendering infos
    field.DisplayAndEditTemplateRendererInfo = <IDisplayAndEditTemplateRendererInfo>{
      PlaceHolderText: field.Hint
    };
    field.GridHorizontalAlignment = DataGridHorizontalAlignmentEnum.Left;
    // field.GridColumnWidth = 200;
  } else if (field.ControlType === EnumControlType.Rating) {
    field.IsAsyncRenderEnabled = true;
    field.GridDataType = DataGridDataTypeEnum.Number;
    field.FilterOperations = getFilterOperationsForDataTypeNum();
    field.GridCellTemplateName = DataGridDisplayTemplateEnum.RatingTemplate;
    field.GridEditTemplateName = DataGridEditorTemplateEnum.RatingEditTemplate;
    field.GridEditorOptions = <IDataGridEditorOptions>{
      max: 5,
      width: '100',
      // placeholder: field.Hint, Note: disabled palceholder to show the plachoder of operations in filter row
      showClearButton: true
    }; //5 star rating system
    field.GridColumnWidth = 200;
  } else if (field.ControlType === EnumControlType.DateTime) {
    field.GridDataType = DataGridDataTypeEnum.DateTime;
    field.FilterOperations = getFilterOperationsForDataTypeDate();
    field.GridEditorOptions = <IDataGridEditorOptions>{
      displayFormat: 'dd MMM yyyy hh:mm a',
      acceptCustomValue: false
      //  placeholder: field.Hint Note: disabled palceholder to show the plachoder of operations in filter row
    };
    field.GridHorizontalAlignment = DataGridHorizontalAlignmentEnum.Left;
    field.GridColumnWidth = 200;
  } else if (field.ControlType === EnumControlType.DateOnly) {
    field.GridEditorOptions = <IDataGridEditorOptions>{
      displayFormat: 'dd MMM yyyy',
      acceptCustomValue: false
      // placeholder: field.Hint Note: disabled palceholder to show the plachoder of operations in filter row
    };
    field.GridDataType = DataGridDataTypeEnum.Date;
    field.FilterOperations = getFilterOperationsForDataTypeDate();
    field.GridColumnWidth = 150;
  } else if (field.ControlType === EnumControlType.TimeOnly) {
    field.GridDataType = DataGridDataTypeEnum.Date;
    field.GridEditorOptions = <IDataGridEditorOptions>{
      type: 'time',
      displayFormat: 'shortTime',
      acceptCustomValue: false
      // placeholder: field.Hint Note: disabled palceholder to show the plachoder of operations in filter row
    };
    field.AllowGridFiltering = false;
    field.AllowFilterBuilderFiltering = false;
    field.AllowGridSearch = false;
  } else if (field.ControlType === EnumControlType.CheckBox || field.ControlType === EnumControlType.Switch) {
    field.GridDataType = DataGridDataTypeEnum.Boolean;
    field.Mandatory = false; //force set false to mandatory as value can be either true/false
    field.FilterOperations = getFilterOperationsForDataTypeBoolean();
    if (field.ControlType === EnumControlType.Switch) {
      field.IsAsyncRenderEnabled = true;
      field.GridEditTemplateName = DataGridEditorTemplateEnum.SwitchEditTemplate;
      field.GridCellTemplateName = DataGridDisplayTemplateEnum.CheckBoxAndSwitchTemplate;
      //add template rendering infos
      field.DisplayAndEditTemplateRendererInfo = <IDisplayAndEditTemplateRendererInfo>{
        SwitchOnText: field.SwitchOnText,
        SwitchOffText: field.SwitchOffText,
        SwitchOnDisplayText: field.SwitchOnDisplayText,
        SwitchOffDisplayText: field.SwitchOffDisplayText
      };
      field.GridSwitchItems = [];
      field.GridSwitchItems.push({ Name: field.SwitchOnDisplayText ? field.SwitchOnDisplayText : field.SwitchOnText, Value: true });
      field.GridSwitchItems.push({ Name: field.SwitchOffDisplayText ? field.SwitchOffDisplayText : field.SwitchOffText, Value: false });
    }
    else {
      field.IsAsyncRenderEnabled = true;
      field.GridEditTemplateName = DataGridEditorTemplateEnum.CheckBoxEditTemplate;
      field.GridCellTemplateName = DataGridDisplayTemplateEnum.CheckBoxAndSwitchTemplate;
      field.GridSwitchItems = [];
      field.GridSwitchItems.push({ Name: translocoService?.translate('Yes'), Value: true });
      field.GridSwitchItems.push({ Name: translocoService?.translate('No'), Value: false });
    }
  } else if (field.ControlType === EnumControlType.ComboBox || field.ControlType === EnumControlType.RadioButton) {
    field.FilterOperations = getFilterOperationsForDropdowns();
    field.IsAsyncRenderEnabled = true;
    if (field.DefaultValue) {
      field.GridDefaultValue = field.DefaultValue.split(',');
    }
    //format default value
    if (field.DefaultItems) {
      field.GridDefaultItems = [];
      // make select control options
      for (const key of Object.keys(field.DefaultItems)) {
        const item = new DefaultItems(field.DefaultItems[key], key);
        field.GridDefaultItems.push(item);
      }
    }
    field.GridCellTemplateName = DataGridDisplayTemplateEnum.DropDownTemplate;
    //add template rendering infos
    field.DisplayAndEditTemplateRendererInfo = <IDisplayAndEditTemplateRendererInfo>{
      ShowDropdownBadgeStyle: showDropdownBadgeStyle(field)
    };
    field.GridEditorOptions = <IDataGridEditorOptions>{
      itemTemplate: DataGridEditorTemplateEnum.DropDownEditTemplate,
      showClearButton: true
      //placeholder: field.Hint Note: disabled palceholder to show the plachoder of operations in filter row
    };
    field.GridHorizontalAlignment = DataGridHorizontalAlignmentEnum.Center;
    field.GridColumnWidth = 200;
  } else if (field.ControlType === EnumControlType.AutoCompleteTextBox) {
    field.FilterOperations = getFilterOperationsForMultiselect();
    field.IsAsyncRenderEnabled = true;
    if (field.DefaultValue) {
      field.GridDefaultValue = field.DefaultValue.split(';');
    }
    if (field.DefaultItems) {
      field.GridDefaultItems = [];
      // make select control options
      for (const key of Object.keys(field.DefaultItems)) {
        const item = new DefaultItems(field.DefaultItems[key], key);
        field.GridDefaultItems.push(item);
      }
    } //format default value
    field.GridEditorOptions = <IDataGridEditorOptions>{
      //placeholder: field.Hint  Note: disabled palceholder to show the plachoder of operations in filter row
    };
    field.GridCellTemplateName = DataGridDisplayTemplateEnum.MultiSelectTemplate;
    field.GridEditTemplateName = DataGridEditorTemplateEnum.MultiSelectEditTemplate;
    //add template rendering infos
    field.DisplayAndEditTemplateRendererInfo = <IDisplayAndEditTemplateRendererInfo>{
      PlaceHolderText: field.Hint,
      GridDefaultValue: field.GridDefaultValue,
      GridDefaultItems: field.GridDefaultItems
    };
    field.GridColumnWidth = 250;
  } else if (field.ControlType === EnumControlType.Formula) {
    field.FilterOperations = getFilterOperationsForDataTypeNum();
    field.AllowGridEditing = false; //for now
  } else if (field.ControlType === EnumControlType.Barcode) {
    field.FilterOperations = getFilterOperationsForBarcode();
    field.IsAsyncRenderEnabled = false;
    field.GridCellTemplateName = DataGridDisplayTemplateEnum.BarcodePhotoTemplate;
    field.AllowGridEditing = false; //disable editing,sorting,searching for barcode control
    field.AllowGridSorting = false;
    field.AllowGridSearch = false;
    field.AllowGridGrouping = false;
  }

  //disable editing for created and modified by field
  if (field.Name === SolrControlNameConstants.CREATED_BY || field.Name === SolrControlNameConstants.LAST_MODIFY_BY) {
    field.AllowGridEditing = false;
    //replace filter operation
    field.FilterOperations = [];
    field.FilterOperations = getFilterOperationsForUserAuditField();
  }

  //format fields for default user
  if (field.Name === SolrControlNameConstants.USER_NAME) {
    field.AllowGridEditing = false;
  } else if (field.Name === SolrControlNameConstants.USER_EMAIL) {
    field.AllowGridEditing = false;
  } else if (field.Name === SolrControlNameConstants.USER_LOGIN_STATUS) {
    field.FilterOperations = getFilterOperationsForUserLoginStatus();
    field.IsAsyncRenderEnabled = true;
    field.Label = translocoService?.translate('InvitationStatus');
    field.GridCellTemplateName = DataGridDisplayTemplateEnum.DefaultUserInvitationStatusTemplate;
    field.GridDefaultValue = [
      { id: EnumUserInvitationStatus.None, name: translocoService?.translate('Not Sent') },
      { id: EnumUserInvitationStatus.Sent, name: translocoService?.translate('Sent') },
      { id: EnumUserInvitationStatus.Accepted, name: translocoService?.translate('Accepted') }
      //disabled NeverSend, ReSend options for invitaton status dropdown from filter builder as it is not needed now
      // { id: EnumUserInvitationStatus.NeverSend, name: 'Never Sent' },
      // { id: EnumUserInvitationStatus.ReSend, name: 'ReSend' }
    ];
    field.GridHorizontalAlignment = DataGridHorizontalAlignmentEnum.Center;
    field.GridColumnWidth = 140;
    field.AllowGridEditing = false;
  } else if (field.Name === SolrControlNameConstants.USER_ID) {
    field.Label = translocoService?.translate('EmployeeId');
    field.AllowGridEditing = false;
  } else if (field.Name === SolrControlNameConstants.ROLE_ID) {
    field.Label = translocoService?.translate('EmployeeRole');
    field.GridCellTemplateName = DataGridDisplayTemplateEnum.DefaultUserRoleTemplate;
    field.GridColumnWidth = 140;
    field.AllowGridEditing = false;
    field.IsAsyncRenderEnabled = true;
    field.FilterOperations = getFilterOperationsForDefaultUserRole();
    field.GridDefaultUserRoles = getDefaultUserRoles(appId, clientId);
  }

  return field;
}

//#region filter operation helpare methods
export function getFilterOperationsForDataTypeString(): GridFilterComparisonOperatorsEnum[] {
  return [
    GridFilterComparisonOperatorsEnum.Contains,
    GridFilterComparisonOperatorsEnum.NotContains,
    GridFilterComparisonOperatorsEnum.StartsWith,
    GridFilterComparisonOperatorsEnum.EndsWith,
    GridFilterComparisonOperatorsEnum.Equals,
    GridFilterComparisonOperatorsEnum.NotEquals,
    GridFilterComparisonOperatorsEnum.IsBlank,
    GridFilterComparisonOperatorsEnum.IsNotBlank
  ];
}

export function getFilterOperationsForBrowseControls(): GridFilterComparisonOperatorsEnum[] {
  return [
    GridFilterComparisonOperatorsEnum.Equals,
    GridFilterComparisonOperatorsEnum.NotEquals,
    GridFilterComparisonOperatorsEnum.IsBlank,
    GridFilterComparisonOperatorsEnum.IsNotBlank
  ];
}

export function getFilterOperationsForParentTypeFilter(): GridFilterComparisonOperatorsEnum[] {
  return [
    GridFilterComparisonOperatorsEnum.Equals,
    GridFilterComparisonOperatorsEnum.NotEquals
  ];
}

export function getFilterOperationsForDataTypeNum(): GridFilterComparisonOperatorsEnum[] {
  return [
    GridFilterComparisonOperatorsEnum.Equals,
    GridFilterComparisonOperatorsEnum.NotEquals,
    GridFilterComparisonOperatorsEnum.Lt,
    GridFilterComparisonOperatorsEnum.Gt,
    GridFilterComparisonOperatorsEnum.Lte,
    GridFilterComparisonOperatorsEnum.Gte,
    GridFilterComparisonOperatorsEnum.Between
  ];
}

export function getFilterOperationsForDataTypeDate(): GridFilterComparisonOperatorsEnum[] {
  return [
    GridFilterComparisonOperatorsEnum.Today,
    GridFilterComparisonOperatorsEnum.CurrentMonth,
    GridFilterComparisonOperatorsEnum.CurrentYear,
    GridFilterComparisonOperatorsEnum.Equals,
    GridFilterComparisonOperatorsEnum.NotEquals,
    GridFilterComparisonOperatorsEnum.Lt,
    GridFilterComparisonOperatorsEnum.Gt,
    GridFilterComparisonOperatorsEnum.Lte,
    GridFilterComparisonOperatorsEnum.Gte,
    GridFilterComparisonOperatorsEnum.Between,
    GridFilterComparisonOperatorsEnum.IsBlank,
    GridFilterComparisonOperatorsEnum.IsNotBlank
  ];
}

export function getFilterOperationsForDataTypeBoolean(): GridFilterComparisonOperatorsEnum[] {
  return [
    GridFilterComparisonOperatorsEnum.Equals,
    GridFilterComparisonOperatorsEnum.NotEquals
  ];
}

export function getFilterOperationsForUserLoginStatus(): GridFilterComparisonOperatorsEnum[] {
  return [
    GridFilterComparisonOperatorsEnum.Equals,
    GridFilterComparisonOperatorsEnum.NotEquals
  ];
}

export function getFilterOperationsForDropdowns(): GridFilterComparisonOperatorsEnum[] {
  return [
    GridFilterComparisonOperatorsEnum.Equals,
    GridFilterComparisonOperatorsEnum.NotEquals,
    GridFilterComparisonOperatorsEnum.IsBlank,
    GridFilterComparisonOperatorsEnum.IsNotBlank
  ];
}

export function getFilterOperationsForBarcode(): GridFilterComparisonOperatorsEnum[] {
  return [
    GridFilterComparisonOperatorsEnum.Equals,
    GridFilterComparisonOperatorsEnum.NotEquals,
    GridFilterComparisonOperatorsEnum.IsBlank,
    GridFilterComparisonOperatorsEnum.IsNotBlank
  ];
}

export function getFilterOperationsForMultiselect(): GridFilterComparisonOperatorsEnum[] {
  return [
    GridFilterComparisonOperatorsEnum.Contains,
    GridFilterComparisonOperatorsEnum.NotContains,
    GridFilterComparisonOperatorsEnum.IsBlank,
    GridFilterComparisonOperatorsEnum.IsNotBlank
  ];
}

export function getFilterOperationsForUserAuditField(): GridFilterComparisonOperatorsEnum[] {
  return [
    GridFilterComparisonOperatorsEnum.Equals,
    GridFilterComparisonOperatorsEnum.NotEquals,
    GridFilterComparisonOperatorsEnum.IsBlank,
    GridFilterComparisonOperatorsEnum.IsNotBlank,
    GridFilterComparisonOperatorsEnum.CurrentUser
  ];
}

export function getFilterOperationsForDefaultUserRole(): GridFilterComparisonOperatorsEnum[] {
  return [
    GridFilterComparisonOperatorsEnum.Equals,
    GridFilterComparisonOperatorsEnum.NotEquals
  ];
}
//#endregion

//#region template rendering helper methods
export function getDefaultUserRoles(appId: string, clientId: number): IRoleViewModel[] {
  //get default user roles with or without design permission from store
  const roleQuery = StaticDependencyInjector?.Injector?.get(RoleQuery);
  let defaultUserRoles = roleQuery?.getAll().filter(i => i.AppId === appId && i.ClientId === clientId);
  defaultUserRoles = defaultUserRoles ? defaultUserRoles : [];
  return defaultUserRoles;
}
export function showDropdownBadgeStyle(gridVisibleField: IFieldViewModel): boolean {
  let isBadgeStyle = true;
  //if any default has words more than 2 then false
  if (gridVisibleField && gridVisibleField.GridDefaultValue && gridVisibleField.GridDefaultValue.length) {
    gridVisibleField.GridDefaultValue.forEach((defaultValue: string) => {
      if (defaultValue && defaultValue.trim() && defaultValue.split(' ').length > 2) {
        isBadgeStyle = false;
        return isBadgeStyle;
      }
    });
  }
  return isBadgeStyle;
}

export function getMultiSelectTemplateText(value: any, field: IFieldViewModel): string {
  let tagBoxSelectionValues = [];
  if (value && Array.isArray(value) && value.length) {
    tagBoxSelectionValues = value;
  } else if (value && isString(value)) {
    tagBoxSelectionValues = value.split(';');
  }
  // create an array to store multi select value
  const multiSelectValue = [];
  // if there is any tag box selected value, store in the array
  if (tagBoxSelectionValues && tagBoxSelectionValues.length) {
    // loop through every element
    tagBoxSelectionValues.forEach(element => {
      // if there is any option items, get option
      if (field.GridDefaultItems && field.GridDefaultItems.length) {
        // get option from option items
        const option = field.GridDefaultItems.find(i => i.Value === element);
        // if there is any option, push it into array
        if (option) {
          // push into the array of option name
          multiSelectValue.push(option.Name);
        }
        else {
          // else push the name directly
          multiSelectValue.push(element);
        }
      }
    });
  }
  // return multiselect value by joining using ',' if any, or the value directly
  return multiSelectValue && multiSelectValue.length ? multiSelectValue.join(',') : value;
}


export function getInvitationStatusText(value: EnumUserInvitationStatus) {
  let invitationStatusText = 'Not Sent';
  if (!value) {
    invitationStatusText = 'Not Sent';
  } else if (value === EnumUserInvitationStatus.Sent) {
    invitationStatusText = 'Sent';
  } else if (value === EnumUserInvitationStatus.Accepted) {
    invitationStatusText = 'Accepted';
  } else if (value === EnumUserInvitationStatus.NeverSend) {
    invitationStatusText = 'Never Sent';
  } else if (value === EnumUserInvitationStatus.ReSend) {
    invitationStatusText = 'ReSend';
  }
  return invitationStatusText;
}

export function getGridSelectedValueForMultiSelect(gridVisibleField: IFieldViewModel, fieldValue: string): string[] {
  const selectedValues = [];
  if (fieldValue?.trim()) {
    const valueArray = fieldValue.split(';');
    if (valueArray?.length) {
      valueArray.forEach(value => {
        const item = gridVisibleField.GridDefaultItems.find(data => data.Value === value);
        selectedValues.push(item?.Name ? item.Name : value);
      })
    }
  }
  return selectedValues;
}
//#endregion

export function formatFieldsForSorting(gridVisibleFields: IFieldViewModel[], sortQueryString: string): IFieldViewModel[] {
  if (sortQueryString) {
    const sortQueryArray = sortQueryString.split(',');
    if (sortQueryArray && sortQueryArray.length) {
      sortQueryArray.forEach((sortQuery, index) => {
        let fieldName = "";
        let sortOrder = "";
        if (sortQuery.includes('asc')) {
          fieldName = sortQuery.replace('asc', '').trim();
          sortOrder = 'asc';
        } else if (sortQuery.includes('desc')) {
          fieldName = sortQuery.replace('desc', '').trim();
          sortOrder = 'desc';
        }
        const field = gridVisibleFields.find(x => x.Name === fieldName);
        if (field) {
          field.SortIndex = index;
          field.SortOrder = sortOrder;
        }
      });
    }
  }
  return gridVisibleFields;
}

export function formatGridRecordsBeforeRendering(records: IRecordViewModel[], schema: ISchemaViewModel, gridVisibleFields: IFieldViewModel[], roleQuery?: RoleQuery): IRecordViewModel[] {
  if (records && records.length) {
    records = records.map(record => {
      return formatGridRecordBeforeRendering(record, schema, gridVisibleFields, roleQuery);
    });
  }
  return records;
}

export function formatGridRecordBeforeRendering(record: IRecordViewModel, schema: ISchemaViewModel, gridVisibleFields: IFieldViewModel[], roleQuery?: RoleQuery,
  dynamicFieldsForUpdatedRecord?: Record<string, any>): IRecordViewModel {
  if (record?.Id) {
    /* if there is dynamic fields for an updated record then first look for any property that are in dynamic fields but not in record
    as for dynamic fields with empty value server removes the property from record */
    if (dynamicFieldsForUpdatedRecord) {
      for (const fieldProp in dynamicFieldsForUpdatedRecord) {
        if (!record.hasOwnProperty(fieldProp)) {
          //add dynamic field in record and assign the value
          record[fieldProp] = dynamicFieldsForUpdatedRecord[fieldProp];
        }
      }
    }
    //generate display name from record to show updated display name
    //for pushing template rendering info into data by prop
    record[DataGridInternalFieldNameEnum.TemplateModel] = {};
    //process the property of the records that are in grid visible vields for display
    // tslint:disable-next-line: forin
    for (const prop in record) {
      //find the field in grid visible fields as we are only processing the properties that will be shown in grid
      const field = gridVisibleFields.find(x => x.Name === prop);
      if (field && field?.Name?.trim() && field?.ControlType) {
        if (field.ControlType === EnumControlType.DateOnly && record[prop]) {
          //for date support only local for now
          record[prop] = formatDateTimeStringLocal(record[prop]);
        } else if (field.ControlType === EnumControlType.DateTime && record[prop]) {
          //if UTC enabled then record value is the UTC or format to local
          record[prop] = field.IsUTCTime ? record[prop] : formatDateTimeStringLocal(record[prop]);
        } else if (field.ControlType === EnumControlType.TimeOnly && record[prop]) {
          //format the time value from time to date time string
          record[prop] = formatTimeToDateTimeStringLocal(record[prop]);
        } else if (field.ControlType === EnumControlType.AutoCompleteTextBox) {
          if (record[prop]) {
            //set comma seperated value in display value field
            record[field.Name + DataGridInternalFieldNameEnum.DisplayValue] = getMultiSelectTemplateText(record[prop], field);
            record[field.Name + DataGridInternalFieldNameEnum.SelectedValue] = getGridSelectedValueForMultiSelect(field, record[prop]);
          } else {
            record[field.Name + DataGridInternalFieldNameEnum.DisplayValue] = "";
            record[field.Name + DataGridInternalFieldNameEnum.SelectedValue] = "";
          }
        } else if (field.ControlType === EnumControlType.MultiMedia) {
          if (record[prop]) {
            //set formatted image url in display value field
            record[field.Name + DataGridInternalFieldNameEnum.DisplayValue] = getGridPhotoTemplateImageUrl(record[prop]);
          } else {
            record[field.Name + DataGridInternalFieldNameEnum.DisplayValue] = "";
          }
        } else if ((field.ControlType === EnumControlType.ComboBox || field.ControlType === EnumControlType.RadioButton)) {
          if (record[prop]) {
            //set dropdown or badge color in display color field
            record[field.Name + DataGridInternalFieldNameEnum.DisplayValue] = getSelectedDropdownControlText(field, record[prop]);
            record[field.Name + DataGridInternalFieldNameEnum.DisplayColor] = getDropdownBadgeDynamicColor(field, record[prop]);
          } else {
            record[field.Name + DataGridInternalFieldNameEnum.DisplayValue] = "";
            record[field.Name + DataGridInternalFieldNameEnum.DisplayColor] = "";
          }
        } else if (field.ControlType === EnumControlType.Switch || field.ControlType === EnumControlType.CheckBox) {
          //set formatted switch field text in display value field
          record[field.Name + DataGridInternalFieldNameEnum.DisplayValue] = getSwitchControlText(field, record[prop]);
        }

        //format fields for default user
        if (field.Name === SolrControlNameConstants.USER_LOGIN_STATUS) {
          if (record[prop]) {
            //set formatted invitation status text in display value field
            record[field.Name + DataGridInternalFieldNameEnum.DisplayValue] = getInvitationStatusText(record[prop]);
            //set invitation dropdown color in display color field
            record[field.Name + DataGridInternalFieldNameEnum.DisplayColor] = getInvitationStatusBadgeDynamicColor(record[prop]);
          } else {
            record[field.Name + DataGridInternalFieldNameEnum.DisplayValue] = "";
            record[field.Name + DataGridInternalFieldNameEnum.DisplayColor] = "";
          }
        } else if (field.Name === SolrControlNameConstants.ROLE_ID) {
          const role = roleQuery?.getEntity(record[prop]);
          record[field.Name + DataGridInternalFieldNameEnum.DisplayValue] = role?.Id && role?.Name ? role.Name : "";
        }
      }
    }
    //push display/edit template rendering info of every field(as record may not have the field if vlaue is not saved) into record by field name
    schema?.Fields.forEach(field => {
      //first DeepClone and format the field for data grid
      field = DeepClone<IFieldViewModel>({}, field);
      field = formatFieldForDatagrid(field, schema?.AppId, schema?.ClientId);
      //now push display/edit template rendering info
      if (field.DisplayAndEditTemplateRendererInfo) {
        record[DataGridInternalFieldNameEnum.TemplateModel][field?.Name] = field.DisplayAndEditTemplateRendererInfo;
      }
    });
  }
  return record;
}

export function formatGridDynamicFieldsBeforeSaving(dynamicFields: Record<string, any>, gridVisibleFields: IFieldViewModel[]): Record<string, any> {
  // tslint:disable-next-line: forin
  for (const prop in dynamicFields) {
    //find the field
    const field = gridVisibleFields.find(x => x.Name === prop);
    //if prop value is null then assign empty string to avoid server side error
    if (isNull(dynamicFields[prop])) {
      dynamicFields[prop] = '';
    }
    if (field && field.ControlType === EnumControlType.AutoCompleteTextBox && dynamicFields[prop]) {
      dynamicFields[prop] = formatMultiSelectTemplateTextForSaving(dynamicFields[prop]);
    } else if (field && (field.ControlType === EnumControlType.DateOnly || field.ControlType === EnumControlType.DateTime) && dynamicFields[prop]) {
      //check Z exists in the string otherwise append it to the last to meet server datetime format
      if (!dynamicFields[prop].endsWith('Z')) dynamicFields[prop] = dynamicFields[prop] + "Z";
      //replace second/milisecond portion with ) for date only control
      if (field.ControlType === EnumControlType.DateOnly && dynamicFields[prop]) {
        dynamicFields[prop] = replaceDateSecondMiliSecondWithZero(dynamicFields[prop]);
      }
    } else if (field && field.ControlType === EnumControlType.TimeOnly && dynamicFields[prop]) {
      //format date time string back to time string
      dynamicFields[prop] = formatDateTimeToTimeStringLocal(dynamicFields[prop]);
    } else if (field.ControlType === EnumControlType.Entity && dynamicFields[prop]) {
      //add a new field(like stringfield1ReferenceId) for entity type control and assign selected record id
      dynamicFields[prop + SolrControlNameConstants.REFERENCE_ID] = dynamicFields[prop];
      //first fetch curretn browse control records and find the selected record from it
      const currentBrowseControlFieldRecords = StaticDependencyInjector?.Injector?.get(RecordService)?.currentBrowseControlFieldRecords$.getValue();
      const selectedBrowseControlRecord = currentBrowseControlFieldRecords?.find(i => i.Id === dynamicFields[prop]);
      //now update original field value with selected record display name
      dynamicFields[prop] = selectedBrowseControlRecord?.DisplayName ? selectedBrowseControlRecord.DisplayName : "";
    }
  }
  return dynamicFields;
}

export function formatMultiSelectTemplateTextForSaving(value): string {
  let multiSelectTemplateText = '';
  if (value && Array.isArray(value) && value.length) {
    multiSelectTemplateText = value.map(x => x).join(';');
  } else if (value && isString(value)) {
    multiSelectTemplateText = value.replace(/\,/g, ';');
  }
  return multiSelectTemplateText;
}


export function getGridPhotoTemplateImageUrls(url: string | string[]): string[] {
  let imageUrl = [];
  if (url && Array.isArray(url)) {
    imageUrl = url;
  } else {
    imageUrl.push(url);
  }
  return imageUrl;
}

export function getGridPhotoTemplateImageUrl(url: string | string[]): string {
  let imageUrl = "";
  if (url && Array.isArray(url) && url.length) {
    imageUrl = url[0];
  } else {
    imageUrl = <string>url;
  }
  return imageUrl;
}


export function isMultipleGridPhoto(url: string | string[]): boolean {
  let isMultiplePhoto = false;
  if (url && Array.isArray(url) && url.length > 1) {
    isMultiplePhoto = true;
  }
  return isMultiplePhoto;
}

export function getDropdownBadgeDynamicColor(gridVisibleField: IFieldViewModel, dataFieldValue: string): string {
  const colorCodeArray = [
    '#0cad7d', //green
    '#fd397a', //red
    '#337ab7', //blue
    '#00c5dc',
    '#ffb822',
    '#7d3c98',
    '#0e6655cc',
    '#03a9f4',
    '#20c997',
    '#D35400'
  ];
  let backGroundColorCode = '#999';

  if (
    gridVisibleField &&
    gridVisibleField.GridDefaultValue &&
    gridVisibleField.GridDefaultValue.length &&
    dataFieldValue
  ) {
    const defaultValueIndex = gridVisibleField.GridDefaultValue.findIndex(x => x === dataFieldValue);
    if (colorCodeArray[defaultValueIndex]) {
      backGroundColorCode = colorCodeArray[defaultValueIndex];
    }
  }
  return backGroundColorCode;
}

export function getSelectedDropdownControlText(gridVisibleField: IFieldViewModel, dataFieldValue: string): string {
  const dropDownControlText = gridVisibleField.GridDefaultItems.find(item => item.Value === dataFieldValue);
  if (dropDownControlText && dropDownControlText.Name) {
    return dropDownControlText.Name;
  } else {
    return dataFieldValue;
  }
}


export function getInvitationStatusBadgeDynamicColor(dataFieldValue: number): string {
  let backGroundColorCode = '#999';
  if (!dataFieldValue || dataFieldValue === EnumUserInvitationStatus.None) {
    backGroundColorCode = '#ffb822';
  } else if (dataFieldValue === EnumUserInvitationStatus.Sent) {
    backGroundColorCode = '#00c5dc';
  } else if (dataFieldValue === EnumUserInvitationStatus.Accepted) {
    backGroundColorCode = '#0cad7d';
  } else if (dataFieldValue === EnumUserInvitationStatus.NeverSend) {
    backGroundColorCode = '#fd397a';
  } else if (dataFieldValue === EnumUserInvitationStatus.ReSend) {
    backGroundColorCode = '#999';
  }
  return backGroundColorCode;
}

export function getSwitchControlText(gridVisibleField: IFieldViewModel, dataFieldValue: boolean): string {
  //get transloco service instance
  const translocoService = StaticDependencyInjector?.Injector?.get(TranslocoService);
  let switchControlText = dataFieldValue ? translocoService?.translate('Yes') : translocoService?.translate('No');
  if (dataFieldValue && gridVisibleField && gridVisibleField.SwitchOnText) {
    switchControlText = gridVisibleField.SwitchOnDisplayText ? gridVisibleField.SwitchOnDisplayText : gridVisibleField.SwitchOnText;
  } else if (!dataFieldValue && gridVisibleField && gridVisibleField.SwitchOffText) {
    switchControlText = gridVisibleField.SwitchOffDisplayText ? gridVisibleField.SwitchOffDisplayText : gridVisibleField.SwitchOffText;
  }
  return switchControlText;
}

export function getAutoCompleteTextBoxControlText(gridVisibleField: IFieldViewModel, dataFieldValue: string) {
  // trimming data Field value
  if (dataFieldValue && dataFieldValue.trim()) {
    // replacing ':' with ', '
    const replacedString = dataFieldValue.replace(/;/gi, ', ');
    return replacedString;
  }
}

export function isEditingEnabledInGrid(disabledInUI: string, hiddenInUI: string): boolean {
  let isEditingEnable = true;
  if (disabledInUI && disabledInUI.includes('Edit')) {
    isEditingEnable = false;
  }
  if (hiddenInUI && hiddenInUI.includes('Edit')) {
    isEditingEnable = false;
  }
  return isEditingEnable;
}

export function isViewEnabledInGrid(hiddenInUI: string): boolean {
  let isViewEnabled = true;
  if (hiddenInUI && hiddenInUI.includes(HiddenInUIModeConstants.View)) {
    isViewEnabled = false;
  }
  return isViewEnabled;
}

export function setAlternatingRowsBackground(gridCell, excelCell) {
  if (gridCell.rowType === 'header' || gridCell.rowType === 'data') {
    if (excelCell.fullAddress.row % 2 === 0) {
      excelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'D3D3D3' }, bgColor: { argb: 'D3D3D3' } };
    }
  }
}