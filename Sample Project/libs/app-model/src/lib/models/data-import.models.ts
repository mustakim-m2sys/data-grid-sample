import { EnumDataImportOptions } from "@CloudApperClients/app-model";
import * as moment from "moment";


export class DataImportModel {
  EntityTypeId: string;
  UploadedFileUrl: string;
  NameOfTheWorksheet: string;
  ImportOption: EnumDataImportOptions;
  KeyField?: string;
  UpdateEmptyValue?: boolean;
  IsChildEntity: boolean;
  ParentTypeId?: string;
  HeaderColumnRowNumber: number;
  MappedFields: MappedField[];
}


export class MappedField {
  index?: number;
  SourceField: string;
  TargetField: string;
  FormField?: string;
  IsUnique?: boolean;
  IsParent: boolean;
  DateFormats: string[];
  ParentTypeId?: string;
  IsMandatory: boolean;
  DataType: number;
  ControlType: number;
  IsFormControl: boolean;
  TargetFieldTypeId: string;
  DefaultValue?: any;
  SwitchOffText?: string;
  SwitchOnText?: string;
}

export class IDataResponseModel {
  // should be implement here
}
export interface IImportOption {
  Id: number;
  Name: string;
}

export interface IMappedIndex {
  Id: number;
  Type: string;
}

export interface ISchemaField {
  Name: string;
  Label: string;
  Category: string;
  DataType?: number;
  ControlType?: number;
  DataTypeName?: string;
  ControlTypeName?: string;
  InitControlType?: number;
  Mandatory: boolean;
  SwitchOnText?: string,
  SwitchOffText?: string,
  Options?: string
}

export interface IImportStep {
  id: number;
  name: string;
}

export interface IUploadedFile {
  ext?: string;
  lastModified: number;
  lastModifiedDate?: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath?: string;
  File?: ArrayBuffer;
}

export interface IMapColumn {
  Label: string;
  IsMapped: boolean;
  IsVisible: boolean;
}

export interface IDateForDataImport {
  Name: string[];
  ID: number
}

export const MessageList = [
  {
    Type: 1, Title: 'DATA_IMPORT_WHAT_WE_SUPPORT', Description: [
      'DATA_IMPORT_ACCEPTED_FILE_FORMAT',
      'DATA_IMPORT_ACCEPTED_MAX_RECORDS'
    ]
  },
  {
    Type: 2, Title: 'DATA_IMPORT_WHAT_WE_DONT_SUPPORT', Description: [
      'DATA_IMPORT_REJECTED_FIELDS',
      'DATA_IMPORT_REJECTED_MERGE_ROWS',
      'DATA_IMPORT_REJECTED_FORMULA',
      'DATA_IMPORT_REJECTED_CUSTOM_COLUMN'
    ]
  },
]


