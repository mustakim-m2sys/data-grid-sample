export enum EnumMessageType {
  Success = 1,
  Warning = 2,
  Error = 3
}

export enum EnumListViewType {
  NONE,
  LIST,
  CARD,
  KANBAN
}

export enum DataServiceResponseConstants {
  Success = 'Success',
  Failed = 'Failed'
}

export enum EnumMenuViewLayout {
  None = 0,
  ListLayout = 1,
  CardLayout = 2
}

export enum EnumPlatform {
  None = 0,
  Web = 1,
  Mobile = 2
}

export enum EnumProduct {
  None = 0,
  CloudApper = 1,
  CloudABIS = 2,
  CircleCare = 3
}

export enum EnumSchemaType {
  None = 0,
  Entity = 1,
  Event = 2
}

export enum EnumMenuOperationType {
  None = 0,
  Add = 1,
  Search = 2
}

export enum EnumMobileMenuLayout {
  None = 0,
  ListLayout = 1,
  GridLayout = 2,
  BottomTabLayout = 3
}

export enum enumSideBarColor {
  None = 0,
  Dark = 1,
  Light = 2,
  Lighter = 3
}

export enum EnumControlType {
  None = 0,
  CheckBox = 1,
  ComboBox = 2,
  DateTime = 3,
  TextBox = 4,
  TextArea = 5,
  Heading = 6,
  MultiSelectListBox = 7,
  Column = 8,
  GroupBox = 9,
  Label = 10,
  DateOnly = 11,
  Entity = 12,
  Event = 13,
  EntityList = 14,
  EventList = 15,
  TreeView = 16,
  HyperLink = 17,
  Image = 18,
  ActiveUser = 19,
  RichTextBox = 20,
  RelationalEntity = 21,
  ImageField = 22, //Displays Image, normaly used in EntityType in schema definition
  ImageInput = 23, // Take input from UI and shift time value to ImageField control which is referenced by it
  StarInput = 24,
  StarField = 25,
  PriorityEvent = 26,
  StarInputValue = 27,
  AutoCompleteTextBox = 28,
  RawImage = 29, //image will no convertion like base64 string etc
  AutoNumeric = 30, //field value will assign auto value.
  ImageAutoNumeric = 31, //image id (auto) created in solr not url
  EntityCategoryComboBox = 32, //this control only be used in event type not entity type. For example question category.
  TimeOnly = 33,
  RadioButton = 34,
  Barcode = 35,
  Switch = 36,
  MultiMedia = 37,
  Lookup = 38,
  Rating = 39,
  Formula = 40,
  UserInfo = 99,
  LoginUser = 100,
  LayoutMap = 101,
  PlaceMarker = 102,
  PhoneNumber = 103
}

// temporary changes for help starts
export enum EnumDataType {
  UnKnown = 0,
  //"Label": "DateTime","ControlType": 3,
  //"Label": "Date","ControlType": 11,
  //"Label": "Time","ControlType": 33,
  //"Label": "TextArea","ControlType": 5,
  //"Label": "Yes/No","ControlType": 1, //boolean
  //"Label": "Switch","ControlType": 36, //boolean
  //"Label": "Dropdown","ControlType": 2,"DefaultValue": "Choice 1,Choice 2,Choice 3",
  //"Label": "Radio","ControlType": 34,"DefaultValue": "Choice 1,Choice 2,Choice 3",
  //"Label": "Multi Choice","ControlType": 28,"DefaultValue": "Choice 1,Choice 2,Choice 3",
  //"Label": "Rating","ControlType": 39, //numeric
  //"Label": "Form","ControlType": 12,"ReferenceTypeId": "52121647-ceb8-48e7-947c-638d7ec70582",
  //"Label": "Barcode","ControlType": 35,
  Text = 1,
  //"Label": "TextField","ControlType": 4,
  //"Label": "Lookup","ControlType": 38,
  //"Label": "Formula","ControlType": 40,
  Boolean = 2,
  Numeric = 3,
  DateTime = 5,
  Integer = 6,
  Email = 7,
  Json = 8,
  Random = 9, //numeric
  Map = 10
}
// temporary changes for help ends

export enum EnumValueSourceType {
  DATAITEM = 0,
  RANGE_INT = 1,
  RANGE_FLOAT = 2,
  RANGE_DATE = 3,
  INT = 4,
  FLOAT = 5,
  DATE = 6
}

export enum EnumClientPlatform {
  None = 0,
  iOS = 1,
  Android = 2,
  Web = 3,
  Desktop = 4,
  CloudDesk = 5,
  Connector = 6,
  AgentService = 7
}

export enum EnumAppLayoutType {
  WEB,
  MOBILE
}

export enum EnumMenuStyle {
  Top = 0,
  Full = 1,
  Mini = 2,
  None = 3
}

export enum EnumLayoutCode {
  None = 0,
  ListLayout = 1,
  GridLayout = 2,
  BottomTabLayout = 3
}

export enum EnumThemeColor {
  None = 0,
  Green = 1,
  Cyan = 2,
  Red = 3,
  Blue = 4,
  Gray = 5,
  GradientOrange = 6,
  GradientBlue = 7,
  GradientRed = 8,
  GradientGreen = 9,
  HeadImg1 = 10,
  HeadImg2 = 11,
  HeadImg3 = 12
}

export enum EnumBarcodeFormat {
  /// <summary>Aztec 2D barcode format.</summary>
  AZTEC = 1,
  /// <summary>CODABAR 1D format.</summary>
  CODABAR = 2,
  /// <summary>Code 39 1D format.</summary>
  CODE_39 = 4,
  /// <summary>Code 93 1D format.</summary>
  CODE_93 = 8,
  /// <summary>Code 128 1D format.</summary>
  CODE_128 = 16,
  /// <summary>Data Matrix 2D barcode format.</summary>
  DATA_MATRIX = 32,
  /// <summary>EAN-8 1D format.</summary>
  EAN_8 = 64,
  /// <summary>EAN-13 1D format.</summary>
  EAN_13 = 128,
  /// <summary>ITF (Interleaved Two of Five) 1D format.</summary>
  ITF = 256,
  /// <summary>MaxiCode 2D barcode format.</summary>
  MAXICODE = 512,
  /// <summary>PDF417 format.</summary>
  PDF_417 = 1024,
  /// <summary>QR Code 2D barcode format.</summary>
  QR_CODE = 2048,
  /// <summary>RSS 14</summary>
  RSS_14 = 4096,
  /// <summary>RSS EXPANDED</summary>
  RSS_EXPANDED = 8192,
  /// <summary>UPC-A 1D format.</summary>
  UPC_A = 16384,
  /// <summary>UPC-E 1D format.</summary>
  UPC_E = 32768,
  /// <summary>UPC/EAN extension format. Not a stand-alone format.</summary>
  UPC_EAN_EXTENSION = 65536,
  /// <summary>MSI</summary>
  MSI = 131072,
  /// <summary>Plessey</summary>
  PLESSEY = 262144,
  /// <summary>Intelligent Mail barcode</summary>
  IMB = 524288,
  /// <summary>
  /// UPC_A | UPC_E | EAN_13 | EAN_8 | CODABAR | CODE_39 | CODE_93 | CODE_128 | ITF | RSS_14 | RSS_EXPANDED
  /// without MSI (to many false-positives) and IMB (not enough tested, and it looks more like a 2D)
  /// </summary>
  All_1D = UPC_A | UPC_E | EAN_13 | EAN_8 | CODABAR | CODE_39 | CODE_93 | CODE_128 | ITF | RSS_14 | RSS_EXPANDED
}

export enum EnumIconCategory {
  'Avatars' = 1,
  'Business' = 2,
  'Clothes' = 3,
  'Communication And Media' = 4,
  'Connectivity' = 5,
  'Construction' = 6,
  'Cooking' = 7,
  'Development' = 8,
  'Digital Marketing' = 9,
  'ECommerce' = 10,
  'Education' = 11,
  'Family' = 12,
  'Hobbies' = 13,
  'Idea' = 14,
  'Interaction' = 15,
  'Law And Justice' = 16,
  'Lifestyle' = 17,
  'Logistic' = 18,
  'Management' = 19,
  'Medical' = 20,
  'Productivity' = 21,
  'Project Management' = 22,
  'Real Estate' = 23,
  'Security' = 24,
  'Stationary' = 25,
  'Transport' = 26,
  'Travel' = 27,
  'Equipment' = 28
}

export enum EnumIconType {
  'List Icon' = 1,
  'Add Icon' = 2,
  'Generic' = 3,
  'App Icon' = 4
}

export enum EnumActivity {
  None = 0,
  EntityView = 1,
  EntityCreate = 2,
  EntityEdit = 3,
  EntityDelete = 4,
  ReportEdit = 5,
  ReportGeneration = 6,
  ReportCreate = 7,
  ReportDelete = 8,
  EntityImport = 9,
  UserManagement = 10,
  RoleManagement = 11,
  RolePrivilegeManagement = 12,
  EntityRolePrivilegeManagement = 13,
  ClientInformation = 14,
  DynamicMenuItems = 15,
  DashboardAnalyticsManagement = 16
}

export class EnumHelpers {
  /**
   * No instances guard.
   */
  private constructor() { }
  /**
   * Get all keys from enumeration.
   */
  public static values(enumType: object) {
    const members = Object.values(enumType);
    return members.filter(x => Number.isNaN(parseInt(x, 10)));
  }

  /**
   * Get key-value array from enumeration.
   */
  public static toKeyValueArray(enumType: object) {
    return EnumHelpers.values(enumType).map(Value => {
      return { Key: enumType[Value], Value };
    });
  }
}

export enum EnumRecordUiMode {
  CREATE,
  EDIT,
  DETAILS
}

export enum EnumBrowseType {
  BROWSE,
  PARENT
}

export enum RouteTypeEnum {
  App = 'app'
}

export enum ViewTypeEnum {
  Dashboard = 'dashboard',
  Report = 'report',
  Kanban = 'kanban',
  List = 'list',
  Calendar = 'calendar',
  Create = 'create',
  Details = 'details',
  ImportData = 'import-data'
}

export enum OAuthEventEnum {
  TokenReceived = 'token_received',
  TokenExpires = 'token_expires',
  TokenRefreshed = 'token_refreshed',
  TokenSilentlyRefreshed = 'silently_refreshed',
  InvalidNonce = "invalid_nonce_in_state",
  SilentRefreshTimeout = "silent_refresh_timeout",
  TokenRefreshError = "token_refresh_error",
  SilentRefreshError = "silent_refresh_timeout",
  DiscoveryDocumentLoadError = "discovery_document_load_error"
}

export enum EnumFormViewPermissionType {
  None = 0, Private = 1, Public = 2, SpecificPeople = 3, SpecificRole = 4
}

export enum EnumFormViewType {
  None = 0, ListView = 1, Kanban = 2, Calendar = 3, Chart = 4
}

export enum EnumCloudApperFileType {
  None = 0,
  RecordControlFile = 1, //Record UI element file(image control)
  RecordFile = 2, //Record file/photo tab
  RepositoryFile = 3,
  RecordDisplayPicture = 4, //Profile picture
  AppLogo = 5, //Applogo
  UserProfilePicture = 6,
  MenuIcon = 7,
  Multimedia = 8, //For Multimedia control
  ClientLogo = 9,
  GalleryAppLogo = 10, //template upload/download logos, screenschoot
  LayoutMap = 11
}

export enum EnumSharingLevel {
  None = 0,
  UserLevel = 1,
  AppLevel = 2,
  ClientLevel = 3
}

export enum EnumPrivileges {
  Create = 1,
  Edit = 2,
  Delete = 4,
  View = 8,
  Search = 16,
  Export = 32,
  Import = 64,

  ImageView = 128,
  ImageEdit = 256,
  ImageCreate = 512,
  ImageDelete = 1024,
  FileView = 2048,
  FileEdit = 4096,
  FileCreate = 8192,
  FileDelete = 16384,
  FingerprintView = 32768,
  FingerprintCreate = 65536,
  IrisView = 131072,
  IrisCreate = 262144,
  FaceView = 524288,
  FaceCreate = 1048576,
  Approval = 2097152
}

export enum EnumUserInvitationStatus {
  None = 0,
  Sent = 1,
  Accepted = 2,
  NeverSend = 3,  //User not exist but entity exist in solr. So need to create user and update to solr email,name,roleid,invitation status as Sent
  ReSend = 4
}

export enum EnumChartType {
  VColumn = 0,
  HColoumn = 1,
  Line = 2,
  Pie = 3,
  StackedVertical = 4,
  StackedHorizontal = 5,
  GaugeControl = 6,
  TableChart = 7,
  FlatTableChart = 8,
  Map = 9,
  SingleStat = 10,
  TimeLine = 11
}

export enum EnumSingleStatType {
  None = 0,
  Count = 1,
  Average = 2,
  Max = 3,
  Min = 4,
  Sum = 5
  // Percentage = 6
}

export enum EnumSubscriptionStatus {
  None = 0,
  Incomplete = 1,
  IncompleteExpired = 2,
  Triling = 3,
  Active = 4,
  PastDue = 5,
  Canceled = 6,
  Unpaid = 7
}
export enum EnumMPTemplateType {
  APP = 1,
  CONNECTOR = 2
}
export enum EnumMPTemplateStatus {
  PUBLISHED = 1,
  UNPUBLISHED = 2
}
export enum EnumMPTemplateScreenShotType {
  VIDEO = 1,
  IMAGE = 2
}
export enum EnumMPTemplateScreenShotPlatform {
  IOS = 1,
  ANDRIOD = 2,
  WEB = 3,
  DESKTOP = 4,
  IPAD = 5,
  TABLET = 6
}

export enum EnumBioimetricModality {
  FACE = 1,
  FINGERPRINT = 2,
  IRIS = 3
}

export enum EnumMarketPlaceFileType {
  NONE = 0,
  COVERIMAGE = 1,
  TEMPLATELOGO = 2,
  SCREENSHOT = 3,
  COVERPAGE = 4,
  MULTIMEDIA = 5,
  VEDIO = 6
}

export enum EnumDataImportSteps {
  SELECT_FILE = 1,
  CHOOSE_OPTION = 2,
  CHOOSE_HEADER_ROW = 3,
  MAP_DATA = 4,
  SUBMIT_DATA = 5,
  DATA_SEND = 6,
}

export enum EnumDataImportOptions {
  Add = 1,
  Update = 2,
  Both = 3
}

export enum EnumPrintOptions {
  TEMPLATE = 1,
  DOWNLOAD_CONFIGURATION = 2
}

