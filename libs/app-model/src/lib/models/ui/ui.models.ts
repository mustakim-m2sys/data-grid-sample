import { EnumControlType, EnumDataType, EnumBarcodeFormat } from '../../constants/site.enums';
import { IFieldResponseModel, IFieldViewModel } from '../field.models';
import {
  DataGridDataTypeEnum,
  IRecordViewModel,
  DataGridHorizontalAlignmentEnum,
  IDataGridEditorOptions
} from '@CloudApperClients/app-model';

export class Column {
  public Name: String;
  public ColHiddenInUI: String;
  public ColumnNumber: Number;
  public Label: String;
  public Controls = new Array<IFieldResponseModel>();
  public IsDeleteable: Boolean;
  constructor(name: String, columnNumber: Number, label: String) {
    this.Name = name;
    this.ColumnNumber = columnNumber;
    this.Label = label;
    this.IsDeleteable = true;
  }
}

export class ComboBoxChoice {
  public Choice: String;
  public IsSelected: Boolean;

  constructor(choice: String) {
    this.Choice = choice;
  }
}

export class GroupBox {
  public Name: String;
  public GrbHiddenInUI: String;
  public GroupNumber: number;
  public Label: String;
  public Columns = new Array<Column>();
  public ControlType: EnumControlType;
  public IsDeleteable: boolean;
  public ConditionEnabled: boolean;
  public ConditionEnabledControlName: string;
  public DataFilterApplicable: boolean;

  public GroupBoxDependsOnControlName: string;
  public GroupBoxDependsOnControlValue: string;
  public GroupBoxHasMandatoryOrIdentifiedByControl: boolean;

  constructor(name: String, groupNumber: number, label: String) {
    this.Name = name;
    this.GroupNumber = groupNumber;
    this.Label = label;
    this.Columns = [new Column('Column0', 1, 'Column 0')];
    this.ControlType = EnumControlType.GroupBox;
    this.IsDeleteable = true;
    this.ConditionEnabledControlName = '';
    this.DataFilterApplicable = false;

    this.GroupBoxDependsOnControlName = '';
    this.GroupBoxDependsOnControlValue = '';
    this.GroupBoxHasMandatoryOrIdentifiedByControl = false;
  }
}

export class ConditionalKeyValue {
  constructor() {
    this.Value = '';
    this.GroupBoxes = [];
  }

  public Value: string;
  public GroupBoxes: GroupBox[];
  public SelectedGroupBoxName: string;
}

export class MultiComboBoxChoice {
  public MultiSelectData: Array<any>;
  public MultiSelectValue: string[];
  public MultiSelectCurrent: any;
  public IsMustiSelected: Boolean;

  constructor() {
    this.MultiSelectData = new Array<any>();
    this.MultiSelectValue = [];
    this.MultiSelectCurrent = '';
    this.IsMustiSelected = false;
  }
}

export class ControlConfiugrationModel implements IFieldViewModel {
  BrowseControlCustomStore: any;
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
  FilterQuery: string;
  SortConfiguration: string;
  QueryConfiguration: string;
  SortQuery: string;
  GridDataType: DataGridDataTypeEnum;
  FormulaEquation: string;
  GridDefaultValue?: string[];
  GridDefaultItems?: DefaultItems[];
  GridCellTemplateName?: string;
  GridEditTemplateName?: string;
  GridEditorOptions?: IDataGridEditorOptions;
  AllowGridEditing?: boolean;
  AllowGridSorting?: boolean;
  AllowGridFiltering?: boolean;
  AllowFilterBuilderFiltering?: boolean;
  AllowGridSearch?: boolean;
  AllowGridGrouping?: boolean;
  GridColumnWidth?: number;
  GridHorizontalAlignment?: DataGridHorizontalAlignmentEnum;
  IsLookUpControl?: boolean;
  constructor(Label: string, ControlType: EnumControlType) {
    this.Label = Label;
    this.ControlType = ControlType;
  }
  ReferenceId: string;
  ConstraintFormTitle?: string;
  ConstraintFormTypeId?: string;
  ConstraintFieldTitle?: string;
  ConstraintFieldValue?: string;
}

export class EntityBrowsedData {
  public referenceTypeId: string;
  public recordId: string;
  public record: IRecordViewModel;
  public displayName: string;
  public referenceData: string;
}

export class FormulaData {
  public Fields: any;
}

export class DefaultItems {
  Name: string;
  Value: string;

  constructor(name: string, value: string) {
    this.Name = name;
    this.Value = value;
  }
}

export class DefaultSwitchItems {
  Name: string;
  Value: boolean;

  constructor(name: string, value: boolean) {
    this.Name = name;
    this.Value = value;
  }
}