export const DateFormatList = [
  // Date
  // first Date, then month
  { ID: 0, Name: ['dd-MM-yyyy', 'dd-M-yyyy', 'd-MM-yyyy', 'd-M-yyyy', 'dd-MM-yy', 'dd-M-yy', 'd-MM-yy', 'd-M-yy', 'dd/MM/yyyy', 'dd/M/yyyy', 'd/MM/yyyy', 'd/M/yyyy', 'dd/MM/yy', 'dd/M/yy', 'd/MM/yy', 'd/M/yy'], Title: `dd-MM-yyyy (${moment().format("DD-MM-yy")} or ${moment().format("DD/MM/yy")})`, Category: 'Date' },

  { ID: 1, Name: ['dd-MMM-yyyy', 'd-MMM-yyyy', 'dd-MMM-yy', 'd-MMM-yy', 'dd/MMM/yyyy', 'd/MMM/yyyy', 'dd/MMM/yy', 'd/MMM/yy'], Title: `dd-MMM-yyyy (${moment().format("DD-MMM-yyyy")} or ${moment().format("DD/MMM/yyyy")})`, Category: 'Date' },

  { ID: 2, Name: ['dd-MMMM-yyyy', 'd-MMMM-yyyy', 'dd-MMMM-yy', 'd-MMMM-yy', 'dd/MMMM/yyyy', 'd/MMMM/yyyy', 'dd/MMMM/yy', 'd/MMMM/yy'], Title: `dd-MMMM-yyyy (${moment().format("DD-MMMM-yyyy")} or ${moment().format("DD/MMMM/yyyy")})`, Category: 'Date' },

  // first month, then date
  { ID: 3, Name: ['MM-dd-yyyy', 'MM-d-yyyy', 'M-dd-yyyy', 'M-d-yyyy', 'MM-dd-yy', 'MM-d-yy', 'M-dd-yy', 'M-d-yy', 'MM/dd/yyyy', 'MM/d/yyyy', 'M/dd/yyyy', 'M/d/yyyy', 'MM/dd/yy', 'MM/d/yy', 'M/dd/yy', 'M/d/yy',], Title: `MM-dd-yyyy   (${moment().format("MM-DD-yy")} or ${moment().format("MM/DD/yy")})`, Category: 'Date' },

  { ID: 4, Name: ['MMM-dd-yyyy', 'MMM-d-yyyy', 'MMM-dd-yy', 'MMM-d-yy', 'MMM/dd/yyyy', 'MMM/d/yyyy', 'MMM/dd/yy', 'MMM/d/yy'], Title: `MMM-dd-yyyy (${moment().format("MMM-DD-yyyy")} or ${moment().format("DD-MMM-yyyy")})`, Category: 'Date' },

  { ID: 5, Name: ['MMMM-dd-yyyy', 'MMMM-d-yyyy', 'MMMM-dd-yy', 'MMMM-d-yy', 'MMMM/dd/yyyy', 'MMMM/d/yyyy', 'MMMM/dd/yy', 'MMMM/d/yy'], Title: `MMMM-dd-yyyy (${moment().format("MMMM-DD-yyyy")} or ${moment().format("MMMM/DD/yyyy")})`, Category: 'Date' },

  // first month, then date 
  { ID: 6, Name: ['MM/dd/yyyy HH:mm:ss', 'M/dd/yyyy HH:mm:ss', 'MM/d/yyyy HH:mm:ss', 'M/d/yyyy HH:mm:ss', 'MM-dd-yyyy HH:mm:ss', 'M-dd-yyyy HH:mm:ss', 'MM-d-yyyy HH:mm:ss', 'M-d-yyyy HH:mm:ss'], Title: `MM/dd/yyyy HH:mm:ss  (${moment().format("MM/DD/yyyy HH:mm:ss")} or ${moment().format("MM-DD-yyyy HH:mm:ss")})`, Category: 'Date Time' },

  { ID: 7, Name: ['MM/dd/yyyy HH:mm:ss tt', 'M/dd/yyyy HH:mm:ss tt', 'MM/d/yyyy HH:mm:ss tt', 'M/d/yyyy HH:mm:ss tt', 'MM-dd-yyyy HH:mm:ss tt', 'M-dd-yyyy HH:mm:ss tt', 'MM-d-yyyy HH:mm:ss tt', 'M-d-yyyy HH:mm:ss tt'], Title: `MM/dd/yyyy HH:mm:ss tt  (${moment().format("MM/DD/yyyy HH:mm:ss A")} or ${moment().format("MM-DD-yyyy HH:mm:ss A")})`, Category: 'Date Time' },

  { ID: 8, Name: ['MM/dd/yyyy HH:mm', 'M/dd/yyyy HH:mm', 'MM/d/yyyy HH:mm', 'M/d/yyyy HH:mm', 'MM-dd-yyyy HH:mm', 'M-dd-yyyy HH:mm', 'MM-d-yyyy HH:mm', 'M-d-yyyy HH:mm'], Title: `MM/dd/yyyy HH:mm  (${moment().format("MM/DD/yyyy HH:mm")} or ${moment().format("MM-DD-yyyy HH:mm")})`, Category: 'Date Time' },

  { ID: 9, Name: ['MM/dd/yyyy hh:mm tt', 'M/dd/yyyy hh:mm tt', 'MM/d/yyyy hh:mm tt', 'M/d/yyyy hh:mm tt', 'MM-dd-yyyy hh:mm tt', 'M-dd-yyyy hh:mm tt', 'MM-d-yyyy hh:mm tt', 'M-d-yyyy hh:mm tt'], Title: `MM/dd/yyyy hh:mm tt  (${moment().format("MM/DD/yyyy hh:mm A")} or ${moment().format("MM-DD-yyyy hh:mm A")})`, Category: 'Date Time' },

  { ID: 10, Name: ['MM/dd/yyyy H:mm', 'M/dd/yyyy H:mm', 'MM/d/yyyy H:mm', 'M/d/yyyy H:mm', 'MM-dd-yyyy H:mm', 'M-dd-yyyy H:mm', 'MM-d-yyyy H:mm', 'M-d-yyyy H:mm'], Title: `MM/dd/yyyy H:mm  (${moment().format("MM/DD/yyyy H:mm")} or ${moment().format("MM-DD-yyyy H:mm")})`, Category: 'Date Time' },

  { ID: 11, Name: ['MM/dd/yyyy h:mm tt', 'M/dd/yyyy h:mm tt', 'MM/d/yyyy h:mm tt', 'M/d/yyyy h:mm tt', 'MM-dd-yyyy h:mm tt', 'M-dd-yyyy h:mm tt', 'MM-d-yyyy h:mm tt', 'M-d-yyyy h:mm tt'], Title: `MM/dd/yyyy h:mm tt  (${moment().format("MM/DD/yyyy h:mm A")} or ${moment().format("MM-DD-yyyy h:mm A")})`, Category: 'Date Time' },

  // first date, then month
  { ID: 12, Name: ['dd/MM/yyyy HH:mm:ss', 'd/MM/yyyy HH:mm:ss', 'dd/M/yyyy HH:mm:ss', 'd/M/yyyy HH:mm:ss', 'dd-MM-yyyy HH:mm:ss', 'd-MM-yyyy HH:mm:ss', 'dd-M-yyyy HH:mm:ss', 'd-M-yyyy HH:mm:ss'], Title: `dd/MM/yyyy HH:mm:ss  (${moment().format("DD/MM/yyyy HH:mm:ss")} or ${moment().format("DD-MM-yyyy HH:mm:ss")})`, Category: 'Date Time' },

  { ID: 13, Name: ['dd/MM/yyyy HH:mm:ss tt', 'd/MM/yyyy HH:mm:ss tt', 'dd/M/yyyy HH:mm:ss tt', 'd/M/yyyy HH:mm:ss tt', 'dd-MM-yyyy HH:mm:ss tt', 'd-MM-yyyy HH:mm:ss tt', 'dd-M-yyyy HH:mm:ss tt', 'd-M-yyyy HH:mm:ss tt'], Title: `dd/MM/yyyy HH:mm:ss tt  (${moment().format("DD/MM/yyyy HH:mm:ss A")} or ${moment().format("DD-MM-yyyy HH:mm:ss A")})`, Category: 'Date Time' },

  { ID: 14, Name: ['dd/MM/yyyy HH:mm', 'd/MM/yyyy HH:mm', 'dd/M/yyyy HH:mm', 'd/M/yyyy HH:mm', 'dd-MM-yyyy HH:mm', 'd-MM-yyyy HH:mm', 'dd-M-yyyy HH:mm', 'd-M-yyyy HH:mm'], Title: `dd/MM/yyyy HH:mm  (${moment().format("DD/MM/yyyy HH:mm")} or ${moment().format("DD-MM-yyyy HH:mm")})`, Category: 'Date Time' },

  { ID: 15, Name: ['dd/MM/yyyy hh:mm tt', 'd/MM/yyyy hh:mm tt', 'dd/M/yyyy hh:mm tt', 'd/M/yyyy hh:mm tt', 'dd-MM-yyyy hh:mm tt', 'd-MM-yyyy hh:mm tt', 'dd-M-yyyy hh:mm tt', 'd-M-yyyy hh:mm tt'], Title: `dd/MM/yyyy hh:mm tt  (${moment().format("DD/MM/yyyy hh:mm A")} or ${moment().format("DD-MM-yyyy hh:mm A")})`, Category: 'Date Time' },

  { ID: 16, Name: ['dd/MM/yyyy H:mm', 'd/MM/yyyy H:mm', 'dd/M/yyyy H:mm', 'd/M/yyyy H:mm', 'dd-MM-yyyy H:mm', 'd-MM-yyyy H:mm', 'dd-M-yyyy H:mm', 'd-M-yyyy H:mm'], Title: `dd/MM/yyyy H:mm  (${moment().format("DD/MM/yyyy H:mm")} or ${moment().format("DD-MM-yyyy H:mm")})`, Category: 'Date Time' },

  { ID: 17, Name: ['dd/MM/yyyy h:mm tt', 'd/MM/yyyy h:mm tt', 'dd/M/yyyy h:mm tt', 'd/M/yyyy h:mm tt', 'dd-MM-yyyy h:mm tt', 'd-MM-yyyy h:mm tt', 'dd-M-yyyy h:mm tt', 'd-M-yyyy h:mm tt'], Title: `dd/MM/yyyy h:mm tt  (${moment().format("DD/MM/yyyy h:mm A")} or ${moment().format("DD-MM-yyyy h:mm A")})`, Category: 'Date Time' },
]


