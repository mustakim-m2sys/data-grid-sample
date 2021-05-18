import { IAppClientMapperModel } from '../..';

//#region Request Models
//#endregion

//#region Response Models
export interface IRecordsUserResponseModel {
    RoleId: string;
    RecordId:string;
    TypeId:string;
}
//#endregion

//#region View Models
export interface IRecordsUserViewModel extends IAppClientMapperModel, IRecordsUserResponseModel {
    Id: string;
    AppId: string;
    ClientId: number;
    
}
//#endregion