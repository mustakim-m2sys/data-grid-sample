import { IFormViewResponseModel, IFormViewVM } from '@CloudApperClients/app-model';

import {
  EnumClientPlatform,
  GenericDataServiceRequest,
  IBiometricSettingsResponseModel,
  IBiometricSettingsViewModel,
  ILayoutSettingResponseModel,
  ILayoutSettingViewModel,
  IMenuResponseModel,
  IMenuSettingsResponseModel,
  IMenuSettingsViewModel,
  IMenuViewModel,
  IParentChildRelationResponseModel,
  IParentChildRelationViewModel,
  IRecordRolePrivilegeResponseModel,
  IRecordRolePrivilegeViewModel,
  IRecordsUserResponseModel,
  IRecordsUserViewModel,
  IRoleResponseModel,
  IRoleViewModel,
  ISchemaResponseModel,
  ISchemaViewModel,
  IStorageSettingsResponseModel,
  IStorageSettingsViewModel,
} from '../..';
import { IDynamicTemplateResponseModel, IDynamicTemplateViewModel } from './dynamic.template.models';

//#region Request Models
export class SpecificRecordDetailsRequestModel<T> extends GenericDataServiceRequest<T> {
  constructor(
    recordId: T,
    appId: string,
    clientId: number,
    platform: EnumClientPlatform,
    userId: string,
    userName: string,
    clientVersion: string
  ) {
    super({
      AppId: appId,
      ClientId: clientId,
      ClientPlatform: platform,
      UserId: userId,
      UserName: userName,
      ClientVersion: clientVersion
    });
    this.Request = recordId;
  }
}


export class SpecificSharedSchemaRequestModel<T> extends GenericDataServiceRequest<T> {
  constructor(
    user: T,
    appId: string,
    clientId: number,
    platform: EnumClientPlatform,
    userId: string,
    userName: string,
    clientVersion: string
  ) {
    super({
      AppId: appId,
      ClientId: clientId,
      ClientPlatform: platform,
      UserId: userId,
      UserName: userName,
      ClientVersion: clientVersion
    });
    this.Request = user;
  }
}
//#endregion

//#region Response Models
export interface IAppResponseModel {
  Id: string;
  Name: string;
  LogoUrl: string;
  Tagline: string;
  LanguageFileId: string;
  RoleId: string;
  IsClientAdminRole: boolean;
  HasDesignPermission: boolean;
  TemplateId?: string;
  MarketplaceTemplateId?: string;
  CurrentVersion?: string;
  HasSampleData: boolean;
  PreviousVersion?: string;
}

export interface IAppDetailsResponseModel {
  CurrentlanguageID?: string;
  AppConfigUpdated?: boolean;
  CurrentAppConfigVersion?: number;
  MenuSettings?: IMenuSettingsResponseModel;
  LayoutSettings?: ILayoutSettingResponseModel;
  BiometricSettings?: IBiometricSettingsResponseModel;
  StorageSettings?: IStorageSettingsResponseModel;
  Roles?: IRoleResponseModel[];
  Schemas?: ISchemaResponseModel[];
  RecordRolePrivileges?: IRecordRolePrivilegeResponseModel[];
  Menus?: IMenuResponseModel[];
  ParentChildRelations?: IParentChildRelationResponseModel[];
  RecordsUser?: IRecordsUserResponseModel[];
  FormViews?: IFormViewResponseModel[];
  DynamicTemplates?: IDynamicTemplateResponseModel[];
}
//#endregion

//#region View Models
export interface IAppViewModel extends IAppResponseModel, Omit<IAppDetailsResponseModel, 'Schemas'> {
  ClientId: number;
  ClientName?: string;
  MenuSettings?: IMenuSettingsViewModel;
  BiometricSettings?: IBiometricSettingsViewModel;
  StorageSettings?: IStorageSettingsViewModel;
  LoggedInUserRole?: IRoleViewModel;
  Roles?: IRoleViewModel[];
  Schemas?: ISchemaViewModel[];
  RecordRolePrivileges?: IRecordRolePrivilegeViewModel[];
  Menus?: IMenuViewModel[];
  ParentChildRelations?: IParentChildRelationViewModel[];
  RecordsUser?: IRecordsUserViewModel[];
  LayoutSettings?: ILayoutSettingViewModel;
  AppDetailsFetchDateTime: Date;
  AppLaunchDateTime: Date;
  FormViews?: IFormViewVM[];
  DynamicTemplates?: IDynamicTemplateViewModel[];
  IsAppDetailsFetched: boolean;
  IsChartSettingsFetched: boolean;
  IsSchedulesFetched: boolean;
  LastSchedulesSyncTime: string;
}
//#endregion

//#region AppClientMapper Model
export interface IAppClientMapperModel {
  AppId: string;
  ClientId: number;
}
//#endregion