export class DataTypeSampleData {
  public static readonly UnKnown = "Sample Data";
  public static readonly Text = "Sample Data";
  public static readonly Boolean = "true";
  public static readonly Numeric = "12345.25";
  public static readonly DateTime = moment().format("MM/DD/yyyy HH:mm:ss A");
  public static readonly Integer = "12345";
  public static readonly Email = "johndoe@cloudapper.com";
  public static readonly Json = "{Name: 'John', Age: '25'}";
  public static readonly Random = "412536";
  public static readonly Map = "{lat: 0, long: 0}"
}

export class ControlTypeSampleData {
  public static readonly None = "Sample Data";
  public static readonly CheckBox = "true";
  public static readonly ComboBox = "Choice 5";
  public static readonly DateTime = moment().format("MM/DD/yyyy HH:mm:ss A");
  public static readonly TextBox = "Sample Data Text";
  public static readonly TextArea = "Sample Data Long text for description";
  public static readonly Heading = "Sample Data";
  public static readonly MultiSelectListBox = "Sample Data";
  public static readonly Column = "Sample Data";
  public static readonly GroupBox = "Sample Data";
  public static readonly Label = "Sample Data";
  public static readonly DateOnly = moment().format("MM/DD/yyyy");
  public static readonly Entity = "Sample Data";
  public static readonly Event = "Sample Data";
  public static readonly EntityList = "Sample Data";
  public static readonly EventList = "Sample Data";
  public static readonly HyperLink = "Sample Data";
  public static readonly ActiveUser = "Sample Data";
  public static readonly RichTextBox = "Sample Data";
  public static readonly RelationalEntity = "Sample Data";
  public static readonly StarInput = "Star Input Control";
  public static readonly StarField = "Star Field Control";
  public static readonly StarInputValue = "4.5";
  public static readonly AutoCompleteTextBox = "Choice 1;Choice 2,Choice 3";
  public static readonly AutoNumeric = "54321";
  public static readonly EntityCategoryComboBox = "Sample Data";
  public static readonly TimeOnly = moment().format("hh:mm:ss A");
  public static readonly RadioButton = "Choice 1";
  public static readonly Barcode = "54321";
  public static readonly Switch = "true";
  public static readonly Rating = "4.1";
  public static readonly PhoneNumber = "+15417543010";
}

