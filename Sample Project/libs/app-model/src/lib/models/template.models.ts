
//#region Request Models
//#endregion

import { TemplateCategoryType } from '../constants/site.constants';
import { PaginationInfo } from './site.models';

//#region Response Models
export class TemplateGroupResponseModel {
    GroupId: string;
    GroupName: string;
    Templates?: (TemplateViewModel | string)[];
}

export class TemplateResponseModel {
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
    HasUpdate: boolean
}

export class TemplateVersionInformation{
    Id: number;
    UploadedDate: Date;
    TemplateId: string;
    VersionCode: string;
    FormsCount: number;
    RolesCount: number;
    ConnectorsCount: number;
    SampleDataAvailable: boolean;
    BiometricModality: number;
    ApprovalStatus: number;
    ReleaseNotes:string;
}

export class TemplateInstallParameter{
    templateId:string;
    templateVersion:string;
    action : string;
    isupdate:boolean;
    appId : string;
}

export class TemplateCategoryResponseModel {
    TemplateCategoryId: string;
    TemplateCategoryName: string;
    TemplateSubCategories?: (TemplateSubcategoryResponseModel | TemplateCategoryResponseModel | string)[];
}

export class TemplateSubcategoryResponseModel {
    SubcategoryId: string;
    SubcategoryName: string;
}

export class TemplateSearchResultResponseModel {
    TemplateId: string;
    TemplateTitle: string;
}

//#endregion

//#region View Models
export class TemplateGroupViewModel extends TemplateGroupResponseModel {
    IsMoreTemplatesFetched?: boolean;
}

export class TemplateViewModel extends TemplateResponseModel {

}

export class TemplateCategoryViewModel extends TemplateCategoryResponseModel {
    TemplateSubCategoryId?: string; //server provided id for subcategory
    TemplateCategoryType?: TemplateCategoryType;
    Templates?: (TemplateViewModel | string)[];
    PaginationInfo?: PaginationInfo;
}

export class TemplateSubcategoryViewModel extends TemplateSubcategoryResponseModel {
}

export class TemplateSearchResultViewModel extends TemplateSearchResultResponseModel {
}


//#endregion