import { HashMap, TranslateParams } from '@ngneat/transloco';
import { AppConfig } from 'CloudApperClient/src/app.config';

import { EnumClientPlatform, EnumMessageType, EnumThemeColor, InlineMinLoaderOperationType } from '../..';
import { IUserInfoViewModel } from './user.models';

export class GenericDataServiceResponse<T = any> {
  Success: boolean;
  ResponseCode: number;
  MessageType: EnumMessageType;
  Message: string;
  Result: T | GenericDataServiceResult<T> | GenericDataServiceResults<T>;
}

export class GenericDataServiceResponseForAccountServerApi<T> {
  success: boolean;
  responseCode: number;
  message: string;
  result: T;
}

export class GenericDataServiceResult<T> {
  Item: T;
}

export class GenericDataServiceResults<T> {
  Count: number;
  Items: T;
}

export class GenericDataServiceRequest<T> {
  ClientId: number;
  AppId: string;
  UserId?: string;
  UserName?: string;
  ClientPlatform?: EnumClientPlatform;
  ClientVersion?: string;
  ClientAppConfigVersion?: number;
  Request?: T;
  constructor(model: Partial<GenericDataServiceRequest<T>>) {
    this.ClientId = model.ClientId;
    this.AppId = model.AppId;
    if (model.UserId) this.UserId = model.UserId;
    if (model.UserName) this.UserName = model.UserName;
    if (model.ClientPlatform) this.ClientPlatform = model.ClientPlatform;
    if (model.ClientVersion) this.ClientVersion = model.ClientVersion;
    if (model.ClientAppConfigVersion) this.ClientAppConfigVersion = model.ClientAppConfigVersion;
    if (model.Request) this.Request = model.Request;
  }
}

export class DataServiceRequest<T> {
  AppId?: string;
  ClientId?: number;
  UserId?: string;
  UserName?: string;
  ClientPlatform?: EnumClientPlatform;
  ClientVersion?: string;
  ClientAppConfigVersion?: number;
  Request?: T;
  constructor(appId?: string, clientId?: number, user?: IUserInfoViewModel, request?: T) {
    if (appId) this.AppId = appId;
    if (clientId) this.ClientId = clientId;
    if (user && user.Id) this.UserId = user.Id;
    if (user && user.Name) this.UserName = user.Name;
    if (request) this.Request = request;
    //setting default properties
    this.ClientPlatform = EnumClientPlatform.Web;
    this.ClientVersion = AppConfig.settings.version ? AppConfig.settings.version : '1.0.0';
    this.ClientAppConfigVersion = 0;
  }
}

export class ServiceResponse<InType = any, OutType = any> {
  public IsSuccess: boolean;
  public Message?: string;
  public Code?: number | string;
  public Count?: number;
  public Data?: OutType;
  public RawData?: InType;
  public ChildItemsCount?: any;
  public User?: any;

  //mapping data service response to service response
  constructor(response: GenericDataServiceResponse<InType>, manualMappingRequired?: boolean) {
    this.IsSuccess = response.Success ? response.Success : false;
    this.Message = response.Message ? response.Message : '';
    this.Code = response.ResponseCode ? response.ResponseCode : 0;
    if (response.Result) {
      //flatten GenericDataServiceResults
      //if manual mapping is required then put data service result in raw data for later type casting
      if ((<any>response.Result).Item) {
        const result = <GenericDataServiceResult<InType>>response.Result;
        if (manualMappingRequired) {
          this.RawData = result.Item ? result.Item : <InType>{};
        } else {
          this.Data = result.Item ? <OutType><any>result.Item : <OutType>{};
        }
        //Child Item Count
        if ((<any>response.Result).ChildItemsCount) {
          this.ChildItemsCount = (<any>response.Result).ChildItemsCount;
        }
        //Default User
        if ((<any>response.Result).User) {
          this.User = (<any>response.Result).User;
        }
      } else if ((<any>response.Result).Items) {
        const result = <GenericDataServiceResults<InType>>response.Result;
        if (manualMappingRequired) {
          this.RawData = result.Items ? result.Items : <InType>{};
        } else {
          this.Data = result.Items ? <OutType><any>result.Items : <OutType>{};
        }
        this.Count = result.Count ? result.Count : 0;
      } else {
        if (manualMappingRequired) {
          this.RawData = <InType><any>response.Result;
        } else {
          this.Data = <OutType><any>response.Result;
        }
        //Child Item Count
        if ((<any>response.Result).ChildItemsCount) {
          this.ChildItemsCount = (<any>response.Result).ChildItemsCount;
        }
        //Default User
        if ((<any>response.Result).User) {
          this.User = (<any>response.Result).User;
        }
      }
    }
  }
}

export class QueryParams {
  ParamName: string;
  ParamValue: any;

  constructor(paramName, paramValue) {
    this.ParamName = paramName ? paramName : '';
    this.ParamValue = paramValue ? paramValue : '';
  }
}

export class PaginationInfo {
  CurrentPage: number;
  CachedPages: number;
  TotalPages?: number;
  TotalItems?: number;
  HasNoMoreItem?: boolean;

  constructor() {
    this.CurrentPage = 0;
    this.CachedPages = 0;
    this.TotalPages = 0;
    this.TotalItems = 0;
    this.HasNoMoreItem = false;
  }
}

export class OAuthClaims {
  at_hash: string;
  aud: string;
  auth_time: number;
  exp: number;
  iat: number;
  idp: string;
  iss: string;
  name: string;
  nbf: number;
  nonce: string;
  preferred_username: string;
  sid: string;
  sub: string;
  amr: string[];
  user_templaterefid?: string;
  current_language?: string;
}

export class OAuthLoginRedirectParams {
  access_token: string;
  expires_in: string;
  id_token: string;
  scope: string;
  session_state: string;
  state: string;
  token_type: string;
}

export interface IAppTheme {
  themeName: string;
  themeColor: EnumThemeColor;
  themePrimaryColorCode: string;
  themeSecondaryColorCode: string;
  themeTartiaryColorCode: string;
  themeTextColorForMenu: string;
}

export interface IGlobalAlertLoaderParams {
  messagekey: TranslateParams;
  translationOptions?: HashMap;
  currentlang?: string;
  isFromSidebar?: boolean;
}

export interface IGlobalAlertParams extends IGlobalAlertLoaderParams {
  timeOutDurationInMs?: number;
}

export interface IInlineMinLoaderConfig {
  showLoader: boolean;
  operationType: InlineMinLoaderOperationType;
}