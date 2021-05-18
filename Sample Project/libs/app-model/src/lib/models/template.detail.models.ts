//#region Request Models
//#endregion

//#region Response Models
export class TemplateDetailResponseModel {
    Website: string;
    SupportUrl: string;
    Copyright: string;
    PrivacyPolicyUrl: string;
    TermsOfServiceUrl: string;
    VideoUrl: string;
    TemplateScreenshots: TemplateScreenshot[];
    IsEditorsChoice: boolean;
    TemplateOverview: string;
    ReviewRatingSummery: ReviewRatingSummery;
    TemplateVersionDetails: TemplateVersionDetails;
    Reviews: ReviewResponseModel[];
    TemplateId: string;
    TemplateTitle: string;
    TemplateBannerUrl: string;
    TemplateIconUrl: string;
    TemplateSubTitle: string;
    SellerName: string;
    Pricing: number;
    TotalDownloads: number;
    Rating: number;
    NumberOfRatedUsers: number;
    IsFavorite: boolean;
    IsInstalled: boolean;
    HasUpdate: boolean;
  }
  
  export class TemplateVersionDetails {
    Version: string;
    ReleaseNotes: string;
    UploadedDate: string;
    FormsCount: number;
    RolesCount: number;
    ConnectorsCount: number;
    SampleDataAvailable: boolean;
    BiometricModality: BiometricModalityType;
    SupportedLanguages: string;
  }
  
  export class ReviewRatingSummery {
    OneStar: number;
    TwoStar: number;
    ThreeStar: number;
    FourStar: number;
    FiveStar: number;
    TotalRating: number;
    AverageRating: number;
  }
  
  export class ReviewResponseModel {
    ReviewId: number;
    UserName: string;
    Rating: number;
    Message: string;
    ReviewDate: string;
    TemplateId: string;
    ReviewReply: ReviewReply;
  }
  
  export class ReviewReply {
    SellerReplyMessage: string;
    SellerReplyCreatedDate: string;
  }
  
  export class TemplateScreenshot {
    ScreenShotId: number;
    ScreenShotType: TemplateScreenShotType;
    ScreenShotPlatform: number;
    ScreenShotUrl: string;
  }
  
  export enum TemplateScreenShotType {
    VIDEO = 1,
    IMAGE = 2
  }
  
  export enum BiometricModalityType {
    FACE = 1,
    FINGERPRINT = 2,
    IRIS = 3
  }
  
  //#endregion
  
  //#region View Models
  export class TemplateDetailViewModel extends TemplateDetailResponseModel { }
  
  export class ReviewViewModel extends ReviewResponseModel { }
  
  export class TemplateSlideshowViewModel {
    image?: string;
    thumbImage?: string;
    alt?: string;
    video?: string;
  }
  //#endregion
  