import { GridBaseEvent } from "./data.grid.models";


// #region serach push
export interface INotificationRequestModel {
  UserId: string,
  UserName: string,
  ClientPlatform: number,
  ClientVersion: string
  DeviceSessionId: string,
  Request: INotificationRequestPropertyModel
}

export interface INotificationRequestPropertyModel {
  AdditionalInfo: {},
  TotalRows: number,
  Query: string,
  StartRow: number
}

export interface INotificationResponseModel {
  Message: string,
  MessageType: number,
  ResponseCode: number,
  Result: {
    PushNotifications: INotificationItemResponseModel[],
    Count: number
  },
  Success: true
}

export interface INotificationItemResponseModel {
  Body: string,
  ClientId: number
  CreatedOn: Date
  DisplayText: string
  Id: string
  Status: number
  Type: number
  UpdatedOn: Date
  UserId: string
}

export interface INotificationViewModel {
  AppId?: string,
  Body: string,
  ClientId: number
  CreatedOn: string
  DisplayText: string
  Id: string
  Status: number
  Type: number
  UpdatedOn: string
  UserId: string
}

//#endregion

// #region update notification status
export interface INotificationUpdateStatusRequestModel {
  UserId: string,
  UserName: string,
  ClientPlatform: number,
  ClientVersion: string
  Request: INotificationUpdateStatusRequestPropertyModel
}

export interface INotificationUpdateStatusRequestPropertyModel {
  NotificationIds: string[],
  NotificationStatus: number
}

export interface INotificationUpdateStatusResponseModel {

}

//#endregion

export class GridNotificationFetchEventModel extends GridBaseEvent {
  Notifications: INotificationViewModel[]
}


export class NotificationTabPanelItem {
  IconUrl: string;
  Title: string;
  Count?: number;
}


export class NotificationFetchModel {
  TotalRows: number;
  StartRow: number;
}