export class ControlTypeNameForNote {
  public static readonly None = "None";
  public static readonly CheckBox = "Check Box";
  public static readonly ComboBox = "Combo Box";
  public static readonly DateTime = "Date Time";
  public static readonly TextBox = "Text Box";
  public static readonly TextArea = "Text Area";
  public static readonly Heading = "Heading";
  public static readonly MultiSelectListBox = "MultiSelectListBox";
  public static readonly Column = "Column";
  public static readonly GroupBox = "Group Box";
  public static readonly Label = "Label";
  public static readonly DateOnly = "Date Only";
  public static readonly Entity = "Form";
  public static readonly Event = "Event";
  public static readonly EntityList = "Form List";
  public static readonly EventList = "Event List";
  public static readonly TreeView = "Tree View";
  public static readonly HyperLink = "Hyper Link";
  public static readonly Image = "Image";
  public static readonly ActiveUser = "None";
  public static readonly RichTextBox = "None";
  public static readonly RelationalEntity = "Relational Form";
  public static readonly ImageField = "Image Field";
  public static readonly ImageInput = "Image Input";
  public static readonly StarInput = "Star Input";
  public static readonly StarField = "Star Field";
  public static readonly PriorityEvent = "Priority Event";
  public static readonly StarInputValue = "Star Input Value";
  public static readonly AutoCompleteTextBox = "Auto Complete TextBox";
  public static readonly RawImage = "Raw Image";
  public static readonly AutoNumeric = "Auto Numeric";
  public static readonly ImageAutoNumeric = "Image Auto Numeric";
  public static readonly EntityCategoryComboBox = "Form Category Combo Box";
  public static readonly TimeOnly = "TimeOnly";
  public static readonly RadioButton = "Radio Button";
  public static readonly Barcode = "Barcode";
  public static readonly Switch = "Switch";
  public static readonly MultiMedia = "MultiMedia";
  public static readonly Lookup = "Lookup";
  public static readonly Rating = "Rating";
  public static readonly Formula = "Formula";
  public static readonly UserInfo = "User Info";
  public static readonly LoginUser = "Login User";
  public static readonly PhoneNumber = "Phone Number";
}