export enum SvgIconEnum {
  DefaultImage = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="60px" height="60px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><polygon points="0 0 24 0 24 24 0 24" /><rect fill="#3699FF" opacity="0.3" x="2" y="4" width="20" height="16" rx="2" /><polygon fill="#3699FF" opacity="0.3" points="4 20 10.5 11 17 20" /><polygon fill="#3699FF" points="11 20 15.5 14 20 20" /><circle fill="#3699FF" opacity="0.3" cx="18.5" cy="8.5" r="1.5" /></g></svg>',
  DefaultBarcode = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="60px" height="60px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><path d="M15,9 L13,9 L13,5 L15,5 L15,9 Z M15,15 L15,20 L13,20 L13,15 L15,15 Z M5,9 L2,9 L2,6 C2,5.44771525 2.44771525,5 3,5 L5,5 L5,9 Z M5,15 L5,20 L3,20 C2.44771525,20 2,19.5522847 2,19 L2,15 L5,15 Z M18,9 L16,9 L16,5 L18,5 L18,9 Z M18,15 L18,20 L16,20 L16,15 L18,15 Z M22,9 L20,9 L20,5 L21,5 C21.5522847,5 22,5.44771525 22,6 L22,9 Z M22,15 L22,19 C22,19.5522847 21.5522847,20 21,20 L20,20 L20,15 L22,15 Z" fill="#3699FF"/><path d="M9,9 L7,9 L7,5 L9,5 L9,9 Z M9,15 L9,20 L7,20 L7,15 L9,15 Z" fill="#3699FF" opacity="0.3"/><rect fill="#3699FF" opacity="0.3" x="0" y="11" width="24" height="2" rx="1"/></g></svg>',
  Search = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="26px" height="26px" viewBox="0 0 24 24" version="1.1"><g class="svg-g" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><path d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z" fill="#03a9f4" fill-rule="nonzero" opacity="0.3"></path> <path d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z" fill="#03a9f4" fill-rule="nonzero"></path></g></svg>',
  NeedHelp = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="26px" height="26px" viewBox="0 0 24 24" version="1.1"> <g class="svg-g" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <rect x="0" y="0" width="24" height="24" /> <circle fill="#03a9f4" opacity="0.3" cx="12" cy="12" r="10" /> <path d="M12,16 C12.5522847,16 13,16.4477153 13,17 C13,17.5522847 12.5522847,18 12,18 C11.4477153,18 11,17.5522847 11,17 C11,16.4477153 11.4477153,16 12,16 Z M10.591,14.868 L10.591,13.209 L11.851,13.209 C13.447,13.209 14.602,11.991 14.602,10.395 C14.602,8.799 13.447,7.581 11.851,7.581 C10.234,7.581 9.121,8.799 9.121,10.395 L7.336,10.395 C7.336,7.875 9.31,5.922 11.851,5.922 C14.392,5.922 16.387,7.875 16.387,10.395 C16.387,12.915 14.392,14.868 11.851,14.868 L10.591,14.868 Z" fill="#03a9f4" /> </g> </svg>',
  NeedHelp24px = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"> <g class="svg-g" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <rect x="0" y="0" width="24" height="24" /> <circle fill="#03a9f4" opacity="0.3" cx="12" cy="12" r="10" /> <path d="M12,16 C12.5522847,16 13,16.4477153 13,17 C13,17.5522847 12.5522847,18 12,18 C11.4477153,18 11,17.5522847 11,17 C11,16.4477153 11.4477153,16 12,16 Z M10.591,14.868 L10.591,13.209 L11.851,13.209 C13.447,13.209 14.602,11.991 14.602,10.395 C14.602,8.799 13.447,7.581 11.851,7.581 C10.234,7.581 9.121,8.799 9.121,10.395 L7.336,10.395 C7.336,7.875 9.31,5.922 11.851,5.922 C14.392,5.922 16.387,7.875 16.387,10.395 C16.387,12.915 14.392,14.868 11.851,14.868 L10.591,14.868 Z" fill="#03a9f4" /> </g> </svg>',
  ManageUser = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="26px" height="26px" viewBox="0 0 24 24" version="1.1"> <g class="svg-g" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <polygon points="0 0 24 0 24 24 0 24" /> <path d="M18,14 C16.3431458,14 15,12.6568542 15,11 C15,9.34314575 16.3431458,8 18,8 C19.6568542,8 21,9.34314575 21,11 C21,12.6568542 19.6568542,14 18,14 Z M9,11 C6.790861,11 5,9.209139 5,7 C5,4.790861 6.790861,3 9,3 C11.209139,3 13,4.790861 13,7 C13,9.209139 11.209139,11 9,11 Z" fill="#03a9f4" fill-rule="nonzero" opacity="0.3" /> <path d="M17.6011961,15.0006174 C21.0077043,15.0378534 23.7891749,16.7601418 23.9984937,20.4 C24.0069246,20.5466056 23.9984937,21 23.4559499,21 L19.6,21 C19.6,18.7490654 18.8562935,16.6718327 17.6011961,15.0006174 Z M0.00065168429,20.1992055 C0.388258525,15.4265159 4.26191235,13 8.98334134,13 C13.7712164,13 17.7048837,15.2931929 17.9979143,20.2 C18.0095879,20.3954741 17.9979143,21 17.2466999,21 C13.541124,21 8.03472472,21 0.727502227,21 C0.476712155,21 -0.0204617505,20.45918 0.00065168429,20.1992055 Z" fill="#03a9f4" fill-rule="nonzero" /> </g> </svg>',
  MyApps = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="26px" height="26px" viewBox="0 0 24 24" version="1.1"> <g class="svg-g" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <rect x="0" y="0" width="24" height="24"></rect> <rect fill="#03a9f4" x="4" y="4" width="7" height="7" rx="1.5"></rect> <path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#03a9f4" opacity="0.3"></path> </g></svg>',
  TopHeaderMyApps = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="26px" height="26px" viewBox="0 0 24 24" version="1.1"> <g class="svg-g-top-header" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <rect x="0" y="0" width="24" height="24"></rect> <rect fill="#ffffff" x="4" y="4" width="7" height="7" rx="1.5"></rect> <path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#ffffff" opacity="0.3"></path> </g></svg>',
  TopHeaderMyAppsBlack = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="26px" height="26px" viewBox="0 0 24 24" version="1.1"> <g class="svg-g-top-header-black" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <rect x="0" y="0" width="24" height="24"></rect> <rect fill="#000000" x="4" y="4" width="7" height="7" rx="1.5"></rect> <path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#000000" opacity="0.3"></path> </g></svg>',
  CreateApp = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="26px" height="26px" viewBox="0 0 24 24" version="1.1"><g class="svg-g-rect" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect fill="#03a9f4" x="4" y="11" width="16" height="2" rx="1"/><rect fill="#03a9f4" opacity="0.3" transform="translate(12.000000, 12.000000) rotate(-270.000000) translate(-12.000000, -12.000000) " x="4" y="11" width="16" height="2" rx="1"/></g></svg>',
  MarketPlace = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="26px" height="26px" viewBox="0 0 24 24" version="1.1"><g class="svg-g" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><path d="M12,4.56204994 L7.76822128,9.6401844 C7.4146572,10.0644613 6.7840925,10.1217854 6.3598156,9.76822128 C5.9355387,9.4146572 5.87821464,8.7840925 6.23177872,8.3598156 L11.2317787,2.3598156 C11.6315738,1.88006147 12.3684262,1.88006147 12.7682213,2.3598156 L17.7682213,8.3598156 C18.1217854,8.7840925 18.0644613,9.4146572 17.6401844,9.76822128 C17.2159075,10.1217854 16.5853428,10.0644613 16.2317787,9.6401844 L12,4.56204994 Z" fill="#03a9f4" fill-rule="nonzero" opacity="0.3"/><path d="M3.28077641,9 L20.7192236,9 C21.2715083,9 21.7192236,9.44771525 21.7192236,10 C21.7192236,10.0817618 21.7091962,10.163215 21.6893661,10.2425356 L19.5680983,18.7276069 C19.234223,20.0631079 18.0342737,21 16.6576708,21 L7.34232922,21 C5.96572629,21 4.76577697,20.0631079 4.43190172,18.7276069 L2.31063391,10.2425356 C2.17668518,9.70674072 2.50244587,9.16380623 3.03824078,9.0298575 C3.11756139,9.01002735 3.1990146,9 3.28077641,9 Z M12,12 C11.4477153,12 11,12.4477153 11,13 L11,17 C11,17.5522847 11.4477153,18 12,18 C12.5522847,18 13,17.5522847 13,17 L13,13 C13,12.4477153 12.5522847,12 12,12 Z M6.96472382,12.1362967 C6.43125772,12.2792385 6.11467523,12.8275755 6.25761704,13.3610416 L7.29289322,17.2247449 C7.43583503,17.758211 7.98417199,18.0747935 8.51763809,17.9318517 C9.05110419,17.7889098 9.36768668,17.2405729 9.22474487,16.7071068 L8.18946869,12.8434035 C8.04652688,12.3099374 7.49818992,11.9933549 6.96472382,12.1362967 Z M17.0352762,12.1362967 C16.5018101,11.9933549 15.9534731,12.3099374 15.8105313,12.8434035 L14.7752551,16.7071068 C14.6323133,17.2405729 14.9488958,17.7889098 15.4823619,17.9318517 C16.015828,18.0747935 16.564165,17.758211 16.7071068,17.2247449 L17.742383,13.3610416 C17.8853248,12.8275755 17.5687423,12.2792385 17.0352762,12.1362967 Z" fill="#03a9f4"/></g></svg>',
  Import = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><rect fill="#000000" opacity="0.3" transform="translate(12.000000, 7.000000) rotate(-180.000000) translate(-12.000000, -7.000000) " x="11" y="1" width="2" height="12" rx="1"/><path d="M17,8 C16.4477153,8 16,7.55228475 16,7 C16,6.44771525 16.4477153,6 17,6 L18,6 C20.209139,6 22,7.790861 22,10 L22,18 C22,20.209139 20.209139,22 18,22 L6,22 C3.790861,22 2,20.209139 2,18 L2,9.99305689 C2,7.7839179 3.790861,5.99305689 6,5.99305689 L7.00000482,5.99305689 C7.55228957,5.99305689 8.00000482,6.44077214 8.00000482,6.99305689 C8.00000482,7.54534164 7.55228957,7.99305689 7.00000482,7.99305689 L6,7.99305689 C4.8954305,7.99305689 4,8.88848739 4,9.99305689 L4,18 C4,19.1045695 4.8954305,20 6,20 L18,20 C19.1045695,20 20,19.1045695 20,18 L20,10 C20,8.8954305 19.1045695,8 18,8 L17,8 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"/><path d="M14.2928932,10.2928932 C14.6834175,9.90236893 15.3165825,9.90236893 15.7071068,10.2928932 C16.0976311,10.6834175 16.0976311,11.3165825 15.7071068,11.7071068 L12.7071068,14.7071068 C12.3165825,15.0976311 11.6834175,15.0976311 11.2928932,14.7071068 L8.29289322,11.7071068 C7.90236893,11.3165825 7.90236893,10.6834175 8.29289322,10.2928932 C8.68341751,9.90236893 9.31658249,9.90236893 9.70710678,10.2928932 L12,12.5857864 L14.2928932,10.2928932 Z" fill="#000000" fill-rule="nonzero"/></g></svg>',
  MarketPlaceRed = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="26px" height="26px" viewBox="0 0 24 24" version="1.1"><g class="svg-g" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><path d="M12,4.56204994 L7.76822128,9.6401844 C7.4146572,10.0644613 6.7840925,10.1217854 6.3598156,9.76822128 C5.9355387,9.4146572 5.87821464,8.7840925 6.23177872,8.3598156 L11.2317787,2.3598156 C11.6315738,1.88006147 12.3684262,1.88006147 12.7682213,2.3598156 L17.7682213,8.3598156 C18.1217854,8.7840925 18.0644613,9.4146572 17.6401844,9.76822128 C17.2159075,10.1217854 16.5853428,10.0644613 16.2317787,9.6401844 L12,4.56204994 Z" fill="#dc3545" fill-rule="nonzero" opacity="0.3"/><path d="M3.28077641,9 L20.7192236,9 C21.2715083,9 21.7192236,9.44771525 21.7192236,10 C21.7192236,10.0817618 21.7091962,10.163215 21.6893661,10.2425356 L19.5680983,18.7276069 C19.234223,20.0631079 18.0342737,21 16.6576708,21 L7.34232922,21 C5.96572629,21 4.76577697,20.0631079 4.43190172,18.7276069 L2.31063391,10.2425356 C2.17668518,9.70674072 2.50244587,9.16380623 3.03824078,9.0298575 C3.11756139,9.01002735 3.1990146,9 3.28077641,9 Z M12,12 C11.4477153,12 11,12.4477153 11,13 L11,17 C11,17.5522847 11.4477153,18 12,18 C12.5522847,18 13,17.5522847 13,17 L13,13 C13,12.4477153 12.5522847,12 12,12 Z M6.96472382,12.1362967 C6.43125772,12.2792385 6.11467523,12.8275755 6.25761704,13.3610416 L7.29289322,17.2247449 C7.43583503,17.758211 7.98417199,18.0747935 8.51763809,17.9318517 C9.05110419,17.7889098 9.36768668,17.2405729 9.22474487,16.7071068 L8.18946869,12.8434035 C8.04652688,12.3099374 7.49818992,11.9933549 6.96472382,12.1362967 Z M17.0352762,12.1362967 C16.5018101,11.9933549 15.9534731,12.3099374 15.8105313,12.8434035 L14.7752551,16.7071068 C14.6323133,17.2405729 14.9488958,17.7889098 15.4823619,17.9318517 C16.015828,18.0747935 16.564165,17.758211 16.7071068,17.2247449 L17.742383,13.3610416 C17.8853248,12.8275755 17.5687423,12.2792385 17.0352762,12.1362967 Z" fill="#dc3545"/></g></svg>',
  NeedHelpBlack = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="26px" height="26px" viewBox="0 0 24 24" version="1.1"> <g class="svg-g" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <rect x="0" y="0" width="24" height="24" /> <circle fill="#000000" opacity="0.3" cx="12" cy="12" r="10" /> <path d="M12,16 C12.5522847,16 13,16.4477153 13,17 C13,17.5522847 12.5522847,18 12,18 C11.4477153,18 11,17.5522847 11,17 C11,16.4477153 11.4477153,16 12,16 Z M10.591,14.868 L10.591,13.209 L11.851,13.209 C13.447,13.209 14.602,11.991 14.602,10.395 C14.602,8.799 13.447,7.581 11.851,7.581 C10.234,7.581 9.121,8.799 9.121,10.395 L7.336,10.395 C7.336,7.875 9.31,5.922 11.851,5.922 C14.392,5.922 16.387,7.875 16.387,10.395 C16.387,12.915 14.392,14.868 11.851,14.868 L10.591,14.868 Z" fill="#000000" /> </g> </svg>',
  NeedHelpBlack24px = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"> <g class="svg-g" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <rect x="0" y="0" width="24" height="24" /> <circle fill="#000000" opacity="0.3" cx="12" cy="12" r="10" /> <path d="M12,16 C12.5522847,16 13,16.4477153 13,17 C13,17.5522847 12.5522847,18 12,18 C11.4477153,18 11,17.5522847 11,17 C11,16.4477153 11.4477153,16 12,16 Z M10.591,14.868 L10.591,13.209 L11.851,13.209 C13.447,13.209 14.602,11.991 14.602,10.395 C14.602,8.799 13.447,7.581 11.851,7.581 C10.234,7.581 9.121,8.799 9.121,10.395 L7.336,10.395 C7.336,7.875 9.31,5.922 11.851,5.922 C14.392,5.922 16.387,7.875 16.387,10.395 C16.387,12.915 14.392,14.868 11.851,14.868 L10.591,14.868 Z" fill="#000000" /> </g> </svg>',
  NeedHelpWhite = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="26px" height="26px" viewBox="0 0 24 24" version="1.1"> <g class="svg-g" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <rect x="0" y="0" width="24" height="24" /> <circle fill="#ffffff" opacity="0.3" cx="12" cy="12" r="10" /> <path d="M12,16 C12.5522847,16 13,16.4477153 13,17 C13,17.5522847 12.5522847,18 12,18 C11.4477153,18 11,17.5522847 11,17 C11,16.4477153 11.4477153,16 12,16 Z M10.591,14.868 L10.591,13.209 L11.851,13.209 C13.447,13.209 14.602,11.991 14.602,10.395 C14.602,8.799 13.447,7.581 11.851,7.581 C10.234,7.581 9.121,8.799 9.121,10.395 L7.336,10.395 C7.336,7.875 9.31,5.922 11.851,5.922 C14.392,5.922 16.387,7.875 16.387,10.395 C16.387,12.915 14.392,14.868 11.851,14.868 L10.591,14.868 Z" fill="#ffffff" /> </g> </svg>',
  ScheduleEventNotificationIcon = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><path d="M7.14319965,19.3575259 C7.67122143,19.7615175 8.25104409,20.1012165 8.87097532,20.3649307 L7.89205065,22.0604779 C7.61590828,22.5387706 7.00431787,22.7026457 6.52602525,22.4265033 C6.04773263,22.150361 5.88385747,21.5387706 6.15999985,21.0604779 L7.14319965,19.3575259 Z M15.1367085,20.3616573 C15.756345,20.0972995 16.3358198,19.7569961 16.8634386,19.3524415 L17.8320512,21.0301278 C18.1081936,21.5084204 17.9443184,22.1200108 17.4660258,22.3961532 C16.9877332,22.6722956 16.3761428,22.5084204 16.1000004,22.0301278 L15.1367085,20.3616573 Z" fill="#5c95c5"/><path d="M12,21 C7.581722,21 4,17.418278 4,13 C4,8.581722 7.581722,5 12,5 C16.418278,5 20,8.581722 20,13 C20,17.418278 16.418278,21 12,21 Z M19.068812,3.25407593 L20.8181344,5.00339833 C21.4039208,5.58918477 21.4039208,6.53893224 20.8181344,7.12471868 C20.2323479,7.71050512 19.2826005,7.71050512 18.696814,7.12471868 L16.9474916,5.37539627 C16.3617052,4.78960984 16.3617052,3.83986237 16.9474916,3.25407593 C17.5332781,2.66828949 18.4830255,2.66828949 19.068812,3.25407593 Z M5.29862906,2.88207799 C5.8844155,2.29629155 6.83416297,2.29629155 7.41994941,2.88207799 C8.00573585,3.46786443 8.00573585,4.4176119 7.41994941,5.00339833 L5.29862906,7.12471868 C4.71284263,7.71050512 3.76309516,7.71050512 3.17730872,7.12471868 C2.59152228,6.53893224 2.59152228,5.58918477 3.17730872,5.00339833 L5.29862906,2.88207799 Z" fill="#5c95c5" opacity="0.3"/><path d="M11.9630156,7.5 L12.0475062,7.5 C12.3043819,7.5 12.5194647,7.69464724 12.5450248,7.95024814 L13,12.5 L16.2480695,14.3560397 C16.403857,14.4450611 16.5,14.6107328 16.5,14.7901613 L16.5,15 C16.5,15.2109164 16.3290185,15.3818979 16.1181021,15.3818979 C16.0841582,15.3818979 16.0503659,15.3773725 16.0176181,15.3684413 L11.3986612,14.1087258 C11.1672824,14.0456225 11.0132986,13.8271186 11.0316926,13.5879956 L11.4644883,7.96165175 C11.4845267,7.70115317 11.7017474,7.5 11.9630156,7.5 Z" fill="#5c95c5"/></g></svg>',
  DetailsNotificationIcon = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><path d="M13.2070325,4 C13.0721672,4.47683179 13,4.97998812 13,5.5 C13,8.53756612 15.4624339,11 18.5,11 C19.0200119,11 19.5231682,10.9278328 20,10.7929675 L20,17 C20,18.6568542 18.6568542,20 17,20 L7,20 C5.34314575,20 4,18.6568542 4,17 L4,7 C4,5.34314575 5.34314575,4 7,4 L13.2070325,4 Z" fill="#5c95c5"/><circle fill="#5c95c5" opacity="0.3" cx="18.5" cy="5.5" r="2.5"/></g></svg>',
  ScheduleRepeat = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24" /><path d="M12,8 L8,8 C5.790861,8 4,9.790861 4,12 L4,13 C4,14.6568542 5.34314575,16 7,16 L7,18 C4.23857625,18 2,15.7614237 2,13 L2,12 C2,8.6862915 4.6862915,6 8,6 L12,6 L12,4.72799742 C12,4.62015048 12.0348702,4.51519416 12.0994077,4.42878885 C12.264656,4.2075478 12.5779675,4.16215674 12.7992086,4.32740507 L15.656242,6.46136716 C15.6951359,6.49041758 15.7295917,6.52497737 15.7585249,6.56395854 C15.9231063,6.78569617 15.876772,7.09886961 15.6550344,7.263451 L12.798001,9.3840407 C12.7118152,9.44801079 12.607332,9.48254921 12.5,9.48254921 C12.2238576,9.48254921 12,9.25869158 12,8.98254921 L12,8 Z" fill="#03a9f4" /><path d="M12.0583175,16 L16,16 C18.209139,16 20,14.209139 20,12 L20,11 C20,9.34314575 18.6568542,8 17,8 L17,6 C19.7614237,6 22,8.23857625 22,11 L22,12 C22,15.3137085 19.3137085,18 16,18 L12.0583175,18 L12.0583175,18.9825492 C12.0583175,19.2586916 11.8344599,19.4825492 11.5583175,19.4825492 C11.4509855,19.4825492 11.3465023,19.4480108 11.2603165,19.3840407 L8.40328311,17.263451 C8.18154548,17.0988696 8.13521119,16.7856962 8.29979258,16.5639585 C8.32872576,16.5249774 8.36318164,16.4904176 8.40207551,16.4613672 L11.2591089,14.3274051 C11.48035,14.1621567 11.7936615,14.2075478 11.9589099,14.4287888 C12.0234473,14.5151942 12.0583175,14.6201505 12.0583175,14.7279974 L12.0583175,16 Z" fill="#03a9f4" opacity="0.3" /></g></svg>',
  ScheduleReminder = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><path d="M10.9630156,7.5 L11.0475062,7.5 C11.3043819,7.5 11.5194647,7.69464724 11.5450248,7.95024814 L12,12.5 L15.2480695,14.3560397 C15.403857,14.4450611 15.5,14.6107328 15.5,14.7901613 L15.5,15 C15.5,15.2109164 15.3290185,15.3818979 15.1181021,15.3818979 C15.0841582,15.3818979 15.0503659,15.3773725 15.0176181,15.3684413 L10.3986612,14.1087258 C10.1672824,14.0456225 10.0132986,13.8271186 10.0316926,13.5879956 L10.4644883,7.96165175 C10.4845267,7.70115317 10.7017474,7.5 10.9630156,7.5 Z" fill="#03a9f4"/><path d="M7.38979581,2.8349582 C8.65216735,2.29743306 10.0413491,2 11.5,2 C17.2989899,2 22,6.70101013 22,12.5 C22,18.2989899 17.2989899,23 11.5,23 C5.70101013,23 1,18.2989899 1,12.5 C1,11.5151324 1.13559454,10.5619345 1.38913364,9.65805651 L3.31481075,10.1982117 C3.10672013,10.940064 3,11.7119264 3,12.5 C3,17.1944204 6.80557963,21 11.5,21 C16.1944204,21 20,17.1944204 20,12.5 C20,7.80557963 16.1944204,4 11.5,4 C10.54876,4 9.62236069,4.15592757 8.74872191,4.45446326 L9.93948308,5.87355717 C10.0088058,5.95617272 10.0495583,6.05898805 10.05566,6.16666224 C10.0712834,6.4423623 9.86044965,6.67852665 9.5847496,6.69415008 L4.71777931,6.96995273 C4.66931162,6.97269931 4.62070229,6.96837279 4.57348157,6.95710938 C4.30487471,6.89303938 4.13906482,6.62335149 4.20313482,6.35474463 L5.33163823,1.62361064 C5.35654118,1.51920756 5.41437908,1.4255891 5.49660017,1.35659741 C5.7081375,1.17909652 6.0235153,1.2066885 6.2010162,1.41822583 L7.38979581,2.8349582 Z" fill="#03a9f4" opacity="0.3"/></g></svg>',
  SchedulePeople = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><polygon points="0 0 24 0 24 24 0 24"/><path d="M12,11 C9.790861,11 8,9.209139 8,7 C8,4.790861 9.790861,3 12,3 C14.209139,3 16,4.790861 16,7 C16,9.209139 14.209139,11 12,11 Z" fill="#03a9f4" fill-rule="nonzero" opacity="0.3"/><path d="M3.00065168,20.1992055 C3.38825852,15.4265159 7.26191235,13 11.9833413,13 C16.7712164,13 20.7048837,15.2931929 20.9979143,20.2 C21.0095879,20.3954741 20.9979143,21 20.2466999,21 C16.541124,21 11.0347247,21 3.72750223,21 C3.47671215,21 2.97953825,20.45918 3.00065168,20.1992055 Z" fill="#03a9f4" fill-rule="nonzero"/></g></svg>',
  ScheduleRole = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><polygon points="0 0 24 0 24 24 0 24"/><path d="M18,14 C16.3431458,14 15,12.6568542 15,11 C15,9.34314575 16.3431458,8 18,8 C19.6568542,8 21,9.34314575 21,11 C21,12.6568542 19.6568542,14 18,14 Z M9,11 C6.790861,11 5,9.209139 5,7 C5,4.790861 6.790861,3 9,3 C11.209139,3 13,4.790861 13,7 C13,9.209139 11.209139,11 9,11 Z" fill="#03a9f4" fill-rule="nonzero" opacity="0.3"/><path d="M17.6011961,15.0006174 C21.0077043,15.0378534 23.7891749,16.7601418 23.9984937,20.4 C24.0069246,20.5466056 23.9984937,21 23.4559499,21 L19.6,21 C19.6,18.7490654 18.8562935,16.6718327 17.6011961,15.0006174 Z M0.00065168429,20.1992055 C0.388258525,15.4265159 4.26191235,13 8.98334134,13 C13.7712164,13 17.7048837,15.2931929 17.9979143,20.2 C18.0095879,20.3954741 17.9979143,21 17.2466999,21 C13.541124,21 8.03472472,21 0.727502227,21 C0.476712155,21 -0.0204617505,20.45918 0.00065168429,20.1992055 Z" fill="#03a9f4" fill-rule="nonzero"/></g></svg>',
  ScheduleDescription = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><polygon points="0 0 24 0 24 24 0 24"/><path d="M5.85714286,2 L13.7364114,2 C14.0910962,2 14.4343066,2.12568431 14.7051108,2.35473959 L19.4686994,6.3839416 C19.8056532,6.66894833 20,7.08787823 20,7.52920201 L20,20.0833333 C20,21.8738751 19.9795521,22 18.1428571,22 L5.85714286,22 C4.02044787,22 4,21.8738751 4,20.0833333 L4,3.91666667 C4,2.12612489 4.02044787,2 5.85714286,2 Z" fill="#03a9f4" fill-rule="nonzero" opacity="0.3"/><rect fill="#03a9f4" x="6" y="11" width="9" height="2" rx="1"/><rect fill="#03a9f4" x="6" y="15" width="5" height="2" rx="1"/></g></svg>',
  ScheduleInfo = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><circle fill="#03a9f4" opacity="0.3" cx="12" cy="12" r="10"/><rect fill="#03a9f4" x="11" y="10" width="2" height="7" rx="1"/><rect fill="#03a9f4" x="11" y="7" width="2" height="2" rx="1"/></g></svg>',
  ScheduleComplete = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><circle fill="#4cae4c" opacity="0.3" cx="12" cy="12" r="10"/><path d="M16.7689447,7.81768175 C17.1457787,7.41393107 17.7785676,7.39211077 18.1823183,7.76894473 C18.5860689,8.1457787 18.6078892,8.77856757 18.2310553,9.18231825 L11.2310553,16.6823183 C10.8654446,17.0740439 10.2560456,17.107974 9.84920863,16.7592566 L6.34920863,13.7592566 C5.92988278,13.3998345 5.88132125,12.7685345 6.2407434,12.3492086 C6.60016555,11.9298828 7.23146553,11.8813212 7.65079137,12.2407434 L10.4229928,14.616916 L16.7689447,7.81768175 Z" fill="#4cae4c" fill-rule="nonzero"/></g></svg>',
  ScheduleLink = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><path d="M11.7573593,15.2426407 L8.75735931,15.2426407 C8.20507456,15.2426407 7.75735931,15.6903559 7.75735931,16.2426407 C7.75735931,16.7949254 8.20507456,17.2426407 8.75735931,17.2426407 L11.7573593,17.2426407 L11.7573593,18.2426407 C11.7573593,19.3472102 10.8619288,20.2426407 9.75735931,20.2426407 L5.75735931,20.2426407 C4.65278981,20.2426407 3.75735931,19.3472102 3.75735931,18.2426407 L3.75735931,14.2426407 C3.75735931,13.1380712 4.65278981,12.2426407 5.75735931,12.2426407 L9.75735931,12.2426407 C10.8619288,12.2426407 11.7573593,13.1380712 11.7573593,14.2426407 L11.7573593,15.2426407 Z" fill="#03a9f4" opacity="0.3" transform="translate(7.757359, 16.242641) rotate(-45.000000) translate(-7.757359, -16.242641) "/><path d="M12.2426407,8.75735931 L15.2426407,8.75735931 C15.7949254,8.75735931 16.2426407,8.30964406 16.2426407,7.75735931 C16.2426407,7.20507456 15.7949254,6.75735931 15.2426407,6.75735931 L12.2426407,6.75735931 L12.2426407,5.75735931 C12.2426407,4.65278981 13.1380712,3.75735931 14.2426407,3.75735931 L18.2426407,3.75735931 C19.3472102,3.75735931 20.2426407,4.65278981 20.2426407,5.75735931 L20.2426407,9.75735931 C20.2426407,10.8619288 19.3472102,11.7573593 18.2426407,11.7573593 L14.2426407,11.7573593 C13.1380712,11.7573593 12.2426407,10.8619288 12.2426407,9.75735931 L12.2426407,8.75735931 Z" fill="#03a9f4" transform="translate(16.242641, 7.757359) rotate(-45.000000) translate(-16.242641, -7.757359) "/><path d="M5.89339828,3.42893219 C6.44568303,3.42893219 6.89339828,3.87664744 6.89339828,4.42893219 L6.89339828,6.42893219 C6.89339828,6.98121694 6.44568303,7.42893219 5.89339828,7.42893219 C5.34111353,7.42893219 4.89339828,6.98121694 4.89339828,6.42893219 L4.89339828,4.42893219 C4.89339828,3.87664744 5.34111353,3.42893219 5.89339828,3.42893219 Z M11.4289322,5.13603897 C11.8194565,5.52656326 11.8194565,6.15972824 11.4289322,6.55025253 L10.0147186,7.96446609 C9.62419433,8.35499039 8.99102936,8.35499039 8.60050506,7.96446609 C8.20998077,7.5739418 8.20998077,6.94077682 8.60050506,6.55025253 L10.0147186,5.13603897 C10.4052429,4.74551468 11.0384079,4.74551468 11.4289322,5.13603897 Z M0.600505063,5.13603897 C0.991029355,4.74551468 1.62419433,4.74551468 2.01471863,5.13603897 L3.42893219,6.55025253 C3.81945648,6.94077682 3.81945648,7.5739418 3.42893219,7.96446609 C3.0384079,8.35499039 2.40524292,8.35499039 2.01471863,7.96446609 L0.600505063,6.55025253 C0.209980772,6.15972824 0.209980772,5.52656326 0.600505063,5.13603897 Z" fill="#03a9f4" opacity="0.3" transform="translate(6.014719, 5.843146) rotate(-45.000000) translate(-6.014719, -5.843146) "/><path d="M17.9142136,15.4497475 C18.4664983,15.4497475 18.9142136,15.8974627 18.9142136,16.4497475 L18.9142136,18.4497475 C18.9142136,19.0020322 18.4664983,19.4497475 17.9142136,19.4497475 C17.3619288,19.4497475 16.9142136,19.0020322 16.9142136,18.4497475 L16.9142136,16.4497475 C16.9142136,15.8974627 17.3619288,15.4497475 17.9142136,15.4497475 Z M23.4497475,17.1568542 C23.8402718,17.5473785 23.8402718,18.1805435 23.4497475,18.5710678 L22.0355339,19.9852814 C21.6450096,20.3758057 21.0118446,20.3758057 20.6213203,19.9852814 C20.2307961,19.5947571 20.2307961,18.9615921 20.6213203,18.5710678 L22.0355339,17.1568542 C22.4260582,16.76633 23.0592232,16.76633 23.4497475,17.1568542 Z M12.6213203,17.1568542 C13.0118446,16.76633 13.6450096,16.76633 14.0355339,17.1568542 L15.4497475,18.5710678 C15.8402718,18.9615921 15.8402718,19.5947571 15.4497475,19.9852814 C15.0592232,20.3758057 14.4260582,20.3758057 14.0355339,19.9852814 L12.6213203,18.5710678 C12.2307961,18.1805435 12.2307961,17.5473785 12.6213203,17.1568542 Z" fill="#03a9f4" opacity="0.3" transform="translate(18.035534, 17.863961) scale(1, -1) rotate(45.000000) translate(-18.035534, -17.863961) "/></g></svg>',
  NoNotification = '<svg id="9af98f83-10c5-4067-bc84-20554b2827d8" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="125" height="auto" viewBox="0 0 1009.54 789.93"><defs><linearGradient id="07c62293-c0d3-4921-8e06-4e39241449cd" x1="318.22" y1="488.45" x2="630.35" y2="488.45" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="gray" stop-opacity="0.25"/><stop offset="0.54" stop-color="gray" stop-opacity="0.12"/><stop offset="1" stop-color="gray" stop-opacity="0.1"/></linearGradient></defs><title>empty</title><ellipse cx="354.13" cy="741.27" rx="176.1" ry="33.36" fill="#00b0ff" opacity="0.1"/><path d="M681.78,166.43c-64.72-2.24-126.36-23.14-185.22-46S379.4,72.25,316.23,60.14C275.6,52.35,229.13,51.24,196.4,73c-31.51,21-41.69,57.15-47.16,90.72-4.12,25.26-6.54,51.85,4.74,75.5,7.84,16.42,21.74,30.22,31.36,45.95,33.47,54.72,9.81,122.2-26.45,175.63-17,25.06-36.75,49-49.88,75.65S89.81,593.74,101.3,621c11.38,27,38.51,47.24,67.9,61.49,59.69,28.95,130,37.23,198.61,41.93,151.83,10.38,304.46,5.89,456.69,1.38,56.34-1.66,112.92-3.35,168.34-12.06,30.78-4.84,62.55-12.52,84.9-31.06,28.36-23.53,35.39-63.37,16.38-92.87-31.88-49.5-120-61.79-142.31-114.9-12.26-29.24.33-61.8,18.16-88.91,38.24-58.17,102.33-109.2,105.7-175.68,2.32-45.66-28.49-91.39-76.13-113-49.93-22.65-119.18-19.8-156,17.69C805.59,153.57,738.93,168.42,681.78,166.43Z" transform="translate(-95.23 -55.03)" fill="#00b0ff" opacity="0.1"/><path d="M630.35,416.77l-30.63-20.65h0l15.45-23-80.9-6.45L505.2,389.15l-36.39-20.4-30.35,3.65-.36-8a225.78,225.78,0,0,0-2.51-24.9c.13-2.5.22-5.37.21-8.49,0-13.15-1.78-30.58-9.6-42.2L428,272.63,413.4,255.38a110.37,110.37,0,0,1,8-13.46c.5-.72,1-1.42,1.54-2.1,18.95-1.37,33.9-16.95,33.9-36,0-.88,0-1.76-.1-2.63,0-.35-.07-.71-.11-1.06,1.85,1,3.72,2,5.59,3,.35.5.75,1,1.19,1.59l0,0,.09.11.56.69.18.21c.2.24.41.47.62.71l.14.16c.53.59,1.09,1.19,1.69,1.78a1.8,1.8,0,0,1,.2.19l.75.7.21.19c.64.57,1.32,1.12,2,1.64l.22.16.86.59.28.18c.33.2.67.41,1,.6l.12.07c.39.21.79.41,1.19.6l.2.08q.51.22,1,.42l.31.11c.35.12.69.23,1.05.33l.22.06c.44.11.88.2,1.33.27h.05a10.88,10.88,0,0,0,1.28.13h.29a11,11,0,0,0,1.15,0h.25a11.85,11.85,0,0,0,1.43-.17,15.78,15.78,0,0,0,6.3-2.26,5.5,5.5,0,0,0,1.28-1.19c2-2.62-.2-5.49-.2-5.49h0c-.78-1.86-5.84-3.17-5.84-3.17s-16-6.68-16-12-4-32.92-45.29-39.23c0,0-26.86-1.51-34.41,12.87l-.16,1.68c-2.22,1.39-4.06,4.18-6.25,5a10.21,10.21,0,0,0-2.71,1l0-.19h0a2.58,2.58,0,0,0-.61.79,8,8,0,0,0-.83,3,11.3,11.3,0,0,1-1.31,3.63,8.07,8.07,0,0,1-.6.92h0l-.17.27a7.3,7.3,0,0,0,3.4-.55,16.93,16.93,0,0,1-1,4,3.32,3.32,0,0,0,3.08-1.84l0-.08.13-.18a8.44,8.44,0,0,0,.62-1.45l-.11.12c.2-.65.38-1.31.6-1.95a3.06,3.06,0,0,1,.49-1,2.42,2.42,0,0,1,2.07-.69l-.41,8.67h.18a11.83,11.83,0,0,1-.88,1.82c-1.42,2.3-4,3.87-4.95,6.39a9.4,9.4,0,0,0-.46,3.78c0,.75.09,1.51.15,2.26v-.06c.14,2,.18,3.9-.9,5.51-.74,1.1-1.93,1.93-2.34,3.18a3.1,3.1,0,0,0-.15,1.08,12.13,12.13,0,0,0,.68,3.21.14.14,0,0,0,0-.06,4.88,4.88,0,0,1,.17,2.36c-.45,2-2.88,3.67-2.76,5.58a2.15,2.15,0,0,0,.11.74,4.05,4.05,0,0,0,2.26,2,8.8,8.8,0,0,0,5.08,1.12,6.68,6.68,0,0,0,1.9-.65c-.7,1.61-1.42,3.2-2.15,4.71-.11.24-.23.48-.35.72,0,0-6.18-4.13-9.69,4.29a18.68,18.68,0,0,0-2.17,5.64,13.42,13.42,0,0,1-.74,2.32,14.93,14.93,0,0,1-6.68,6c-7.16,3.28-36.08,39.35-36.59,48.69a54.49,54.49,0,0,1-1.84,10.78,64.15,64.15,0,0,0-1.72,25.49,48.77,48.77,0,0,0,1.77,8.13c3.07,9.33,5.12,26.74,5.12,26.74l3.32,30.22a86,86,0,0,0,.54,12.49c-3.39,3.87-17,20-11.8,24.39,4,3.46,11,2.89,14.93,2.18-3.31,8.19-8.52,22.43-9.21,32.21-1,14.47,1.71,33.64,6,41s18.59,26.24,18.59,26.24-.67,25.9,4.44,35.31,7.17,28.93,7.17,28.93,4.77,16.48,2.38,22.54,4.43,11.1-2.73,15.13-16.32,94.86-16.32,94.86-3.69,59.53,0,62.56a3.75,3.75,0,0,0,.63.37v20s-2.56,4.2,7.85,5.05c7.13.57,27.34,1.86,39.33,2.61l9.29.58s22,4.38,31.72,0,26.95-4.28,24.39-15.85a32.92,32.92,0,0,0-1.36-4.63c-2.81-7.18-7.58-8-16.37-10-.51-.11-1-.21-1.45-.29-9.26-1.61-12.3,2.7-17.49-2.91-4.51-4.85-18.87-10.28-23.76-12,.12-.36.27-.71.39-1.08a7.32,7.32,0,0,1-3.71-1.81l13.25.84,7.89.49s18.7,3.73,27,0,22.9-3.63,20.72-13.46a28.21,28.21,0,0,0-1.15-3.94c-2.39-6.1-6.45-6.77-13.92-8.46-.43-.09-.83-.18-1.23-.25-7.87-1.37-10.45,2.29-14.86-2.47-3.78-4.06-15.71-8.61-20-10.16,0-2.22-3-5.38-4.89-8.55-2.22-3.7,1.88-16.65,1.88-16.65L411,658.74a10.38,10.38,0,0,1,2.8-.8s10.58-10.1,8.19-20.86a69.13,69.13,0,0,1-.76-9.83c3.48-3.23,8.27-8,9.63-10.94,2.22-4.79,0-28,0-28V499.56l17.7,1.79L464.62,503l4.89.5,16.06,1.62,36.91,3.73,33.26-6.3,14.39-2.72,29.59-5.6V421.83ZM386.74,176.86l-2.06-.22C385.36,176.67,386.08,176.8,386.74,176.86Z" transform="translate(-95.23 -55.03)" fill="url(#07c62293-c0d3-4921-8e06-4e39241449cd)"/><path d="M558.56,463.78c-10,14.31-45.95,6.73-45.95,6.73l-27.86-26.07L481,440.91l6.29-13.36s2,.55,5.43,1.53C510.73,434.31,567,451.75,558.56,463.78Z" transform="translate(-95.23 -55.03)" fill="#efb7b9"/><path d="M492.7,429.08c-1.23,4.28-4.6,10.69-7.95,15.36L481,440.91l6.29-13.36S489.31,428.1,492.7,429.08Z" transform="translate(-95.23 -55.03)" opacity="0.1"/><path d="M397.15,278.42s-25.68,11.39-24.42,39.36a461.14,461.14,0,0,0,5.88,53.76s-5.25,42.09,16.61,52.94,42.09,19.77,42.09,19.77,34.2,3.68,38.45,5.2,17.53-21.72,15.08-25.34S457,412.9,453,406.86s-13.25-9.77-13.25-9.77-9.55-5.78-10.2-11,1.87-9.11,2.51-11.4,2.26-24.4,2.26-24.4S445.1,271.59,397.15,278.42Z" transform="translate(-95.23 -55.03)" fill="#dce6f2"/><path d="M414.1,370.39s-35.23,5.9-31.82,18.23C382.28,388.62,395.07,375.31,414.1,370.39Z" transform="translate(-95.23 -55.03)" opacity="0.1"/><path d="M414.37,375.38S395,391.19,398.79,392,414.37,375.38,414.37,375.38Z" transform="translate(-95.23 -55.03)" opacity="0.1"/><path d="M423.68,380.89s-5.19,10.63-2,9.91S423.68,380.89,423.68,380.89Z" transform="translate(-95.23 -55.03)" opacity="0.1"/><path d="M494,430.21l-2.14-.61c.61-2,.78-3.62.28-4.37-2.45-3.62-33.82-11.2-37.81-17.25s-13.25-9.77-13.25-9.77-9.55-5.78-10.2-11,1.87-9.11,2.51-11.4,2.26-24.41,2.26-24.41,10.75-78.69-37.2-71.86c0,0-25.68,11.4-24.43,39.37a459.85,459.85,0,0,0,5.89,53.76s-5.25,42.09,16.61,52.94,42.09,19.77,42.09,19.77,34.19,3.67,38.45,5.2c1.61.58,4.52-2.41,7.37-6.52l1.62,1.51,27.86,26.06s35.95,7.59,45.95-6.72C568.31,452.87,512.05,435.43,494,430.21Z" transform="translate(-95.23 -55.03)" opacity="0.1"/><path d="M382.37,173.44a8.5,8.5,0,0,0-2.77,1.07c-1,.83-1,2.25-1.25,3.49a11.48,11.48,0,0,1-2,4.78,7.19,7.19,0,0,0,3.33-.55,17.14,17.14,0,0,1-1,4,3.24,3.24,0,0,0,3-1.83,19.26,19.26,0,0,0,1.25-3.51,2.89,2.89,0,0,1,.48-1c.92-1.09,2.63-.6,4.05-.46a6.65,6.65,0,0,0,6.08-2.92c1.51-2.29,1.6-8.15-2-8.77C387.78,167.12,385.44,172.3,382.37,173.44Z" transform="translate(-95.23 -55.03)" fill="#965d7b"/><g opacity="0.1"><path d="M379.5,175.74c.09-.49.15-1,.26-1.49h0c-.95.83-1,2.24-1.25,3.49a11,11,0,0,1-.59,2.11A11.46,11.46,0,0,0,379.5,175.74Z" transform="translate(-95.23 -55.03)"/><path d="M379.82,184a16.63,16.63,0,0,0,1-4,7.16,7.16,0,0,1-3.17.55,11.57,11.57,0,0,1-1.15,2,7.12,7.12,0,0,0,3.32-.54,16.63,16.63,0,0,1-1,4,3.25,3.25,0,0,0,3-1.83,7.46,7.46,0,0,0,.6-1.43A3,3,0,0,1,379.82,184Z" transform="translate(-95.23 -55.03)"/><path d="M388.6,177.2c-1.42-.14-3.14-.63-4.06.46a3.09,3.09,0,0,0-.48,1c-.09.26-.17.53-.24.8.95-.75,2.49-.35,3.78-.22a6.68,6.68,0,0,0,6.08-2.92,5.54,5.54,0,0,0,.67-1.57A6.66,6.66,0,0,1,388.6,177.2Z" transform="translate(-95.23 -55.03)"/></g><polygon points="317.24 201 332.49 219.34 330.5 237.85 312.07 209 317.24 201" fill="#dce6f2"/><polygon points="332.48 219.34 330.61 236.75 330.49 237.85 313.86 211.81 312.07 209 312.59 208.19 317.23 201 318.26 202.24 332.48 219.34" opacity="0.1"/><path d="M435.63,231.2c-5.16,1.48-10.09,6.56-14.38,12.73a108.65,108.65,0,0,0-7.76,13.34c-1.41,2.82-2.65,5.53-3.68,7.89l-.72,1.68c-1.74,4.11-2.71,6.86-2.71,6.86S366.88,244,373.13,242c2.1-.67,4.86-5.17,7.59-10.84l.34-.72c1.73-3.64,3.43-7.7,4.94-11.52,3.09-7.85,5.38-14.67,5.38-14.67S451.38,226.7,435.63,231.2Z" transform="translate(-95.23 -55.03)" fill="#efb7b9"/><path d="M459.26,202.58s9.12,16.5,21.37,14.25,7.21-8.86,7.21-8.86Z" transform="translate(-95.23 -55.03)" fill="#444053"/><path d="M441.59,773.73c-8.08,3.69-26.35,0-26.35,0l-7.7-.48c-10-.64-26.74-1.72-32.66-2.2-8.64-.71-6.52-4.25-6.52-4.25V745.41l41.92-10.62s16.57,5.67,21.11,10.62c4.31,4.72,6.83,1.09,14.52,2.45.38.07.78.15,1.2.25,7.3,1.67,11.26,2.33,13.6,8.38a28.1,28.1,0,0,1,1.13,3.9C464,770.13,449.66,770.06,441.59,773.73Z" transform="translate(-95.23 -55.03)" fill="#a36468"/><path d="M460.71,756.49a31.34,31.34,0,0,1-4.72,2.42c-5.5,2.51-10.73,5.57-16.29,7.94s-11.55,4.06-17.57,3.61c-3.15-.23-6.37-1-9.38-.1a21.66,21.66,0,0,0-5.21,2.89c-10-.64-26.74-1.72-32.66-2.2-8.64-.71-6.52-4.25-6.52-4.25v-2.5c.31,0,.66-.09,1.06-.12a18.88,18.88,0,0,1,6.1.91c4.34,1.18,8.66,2.34,13,3.5a10.27,10.27,0,0,1,5-6.38,15.94,15.94,0,0,1,8.06-1.85c6.73.09,13.1,3.28,19.82,3.6a10.92,10.92,0,0,0,5.49-.92c.92-.46,1.73-1.13,2.63-1.64a19.2,19.2,0,0,1,4.53-1.53A99.76,99.76,0,0,0,447,755.69c1.2-.47,2.6-1.32,2.44-2.6-.21-1.7-2.88-1.9-3.58-3.46a2,2,0,0,1,.08-1.77c.38.07.78.15,1.2.25C454.41,749.78,458.37,750.44,460.71,756.49Z" transform="translate(-95.23 -55.03)" opacity="0.1"/><path d="M433.05,820.53c-9.5,4.34-31,0-31,0L393,820c-11.72-.75-31.46-2-38.43-2.59-10.17-.84-7.67-5-7.67-5V787.2l49.33-12.5s19.5,6.67,24.84,12.5c5.07,5.55,8,1.28,17.09,2.88.45.08.92.18,1.41.29,8.59,2,13.25,2.75,16,9.87a32.1,32.1,0,0,1,1.33,4.59C459.38,816.29,442.55,816.2,433.05,820.53Z" transform="translate(-95.23 -55.03)" fill="#a36468"/><path d="M455.55,800.24a37.23,37.23,0,0,1-5.55,2.85c-6.47,2.95-12.63,6.55-19.17,9.34s-13.59,4.77-20.68,4.25c-3.7-.27-7.49-1.2-11-.12A25.5,25.5,0,0,0,393,820c-11.72-.75-31.46-2-38.43-2.59-10.17-.84-7.67-5-7.67-5v-2.94a12.5,12.5,0,0,1,1.25-.14,21.94,21.94,0,0,1,7.18,1.07l15.29,4.12a12.1,12.1,0,0,1,5.93-7.51,18.66,18.66,0,0,1,9.49-2.18c7.92.11,15.41,3.86,23.32,4.24A12.91,12.91,0,0,0,415.8,808c1.09-.55,2-1.34,3.1-1.93a21.75,21.75,0,0,1,5.33-1.8,119.69,119.69,0,0,0,15.16-4.92c1.41-.56,3.06-1.56,2.87-3.06-.25-2-3.39-2.24-4.22-4.08a2.41,2.41,0,0,1,.1-2.08c.45.08.92.18,1.41.29C448.14,792.34,452.8,793.12,455.55,800.24Z" transform="translate(-95.23 -55.03)" opacity="0.1"/><path d="M411.55,647.54l-2.67,62.83s-4,12.83-1.83,16.5,5.83,7.33,4.5,9.5S394.22,762,389.05,753s-10.27-48-10.27-48l4.77-48.17Z" transform="translate(-95.23 -55.03)" fill="#444053"/><path d="M423.13,491l7.42,9.92V587.2s2.17,23,0,27.75-13.17,14.25-13.17,14.25l-9.25-47.5,2-50.25Z" transform="translate(-95.23 -55.03)" fill="#444053"/><path d="M411.55,647.54l-2.67,62.83s-4,12.83-1.83,16.5,5.83,7.33,4.5,9.5S394.22,762,389.05,753s-10.27-48-10.27-48l4.77-48.17Z" transform="translate(-95.23 -55.03)" opacity="0.1"/><path d="M423.13,491l7.42,9.92V587.2s2.17,23,0,27.75-13.17,14.25-13.17,14.25l-9.25-47.5,2-50.25Z" transform="translate(-95.23 -55.03)" opacity="0.1"/><path d="M430.55,454.2v46.67l-8.33,36.33s-2.67,87.67-.34,98.33-8,20.67-8,20.67-6,.67-6,5.33-10,18-10,18l.33,26s4.34,48.67-2.33,58,2.33,10.67,2.33,10.67c-8.33,27.33-48.33,21-51.94,18s0-62,0-62,8.94-90,15.94-94,.34-9,2.67-15-2.33-22.33-2.33-22.33-2-19.34-7-28.67-4.34-35-4.34-35-14-18.67-18.16-26-6.84-26.33-5.84-40.67c.68-9.69,5.77-23.8,9-31.92,1.55-3.89,2.67-6.41,2.67-6.41l.95.25,54.62,14.3Z" transform="translate(-95.23 -55.03)" fill="#444053"/><path d="M435.63,231.2c-5.16,1.48-10.09,6.56-14.38,12.73l-1.12,0a35.72,35.72,0,0,1-31-17.93,35.18,35.18,0,0,1-3.14-7.15c3.09-7.85,5.38-14.67,5.38-14.67S451.38,226.7,435.63,231.2Z" transform="translate(-95.23 -55.03)" opacity="0.1"/><path d="M455.88,206.2A35.75,35.75,0,1,1,389,188.68a34.93,34.93,0,0,1,3.78-5.46A36.18,36.18,0,0,1,401,176a35.75,35.75,0,0,1,54.83,27.58C455.85,204.46,455.88,205.33,455.88,206.2Z" transform="translate(-95.23 -55.03)" fill="#efb7b9"/><path d="M425.84,291.78l-.12,1.1-16.63-26c-1.74,4.11-2.71,6.86-2.71,6.86S366.88,244,373.13,242c2.1-.67,4.86-5.17,7.59-10.84l.34-.72c2.9,8.64,19.75,25.91,26.76,32.83.81.8,1.48,1.46,2,1.94l1.07,1,.56.56C414,269.4,424.76,281,425.84,291.78Z" transform="translate(-95.23 -55.03)" opacity="0.1"/><path d="M438.27,380l-1.82,58.57L436.13,449s-21.56-2-41.68-4.2c-16.2-1.77-31.47-3.68-33.82-4.8-3-1.41-9.43-2.5-14.5-3.19-3.92-.53-7-.81-7-.81s-1.15.34-2.92.66c-3.86.7-10.64,1.27-14.59-2.16-5.05-4.39,8.22-20.34,11.53-24.17l.73-.83-1.25-11.55L329.38,368s-2-17.25-5-26.5a48.88,48.88,0,0,1-1.73-8.05,64.48,64.48,0,0,1,1.68-25.26,55.08,55.08,0,0,0,1.8-10.69c.5-9.25,28.75-45,35.75-48.25a14.84,14.84,0,0,0,7.16-7.14,13.64,13.64,0,0,0,1.09-3.11c3-13,10.59-7.84,10.59-7.84,1.83,10.17,30.16,37.09,30.16,37.09l.56.56c2.81,2.88,15.33,16.4,14.44,27.94a33.87,33.87,0,0,0,1.89,12.64,213.75,213.75,0,0,1,9.85,56Z" transform="translate(-95.23 -55.03)" fill="#dce6f2"/><path d="M398.13,310.45s-7,17-12.25,19.75S400.63,336,398.13,310.45Z" transform="translate(-95.23 -55.03)" opacity="0.1"/><path d="M403.38,342.2s-16,2-16,5S403.38,342.2,403.38,342.2Z" transform="translate(-95.23 -55.03)" opacity="0.1"/><path d="M420.13,361.7s-23.25,49.5-29.75,51S420.13,361.7,420.13,361.7Z" transform="translate(-95.23 -55.03)" opacity="0.1"/><path d="M410.44,270.76l-19.23,8.36L368,244.06a13.64,13.64,0,0,0,1.09-3.11c3-13,10.59-7.84,10.59-7.84,1.83,10.17,30.16,37.09,30.16,37.09Z" transform="translate(-95.23 -55.03)" opacity="0.1"/><path d="M411.44,268.76l-19.23,8.36L369,242.06a13.64,13.64,0,0,0,1.09-3.11c3-13,10.59-7.84,10.59-7.84,1.83,10.17,30.16,37.09,30.16,37.09Z" transform="translate(-95.23 -55.03)" fill="#dce6f2"/><path d="M436.13,449s-21.56-2-41.68-4.2l36.1,9.45v11c-1.58,1.43-2.95,2.17-3.84,1.79-4.16-1.75-38.11-7.25-38.11-7.25s-19.72-10-41-22a16.43,16.43,0,0,1-1.5-.94,23.64,23.64,0,0,1-6.3-6.31c-3.93-5.69-5.85-13-6.68-20.17a87.22,87.22,0,0,1-.52-12.38A101.51,101.51,0,0,1,333.88,384a460.08,460.08,0,0,1-3-54c.25-28,26.5-38,26.5-38,48.25-4.25,33.29,73.75,33.29,73.75s-2.79,22-3.55,24.25-3.49,6-3.12,11.25,9.59,11.53,9.59,11.53,9,4.22,12.71,10.47c2.7,4.61,20.24,10.86,30.15,15.32Z" transform="translate(-95.23 -55.03)" opacity="0.1"/><path d="M452.29,184a11.32,11.32,0,0,1-1,4.78,29.55,29.55,0,0,1-1.78,3.56,16.4,16.4,0,0,1-4.38,5.44c-2.31,1.65-5.23,2.11-8,2.78s-5.65,1.74-7.23,4.1a14.34,14.34,0,0,0-1.69,4.9,10.54,10.54,0,0,1-2,4.74,3.93,3.93,0,0,1-4.68,1.12,4.73,4.73,0,0,1-1.81-2.33c-1.14-2.57-1.43-5.42-1.89-8.19s-1.11-5.62-2.81-7.85-4.71-3.7-7.38-2.83a7.11,7.11,0,0,0-4,3.88,22.24,22.24,0,0,0-1.51,5.52q-1.86,10.18-4.39,20.24a1.86,1.86,0,0,1-.33.76,1.44,1.44,0,0,1-1,.42c-2.24.3-4.39-1.27-6.65-1.1a3.82,3.82,0,0,0-.69.11,35.73,35.73,0,0,1,3.61-40.8l.18-.05a10.78,10.78,0,0,0,4-2.52,42.22,42.22,0,0,0,4-4.63l.8-1a45.61,45.61,0,0,1,7.8-7.41,8,8,0,0,1,2.66-1.44,7.88,7.88,0,0,1,2.52-.08,63.57,63.57,0,0,0,10.41.39,66.79,66.79,0,0,1,7.31-.74c6.33.18,11.73,4.65,15.73,9.55C450.24,177.83,452.16,180.72,452.29,184Z" transform="translate(-95.23 -55.03)" opacity="0.1"/><path d="M384.33,189.63c-1.39,2.28-3.9,3.83-4.84,6.33-1.38,3.63.95,8.15-1.19,11.39-.71,1.09-1.88,1.9-2.28,3.15-.68,2.11,1.18,4.36.7,6.53s-3.34,4-2.58,6.12a4,4,0,0,0,2.2,2,8.6,8.6,0,0,0,5,1.11c2.73-.45,4.76-3.13,7.53-3.33,2.25-.16,4.4,1.4,6.64,1.11a1.5,1.5,0,0,0,1-.43,1.73,1.73,0,0,0,.33-.76q2.52-10.05,4.4-20.24a21.8,21.8,0,0,1,1.5-5.52,7.17,7.17,0,0,1,4-3.88c2.67-.86,5.67.6,7.38,2.83s2.36,5.08,2.82,7.85.75,5.62,1.88,8.19a4.78,4.78,0,0,0,1.82,2.34c1.5.87,3.52.18,4.67-1.12a10.43,10.43,0,0,0,2-4.75,14.28,14.28,0,0,1,1.69-4.89c1.58-2.36,4.47-3.43,7.23-4.1s5.67-1.14,8-2.79a16.46,16.46,0,0,0,4.38-5.43c1.48-2.58,2.86-5.38,2.74-8.35-.13-3.24-2.05-6.13-4.1-8.65-4-4.9-9.41-9.37-15.74-9.54a62.2,62.2,0,0,0-7.31.74,62.57,62.57,0,0,1-10.41-.4,8.18,8.18,0,0,0-2.52.09,7.54,7.54,0,0,0-2.65,1.44,45.63,45.63,0,0,0-7.81,7.4,57.31,57.31,0,0,1-4.82,5.6,10.85,10.85,0,0,1-4,2.53c-1,.28-2,.08-2.95.39C386.09,183.52,385.7,187.37,384.33,189.63Z" transform="translate(-95.23 -55.03)" fill="#965d7b"/><path d="M480.63,216.82c-8,1.47-14.63-5-18.3-9.72a39.22,39.22,0,0,1-3.07-4.52l27.46,5.18,1.11.21S492.88,214.58,480.63,216.82Z" transform="translate(-95.23 -55.03)" opacity="0.1"/><g opacity="0.1"><path d="M376.72,214.17a8.33,8.33,0,0,0-.58-3.84c0,.1-.09.2-.12.3-.43,1.34.15,2.73.52,4.12A3,3,0,0,0,376.72,214.17Z" transform="translate(-95.23 -55.03)"/><path d="M379.1,197.8a22.22,22.22,0,0,0,.08,4.15A22.28,22.28,0,0,0,379.1,197.8Z" transform="translate(-95.23 -55.03)"/><path d="M448.55,188.45a16.4,16.4,0,0,1-4.38,5.44c-2.31,1.65-5.22,2.11-8,2.78s-5.65,1.74-7.23,4.1a14.41,14.41,0,0,0-1.69,4.9,10.47,10.47,0,0,1-2,4.75c-1.15,1.3-3.17,2-4.67,1.12a4.78,4.78,0,0,1-1.82-2.34c-1.13-2.57-1.43-5.41-1.88-8.19s-1.12-5.62-2.82-7.85-4.71-3.7-7.38-2.83a7.14,7.14,0,0,0-4,3.88,21.8,21.8,0,0,0-1.5,5.52q-1.87,10.19-4.4,20.24a1.73,1.73,0,0,1-.33.76,1.5,1.5,0,0,1-1,.43c-2.24.29-4.39-1.27-6.64-1.11-2.77.2-4.8,2.88-7.53,3.32a8.45,8.45,0,0,1-5-1.11,5.35,5.35,0,0,1-1.83-1.3,2.7,2.7,0,0,0-.37,2.33,3.9,3.9,0,0,0,2.2,2,8.45,8.45,0,0,0,5,1.11c2.73-.44,4.76-3.12,7.53-3.32,2.25-.16,4.4,1.4,6.64,1.11a1.5,1.5,0,0,0,1-.43,1.73,1.73,0,0,0,.33-.76q2.52-10,4.4-20.24a21.8,21.8,0,0,1,1.5-5.52,7.14,7.14,0,0,1,4-3.88c2.67-.87,5.67.6,7.38,2.83s2.36,5.08,2.82,7.85.75,5.62,1.88,8.19a4.78,4.78,0,0,0,1.82,2.34c1.5.87,3.52.18,4.67-1.12a10.47,10.47,0,0,0,2-4.75,14.41,14.41,0,0,1,1.69-4.9c1.58-2.36,4.47-3.42,7.23-4.1s5.67-1.13,8-2.78a16.4,16.4,0,0,0,4.38-5.44c1.48-2.57,2.86-5.37,2.74-8.34a10.74,10.74,0,0,0-.12-1.14A19.65,19.65,0,0,1,448.55,188.45Z" transform="translate(-95.23 -55.03)"/></g><path d="M451.33,188.75a35.33,35.33,0,0,1,4.45,14.85c-8.91-5-17.29-10.49-21.52-12.4-7.37-3.33-34.93-2.83-45.29-2.52a34.93,34.93,0,0,1,3.78-5.46A36.18,36.18,0,0,1,401,176a35.77,35.77,0,0,1,50.38,12.73Z" transform="translate(-95.23 -55.03)" opacity="0.1"/><path d="M483.13,212.58c-4.81,1.48-12.66-1.38-20.8-5.48a39.22,39.22,0,0,1-3.07-4.52l27.46,5.18C488.54,209,489,210.77,483.13,212.58Z" transform="translate(-95.23 -55.03)" opacity="0.1"/><path d="M422.26,154.08s-26.25-1.5-33.63,12.75l-1.19,12.63-2-.22-.4,8.59s40.12-1.75,49.25,2.37,37.5,24.88,48.87,21.38-1-6.75-1-6.75S466.51,198.2,466.51,193,462.63,160.33,422.26,154.08Z" transform="translate(-95.23 -55.03)" fill="#444053"/><path d="M371.63,622.28s16.75,16.25,24,15C395.63,637.28,375.13,635.53,371.63,622.28Z" transform="translate(-95.23 -55.03)" opacity="0.1"/><path d="M368.13,629.81s1.5,8.36,5.5,7.54S368.13,629.81,368.13,629.81Z" transform="translate(-95.23 -55.03)" opacity="0.1"/><path d="M394.38,769.53s-23.78,18.5-19.77,19S394.38,769.53,394.38,769.53Z" transform="translate(-95.23 -55.03)" opacity="0.1"/><polygon points="330.96 347.33 407.96 334.8 407.96 407.7 334.8 403.87 330.96 347.33" fill="#00b0ff"/><polygon points="330.96 347.33 407.96 334.8 407.96 407.7 334.8 403.87 330.96 347.33" opacity="0.05"/><polygon points="407.96 334.8 500.3 341.71 495.19 405.15 407.96 407.7 407.96 334.8" fill="#00b0ff"/><polygon points="407.96 334.8 500.3 341.71 495.19 405.15 407.96 407.7 407.96 334.8" opacity="0.1"/><polygon points="436.35 312.55 407.96 334.8 500.3 341.71 515.39 318.94 436.35 312.55" fill="#00b0ff"/><polygon points="303.08 323.03 372.4 314.59 407.96 334.8 330.96 347.33 303.08 323.03" fill="#00b0ff"/><polygon points="424.84 353.73 424.84 453.4 388.77 449.7 373.08 448.1 368.3 447.6 352.62 445.99 330.96 443.77 330.96 347.33 407.95 352.57 424.84 353.73" fill="#00b0ff"/><polygon points="500.3 341.71 500.3 438.91 471.39 444.46 457.33 447.16 424.84 453.4 424.84 353.73 500.3 341.71" fill="#00b0ff"/><polygon points="500.3 341.71 500.3 438.91 471.39 444.46 457.33 447.16 424.84 453.4 424.84 353.73 500.3 341.71" opacity="0.05"/><polygon points="303.08 368.31 330.96 347.33 424.84 353.73 411.02 377.01 303.08 368.31" fill="#00b0ff"/><polygon points="303.08 368.31 330.96 347.33 424.84 353.73 411.02 377.01 303.08 368.31" fill="#fff" opacity="0.1"/><polygon points="500.3 341.71 424.84 353.73 449.4 375.73 530.23 362.17 500.3 341.71" fill="#00b0ff"/><polygon points="500.3 341.71 424.84 353.73 449.4 375.73 530.23 362.17 500.3 341.71" fill="#fff" opacity="0.1"/><polygon points="471.39 444.46 457.33 447.16 457.33 426.39 470.5 423.07 471.39 444.46" fill="#fff" opacity="0.1"/><polygon points="388.77 435.96 388.77 449.7 373.08 448.1 373.08 435.96 388.77 435.96" fill="#fff" opacity="0.1"/><polygon points="368.3 440.29 368.3 447.6 352.62 445.99 352.62 440.29 368.3 440.29" fill="#fff" opacity="0.1"/><path d="M510.63,483.7c-10.75,13.75-46.25,4.25-46.25,4.25L438,460.43l-3.58-3.73,7-13s2,.66,5.34,1.82C464.44,451.7,519.68,472.13,510.63,483.7Z" transform="translate(-95.23 -55.03)" opacity="0.1"/><path d="M509.63,481.7c-10.75,13.75-46.25,4.25-46.25,4.25L437,458.43l-3.58-3.73,7-13s2,.66,5.34,1.82C463.44,449.7,518.68,470.13,509.63,481.7Z" transform="translate(-95.23 -55.03)" fill="#efb7b9"/><path d="M445.72,443.52c-1.46,4.2-5.17,10.42-8.76,14.91l-3.58-3.73,7-13S442.39,442.36,445.72,443.52Z" transform="translate(-95.23 -55.03)" opacity="0.1"/><path d="M358.38,288s-26.25,10-26.5,38a460.08,460.08,0,0,0,3,54s-7.5,41.75,13.75,53.75,41,22,41,22,33.95,5.5,38.12,7.25,18.66-20.75,16.41-24.5-33.16-13-36.83-19.25-12.71-10.46-12.71-10.46-9.22-6.29-9.59-11.54,2.35-9,3.12-11.25,3.56-24.25,3.56-24.25S406.63,283.7,358.38,288Z" transform="translate(-95.23 -55.03)" fill="#dce6f2"/><path d="M370.38,380.7s-35.5,4-32.75,16.5C337.63,397.2,351.12,384.59,370.38,380.7Z" transform="translate(-95.23 -55.03)" opacity="0.1"/><path d="M370.38,385.7s-20.15,14.75-16.45,15.75S370.38,385.7,370.38,385.7Z" transform="translate(-95.23 -55.03)" opacity="0.1"/><path d="M379.38,391.7s-5.75,10.34-2.5,9.8S379.38,391.7,379.38,391.7Z" transform="translate(-95.23 -55.03)" opacity="0.1"/><path d="M749,167.42s-38-2.29-33.56,24.37c0,0-.89,4.71,3.38,6.85,0,0,.07-2,3.9-1.31a17.51,17.51,0,0,0,4.13.2,8.57,8.57,0,0,0,5.06-2.09h0s10.69-4.41,14.85-21.89c0,0,3.08-3.82,3-4.8l-6.42,2.75s2.19,4.63.46,8.48c0,0-.2-8.31-1.44-8.12-.25,0-3.33,1.61-3.33,1.61s3.77,8.06.92,13.93c0,0,1.08-9.94-2.1-13.35l-4.52,2.64s4.41,8.33,1.42,15.13c0,0,.77-10.43-2.37-14.49l-4.1,3.19s4.15,8.22,1.62,13.86c0,0-.33-12.14-2.51-13.06,0,0-3.58,3.16-4.12,4.46,0,0,2.83,6,1.07,9.11,0,0-1.08-8.09-2-8.13,0,0-3.57,5.36-3.94,9a19.46,19.46,0,0,1,3.07-9.54,10.71,10.71,0,0,0-5.46,2.83s.55-3.79,6.34-4.12c0,0,3-4.07,3.74-4.32,0,0-5.76-.48-9.25,1.07,0,0,3.07-3.57,10.31-2l4-3.3s-7.58-1-10.8.11c0,0,3.7-3.16,11.89-.86l4.4-2.63s-6.46-1.4-10.31-.89c0,0,4.06-2.19,11.6.18l3.15-1.41s-4.74-.93-6.12-1.08-1.46-.53-1.46-.53a16.36,16.36,0,0,1,8.89,1S749.14,167.84,749,167.42Z" transform="translate(-95.23 -55.03)" fill="#00b0ff"/><path d="M864.46,300.76s-38-2.29-33.56,24.37c0,0-.89,4.71,3.38,6.85,0,0,.07-2,3.91-1.31a17.51,17.51,0,0,0,4.13.2,8.56,8.56,0,0,0,5-2.08h0s10.7-4.42,14.86-21.9c0,0,3.07-3.81,2.95-4.79l-6.42,2.74s2.19,4.63.47,8.48c0,0-.21-8.31-1.44-8.12-.25,0-3.34,1.61-3.34,1.61s3.78,8.07.93,13.93c0,0,1.08-9.94-2.11-13.35L848.75,310s4.41,8.33,1.42,15.13c0,0,.77-10.43-2.37-14.49l-4.09,3.2s4.14,8.21,1.62,13.85c0,0-.33-12.14-2.51-13.06,0,0-3.58,3.16-4.13,4.46,0,0,2.84,6,1.08,9.11,0,0-1.08-8.09-2-8.13,0,0-3.57,5.36-3.94,9a19.52,19.52,0,0,1,3.08-9.54,10.76,10.76,0,0,0-5.47,2.83s.56-3.79,6.35-4.12c0,0,2.95-4.07,3.74-4.32,0,0-5.76-.48-9.25,1.07,0,0,3.07-3.57,10.3-1.95l4-3.3s-7.59-1-10.8.11c0,0,3.7-3.16,11.89-.86l4.4-2.63s-6.47-1.39-10.32-.89c0,0,4.07-2.19,11.61.18l3.15-1.41s-4.74-.93-6.13-1.08-1.46-.53-1.46-.53a16.39,16.39,0,0,1,8.9,1S864.58,301.18,864.46,300.76Z" transform="translate(-95.23 -55.03)" fill="#00b0ff" opacity="0.1"/><path d="M633.61,277.09s8.75-37.09-18.29-37.22c0,0-4.49-1.68-7.32,2.16,0,0,1.93.41.62,4.07a17.8,17.8,0,0,0-.9,4,8.59,8.59,0,0,0,1.19,5.33h0s2.53,11.3,19,18.38c0,0,3.24,3.68,4.22,3.72l-1.6-6.79s-4.94,1.37-8.44-1c0,0,8.23,1.21,8.24,0,0-.25-1-3.56-1-3.56s-8.59,2.34-13.89-1.47c0,0,9.61,2.76,13.52.21L627.16,260s-9,2.93-15.16-1.18c0,0,10.15,2.54,14.69.14l-2.45-4.58s-8.8,2.68-13.93-.77c0,0,12,1.74,13.3-.24,0,0-2.5-4.07-3.69-4.83,0,0-6.36,1.78-9.16-.49,0,0,8.15.31,8.34-.55,0,0-4.67-4.43-8.23-5.43a19.6,19.6,0,0,1,8.89,4.66,10.79,10.79,0,0,0-1.86-5.87s3.64,1.2,3,7c0,0,3.5,3.6,3.61,4.42,0,0,1.45-5.59.52-9.3,0,0,3,3.64.17,10.49l2.56,4.55s2.32-7.3,1.73-10.66c0,0,2.49,4.18-1.18,11.86l1.85,4.79s2.47-6.14,2.63-10c0,0,1.47,4.38-2.16,11.41l.86,3.34s1.72-4.51,2.1-5.85.77-1.35.77-1.35a16.38,16.38,0,0,1-2.49,8.6S633.18,277.14,633.61,277.09Z" transform="translate(-95.23 -55.03)" fill="#00b0ff" opacity="0.1"/><path d="M550.39,289.73s-30.52-22.83-41.43,1.9c0,0-3.33,3.45-.94,7.58,0,0,1.14-1.61,4,1.06a17.51,17.51,0,0,0,3.34,2.44,8.58,8.58,0,0,0,5.37,1h0s11.36,2.19,24.44-10.12c0,0,4.67-1.5,5.11-2.38L543.39,290s-.72,5.07-4.27,7.34c0,0,4.39-7.06,3.25-7.57-.23-.11-3.67-.5-3.67-.5s-1.28,8.82-6.88,12.15c0,0,6.37-7.71,5.58-12.31l-5.23-.28s-.89,9.39-7.13,13.43c0,0,6.37-8.29,6-13.41l-5.18.42s-1.05,9.13-6.26,12.45c0,0,6.39-10.32,5.08-12.28,0,0-4.73.67-5.9,1.45,0,0-.91,6.54-4.11,8.2,0,0,3.55-7.35,2.83-7.86,0,0-5.93,2.51-8.26,5.37a19.53,19.53,0,0,1,7.82-6.28,10.77,10.77,0,0,0-6.12-.64s2.54-2.86,7.56.05c0,0,4.7-1.77,5.5-1.55,0,0-4.55-3.57-8.32-4.19,0,0,4.54-1.3,9.69,4l5.19-.53s-5.77-5-9.08-5.84c0,0,4.83-.61,10.4,5.81l5.12.23s-4.63-4.72-8.12-6.42c0,0,4.59.4,9.59,6.53l3.41.55s-3.45-3.38-4.53-4.26-.93-1.25-.93-1.25a16.43,16.43,0,0,1,6.89,5.72S550.26,290.14,550.39,289.73Z" transform="translate(-95.23 -55.03)" fill="#00b0ff" opacity="0.1"/><path d="M652,77.62s-30.52-22.84-41.43,1.9c0,0-3.33,3.45-.94,7.58,0,0,1.14-1.61,4,1.06a17.79,17.79,0,0,0,3.35,2.43,8.57,8.57,0,0,0,5.37,1h0s11.36,2.19,24.44-10.13c0,0,4.67-1.49,5.1-2.38L645,77.89s-.71,5.07-4.27,7.34c0,0,4.4-7.06,3.26-7.57-.23-.11-3.67-.5-3.67-.5S639,86,633.4,89.31c0,0,6.36-7.71,5.58-12.31l-5.23-.28s-.9,9.39-7.13,13.42c0,0,6.37-8.29,6-13.41l-5.17.42s-1.06,9.14-6.27,12.46c0,0,6.4-10.32,5.09-12.28,0,0-4.73.67-5.9,1.45,0,0-.91,6.54-4.11,8.2,0,0,3.55-7.35,2.83-7.87,0,0-5.93,2.52-8.26,5.38a19.44,19.44,0,0,1,7.82-6.28,10.7,10.7,0,0,0-6.13-.64s2.55-2.86,7.57.05c0,0,4.7-1.78,5.5-1.55,0,0-4.55-3.57-8.32-4.2,0,0,4.53-1.29,9.68,4l5.19-.53s-5.76-5-9.08-5.85c0,0,4.83-.6,10.41,5.82l5.12.22s-4.63-4.72-8.13-6.41c0,0,4.6.4,9.6,6.53l3.4.55S640,72.86,638.92,72s-.93-1.24-.93-1.24a16.4,16.4,0,0,1,6.89,5.72S651.83,78,652,77.62Z" transform="translate(-95.23 -55.03)" fill="#00b0ff" opacity="0.1"/><path d="M768.62,106.55s-12.2-36.11-35.21-21.92c0,0-4.7,1-5.07,5.71,0,0,1.85-.68,2.67,3.12a18,18,0,0,0,1.37,3.91,8.66,8.66,0,0,0,3.84,3.89h0s8.12,8.25,25.88,5.52c0,0,4.69,1.42,5.55.93l-5-4.91s-3.46,3.77-7.68,3.62c0,0,7.63-3.32,7-4.39-.13-.21-2.74-2.48-2.74-2.48s-6.06,6.53-12.56,6.1c0,0,9.61-2.74,11.57-7l-4.14-3.19s-6.06,7.22-13.49,7c0,0,10-3.21,12.53-7.65l-4.5-2.59s-6,6.93-12.22,6.71c0,0,11.12-4.87,11.15-7.23,0,0-4.27-2.13-5.68-2.15,0,0-4.46,4.87-8,4.43,0,0,7.08-4.05,6.78-4.88,0,0-6.3-1.29-9.85-.25a19.49,19.49,0,0,1,10-.75,10.79,10.79,0,0,0-4.69-4s3.72-.91,6.21,4.33c0,0,4.88,1.21,5.4,1.84,0,0-1.72-5.51-4.47-8.17,0,0,4.47,1.51,5.69,8.82l4.58,2.5s-1.89-7.41-4.17-10c0,0,4.33,2.24,5.27,10.69l4.1,3.09s-1.14-6.52-3.06-9.9c0,0,3.56,2.94,4.2,10.83l2.49,2.38s-.92-4.74-1.3-6.08S761,93,761,93a16.49,16.49,0,0,1,2.43,8.62S768.27,106.81,768.62,106.55Z" transform="translate(-95.23 -55.03)" fill="#00b0ff" opacity="0.1"/><path d="M689,108.33S651.1,104.11,654.23,131c0,0-1.13,4.66,3,7,0,0,.17-2,4-1.1a18.4,18.4,0,0,0,4.12.41,8.6,8.6,0,0,0,5.15-1.83h0s10.91-3.87,16-21.12c0,0,3.26-3.65,3.19-4.64l-6.55,2.42s2,4.73,0,8.49c0,0,.21-8.31-1-8.18-.25,0-3.41,1.44-3.41,1.44s3.36,8.25.22,14c0,0,1.58-9.88-1.43-13.44l-4.65,2.4s4,8.55.65,15.19c0,0,1.3-10.38-1.63-14.59l-4.25,3s3.72,8.41.91,13.92c0,0,.29-12.14-1.84-13.17,0,0-3.74,3-4.35,4.24,0,0,2.53,6.1.62,9.15,0,0-.67-8.13-1.55-8.21,0,0-3.84,5.17-4.4,8.82a19.47,19.47,0,0,1,3.56-9.38,10.76,10.76,0,0,0-5.6,2.55s.74-3.75,6.54-3.79c0,0,3.15-3.91,4-4.12,0,0-5.73-.77-9.3.6,0,0,3.25-3.42,10.39-1.43l4.21-3.09S663.22,115,660,116c0,0,3.86-3,11.92-.25l4.53-2.41s-6.39-1.72-10.26-1.41c0,0,4.17-2,11.58.77l3.22-1.25s-4.69-1.17-6.07-1.39-1.43-.6-1.43-.6a16.45,16.45,0,0,1,8.84,1.44S689.07,108.75,689,108.33Z" transform="translate(-95.23 -55.03)" fill="#00b0ff" opacity="0.1"/><path d="M1020.6,402.5s-37.88-4.22-34.75,22.64c0,0-1.13,4.66,3,7,0,0,.17-2,4-1.11a17.3,17.3,0,0,0,4.12.41,8.53,8.53,0,0,0,5.15-1.83h0s10.91-3.87,15.95-21.11c0,0,3.26-3.66,3.19-4.64l-6.55,2.41s2,4.74,0,8.5c0,0,.21-8.32-1-8.18-.25,0-3.41,1.43-3.41,1.43s3.36,8.25.22,14c0,0,1.58-9.87-1.43-13.44l-4.65,2.41s4,8.55.66,15.19c0,0,1.29-10.38-1.64-14.6l-4.25,3s3.72,8.41.91,13.91c0,0,.29-12.14-1.84-13.16,0,0-3.73,3-4.35,4.24,0,0,2.54,6.1.62,9.15,0,0-.67-8.13-1.55-8.21,0,0-3.84,5.17-4.4,8.82a19.47,19.47,0,0,1,3.56-9.38,10.67,10.67,0,0,0-5.6,2.55s.74-3.76,6.54-3.8c0,0,3.16-3.91,4-4.11,0,0-5.73-.78-9.3.59,0,0,3.25-3.41,10.4-1.42l4.2-3.09s-7.52-1.42-10.79-.44c0,0,3.86-3,11.92-.26l4.53-2.4s-6.39-1.72-10.26-1.41c0,0,4.17-2,11.58.77l3.22-1.26s-4.69-1.17-6.07-1.38-1.43-.6-1.43-.6a16.39,16.39,0,0,1,8.84,1.43S1020.7,402.93,1020.6,402.5Z" transform="translate(-95.23 -55.03)" fill="#00b0ff" opacity="0.1"/><path d="M1078.51,437.88s-37.88-4.21-34.75,22.64c0,0-1.12,4.66,3,7,0,0,.17-2,4-1.1a17.65,17.65,0,0,0,4.11.4A8.64,8.64,0,0,0,1060,465h0s10.9-3.87,15.94-21.12c0,0,3.27-3.65,3.19-4.64l-6.55,2.41s2,4.74,0,8.5c0,0,.21-8.31-1-8.18-.25,0-3.41,1.43-3.41,1.43s3.36,8.25.22,14c0,0,1.58-9.87-1.43-13.43l-4.65,2.4s4,8.55.66,15.19c0,0,1.29-10.38-1.64-14.59l-4.25,3s3.72,8.41.92,13.92c0,0,.28-12.15-1.85-13.17,0,0-3.73,3-4.35,4.24,0,0,2.54,6.1.62,9.15,0,0-.67-8.13-1.55-8.21,0,0-3.84,5.17-4.39,8.82a19.52,19.52,0,0,1,3.55-9.38,10.76,10.76,0,0,0-5.6,2.55s.75-3.76,6.55-3.79c0,0,3.15-3.91,4-4.12,0,0-5.73-.77-9.3.6,0,0,3.25-3.42,10.4-1.43l4.2-3.09s-7.52-1.42-10.79-.44c0,0,3.86-3,11.92-.25l4.53-2.41s-6.39-1.72-10.26-1.41c0,0,4.17-2,11.58.77l3.22-1.25s-4.69-1.17-6.06-1.39-1.44-.6-1.44-.6a16.45,16.45,0,0,1,8.84,1.44S1078.61,438.31,1078.51,437.88Z" transform="translate(-95.23 -55.03)" fill="#00b0ff" opacity="0.1"/><path d="M949.94,139.87s-30.52-22.83-41.43,1.9c0,0-3.33,3.45-.94,7.58,0,0,1.14-1.61,4,1.06a17.51,17.51,0,0,0,3.34,2.44,8.59,8.59,0,0,0,5.37,1h0s11.36,2.19,24.45-10.12c0,0,4.66-1.5,5.1-2.38l-6.87-1.24s-.72,5.07-4.27,7.34c0,0,4.39-7.06,3.25-7.57-.23-.11-3.66-.5-3.66-.5s-1.29,8.82-6.89,12.15c0,0,6.37-7.71,5.58-12.31l-5.23-.28s-.89,9.39-7.13,13.43c0,0,6.38-8.29,6-13.41l-5.18.42s-1,9.13-6.26,12.45c0,0,6.4-10.32,5.08-12.28,0,0-4.73.67-5.9,1.45,0,0-.9,6.54-4.1,8.2,0,0,3.54-7.35,2.82-7.86,0,0-5.93,2.51-8.26,5.37a19.53,19.53,0,0,1,7.82-6.28,10.77,10.77,0,0,0-6.12-.64s2.55-2.86,7.57.05c0,0,4.69-1.77,5.49-1.55,0,0-4.55-3.57-8.32-4.19,0,0,4.54-1.3,9.69,4l5.19-.53s-5.76-5-9.08-5.84c0,0,4.83-.61,10.4,5.81l5.13.23s-4.64-4.72-8.13-6.42c0,0,4.6.4,9.59,6.53l3.41.55s-3.45-3.38-4.53-4.26S936,133,936,133a16.44,16.44,0,0,1,6.88,5.72S949.81,140.28,949.94,139.87Z" transform="translate(-95.23 -55.03)" fill="#00b0ff" opacity="0.1"/><path d="M973.52,304.69S963,268.06,939.34,281.21c0,0-4.74.73-5.33,5.47,0,0,1.88-.59,2.53,3.24a17.73,17.73,0,0,0,1.2,4A8.59,8.59,0,0,0,941.4,298h0s7.74,8.6,25.6,6.68c0,0,4.62,1.62,5.5,1.18l-4.73-5.14s-3.63,3.62-7.83,3.28c0,0,7.76-3,7.16-4.07-.12-.22-2.62-2.61-2.62-2.61s-6.34,6.26-12.82,5.53c0,0,9.73-2.3,11.87-6.44l-4-3.38s-6.38,6.94-13.79,6.4c0,0,10.08-2.77,12.86-7.08l-4.38-2.79s-6.35,6.65-12.51,6.15c0,0,11.33-4.37,11.47-6.72,0,0-4.18-2.32-5.59-2.4,0,0-4.67,4.66-8.22,4.06,0,0,7.26-3.73,7-4.57,0,0-6.24-1.57-9.83-.7a19.51,19.51,0,0,1,10-.29,10.73,10.73,0,0,0-4.5-4.2s3.76-.75,6,4.6c0,0,4.81,1.42,5.31,2.08,0,0-1.47-5.59-4.1-8.36,0,0,4.4,1.7,5.29,9.06l4.46,2.71s-1.56-7.5-3.72-10.14c0,0,4.22,2.43,4.79,10.91l4,3.27s-.85-6.56-2.61-10c0,0,3.43,3.1,3.71,11l2.38,2.5s-.7-4.78-1-6.14,0-1.55,0-1.55a16.39,16.39,0,0,1,2.05,8.72S973.16,304.93,973.52,304.69Z" transform="translate(-95.23 -55.03)" fill="#00b0ff" opacity="0.1"/><path d="M739.1,387.23s-20.43-32.18-39.4-12.92c0,0-4.34,2-3.58,6.75,0,0,1.65-1.1,3.35,2.4a17.12,17.12,0,0,0,2.26,3.46,8.54,8.54,0,0,0,4.65,2.88h0s9.85,6.08,26.45-.8c0,0,4.89.26,5.61-.41l-6-3.6s-2.47,4.5-6.6,5.35c0,0,6.62-5,5.73-5.92-.17-.18-3.25-1.76-3.25-1.76s-4.33,7.78-10.75,8.91c0,0,8.69-4.95,9.59-9.53l-4.79-2.11s-4.17,8.45-11.43,10c0,0,8.9-5.49,10.35-10.41l-5-1.44s-4.22,8.17-10.27,9.42c0,0,9.64-7.38,9.11-9.68,0,0-4.66-1.05-6-.73,0,0-3.17,5.79-6.75,6.21,0,0,5.92-5.62,5.43-6.36,0,0-6.43.25-9.63,2.1a19.46,19.46,0,0,1,9.54-3.1,10.73,10.73,0,0,0-5.49-2.77s3.39-1.77,7,2.73c0,0,5,0,5.69.5,0,0-3-5-6.29-6.87,0,0,4.7.4,7.62,7.21l5.05,1.34s-3.61-6.75-6.42-8.68c0,0,4.73,1.14,7.66,9.13l4.72,2s-2.66-6.05-5.33-8.88c0,0,4.16,2,6.65,9.51l3,1.73s-2-4.39-2.71-5.6-.43-1.49-.43-1.49a16.4,16.4,0,0,1,4.41,7.79S738.83,387.57,739.1,387.23Z" transform="translate(-95.23 -55.03)" fill="#00b0ff" opacity="0.1"/><path d="M873.37,222.81s-19.43-32.79-39-14.13c0,0-4.4,1.9-3.78,6.64,0,0,1.67-1.06,3.27,2.49a17.28,17.28,0,0,0,2.15,3.54,8.49,8.49,0,0,0,4.56,3h0s9.65,6.38,26.46,0c0,0,4.88.41,5.62-.24l-5.87-3.78s-2.6,4.41-6.76,5.14c0,0,6.77-4.83,5.92-5.74-.18-.19-3.2-1.87-3.2-1.87s-4.57,7.65-11,8.58c0,0,8.84-4.68,9.87-9.22L856.89,215s-4.43,8.33-11.74,9.66c0,0,9.07-5.21,10.67-10.08l-4.94-1.6s-4.48,8-10.56,9.1c0,0,9.86-7.08,9.4-9.39,0,0-4.62-1.2-6-.92,0,0-3.35,5.69-6.94,6,0,0,6.09-5.42,5.63-6.18,0,0-6.44.05-9.69,1.8a19.52,19.52,0,0,1,9.63-2.8,10.75,10.75,0,0,0-5.41-2.94s3.45-1.67,7,2.94c0,0,5,.17,5.67.68,0,0-2.83-5-6.07-7.06,0,0,4.68.54,7.39,7.44l5,1.5s-3.39-6.86-6.15-8.88c0,0,4.7,1.29,7.38,9.36l4.65,2.17s-2.47-6.13-5-9c0,0,4.09,2.13,6.36,9.71l2.93,1.82s-1.88-4.45-2.54-5.68-.38-1.5-.38-1.5a16.43,16.43,0,0,1,4.17,7.92S873.08,223.14,873.37,222.81Z" transform="translate(-95.23 -55.03)" fill="#00b0ff"/><path d="M750.44,291.76s1-38.1-25.47-32.73c0,0-4.74-.73-6.74,3.61,0,0,2,0,1.44,3.85a17.56,17.56,0,0,0-.06,4.14,8.55,8.55,0,0,0,2.25,5h0s4.77,10.54,22.38,14.12c0,0,3.91,2.95,4.89,2.79l-3-6.32s-4.55,2.34-8.46.75c0,0,8.3-.49,8.07-1.71,0-.25-1.72-3.29-1.72-3.29s-7.94,4.05-13.89,1.39c0,0,10,.75,13.27-2.54l-2.79-4.43s-8.18,4.68-15.08,1.92c0,0,10.45.42,14.41-2.85l-3.33-4s-8.07,4.42-13.79,2.08c0,0,12.12-.73,13-2.94,0,0-3.28-3.47-4.6-4,0,0-5.86,3-9.06,1.38,0,0,8-1.34,8.05-2.23,0,0-5.47-3.39-9.16-3.64a19.47,19.47,0,0,1,9.65,2.76,10.75,10.75,0,0,0-3-5.37s3.81.43,4.33,6.2c0,0,4.17,2.82,4.44,3.6,0,0,.29-5.77-1.38-9.21,0,0,3.68,2.95,2.3,10.23l3.43,3.94s.78-7.62-.47-10.79c0,0,3.28,3.59,1.26,11.85l2.77,4.31s1.18-6.51.55-10.34c0,0,2.32,4,.2,11.61l1.52,3.1s.77-4.77.87-6.16.48-1.48.48-1.48a16.42,16.42,0,0,1-.69,8.93S750,291.89,750.44,291.76Z" transform="translate(-95.23 -55.03)" fill="#00b0ff"/><ellipse cx="698.97" cy="716.3" rx="26.93" ry="4.55" fill="#00b0ff" opacity="0.1"/><ellipse cx="600.8" cy="785.38" rx="26.93" ry="4.55" fill="#00b0ff" opacity="0.1"/><ellipse cx="93.14" cy="749.99" rx="26.93" ry="4.55" fill="#00b0ff" opacity="0.1"/><ellipse cx="805.06" cy="780.83" rx="26.93" ry="4.55" fill="#00b0ff" opacity="0.1"/><ellipse cx="833.1" cy="723.1" rx="40.21" ry="6.8" fill="#00b0ff"/><path d="M945,767a11.61,11.61,0,0,0,3.83-5.78c.5-2.3-.48-5.05-2.67-5.89-2.46-.94-5.09.76-7.09,2.48s-4.27,3.69-6.88,3.33a10.5,10.5,0,0,0,3.24-9.81,4.11,4.11,0,0,0-.9-2c-1.37-1.46-3.84-.83-5.48.32-5.2,3.66-6.65,10.72-6.68,17.08-.52-2.29-.08-4.68-.09-7s-.66-5-2.65-6.22a7.91,7.91,0,0,0-4-1c-2.34-.08-4.95.15-6.54,1.86-2,2.12-1.47,5.69.25,8s4.35,3.8,6.77,5.42a15.13,15.13,0,0,1,4.84,4.61,4.7,4.7,0,0,1,.35.82h14.66A40.44,40.44,0,0,0,945,767Z" transform="translate(-95.23 -55.03)" fill="#00b0ff"/><path d="M170.29,783.87s15.35-.47,20-3.77,23.63-7.23,24.78-1.94,23.08,26.29,5.74,26.43-40.29-2.7-44.91-5.52S170.29,783.87,170.29,783.87Z" transform="translate(-95.23 -55.03)" fill="#a8a8a8"/><path d="M221.1,802.75c-17.34.14-40.29-2.7-44.91-5.52-3.52-2.14-4.92-9.83-5.39-13.38l-.51,0s1,12.39,5.59,15.2,27.57,5.66,44.91,5.52c5,0,6.73-1.82,6.64-4.46C226.73,801.72,224.82,802.72,221.1,802.75Z" transform="translate(-95.23 -55.03)" opacity="0.2"/></svg>',
  Info = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><circle fill="#3595f6" opacity="0.3" cx="12" cy="12" r="10"/><rect fill="#3595f6" x="11" y="10" width="2" height="7" rx="1"/><rect fill="#3595f6" x="11" y="7" width="2" height="2" rx="1"/></g></svg>',
  Warning = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><path d="M11.1669899,4.49941818 L2.82535718,19.5143571 C2.557144,19.9971408 2.7310878,20.6059441 3.21387153,20.8741573 C3.36242953,20.9566895 3.52957021,21 3.69951446,21 L21.2169432,21 C21.7692279,21 22.2169432,20.5522847 22.2169432,20 C22.2169432,19.8159952 22.1661743,19.6355579 22.070225,19.47855 L12.894429,4.4636111 C12.6064401,3.99235656 11.9909517,3.84379039 11.5196972,4.13177928 C11.3723594,4.22181902 11.2508468,4.34847583 11.1669899,4.49941818 Z" fill="#ffb74d" opacity="0.3"/><rect fill="#ffb74d" x="11" y="9" width="2" height="7" rx="1"/><rect fill="#ffb74d" x="11" y="17" width="2" height="2" rx="1"/></g></svg>',
  Danger = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><circle fill="#f64e60" opacity="0.3" cx="12" cy="12" r="10"/><path d="M12.0355339,10.6213203 L14.863961,7.79289322 C15.2544853,7.40236893 15.8876503,7.40236893 16.2781746,7.79289322 C16.6686989,8.18341751 16.6686989,8.81658249 16.2781746,9.20710678 L13.4497475,12.0355339 L16.2781746,14.863961 C16.6686989,15.2544853 16.6686989,15.8876503 16.2781746,16.2781746 C15.8876503,16.6686989 15.2544853,16.6686989 14.863961,16.2781746 L12.0355339,13.4497475 L9.20710678,16.2781746 C8.81658249,16.6686989 8.18341751,16.6686989 7.79289322,16.2781746 C7.40236893,15.8876503 7.40236893,15.2544853 7.79289322,14.863961 L10.6213203,12.0355339 L7.79289322,9.20710678 C7.40236893,8.81658249 7.40236893,8.18341751 7.79289322,7.79289322 C8.18341751,7.40236893 8.81658249,7.40236893 9.20710678,7.79289322 L12.0355339,10.6213203 Z" fill="#f64e60"/></g></svg>',
  ScheduleDelete = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><path d="M6,8 L18,8 L17.106535,19.6150447 C17.04642,20.3965405 16.3947578,21 15.6109533,21 L8.38904671,21 C7.60524225,21 6.95358004,20.3965405 6.89346498,19.6150447 L6,8 Z M8,10 L8.45438229,14.0894406 L15.5517885,14.0339036 L16,10 L8,10 Z" fill="#5c95c5" fill-rule="nonzero"/><path d="M14,4.5 L14,3.5 C14,3.22385763 13.7761424,3 13.5,3 L10.5,3 C10.2238576,3 10,3.22385763 10,3.5 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#5c95c5" opacity="0.3"/></g></svg>',
  ScheduleEdit = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="22px" height="22px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><path d="M12.2674799,18.2323597 L12.0084872,5.45852451 C12.0004303,5.06114792 12.1504154,4.6768183 12.4255037,4.38993949 L15.0030167,1.70195304 L17.5910752,4.40093695 C17.8599071,4.6812911 18.0095067,5.05499603 18.0083938,5.44341307 L17.9718262,18.2062508 C17.9694575,19.0329966 17.2985816,19.701953 16.4718324,19.701953 L13.7671717,19.701953 C12.9505952,19.701953 12.2840328,19.0487684 12.2674799,18.2323597 Z" fill="#5c95c5" fill-rule="nonzero" transform="translate(14.701953, 10.701953) rotate(-135.000000) translate(-14.701953, -10.701953) "/><path d="M12.9,2 C13.4522847,2 13.9,2.44771525 13.9,3 C13.9,3.55228475 13.4522847,4 12.9,4 L6,4 C4.8954305,4 4,4.8954305 4,6 L4,18 C4,19.1045695 4.8954305,20 6,20 L18,20 C19.1045695,20 20,19.1045695 20,18 L20,13 C20,12.4477153 20.4477153,12 21,12 C21.5522847,12 22,12.4477153 22,13 L22,18 C22,20.209139 20.209139,22 18,22 L6,22 C3.790861,22 2,20.209139 2,18 L2,6 C2,3.790861 3.790861,2 6,2 L12.9,2 Z" fill="#5c95c5" fill-rule="nonzero" opacity="0.3"/></g></svg>',
  ScheduleMarkAsComplete = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><polygon points="0 0 24 0 24 24 0 24"/><path d="M9.26193932,16.6476484 C8.90425297,17.0684559 8.27315905,17.1196257 7.85235158,16.7619393 C7.43154411,16.404253 7.38037434,15.773159 7.73806068,15.3523516 L16.2380607,5.35235158 C16.6013618,4.92493855 17.2451015,4.87991302 17.6643638,5.25259068 L22.1643638,9.25259068 C22.5771466,9.6195087 22.6143273,10.2515811 22.2474093,10.6643638 C21.8804913,11.0771466 21.2484189,11.1143273 20.8356362,10.7474093 L17.0997854,7.42665306 L9.26193932,16.6476484 Z" fill="#5c95c5" fill-rule="nonzero" opacity="0.3" transform="translate(14.999995, 11.000002) rotate(-180.000000) translate(-14.999995, -11.000002) "/><path d="M4.26193932,17.6476484 C3.90425297,18.0684559 3.27315905,18.1196257 2.85235158,17.7619393 C2.43154411,17.404253 2.38037434,16.773159 2.73806068,16.3523516 L11.2380607,6.35235158 C11.6013618,5.92493855 12.2451015,5.87991302 12.6643638,6.25259068 L17.1643638,10.2525907 C17.5771466,10.6195087 17.6143273,11.2515811 17.2474093,11.6643638 C16.8804913,12.0771466 16.2484189,12.1143273 15.8356362,11.7474093 L12.0997854,8.42665306 L4.26193932,17.6476484 Z" fill="#5c95c5" fill-rule="nonzero" transform="translate(9.999995, 12.000002) rotate(-180.000000) translate(-9.999995, -12.000002) "/></g></svg>',
  ScheduleMarkAsInComplete = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><path d="M21.4451171,17.7910156 C21.4451171,16.9707031 21.6208984,13.7333984 19.0671874,11.1650391 C17.3484374,9.43652344 14.7761718,9.13671875 11.6999999,9 L11.6999999,4.69307548 C11.6999999,4.27886191 11.3642135,3.94307548 10.9499999,3.94307548 C10.7636897,3.94307548 10.584049,4.01242035 10.4460626,4.13760526 L3.30599678,10.6152626 C2.99921905,10.8935795 2.976147,11.3678924 3.2544639,11.6746702 C3.26907199,11.6907721 3.28437331,11.7062312 3.30032452,11.7210037 L10.4403903,18.333467 C10.7442966,18.6149166 11.2188212,18.596712 11.5002708,18.2928057 C11.628669,18.1541628 11.6999999,17.9721616 11.6999999,17.7831961 L11.6999999,13.5 C13.6531249,13.5537109 15.0443703,13.6779456 16.3083984,14.0800781 C18.1284272,14.6590944 19.5349747,16.3018455 20.5280411,19.0083314 L20.5280247,19.0083374 C20.6363903,19.3036749 20.9175496,19.5 21.2321404,19.5 L21.4499999,19.5 C21.4499999,19.0068359 21.4451171,18.2255859 21.4451171,17.7910156 Z" fill="#5c95c5" fill-rule="nonzero"/></g></svg>',
  ScheduleTakeAction = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><polygon points="0 0 24 0 24 24 0 24"/><path d="M5.29288961,6.70710318 C4.90236532,6.31657888 4.90236532,5.68341391 5.29288961,5.29288961 C5.68341391,4.90236532 6.31657888,4.90236532 6.70710318,5.29288961 L12.7071032,11.2928896 C13.0856821,11.6714686 13.0989277,12.281055 12.7371505,12.675721 L7.23715054,18.675721 C6.86395813,19.08284 6.23139076,19.1103429 5.82427177,18.7371505 C5.41715278,18.3639581 5.38964985,17.7313908 5.76284226,17.3242718 L10.6158586,12.0300721 L5.29288961,6.70710318 Z" fill="#5c95c5" fill-rule="nonzero" transform="translate(8.999997, 11.999999) scale(-1, 1) translate(-8.999997, -11.999999) "/><path d="M10.7071009,15.7071068 C10.3165766,16.0976311 9.68341162,16.0976311 9.29288733,15.7071068 C8.90236304,15.3165825 8.90236304,14.6834175 9.29288733,14.2928932 L15.2928873,8.29289322 C15.6714663,7.91431428 16.2810527,7.90106866 16.6757187,8.26284586 L22.6757187,13.7628459 C23.0828377,14.1360383 23.1103407,14.7686056 22.7371482,15.1757246 C22.3639558,15.5828436 21.7313885,15.6103465 21.3242695,15.2371541 L16.0300699,10.3841378 L10.7071009,15.7071068 Z" fill="#5c95c5" fill-rule="nonzero" opacity="0.3" transform="translate(15.999997, 11.999999) scale(-1, 1) rotate(-270.000000) translate(-15.999997, -11.999999) "/></g></svg>',
  ScheduleMarkAsCompleteDisabled = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><polygon points="0 0 24 0 24 24 0 24"/><path d="M9.26193932,16.6476484 C8.90425297,17.0684559 8.27315905,17.1196257 7.85235158,16.7619393 C7.43154411,16.404253 7.38037434,15.773159 7.73806068,15.3523516 L16.2380607,5.35235158 C16.6013618,4.92493855 17.2451015,4.87991302 17.6643638,5.25259068 L22.1643638,9.25259068 C22.5771466,9.6195087 22.6143273,10.2515811 22.2474093,10.6643638 C21.8804913,11.0771466 21.2484189,11.1143273 20.8356362,10.7474093 L17.0997854,7.42665306 L9.26193932,16.6476484 Z" fill="#959595" fill-rule="nonzero" opacity="0.3" transform="translate(14.999995, 11.000002) rotate(-180.000000) translate(-14.999995, -11.000002) "/><path d="M4.26193932,17.6476484 C3.90425297,18.0684559 3.27315905,18.1196257 2.85235158,17.7619393 C2.43154411,17.404253 2.38037434,16.773159 2.73806068,16.3523516 L11.2380607,6.35235158 C11.6013618,5.92493855 12.2451015,5.87991302 12.6643638,6.25259068 L17.1643638,10.2525907 C17.5771466,10.6195087 17.6143273,11.2515811 17.2474093,11.6643638 C16.8804913,12.0771466 16.2484189,12.1143273 15.8356362,11.7474093 L12.0997854,8.42665306 L4.26193932,17.6476484 Z" fill="#959595" fill-rule="nonzero" transform="translate(9.999995, 12.000002) rotate(-180.000000) translate(-9.999995, -12.000002) "/></g></svg>',
  ScheduleTakeActionDisabled = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><polygon points="0 0 24 0 24 24 0 24"/><path d="M5.29288961,6.70710318 C4.90236532,6.31657888 4.90236532,5.68341391 5.29288961,5.29288961 C5.68341391,4.90236532 6.31657888,4.90236532 6.70710318,5.29288961 L12.7071032,11.2928896 C13.0856821,11.6714686 13.0989277,12.281055 12.7371505,12.675721 L7.23715054,18.675721 C6.86395813,19.08284 6.23139076,19.1103429 5.82427177,18.7371505 C5.41715278,18.3639581 5.38964985,17.7313908 5.76284226,17.3242718 L10.6158586,12.0300721 L5.29288961,6.70710318 Z" fill="#959595" fill-rule="nonzero" transform="translate(8.999997, 11.999999) scale(-1, 1) translate(-8.999997, -11.999999) "/><path d="M10.7071009,15.7071068 C10.3165766,16.0976311 9.68341162,16.0976311 9.29288733,15.7071068 C8.90236304,15.3165825 8.90236304,14.6834175 9.29288733,14.2928932 L15.2928873,8.29289322 C15.6714663,7.91431428 16.2810527,7.90106866 16.6757187,8.26284586 L22.6757187,13.7628459 C23.0828377,14.1360383 23.1103407,14.7686056 22.7371482,15.1757246 C22.3639558,15.5828436 21.7313885,15.6103465 21.3242695,15.2371541 L16.0300699,10.3841378 L10.7071009,15.7071068 Z" fill="#959595" fill-rule="nonzero" opacity="0.3" transform="translate(15.999997, 11.999999) scale(-1, 1) rotate(-270.000000) translate(-15.999997, -11.999999) "/></g></svg>',
  ScheduleOrganizer = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><path d="M4,4 L11.6314229,2.5691082 C11.8750185,2.52343403 12.1249815,2.52343403 12.3685771,2.5691082 L20,4 L20,13.2830094 C20,16.2173861 18.4883464,18.9447835 16,20.5 L12.5299989,22.6687507 C12.2057287,22.8714196 11.7942713,22.8714196 11.4700011,22.6687507 L8,20.5 C5.51165358,18.9447835 4,16.2173861 4,13.2830094 L4,4 Z" fill="#03a9f4" opacity="0.3"/><path d="M12,11 C10.8954305,11 10,10.1045695 10,9 C10,7.8954305 10.8954305,7 12,7 C13.1045695,7 14,7.8954305 14,9 C14,10.1045695 13.1045695,11 12,11 Z" fill="#03a9f4" opacity="0.3"/><path d="M7.00036205,16.4995035 C7.21569918,13.5165724 9.36772908,12 11.9907452,12 C14.6506758,12 16.8360465,13.4332455 16.9988413,16.5 C17.0053266,16.6221713 16.9988413,17 16.5815,17 C14.5228466,17 11.463736,17 7.4041679,17 C7.26484009,17 6.98863236,16.6619875 7.00036205,16.4995035 Z" fill="#03a9f4" opacity="0.3"/></g></svg>',
  ScheduleViewActionRecord = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><circle fill="#5c95c5" opacity="0.3" cx="12" cy="12" r="10"/><rect fill="#5c95c5" x="11" y="10" width="2" height="7" rx="1"/><rect fill="#5c95c5" x="11" y="7" width="2" height="2" rx="1"/></g></svg>',
  ConsoleReports = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="26px" height="26px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><path d="M4.00246329,12.2004927 L13,14 L13,4.06189375 C16.9463116,4.55399184 20,7.92038235 20,12 C20,16.418278 16.418278,20 12,20 C7.64874861,20 4.10886412,16.5261253 4.00246329,12.2004927 Z" fill="#03a9f4" opacity="0.3"/><path d="M3.0603968,10.0120794 C3.54712466,6.05992157 6.91622084,3 11,3 L11,11.6 L3.0603968,10.0120794 Z" fill="#03a9f4"/></g></svg>'
  //'<svg height="26px" viewBox="0 0 64 64" width="26px" xmlns="http://www.w3.org/2000/svg"><g id="Analysis-report-document-develop-infromation"><path d="m50 12a2.006 2.006 0 0 0 2 2h9l-11-11z" fill="#bddbff"/><circle cx="49" cy="49" fill="#bddbff" r="8"/><path d="m27 8v20h20a19.994 19.994 0 0 0 -20-20z" fill="#bddbff"/><path d="m3 32a20 20 0 0 0 40 0h-20v-20a19.994 19.994 0 0 0 -20 20z" fill="#bddbff"/><g fill="#57a4ff"><path d="m61.71 13.29-11-11a1.033 1.033 0 0 0 -.71-.29h-25a3.009 3.009 0 0 0 -3 3v6.05a20.973 20.973 0 0 0 0 41.9v6.05a3.009 3.009 0 0 0 3 3h34a3.009 3.009 0 0 0 3-3v-45a1.033 1.033 0 0 0 -.29-.71zm-10.71-7.88 7.59 7.59h-6.59a1 1 0 0 1 -1-1zm-47 26.59a19.023 19.023 0 0 1 18-18.97v18.56l-13.1 13.1a18.879 18.879 0 0 1 -4.9-12.69zm6.31 14.1 13.1-13.1h18.56a18.963 18.963 0 0 1 -31.66 13.1zm49.69 12.9a1 1 0 0 1 -1 1h-34a1 1 0 0 1 -1-1v-6.05a21.014 21.014 0 0 0 20-20.95 1 1 0 0 0 -1-1h-19v-26a1 1 0 0 1 1-1h24v8a3.009 3.009 0 0 0 3 3h8z"/><path d="m27 7a1 1 0 0 0 -1 1v20a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1 21.023 21.023 0 0 0 -21-21zm1 20v-17.97a19.017 19.017 0 0 1 17.97 17.97z"/><path d="m49 40a9 9 0 1 0 9 9 9.014 9.014 0 0 0 -9-9zm0 16a7 7 0 1 1 7-7 7.008 7.008 0 0 1 -7 7z"/><path d="m47 50.586-2.293-2.293-1.414 1.414 3 3a1 1 0 0 0 1.414 0l6-6-1.414-1.414z"/><path d="m50 19h8v2h-8z"/><path d="m50 25h8v2h-8z"/><path d="m50 31h8v2h-8z"/></g></g></svg>'
}

