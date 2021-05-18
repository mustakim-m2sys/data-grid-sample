import { EnumMobileMenuLayout, EnumThemeColor } from '../..';

//#region Request Models
//#endregion

//#region Response Models
export interface IMenuSettingsResponseModel {
  AppId: string;
  ClientId: number;
  IsGlobalSearch: boolean;
  MobileLayout: EnumMobileMenuLayout;
  MobileLayoutThemeColor: EnumThemeColor;
  IsLayoutEdit: boolean;
}
//#endregion

//#region View Models
export interface IMenuSettingsViewModel extends IMenuSettingsResponseModel {
}
//#endregion