export class ControlTypeNotes {
  public static readonly None = "None";
  public static readonly CheckBox = "value must be 'true' or 'false'";
  public static readonly ComboBox = "value should be from this field options";
  public static readonly DateTime = "please choose one format of this field";
  public static readonly TextBox = "value should be text, email, numeric or integer";
  public static readonly TextArea = "value must be long text";
  public static readonly Heading = "Heading Control";
  public static readonly MultiSelectListBox = "value should be one or more from this field options";
  public static readonly Column = "Column Control";
  public static readonly GroupBox = "Group Box Control";
  public static readonly Label = "value should be text";
  public static readonly DateOnly = "please choose format of this field";
  public static readonly Entity = "please choose field after choosing form";
  public static readonly Event = "Event Control";
  public static readonly EntityList = "Form List Control";
  public static readonly EventList = "Event List Control";
  public static readonly TreeView = "Tree View Control";
  public static readonly HyperLink = "Hyper Link Control";
  public static readonly Image = "Image control is not supported";
  public static readonly ActiveUser = "None Control";
  public static readonly RichTextBox = "None Control";
  public static readonly RelationalEntity = "Relational Form Control";
  public static readonly ImageField = "Image Field Control"; //Displays Ima"None Control"; normaly used in EntityType in schema definition
  public static readonly ImageInput = "Image Input Control"; // Take input from UI and shift time value to ImageField control which is referenced by it
  public static readonly StarInput = "Star Input Control";
  public static readonly StarField = "Star Field Control";
  public static readonly PriorityEvent = "Priority Event Control";
  public static readonly StarInputValue = "Star Input Value Control";
  public static readonly AutoCompleteTextBox = "Values must be seperated with ';' ex: value1;value2;value3";
  public static readonly RawImage = "Raw Image Control"; //image will no convertion like base64 string etc
  public static readonly AutoNumeric = "Auto Numeric Control"; //field value will assign auto value.
  public static readonly ImageAutoNumeric = "Image Auto Numeric Control"; //image id (auto) created in solr not url
  public static readonly EntityCategoryComboBox = "Form Category Combo Box Control";
  public static readonly TimeOnly = "value should be in hh:mm:ss tt";
  public static readonly RadioButton = "value should be from this field options";
  public static readonly Barcode = "value should be text or number";
  public static readonly Switch = "value should be from this field options";
  public static readonly MultiMedia = "MultiMedia Control";
  public static readonly Lookup = "Lookup Control";
  public static readonly Rating = "value should be decimal number between 0 - 5";
  public static readonly Formula = "Formula Control";
  public static readonly UserInfo = "User Info Control";
  public static readonly LoginUser = "Login User Control";
  public static readonly PhoneNumber = "value should be a valid phone number";
}

