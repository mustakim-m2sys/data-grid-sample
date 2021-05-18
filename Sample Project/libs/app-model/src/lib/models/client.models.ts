import { EnumSubscriptionStatus, IAppResponseModel, IAppViewModel, IRoutingDetailViewModel } from '../..';

//#region Request Models
export interface IClientCreateModel {
  Id: number;
  Name: string;
  ClientLogo: string;
  ContactNo: string;
  Website: string;
  PrimaryContactPerson: string;
  PrimaryContactEmail: string;
  PrimaryContactNumber: string;
  AddressLine1: string;
  AddressLine: string;
  City: string;
  State: string;
  Zip: string;
  Country: string;

  // constructor(name: string, contactNo: string) {
  //   this.Name = name;
  //   this.ContactNo = contactNo;
  // }
}
//#endregion

//#region Response Models
export interface IClientResponseModel {
  Id: number;
  Name: string;
  ClientLogo: string;
  ClientEmail: string;
  HasAppCreatePrivilege: boolean;
  HasTemplateCreatePrivilige: boolean;
  Apps: IAppResponseModel[];
  Subscription: ISubscriptionViewModel;
  //console report previledge field added to enable console report for specific client
  HasConsoleReportCreatePrivilige: boolean
}
//#endregion

//#region View Models
export interface IClientViewModel extends Omit<IClientResponseModel, "Apps"> {
  Apps: IAppViewModel[];
  HasValidSubscription: boolean;
  IsSignupUserForClient: boolean;
  RoutingDetailForClient: IRoutingDetailViewModel;
}
//#endregion

//#region clientSubscriptionInfo
export interface ISubscriptionResponseModel {
  CustomerId: string;
  PricePlanId: string;
  Status: EnumSubscriptionStatus;
  TrialStart: Date;
  TrialEnd: Date;
  AllowedUserCount: number;
  SubscriptionId: string;
}

// tslint:disable-next-line: no-empty-interface
export interface ISubscriptionViewModel extends ISubscriptionResponseModel {
}
//#endregion