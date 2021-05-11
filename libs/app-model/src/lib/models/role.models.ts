import { IAppClientMapperModel } from '../..';

//#region Request Models
//#endregion

//#region Response Models
export interface IRoleResponseModel {
  Id: string;
  Name: string;
  Description: string;
  IsActive: boolean;
  RoleType: number;
  IsClientAdminRole: boolean;
  HasDesignPermission: boolean;
  HasAppPublishPermission: boolean;
}
//#endregion

//#region View Models
export interface IRoleViewModel extends IAppClientMapperModel, IRoleResponseModel {
}
//#endregion

export class DefaultRoleModel implements IRoleViewModel {
  AppId: string;
  ClientId: number;
  Id: string;
  Name: string;
  Description: string;
  IsActive: boolean;
  RoleType: number;
  IsClientAdminRole: boolean;
  HasDesignPermission: boolean;
  HasAppPublishPermission: boolean;
}