export class DataTypeNotes {
  public static readonly UnKnown = "Unknown Control";
  public static readonly Text = "value should be plain text";
  public static readonly Boolean = "value should be from 'true' or 'false'";
  public static readonly Numeric = "value should be numeric value";
  public static readonly DateTime = "value should be date time";
  public static readonly Integer = "value should be integer number";
  public static readonly Email = "value should be valid email address";
  public static readonly Json = "value should be json data";
  public static readonly Random = "Random Control";
  public static readonly Map = "Map Control";
}

export class ControlFieldType {
  public static readonly None = "None";
  public static readonly CheckBox = "Check Box";
  public static readonly ComboBox = "Combo Box";
  public static readonly DateTime = "Date Time";
  public static readonly TextBox = "Text Box";
  public static readonly TextArea = "Text Area";
  public static readonly Heading = "Heading";
  public static readonly MultiSelectListBox = "Multi Select List Box";
  public static readonly Column = "Column";
  public static readonly GroupBox = "Group Box";
  public static readonly Label = "Label";
  public static readonly DateOnly = "Date";
  public static readonly Entity = "Form";
  public static readonly Event = "Event";
  public static readonly EntityList = "Form List";
  public static readonly EventList = "Form Event";
  public static readonly TreeView = "Tree View";
  public static readonly HyperLink = "Hyper Link";
  public static readonly Image = "Image";
  public static readonly ActiveUser = "Active User";
  public static readonly RichTextBox = "Rich Text Box";
  public static readonly RelationalEntity = "Relational Form";
  public static readonly ImageField = "Image Field"; //Displays Ima"None"; normaly used in EntityType in schema definition
  public static readonly ImageInput = "Image Input"; // Take input from UI and shift time value to ImageField which is referenced by it
  public static readonly StarInput = "Star Input";
  public static readonly StarField = "Star Field";
  public static readonly PriorityEvent = "Priority Event";
  public static readonly StarInputValue = "Star Input Value";
  public static readonly AutoCompleteTextBox = "Auto Complete Text Box";
  public static readonly RawImage = "Raw Image"; //image will no convertion like base64 string etc
  public static readonly AutoNumeric = "Auto Numeric"; //field value will assign auto value.
  public static readonly ImageAutoNumeric = "Image Auto Numeric"; //image id (auto) created in solr not url
  public static readonly EntityCategoryComboBox = "Form Category Combo Box";
  public static readonly TimeOnly = "Time Only";
  public static readonly RadioButton = "Radio Button";
  public static readonly Barcode = "Barcode";
  public static readonly Switch = "Switch";
  public static readonly MultiMedia = "Multi Media";
  public static readonly Lookup = "Lookup";
  public static readonly Rating = "Rating";
  public static readonly Formula = "Formula";
  public static readonly UserInfo = "User Info";
  public static readonly LoginUser = "Login User";
  public static readonly PhoneNumber = "Phone Number";
}

export class DataFieldType {
  public static readonly UnKnown = "Unknown";
  public static readonly Text = "Text";
  public static readonly Boolean = "Boolean"; //image will no convertion like base64 string etc
  public static readonly Numeric = "Numeric"; //field value will assign auto value.
  public static readonly DateTime = "Date Time"; //image id (auto) created in solr not url
  public static readonly Integer = "Integer";
  public static readonly Email = "Email";
  public static readonly Json = "Json";
  public static readonly Random = "Random";
  public static readonly Map = "Map";
}