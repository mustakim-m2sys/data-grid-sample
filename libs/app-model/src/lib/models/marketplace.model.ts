import { EnumBioimetricModality, EnumMarketPlaceFileType, EnumMPTemplateScreenShotPlatform, EnumMPTemplateScreenShotType, EnumMPTemplateStatus, EnumMPTemplateType } from '../constants/site.enums';

export interface IBaseModel {
    Id: string;
    CreatedBy: string;
    CreateDate: string;
    LastModifiedBy: string;
    LastModifiedDate: string;
}
export interface ITemplatePublishRequestModel {
    TemplateId: string;
    Version?: string;
    ReleaseNotes: string;
    SampleDataFormIds: Array<string>;
    PermanentDataFormIds: Array<string>;
    IsUpdate: boolean;
}
export interface ICloudFileResponseModel extends IBaseModel {
    id: string;
    MarketPlaceFileType: EnumMarketPlaceFileType;
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
    TemplateScreenShotType: EnumMPTemplateScreenShotType;
    TemplateScreenShotPlatform: EnumMPTemplateScreenShotPlatform;
    UserId: string;


}
export interface ILanguageModel {
    id: string;
    name: string;
    iSOCode: string;
    selected: boolean;
    disabled: boolean;
}
export interface ITemplateDetailViewModel {
    template: ITemplateModel
    localization: ILocalizationModel[];
    templateVersion: ITemplateVersionModel;
    screenShots: IScreenShotModel[];
}
export interface ITemplateModel {
    templateId: string;
    templateType: EnumMPTemplateType;
    bundleid: string;
    sellerId: number; //required
    primaryLanguageCode: string; //required
    website: string;
    supportUrl: string;
    email: string;
    phoneNo: string;
    copyright: string;
    privacyPolicyUrl: string;
    termsOfServiceUrl: string;
    ageRating: number;
    categoryId: number;
    subcategoryId: number;
    pricing: number;
    bannerUrl: string;
    iconUrl: string;
    status: EnumMPTemplateStatus;
    consentMarketing: string;
    consentContentGuidelines: string;
    consentTermsOfServices: string;
    keywords: string;
}

export interface ITemplateCategoryModel {
    Id: number;
    Name: string;
}

export interface ITemplateSubCategoryModel {
    Id: number;
    Name: string;
    TemplateCategoryId: number;
}

export interface Request {
    template: ITemplateModel;
    localization: ILocalizationModel;
    screenShot: IScreenShotModel[];
    templateVersion: ITemplateVersionModel;

}
export interface IDraftMarketPlaceConfigurationModel {
    user: ITemplateUserModel;
    seller: ISellerModel;
    template: ITemplateModel;
    localization: ILocalizationModel;
    screenShot: IScreenShotModel[];
    templateVersion: ITemplateVersionModel;
}

export interface IMarketPlaceConfigurationModel {
    user: ITemplateUserModel;
    seller: ISellerModel;
    template: ITemplateModel;
    localizations: ILocalizationModel[];
    screenShot: IScreenShotModel[];
    templateVersion: ITemplateVersionModel;
}

export interface ITemplateUserModel {
    id: string;
    name: string;
    profilePicture: string;
}
export interface ISellerModel {
    id: string;
    name: String;
    status: EnumMPTemplateStatus;
}

export interface IScreenShotModel {
    screenShotId: Number;
    templateScreenShotType: EnumMPTemplateScreenShotType;
    templateScreenShotPlatform: EnumMPTemplateScreenShotPlatform;
    url: string;
    languageCode: string
}
export interface ILocalizationModel {
    localizationId: Number;
    templateId: string;
    languageCode: string;
    title: string;
    subTitle: string;
    fullDescription: string;
    privacyPolicyUrl: string;
    promotionalText: string;
}

export interface ITemplateVersionModel {
    templateVersionId: Number;
    version: string;
    releaseNotes: string;
    formsCount: number;
    rolesCount: number;
    connectorsCount: number;
    sampleDataAvailable: boolean;
    biometricModality: EnumBioimetricModality;
    supportedLanguages: string;
    majorversion:number;
    minorversion:number;
    quickreleaseversion:number;
    issuefixversion:number;
}
export interface IAppSamplePermanentDataModel {
    Id: string;
    Title: string;
    IsSampleData: boolean;
    IsPermanentData: boolean;

}


// export interface FileResponse {
//     Result: ICloudFileResponseModel;
//     MessageType: Number;
//     Success: boolean;
//     Message: string;
// }


//   export interface IClientViewModel extends Omit<IClientResponseModel, "Apps"> {
//     Apps: IAppViewModel[];
//     HasValidSubscription: boolean;
//   }

