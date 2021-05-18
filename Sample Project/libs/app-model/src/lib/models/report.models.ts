//#region Response Models

import { EnumClientPlatform, EnumControlType, EnumDataType, ReportAppViewModel } from "@CloudApperClients/app-model";

export interface IReportDataResponseModel {
        ClientId: any;
        AppId: string;
        ReportId: string;
        Name: string;
        LayoutContent: string;
        EntityTypeId: string;
        ReportType: EnumReportType;
        Title?: any;
        DisplayOrder: number;
        Description?: any;
        IsActive: boolean;
        IsDefault: boolean;
        ServiceUrl?: any;
        CreateDate: Date;
        LastModifyBy?: any;
        LastModifyDate: Date;
        CreatedBy?: any;
        ReportParameters : IReportParameter[];
        ReportScope : EnumReportScope

}

export interface IReportViewModel extends Omit<IReportDataResponseModel, "LayoutContent" | "_version_"> {
    ReportAppsWithSchemas :  Array<ReportAppViewModel>;
}

export enum EnumReportType {
    APP_CUSTOM_REPORT, APP_ENTITY_REPORT, CLIENT_CONSOLE_REPORT, APP_DEFAULT_REPORT

}
export interface IReportUiState
{
    IsViewingReportList : boolean;
    IsEditingReport : boolean;
    IsViewingReport : boolean;
    CurrentReportCount : number;
    CurrentReportScope : EnumReportScope;
    EditingType : EnumReportEditingType;
    IsReportInformationChanging : boolean;
}

export enum EnumReportEditingType {
    EDIT_EXISTING, CREATING_NEW , NONE
}


export class DefaultReportUiState implements IReportUiState
{
    IsViewingReportList: boolean;
    IsEditingReport: boolean;
    IsViewingReport: boolean;
    CurrentReportCount: number;
    CurrentReportScope: EnumReportScope;
    EditingType: EnumReportEditingType;
    IsReportInformationChanging: boolean;

    /**
     *
     */
    constructor() {
        this.IsEditingReport = false;
        this.IsViewingReport = false;
        this.IsViewingReportList = false;
        this.CurrentReportCount = 0;
        this.CurrentReportScope   = EnumReportScope.APP;  
        this.EditingType = EnumReportEditingType.NONE;
    }
    
}

export enum EnumReportScope {
    CONSOLE , APP , ENTITY_TYPE
}



export class DefaultReportViewModel implements IReportViewModel{
    

    /**
     *
     */
    constructor() {
        
    }
    ReportScope: EnumReportScope;
    ReportAppsWithSchemas: ReportAppViewModel[];
    ClientId: any;
    AppId: string;
    ReportId: string;
    Name: string;
    EntityTypeId: string;
    ReportType: EnumReportType;
    Title?: any;
    DisplayOrder: number;
    Description?: any;
    IsActive: boolean;
    IsDefault: boolean;
    ServiceUrl?: any;
    CreateDate: Date;
    LastModifyBy?: any;
    LastModifyDate: Date;
    CreatedBy?: any;
    ReportParameters : IReportParameter[];
}




export interface IReportParameter{
    ReportParameterId : string;
    ReportId :string;
    ParameterKey :string;
    ParameterName :string;
    ControlType: EnumControlType;
    DataType : EnumDataType;
    IsVisible : boolean;
}

export class DefaultReportParameter implements  IReportParameter
{
    ReportParameterId: string;
    ReportId: string;
    ParameterKey: string;
    ParameterName: string;
    ControlType: EnumControlType;
    DataType: EnumDataType;
    IsVisible: boolean;
    
}



export class ReportHeaderInformation{
    ClientId : number;
    AppId : string;
    Description : string;
    CreatedBy: string;
    CreateDate: string;
    LastModifiedBy: string;
    LastModifiedDate: string;
    ClientPlatform: EnumClientPlatform;
    ClientVersion: string;
    UserId: string;
    UserName: string;
    ReportAppsWithSchemas :  Array<ReportAppViewModel>;
    ReportScope : EnumReportScope;
    ReportId: string;
    EnityTypeId:string;
    ReportName : string;

}


//#endregion