export enum SvgContentLoaderEnum {
  DetailsContentLoader,
  DetailsSimpleContentLoader
}

export enum InlineMinLoaderOperationType {
  None = 0,
  Loading = 1,
  Saving = 2,
  Updating = 3,
  Deleting = 4,
  Saved = 5,
  Updated = 6,
  Deleted = 7,
}

export enum EnumSharingMode {
  Create = 1,
  Update = 2,
  Delete = 3
}

export enum EnumPlatformName {
  Mobile = 'mobile',
  Desktop = 'desktop',
  Tablet = 'tablet'
}
export enum IndexedDBErrorEnum {
  VersionError = 'VersionError'
}

export enum EnumDataImport {
  INVALID_UPLOADED_FILE_URL = 8000,
  PROBLEM_DOWNLOADING_FILE = 8001,
  WORKSHEET_NAME_NOT_SET_IN_UPLOADED_FILE = 8002,
  HEADER_COLUMN_NOT_SET_IN_UPLOADED_FILE = 8003,
  CONVERTION_XLS_TO_XLSX_FAILED = 8004,
  NO_MAPPED_FIELDS_FOUND = 8005,
  WORKSHEET_NOT_MATCHED = 8006,
  NO_HEADER_COLUMN_FOUND = 8007,
  DATA_PARSING_FAILED_FROM_EXCEL_FIlE = 8008,
  DATA_PARSING_FAILED_FROM_CSV_FIlE = 8009,
  WRONG_COLUMN_NAME_MAPPED_IN_SOURCE_FIELD = 8010,
  CONTROL_TYPE_NOT_SET = 8011,
  MULTIMEDIA_CONTROL_TYPE_NOT_ALLOWED = 8012,
  MULTIMEDIA_CONTROL_TYPE_OFF_OR_ON_TEXT_NOT_SET = 8013,
  FORM_FIELD_NOT_SET = 8014,
  KEY_FIELD_NOT_SET_TO_UPDATE = 8015,
  EXCEPTION_PREPARING_RECORDS = 8016,
  NO_DATA_FOUND_TO_IMPORT = 8017,
  NO_DATA_IMPORTED_DUE_TO_DATA_VALIDATION = 8018,
  RECORDS_SAVE_FAIL = 8019
}

