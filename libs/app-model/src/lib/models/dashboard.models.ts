
import { CompactType, DisplayGrid, GridsterConfig, GridsterItem, GridsterItemComponentInterface, GridType } from 'angular-gridster2';
import { EnumChartType } from '@CloudApperClients/app-model';
//#region Request Models
export interface IDataForChartSettingRequestModel {
    SettingsId: string;
    ForDashBoard: boolean;
    AppId: string;
    ClientId: number;
    UserId: string;
    UserAssociatedEntityTypeId: string;
    UserAssociatedEntityId: string;
    DataFilterQueries: DataFilterQuery[];
}
//#endregion

//#region Response Models
export interface IChartSettingResponseModel {
    Id: string;
    SequenceNo: number;
    Title: string;
    DefinitionXML: string;
    IsActive: boolean;
    ApplyCurrentUserFilter: boolean;
    ChartType: EnumChartType;
    SourceId: string;
    CategoryFieldName: string;
    ValueFieldName: string;
    GroupFieldName: string;
    CategoryFieldValue: string;
    SourceParentId: string;
    IsCustom: boolean;
    ForDashboard: boolean;
    ForReport: boolean;
    StatTypeValue: number;
    LayoutConfiguration: IChartLayoutConfigurationResponseModel;
}

export interface IChartLayoutConfigurationResponseModel {
    StartColumn: number;
    StartRow: number;
    ColumnSpan: number;
    RowSpan: number;
}

export interface IDataForChartSettingResponseModel {
    ChartName: string;
    ChartType: number;
    IsAxisXNavigationEnabled: boolean;
    X_Label: string;
    Y_Label: string;
    StatTypeValue: number;
    Model: number;
    MaxScale: number;
    ListOfSeriesData: ListOfSeriesDatum[];
    IsFacetResponse: boolean;
    liOfChartColumns: LiOfChartColumn[];
    liOfChartData: LiOfChartDatum[];
    liOfMapData: LiOfMapDatum[];
}
//#endregion

//#region View Models
export interface IChartSettingViewModel extends IChartSettingResponseModel {
    AppId: string,
    ClientId: number,
    LayoutConfiguration: IChartLayoutConfigurationViewModel;
}

export interface IChartSettingForGridster extends GridsterItem, IChartSettingResponseModel {
    x: number; //StartColumn
    y: number; //StartRow
    cols: number;//ColumnSpan
    rows: number; //RowSpan
}

export interface IGridsterItemComponent extends GridsterItem, IChartSettingResponseModel {
    id: string;
    height: number;
    width: number;
}



// tslint:disable-next-line: no-empty-interface
export interface IChartLayoutConfigurationViewModel extends IChartLayoutConfigurationResponseModel {
    Id: string;
}

// tslint:disable-next-line: no-empty-interface
export interface IDataForChartSettingViewModel extends IDataForChartSettingResponseModel {
    ChartData?: any;
    IsSingleSeries: boolean;
}

export interface IChartDataViewModel {
    Id: string;
    DataForChartSetting?: IDataForChartSettingViewModel;
}
//#endregion

//#region helper interfaces

export interface DataFilterQuery {
    Type: number;
    SourceId: string;
    ApplicableQuery: string;
}

export interface LiOfMapDatum {
    ReferenceType: number;
    ReferenceTypeId: string;
    ReferenceId: string;
    Title: string;
    //TODO : INSPECT START
    DetailLine1Label: string;
    DetailLine1Value: string;
    DetailLine2Label: string;
    DetailLine2Value: string;
    DetailLine3Label: string;
    DetailLine3Value: string;
    //TODO : INSPECT END
    Address: string;
    Longitude: number;
    Latitude: number;
    DefaultMarker: string;
}

export interface LiOfChartDatum {
    FieldName: string;
    FieldValue: string;
    FieldCount: number;
    FieldValueType: number;
}

export interface LiOfChartColumn {
    ColumnName: string;
    ColumnCaption: string;
    Area: number;
    GroupIntervalType: number;
    isDataTypeSet: boolean;
    ColumnDataType: number;
    IsVisible: boolean;
}

export interface ListOfSeriesDatum {
    SeriesName: string;
    SeriesPoints: Record<string, any>;
    ListOfSeriesData: ListOfSeriesDatum[];
    SeriesPointValues: SeriesPointValue[];
}

export interface SeriesPointValue {
    Key: string;
    Value: number;
}
//#endregion

//#region all constants of dashboard
export abstract class DashboardConstant {
    static readonly ON_BOARD_DASHBOARD_ID = "onBoardDashboardId";
}
//#endregion
