import { EnumMarkerType } from "../constants/site.enums";
import { ISchemaViewModel } from "./schema.models";

//#region Request Models
export interface IRecordGetRequestModel {
    TypeId: string;
    StartRow: number;
    TotalRows: number;
    Id?: string;
    QueryString?: string;
    FieldList?: string;
    Type?: number;
    ParentId?: string;
    ParentTypeId?: string;
    FilterQueryString?: string;
    Status?: number;
    SpatialField?: string;
    Latitude?: number;
    Longitude?: number;
    Distance?: number;
    ApplyCurrentUserFilter?: boolean;
    UserAssociatedEntityTypeId?: string;
    UserAssociatedEntityId?: string;
    SortString?: string;
}

export interface IRecordSaveRequestModel {
    TypeId: string;
    Type: number;
    IsEdit: boolean;
    Item: Record<string, any>;
    DefaultUser?: DefaultUser;
}

export interface ISingleRecordDeleteRequestModel {
    id: string;
    IsDefaultUser: boolean;
}

export interface IRecordDeleteRequestModel {
    Id: string;
    IsDefaultUser: boolean;
}

export interface IRecordsDeleteRequestModel {
    Records: IRecordDeleteRequestModel[];
}

//#endregion

//#region Response Models
export interface IRecordResponseModel {
    id: string; //default solr field
    _version_: string; //default solr field
    ParentId: string;
    Status: number;
    TypeId: string;
    CreatedBy: string;
    CreateDate: string;
    QueueInTime: string;
    ParentDisplayName: string;
    Type: number;
    CreatedById: string;
    AppId: string;
    ParentTypeId: string;
    DisplayName: string;
    ClientId: number;
    ParentDisplayPicture: string;
    QueueInOut: string;
    QueueStatus: boolean;
    LastModifyDate: string;
    QueueOutTime: string;
    QueueWaitTime: number;
    UserName: string;
    UserEmail: string;
    UserId: string;
    RoleId: string;
    UserLoginStatus: number;
}

export interface ILayoutMapHierarchyResponseModel extends IRecordResponseModel {
    Children?: ILayoutMapHierarchyResponseModel[];
    Parent?: ILayoutMapHierarchyResponseModel;
}

export interface ILinkedRecordResponseModel {
    Count: Number;
    SchemaId: string;

}

export interface IRecordsDeleteResponseModel {
    TotalCount: number;
    SuccessCount: number;
    FailedCount: number;
    FailedIDS: string[];
}

//#endregion

//#region View Models
export interface IRecordViewModel extends Omit<IRecordResponseModel, "id" | "_version_"> {
    Id: string;
    BrowseRecordId?: string; //composite record id fro browse control records
    Version: string;
    DynamicFields: Record<string, any>;
    ChildItemsCount?: any;
    User?: DefaultUser;
    BrowseFormControlName?: string;
}

export interface IBrowseRecordCompositeIdViewModel {
    Id: string;
    DisplayName: string;
    TypeId: string;
}

export interface ILayoutMapHierarchyViewModel extends IRecordResponseModel {
    Children?: ILayoutMapHierarchyViewModel[];
    Parent?: ILayoutMapHierarchyViewModel;
    NewlyAddedChildren?: boolean;
    TreeId?: string;
    FieldName?: string;
    LayoutMapUrl?: string;
}

export interface IPlaceMarkerViewModel {
    Record: IRecordViewModel;
    RecordId: string;
    TypeId: string;
    DisplayName?: string;
    Name: string;
    Value?: string;
    Color?: string;
    Icon?: string;
    MapUrl?: string;
    ReferenceField?: string;
    ReferenceId?: string;
    ReferenceTypeId?: string;
    DragPosition?: any;
    Type?: EnumMarkerType;
    Disabled: boolean;
    DisplayFieldLabel1?: string;
    DisplayFieldLabel2?: string;
    DisplayFieldLabel3?: string;
    DisplayFieldValue1?: string;
    DisplayFieldValue2?: string;
    DisplayFieldValue3?: string;
    IsNewlyAddedMarker?: boolean;
}

// tslint:disable-next-line: no-empty-interface
export interface ILinkedRecordViewModel {
    // Items: ILinkedRecordResponseModel[];
}

// tslint:disable-next-line: no-empty-interface
export interface IRecordsDeleteViewModel extends IRecordsDeleteResponseModel {
}
//#endregion

//#region DefaultRecordViewModel Model
export class DefaultRecordViewModel implements IRecordViewModel {
    Id = "";
    ParentId = "";
    Status = 0;
    TypeId = "";
    CreatedBy = "";
    CreateDate = "";
    QueueInTime = "";
    ParentDisplayName = "";
    Type = 0;
    CreatedById = "";
    AppId = "";
    ParentTypeId = "";
    DisplayName = "";
    ClientId = 0;
    ParentDisplayPicture = "";
    QueueInOut = "";
    QueueStatus = false;
    Version = "";
    LastModifyDate = "";
    QueueOutTime = "";
    QueueWaitTime = 0;
    UserName = "";
    UserEmail = "";
    UserId = "";
    RoleId = "";
    UserLoginStatus = 0;
    DynamicFields = {};
    ChildItemsCount?= [];
    User?= <DefaultUser>{};
    constructor() { }
}
//#endregion

//#region DefaultUser Model
export interface DefaultUser {
    Name: string;
    Email: string;
    RoleId: string;
    ProfilePicData: string;
    IsDefaultUser: boolean;
    IsSignupUser: boolean;
    TimeZoneId: string;
    Id: string;
    CreatedBy: string;
    CreateDate: string;
    LastModifiedBy: string;
    LastModifiedDate: string;
}

export interface DefaultUserUpdate {
    UserName: string;
    Email: string;
    RoleId: string;
    RecordId: string;
    UserId: string;
    LanguageFileId: string;
}
//#endregion

export class RecordCreateEventModel {
    Schema: ISchemaViewModel;
    RecordId: string;
}