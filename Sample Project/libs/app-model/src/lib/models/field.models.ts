import CustomStore from 'devextreme/data/custom_store';

import {
  DataGridDataTypeEnum,
  DataGridHorizontalAlignmentEnum,
  EnumBarcodeFormat,
  EnumControlType,
  EnumDataType,
  GridFilterComparisonOperatorsEnum,
  IDataGridEditorOptions,
  IDisplayAndEditTemplateRendererInfo,
  IRoleViewModel,
} from '../..';
import { DefaultItems, DefaultSwitchItems } from './ui/ui.models';

//#region Request Models
//#endregion

//#region Response Models
export interface IFieldResponseModel {
  GridSequenceNumber: number;
  Name: string;
  Label: string;
  ControlType: EnumControlType;
  DataType: EnumDataType;
  DataFilterApplicable: boolean;
  DataFilterEnabled: boolean;
  GroupBoxDependsOnControlName: string;
  GroupBoxDependsOnControlValue: string;
  GroupBoxHasMandatoryOrIdentifiedByControl: string;
  ConditionEnabled: boolean;
  SequenceNumber: number;
  BarcodeFormat: EnumBarcodeFormat;
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
  ConstraintFormControlType: EnumControlType;
  ConstraintRadius: number;
  PublishStatus: boolean;
  LookupControlType: EnumControlType;
  LookupDataType: EnumDataType;
  LookupForm: string;
  LookupField: string;
  LookupReferenceData: string;
  IsUTCTime: boolean;
  IsPrePopulateUser: boolean;
  EnableDisplayPicture: boolean;
  EnableFaceDetection: boolean;
  AutoFillCurrentLocation: boolean;
  Value: string;
  DefaultValue: string;
  DefaultItems: object;
  ReferenceTypeId: string;
  ReferenceId: string;
  TargetDataFilterFieldName: string;
  ConditionKeyValue: string;
  HiddenInUI: string;
  SkipValuesInUI: string;
  DisabledInUI: string;
  Hint: string;
  SwitchOnText: string;
  SwitchOffText: string;
  SwitchOnDisplayText: string;
  SwitchOffDisplayText: string;
  ConstraintFormTitle?: string;
  ConstraintFormTypeId?: string;
  ConstraintFieldTitle?: string;
  ConstraintFieldValue?: string;
  FilterQuery?: string;
  SortConfiguration?: string;
  QueryConfiguration?: string;
  SortQuery?: string;
  MapUrl?: string;
  ReferenceField?: string;
  Icon?: string;
  Color?: string;
}
//#endregion

//#region View Models
// tslint:disable-next-line: no-empty-interface
export interface IFieldViewModel extends IFieldResponseModel {
  BrowseControlCustomStore: CustomStore;
  IsAsyncRenderEnabled?: boolean;
  GridDataType?: DataGridDataTypeEnum;
  GridDefaultValue?: any[];
  GridDefaultItems?: DefaultItems[];
  GridCellTemplateName?: string;
  GridEditTemplateName?: string;
  GridEditorOptions?: IDataGridEditorOptions;
  AllowGridView?: boolean;
  AllowGridEditing?: boolean;
  AllowGridSorting?: boolean;
  AllowGridFiltering?: boolean;
  AllowFilterBuilderFiltering?: boolean;
  FilterOperations?: GridFilterComparisonOperatorsEnum[];
  AllowGridSearch?: boolean;
  AllowGridGrouping?: boolean;
  GridColumnWidth?: number;
  GridHorizontalAlignment?: DataGridHorizontalAlignmentEnum;
  IsLookUpControl?: boolean;
  SortIndex?: number;
  SortOrder?: string;
  DisplayAndEditTemplateRendererInfo?: IDisplayAndEditTemplateRendererInfo;
  GridSwitchItems?: DefaultSwitchItems[];
  GridDefaultUserRoles?: IRoleViewModel[];
}
//#endregion

//Deafult Field Model
export class DefaultFieldModel implements IFieldViewModel {
  BrowseControlCustomStore: CustomStore;
  Name: string;
  Label: string;
  ControlType: EnumControlType;
  DataType: EnumDataType;

  GridSequenceNumber = 0;
  DataFilterApplicable = false;
  DataFilterEnabled = false;
  GroupBoxDependsOnControlName = '';
  GroupBoxDependsOnControlValue = '';
  GroupBoxHasMandatoryOrIdentifiedByControl = '';
  ConditionEnabled = false;
  SequenceNumber = 0;
  BarcodeFormat = EnumBarcodeFormat.All_1D;
  GridVisible = false;
  ColumnNumber = 0;
  GroupNumber = 0;
  DisplayNumber = 0;
  MaxTextLength = 0;
  Mandatory = false;
  UniqueField = false;
  AutofillCurrentTime = false;
  Latitude = 0;
  Longitude = 0;
  ConstraintFieldEnabled = false;
  ConstraintFormControlType = EnumControlType.TextBox;
  ConstraintRadius = 0;
  PublishStatus = false;
  LookupControlType: EnumControlType.TextBox;
  LookupDataType: EnumDataType.Json;
  LookupForm = '';
  LookupField = '';
  LookupReferenceData = '';
  IsUTCTime = false;
  IsPrePopulateUser = false;
  EnableDisplayPicture = false;
  EnableFaceDetection = false;
  AutoFillCurrentLocation = false;
  Value = '';
  DefaultValue = '';
  DefaultItems = {};
  ReferenceTypeId = '';
  ReferenceId = '';
  TargetDataFilterFieldName = '';
  ConditionKeyValue = '';
  HiddenInUI = '';
  SkipValuesInUI = '';
  DisabledInUI = '';
  Hint = '';
  SwitchOnText = '';
  SwitchOffText = '';
  SwitchOnDisplayText = '';
  SwitchOffDisplayText = '';

  constructor(name: string, label: string, controlType: EnumControlType, dataType: EnumDataType) {
    this.Name = name;
    this.Label = label;
    this.ControlType = controlType;
    this.DataType = dataType
  }
}
