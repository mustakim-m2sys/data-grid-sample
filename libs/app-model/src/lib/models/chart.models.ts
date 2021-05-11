import { IDataForChartSettingViewModel } from '@CloudApperClients/app-model';

//#region imported models from design app
export interface IChartData extends IDataForChartSettingViewModel {
    datasource: any;
}

export class SeriesPointData {
    Key: string;
    Value: Number;
    //for multi view xml
    Name: string;
    ArgumentField: string;;
}

export class BarChartData {
    Name: string;
    ArgumentField: string;
    ValueField: string;
    SeriesCollections: SeriesPointData[];

    constructor() {
        this.SeriesCollections = [];
    }
}

export class GaugeChartData {

    public Value: any;
    public StartRangeValue: Number;
    public EndRangeValue: Number;
    public FirstStartRangeValue: Number;
    public FirstEndRangeValue: Number;

    public SecondStartRangeValue: Number;
    public SecondEndRangeValue: Number;

    public ThirdStartRangeValue: Number;
    public ThirdEndRangeValue: Number;
}
//#endregion