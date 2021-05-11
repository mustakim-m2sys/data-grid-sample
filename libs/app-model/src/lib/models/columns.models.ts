import { IFieldResponseModel, IFieldViewModel } from '../..';

//#region Response Models
export interface IColumnResponseModel {
    GridSequenceNumber: number;
    Name: string;
    ControlType: number;
    DataType: number;
    DataFilterApplicable: boolean;
    DataFilterEnabled: boolean;
    ConditionEnabled: boolean;
    SequenceNumber: number;
    BarcodeFormat: number;
    GridVisible: boolean;
    ColumnNumber: number;
    GroupNumber: number;
    DisplayNumber: number;
    MaxTextLength: number;
    Mandatory: boolean;
    UniqueField: boolean;
    AutofillCurrentTime: boolean;
    Latitude: number;
    Longitude: number;
    ConstraintFieldEnabled: boolean;
    ConstraintFormControlType: number;
    ConstraintRadius: number;
    PublishStatus: boolean;
    LookupControlType: number;
    LookupDataType: number;
    IsUTCTime: boolean;
    IsPrePopulateUser: boolean;
    EnableDisplayPicture: boolean;
    EnableFaceDetection: boolean;
    AutoFillCurrentLocation: boolean;
    Fields: IFieldResponseModel[];
}
//#endregion

//#region View Models
export interface IColumnViewModel extends IColumnResponseModel {
    Fields: IFieldViewModel[];
}
//#endregion


