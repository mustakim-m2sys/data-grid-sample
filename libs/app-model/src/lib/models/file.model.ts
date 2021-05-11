import { EnumCloudApperFileType, EnumSharingLevel } from '../constants/site.enums';
//#region Request Models
//#endregion

import { EnumSchemaType } from '../constants/site.enums';

//#region Response Models
export interface IFileResponseModel {
  id: string;
  Type: EnumSchemaType;
  CloudApperFileType: EnumCloudApperFileType;
  AppId: string;
  ClientId: number;
  FileName: string;
  FileType: string;
  FileExtension: string;
  FileSizeInKB: number;
  OriginalURL: string;
  ThumbnailURL: string;
  SharingLevel: EnumSharingLevel;
  CategoryId: string;
  _version_: number;
  CreatedBy: string;
  CreateDate: Date;
  LastModifiedDate: Date;
}
//#endregion

//#region View Models
export interface IFileViewModel extends Omit<IFileResponseModel, '_version_'> {}
//#endregion
