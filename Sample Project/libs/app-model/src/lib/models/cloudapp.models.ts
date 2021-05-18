export class CloudApp {
  Id: string;
  Name: string;
  Tagline: string;
  LanguageFileId: string;
  LogoUrl: string;
  TemplateId: string;
  ClientId: number;
  HasDesignPermission: boolean;
  IsClientAdminRole: boolean;
  LastAccessDate: string;
}
export class CloudAppRequestModel {
  constructor() {
    this.Request = new CloudApp();
  }
  ClientId: number;
  AppId: string;
  UserId: string;
  UserName: string;
  ClientPlatform: Number;
  ClientVersion: string;
  ClientAppConfigVersion: Number;
  Request: CloudApp;

}

//Need this Request class for calling Icon lib api
export class IconLibModel {
  QueryString: string;
  FilterQueryString: string;
  FieldList: string;
  StartRow: Number;
  TotalRows: Number;
  BoostQuery: string;
}

export class IconLibRequestModel {
  constructor() {
    this.Request = new IconLibModel();
  }
  ClientId: number;
  AppId: string;
  UserId: string;
  UserName: string;
  ClientPlatform: Number;
  ClientVersion: string;
  ClientAppConfigVersion: Number;
  Request: IconLibModel;
}

export class LanguageFile {
  FileId: string;
  FileName: string;
  Language: string;
}
export class IconLibarary {
  constructor() {
    this.Keywords = new Array<string>();
  }
  id: string;
  Category: number;
  Type: number;
  Keywords: string[];
  Url: string;
}

export class BaseModel {
  Id: string;
  CreatedBy: string;
  CreateDate: string;
  LastModifiedBy: string;
  LastModifiedDate: string;
}
export class CloudFile extends BaseModel {
  id: string;
  TemplateId: string;
  FileName: string;
  OriginalFileName: string;
  FileType: string;
  FileContent: string;
  FileExtension: string;
  FileSizeInKB: Number;
  OriginalURL: string;
  ThumbnailURL: string;
  Description: string;
  _version_: Number;
  LanguageCode: string;
  UserId: string;
}
export class FileResponse {
  Result: CloudFile;
  MessageType: Number;
  Success: boolean;
  Message: string;
}
