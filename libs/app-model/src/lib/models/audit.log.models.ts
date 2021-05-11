import { EnumActivity, EnumClientPlatform } from '../constants/site.enums';

export class AuditLog {
  LogTime: Date;
  AppId: string;
  IPAddress: string;
  ModuleId: string;
  ModuleName: string;
  EntityId: string;
  RefId: string;
  Description: string;
  ActivityType: EnumActivity;
  OldValue: string;
  NewValue: string;
  AffectedFieldName: string;
  AffectedFieldLabel: string;
  DisplayName: string;
  UserId: string;
  UserName: string;

  //ParentEntityInfo
  ParentId: string;
  ParentTypeId: string;
  ParentDisplayName: string;

  RefTypeId: string;
  RefTypeTitle: string;
  ClientId: number;

  //TrackingClientPlatformInfo
  OriginClient: EnumClientPlatform;
  OriginClientVersion: string;

  RelatedRecordsDetails: RelatedEntity[];

  // For Template Design
  LogDateString: string;
  LogTimeString: string;
  ActivityTypeIcon: string;
  LogMessage: string;
  ClientPlatform: string;
}

export class RelatedEntity {
  Id: string;
  DisplayName: string;
  TypeId: string;
  ParentId: string;
  ParentDisplayName: string;
  ParentTypeId: string;
}
