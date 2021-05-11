import { FilterRuleComparisonOperatorsEnum, IAppClientMapperModel } from '@CloudApperClients/app-model';

import { EnumFormViewPermissionType, EnumFormViewType } from '../constants/site.enums';

//#region Request Models
//#endregion

//#region Response Models
export interface IFormViewResponseModel {
    Id: string;
    TypeId: string;
    Title: string;
    Description: string;
    SortQuery?: string;
    FilterQuery?: string;
    DefaultView: boolean;
    ViewDefinition: FormViewDefinition;
    ConfigurationJson: string;
    FormViewPermissions: IFormViewPermission[];
    CreatedBy?: string;
}
//#endregion

//#region View Models
export interface IFormViewVM extends IAppClientMapperModel, IFormViewResponseModel {
    IsSystemView: boolean; //to track the system generated views
    PermissionType: EnumFormViewPermissionType;
    FilterArray?: any[];
}
//#endregion

//#region Helper Models/enums
export interface FormViewDefinition {
    ViewType: EnumFormViewType;
    PivotField?: string;
    Fields: string[];
    FilterConfiguration: IFilterRuleSet;
    SortConfigurations: ISortDefinition[];
}

export interface ISortDefinition {
    Field: string;
    Sorting: string;
}

export interface IFilterRuleSet {
    Condition: RulesetConditionEnum;
    Rules: IFilterRuleSet[] | IFilterRule[];
}

export interface IFilterRule {
    Field: string;
    Operator: FilterRuleComparisonOperatorsEnum;
    Value: any;
    Entity?: string;
}

export interface IFilterRuleBetweenValue {
    Start: any;
    Stop: any;
}

export interface IFilterRuleCurrentUserValueForCreatedBy {
    CreatedBy: string;
    CreatedById: string;
}

export interface IFilterRuleCurrentUserValueForLastModifyBy {
    LastModifyBy: string;
    LastModifyById: string;
}

export interface IFilterRuleParentFilterValue {
    ParentId: string;
    ParentTypeId: string;
    ParentDisplayName: string;
}

export interface IFilterRuleRoleFilterValue {
    RoleId: string;
    RoleName: string;
}

export interface IFormViewPermission {
    PermittedId: string;
    PermissionType: EnumFormViewPermissionType;
}

export class SortFieldModel {
    Name: string;
    Label: string;
    SortType: string;
    SortString?: string;
}

export enum RulesetConditionEnum {
    And = 'AND',
    Or = 'OR',
    Not = 'NOT'
}

export class AvailableFormViewType {
    name: EnumFormViewType;
    icon: string;
    hint: string;
    onBoardId?: string;
}
//#endregion

//#region Default Classes
export class DefaultFormViewModel implements IFormViewVM {
    Id = "";
    AppId = "";
    ClientId = 0;
    TypeId = "";
    Title = "";
    Description = "";
    SortQuery?= "";
    FilterQuery?= "";
    DefaultView = false;
    ViewDefinition: FormViewDefinition = <FormViewDefinition>{};
    ConfigurationJson = "";
    FormViewPermissions: IFormViewPermission[] = [];
    IsSystemView = false; //to track the system generated views
    PermissionType: EnumFormViewPermissionType = EnumFormViewPermissionType.Public;

    constructor(typeId?: string, viewType?: EnumFormViewType) {
        if (typeId) this.TypeId = typeId;
        if (viewType) this.ViewDefinition = <FormViewDefinition>{
            ViewType: viewType
        }
    }
}

export class DefaultListView extends DefaultFormViewModel implements IFormViewVM {
    constructor(typeId: string) {
        super(typeId, EnumFormViewType.ListView);
        this.Id = "99999999-99999999-99999999-99999999-1";
        this.Title = "AllView";
        this.Description = "DEFAULT_LIST_VIEW_DESC";
        this.IsSystemView = true;
    }
}

export class DefaultCalendarView extends DefaultFormViewModel implements IFormViewVM {
    constructor(typeId: string) {
        super(typeId, EnumFormViewType.Calendar);
        this.Id = "99999999-99999999-99999999-99999999-2";
        this.Title = "AllView";
        this.Description = "DEFAULT_CALENDAR_VIEW_DESC";
        this.IsSystemView = true;
    }
}

export class DefaultKanbanView extends DefaultFormViewModel implements IFormViewVM {
    constructor(typeId: string) {
        super(typeId, EnumFormViewType.Kanban);
        this.Id = "99999999-99999999-99999999-99999999-3";
        this.Title = "AllView";
        this.Description = "DEFAULT_KANBAN_VIEW_DESC";
        this.IsSystemView = true;
    }
}

export class DefaultFormViewPermission implements IFormViewPermission {
    PermittedId: string;
    PermissionType: EnumFormViewPermissionType;

    constructor(permittedId: string, permissionType: EnumFormViewPermissionType) {
        this.PermittedId = permittedId;
        this.PermissionType = permissionType;
    }
}

export class FormViewType {
    Name: string;
    Value: EnumFormViewType;
    disabled: boolean; //default dx field with small case letter

    constructor(name: string, value: EnumFormViewType, disabled: boolean) {
        this.Name = name;
        this.Value = value;
        this.disabled = disabled;
    }
}

export class FormPermissionType {
    Name: string;
    Value: EnumFormViewPermissionType;

    constructor(name: string, value: EnumFormViewPermissionType) {
        this.Name = name;
        this.Value = value;
    }
}
//#endregion


