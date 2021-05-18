import { IAppClientMapperModel, IClientResponseModel, IClientViewModel } from '../..';
import { IRoleViewModel } from './role.models';


//#region Request Models
//#endregion

//#region Response Models
export interface IUserInfoResponseModel {
  Id: string;
  Name: string;
  Email: string;
  ProfilePicData: string;
  IsDefaultUser: boolean;
  IsSignupUser: boolean;
  CreateDate: string;
  LastModifiedDate: string;
  Clients: IClientResponseModel[];
}

export interface IRoutingDetailResponseModel {
  userId: string;
  regionCode: string;
  regionName: string;
  zoneCode: string;
  zoneName: string;
  routingUrls: Record<string, string>;
}

export interface IUserInfoFromIdServerResponseModel {
  current_language: string;
  family_name: string;
  given_name: string;
  name: string;
  phone_number: string;
  preferred_username: string;
  sub: string;
  capitalized_name_icon: string;
  profile_picture_url: string;
}
//#endregion

//#region View Models
export interface IUserInfoViewModel extends IAppClientMapperModel, Omit<IUserInfoResponseModel, "Clients"> {
  IsProfileComplete: boolean;
  IsNewTokenReceived: boolean;
  IsValidSubscription: boolean;
  ActiveClient: IClientViewModel;
  Clients: IClientViewModel[];
  TemplateReferenceId?: string,
  SignupStatusForTemplateUser?: boolean;
  IsSignupForbiddenForTemplateUser?: boolean;
  ReferalCodeForTemplate?: string;
  FetchUpdatedUserInfo: boolean;
  FetchingUpdatedUserAndAppInfo: boolean;
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  CapitalizedNameIcon: string;
  CurrentLanguage: string;
  RoutingDetailForUser: IRoutingDetailViewModel;
  UserDetailsFetchDateTime: Date;
  Latitude: number;
  Longitude: number;
}

export interface IAppUserViewModel extends IAppClientMapperModel, Omit<IUserInfoResponseModel, "Clients"> {
  RoleId: string;
  TimeZoneId: string;
  CreatedBy: string;
  LastModifiedBy: string;
}

// tslint:disable-next-line: no-empty-interface
export interface IRoutingDetailViewModel extends IRoutingDetailResponseModel {

}
//#endregion

//#region Classes
export class DefaultAppUserModel implements IAppUserViewModel {
  Id: string;
  AppId: string;
  ClientId: number;
  RoleId: string;
  Name: string;
  Email: string;
  ProfilePicData: string;
  IsDefaultUser: boolean;
  IsSignupUser: boolean;
  CreateDate: string;
  LastModifiedDate: string;
  TimeZoneId: string;
  CreatedBy: string;
  LastModifiedBy: string;
}
//#endregion