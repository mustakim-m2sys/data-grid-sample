import { IAppClientMapperModel } from '../..';

//#region Request Models
//#endregion

//#region Response Models
export interface IParentChildRelationResponseModel {
  ParentId: string;
  ChildId: string;
}
//#endregion

//#region View Models
export interface IParentChildRelationViewModel extends IAppClientMapperModel, IParentChildRelationResponseModel {
  Id: string;
  SequenceNo: number;
}
//#endregion

