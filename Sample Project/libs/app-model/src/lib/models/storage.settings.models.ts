//#region Request Models
//#endregion

//#region Response Models
export interface IStorageSettingsResponseModel {
  Id: string;
  VimeoSettings: IVimeoSettingsResponseModel;
}

export interface IVimeoSettingsResponseModel {
  VimeoToken: string;
  VimeoURI: string;
}
//#endregion

//#region View Models
export interface IStorageSettingsViewModel extends IStorageSettingsResponseModel {
  VimeoSettings: IVimeoSettingsViewModel;
}
export interface IVimeoSettingsViewModel extends IVimeoSettingsResponseModel {
}
  //#endregion