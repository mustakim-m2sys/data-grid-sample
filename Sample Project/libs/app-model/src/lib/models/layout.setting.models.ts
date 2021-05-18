import { EnumThemeColor, EnumMenuStyle } from '../constants/site.enums';
import { IAppClientMapperModel } from './app.models';

//#region Request Models
//#endregion

//#region Response Models
export interface ILayoutSettingResponseModel {
  DashboardEnabled: boolean;
  ReportEnabled: boolean;
  SidebarColor: string;
  Theme: EnumThemeColor;
  MenuStyle: EnumMenuStyle;
  ClientId: number;
  AppId: string;
  Id: string;
  LandingPageMenuId: string;
}
//#endregion

//#region View Models
export interface ILayoutSettingViewModel extends IAppClientMapperModel, ILayoutSettingResponseModel { }
//#endregion
