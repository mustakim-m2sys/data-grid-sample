//#region Request Models
//#endregion

//#region Response Models
export interface IBiometricSettingsResponseModel {
  Id: string;
  AppId: string;
  ClientId: number;
  BiometricModuleName: string;
  IsEdit: boolean;
  IdentificationType: number;
  CaptureType: number;
  CaptureDevice: number;
  CaptureMode: number;
  QuickIdentificationType: number;
  TemplateFormat: number;
  ImageFormat: number;
  FacePicture: number;
  MatchingAppKey: string;
  MatchingAppSecretKey: string;
  MatchingCustomerKey: string;
  MatchingApiURL: string;
  MatchingApiURLWithIP: string;
  CaptureAppKey: string;
  CaptureAppSecretKey: string;
  CaptureCustomerKey: string;
  CaptureApiURL: string;
  CaptureApiURLWithIP: string;
}
//#endregion

//#region View Models
export interface IBiometricSettingsViewModel extends IBiometricSettingsResponseModel {
}
  //#endregion