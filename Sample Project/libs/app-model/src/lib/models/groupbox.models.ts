import { IColumnResponseModel, IColumnViewModel } from '../..';

//#region Response Models
export interface IGroupBoxResponseModel {
    GridSequenceNumber: number;
    Name: string;
    Label: string;
    ControlType: number;
    DataType: number;
    DataFilterApplicable: boolean;
    DataFilterEnabled: boolean;
    GroupBoxDependsOnControlName: string;
    GroupBoxDependsOnControlValue: string;
    GroupBoxHasMandatoryOrIdentifiedByControl: string;
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
    Columns: IColumnResponseModel[];
}
//#endregion

//#region View Models
export interface IGroupBoxViewModel extends IGroupBoxResponseModel {
    Columns: IColumnViewModel[];
    IsHidden: boolean;
    IsAllControlsHidden: boolean;
}
//#endregion
