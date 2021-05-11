import { IAppClientMapperModel } from '../..';

//#region Request Models
//#endregion

//#region Response Models
export interface IRecordRolePrivilegeResponseModel {
  RoleId: string;
  Type: number;
  TypeId: string;
  PrivilegeCodes: number;
}
//#endregion

//#region View Models
export interface IRecordRolePrivilegeViewModel extends IAppClientMapperModel, IRecordRolePrivilegeResponseModel {
  Id: string;
}
//#endregion