export enum EnumMarkerType {
  Pin = 'PIN',
  Rectangle = 'RECTANGLE',
  Circle = 'CIRCLE',
  Polygon = 'POLYGON'
}

export enum EnumStatusNotification {
  Active = 0,
  UnAcknowledged = 1,
  Acknowledged = 2,
  Read = 3,
  Deleted = 4
}

export enum EnumNotificationType {
  ConfigurationUpdate = 2,
  DetailsNotification = 3,
  ScheduleEventNotification = 4,
  ReRegisterDevice = 101,
  AppConfigUpdate = 102,
  RolePrivilegeUpdate = 103,
  LoginRequired = 104,
  AppUpdateRequired = 105,
  SubscriptionUpdated = 106
}

export enum EnumNotificationStatus {
  None = 0,
  UnAcknowledged = 1,
  Acknowledged = 2,
  Read = 3,
  Deleted = 4
}

export enum EnumPlacemarkerColorCode {
  Tomato = '#D50000',
  Sage = '#33B679',
  Peacock = '#039BE5',
  Blueberry = '#3F51B5',
  Grape = '#8E24AA',
  Orange = '#f09300'
}

export enum EnumNotificationTab {
  All = 0,
  Unread = 1,
  Read = 2
}

export enum EnumDynamicLink {
  ScheduleTakeAction = 'schedule-take-action',
  InstallApp = 'install-app',
  RecordDetails = 'record-details',
  RecordCreate = 'record-create',
  RecordEdit = 'record-edit',
}

export enum EnumNotificationReponseCode {
  NOTIFICATION_PARTIALLY_UPDATED_CODE = 5008
}

export enum EnumSWALIcon {
  Success = 1,
  Warning = 2,
  Error = 3,
  Info = 4
}