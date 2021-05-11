import {
  EnumControlType,
  EnumDataType,
  EnumSchemaType,
  EnumSharingMode,
  IFieldResponseModel,
  IFieldViewModel,
  IGroupBoxResponseModel,
  IGroupBoxViewModel,
  PaginationInfo,
} from '../..';

//#region Request Models
//#endregion

//#region Response Models
export interface ISchemaResponseModel {
  Id: string;
  Title: string;
  Type: EnumSchemaType;
  IsCustomType: boolean;
  IsDefaultUser: boolean;
  DataFilterApplicable: boolean;
  StatusEditable: boolean;
  HasBiometric: boolean;
  ProfilePicRequired: boolean;
  IsFileTabRequired: boolean;
  IsPhotoTabRequired: boolean;
  Pivot: boolean;
  LoadByPivot: boolean;
  IsQueueType: boolean;
  QueueSize: number;
  IsCreatedByVisible: boolean;
  IsDateCreatedVisible: boolean;
  SchemaXML: string;
  CustomSourceType: EnumSchemaType;
  AppId: string;
  ClientId: number;
  IsAutoSaveEnabled: boolean;
  BiometricIdentificationRequired: boolean;
  GridVisibleFields: IFieldResponseModel[];
  Fields: IFieldResponseModel[];
  FieldsTree: IFieldsTreeResponseModel;
  // To manage permission
  HasCreatePermission: boolean;
  HasEditPermission: boolean;
  HasDeletePermission: boolean;
  HasViewPermission: boolean;
  HasImageCreatePermission: boolean;
  HasImageEditPermission: boolean;
  HasImageDeletePermission: boolean;
  HasImageViewPermission: boolean;
  HasFileCreatePermission: boolean;
  HasFileEditPermission: boolean;
  HasFileDeletePermission: boolean;
  HasFileViewPermission: boolean;
  //for inherited schema(shared from other app)
  IsOwner?: boolean;
  OwnerAppId?: string;
  SharingMode?: EnumSharingMode;
  GlobalFormId?: string;
}
//#endregion

//#region View Models
export interface ISchemaViewModel extends Omit<ISchemaResponseModel, 'FieldsTree'> {
  GridVisibleFields: IFieldViewModel[];
  Fields: IFieldViewModel[];
  FieldsTree: IFieldsTreeViewModel;
  PaginationInfo?: PaginationInfo;
  ParentSchemas?: ISchemaViewModel[];
  ChildSchemas?: ISchemaViewModel[];
}

export interface IAppSchemaResponseModel {
  EntityTypeId: string;
  AppId: string;
  EntityTitle: string;
  AppName: string;
  ClientId: number;
}
export class IAppSchemaViewModel implements IAppSchemaResponseModel {
  EntityTypeId: string;
  AppId: string;
  EntityTitle: string;
  AppName: string;
  EntitySourceId: string;
  AppSourceId: string;
  ReportId: string;
  ClientId: number;
}


export class ReportAppViewModel {
  AppSourceId: string;
  AppId: string;
  AppName: string;
  ReportId: string;
  Schemas: Array<IAppSchemaViewModel>;
}

//#endregion

//#region FieldsTree Models
export interface IFieldsTreeResponseModel {
  GroupBoxes: IGroupBoxResponseModel[];
}

export interface IFieldsTreeViewModel {
  GroupBoxes: IGroupBoxViewModel[];
}
//#endregion
