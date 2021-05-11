import { EntityBrowsedData, ICalendarDataForSidebar, IRecordViewModel } from '@CloudApperClients/app-model';

import { ISchemaViewModel } from './schema.models';
import { DefaultItems } from './ui/ui.models';

export interface IBaseViewConfiguration {
  filterArray?: any[];
  sortConfiguration?: any;
}
//#region data grid interfaces
export interface IDataGridConfiguration {
  gridDisplayConfig: IGridDisplayConfig;
  gridOperationConfig: IGridOperationConfig;
  searchAndFilterPanelConfig: IGridSearchAndFilterPanelConfig;
  selectionConfiguration: IGridSelectionConfiguration;
  groupingConfiguration: IGridGroupingConfiguration;
  dataExportImportConfiguration: IGridDataExportImportConfiguration;
  dataSortingMode: GridDataSortingModeEnum;
  isOnBoarding: boolean;
  scrollingConfiguration: IGridScrollingConfiguration;
  columnConfiguration: IGridColumnConfiguration;
  editingConfiguration: IGridEditingConfiguration;
}

export interface IGridSearchAndFilterPanelConfig {
  searchPanelConfig: IGridSearchPanelConfig;
  filterPanelVisible: boolean;
  filterRowVisible: boolean;
  filterRowApplyFilter: GridFilterRowApplyFilterEnum;
}

export interface IGridSearchPanelConfig {
  visible: boolean;
  width: string;
  placeholder: string;
  highlightSearchText: boolean;
  highlightCaseSensitive: boolean;
}

export interface IGridDisplayConfig {
  height: string | number;
  width: string | number;
  showBorders: boolean;
  showRowLines: boolean;
  rowAlternationEnabled: boolean;
  showColumnHeaders: boolean;
  showColumnLines: boolean;
  columnAutoWidth: boolean;
  columnMinWidth: number;
  wordWrapEnabled: boolean;
  noDataText: string;
}

export interface IGridOperationConfig {
  remoteOperations: IGridRemoteOperationsConfiguration;
  repaintChangesOnly: boolean;
  renderColumnsAsynchronously: boolean;
  cacheEnabled: boolean;
  focusStateEnabled: boolean;
  keyboardNavigation: IGridKeyboardNavigationConfiguration;
  allowColumnReordering: boolean;
  allowColumnResizing: boolean;
}

export interface IGridKeyboardNavigationConfiguration {
  enabled: boolean;
  editOnKeyPress: boolean;
  enterKeyAction: GridKeyNavEnterKeyActionEnum;
  enterKeyDirection: GridKeyNavEnterKeyDirectionEnum;
}

export interface IGridRemoteOperationsConfiguration {
  filtering: boolean;
  sorting: boolean;
  paging: boolean;
  grouping: boolean;
  groupPaging: boolean;
  summary: boolean;
}

export interface IGridColumnConfiguration {
  columnFixingEnabled: boolean;
  columnChooseEnabled: boolean;
  columnChooserMode: GridColumnChooserModeEnum;
}

export interface IGridSelectionConfiguration {
  selectionMode: GridSelectionModeEnum;
  selectAllMode: GridSelectAllModeEnum;
  showCheckBoxesMode: GridSelectShowCheckBoxesModeEnum;
}

export interface IGridGroupingConfiguration {
  groupPanelVisible: boolean;
  groupEmptyPanelText: string;
  autoExpandAll: boolean;
  contextMenuEnabled: boolean;
  expandMode: GridGroupingExpandModeEnum;
}

export interface IGridDataExportImportConfiguration {
  dataExportEnabled: boolean;
  allowExportSelectedData: boolean;
  dataImportEnabled: boolean;
}

export interface IGridEditingConfiguration {
  allowUpdating: boolean;
  allowDeleting: boolean;
  useIcons: boolean;
  editingMode: GridEditingModeEnum;
  refreshMode: GridRefreshModeEnum
  startEditAction: GridStartEditActionEnum;
}

export interface IGridScrollingConfiguration {
  pageSize: number;
  dataScrollingMode: GridDataScrollingModeEnum;
  rowRenderingMode: GridDataDisplayScrollingModeEnum;
  columnRenderingMode: GridDataDisplayScrollingModeEnum;
  preloadEnabled: boolean;
  useNative: boolean;
  showScrollbar: GridShowScrollbarModeEnum;
}

export interface IGridSortObject {
  selector: string;
  desc: boolean;
}

export interface IDataGridEditorOptions {
  type?: string;
  itemTemplate?: string;
  showClearButton?: boolean;
  height?: string;
  width?: string;
  max?: number;
  displayFormat?: string;
  placeholder?: string;
  value?: any;
  stylingMode?: string;
}

export interface IGridFilterObject {
  fieldName: string;
  comparisonOperator: GridFilterComparisonOperatorsEnum;
  value: any;
}

export interface IGridDataForUpdate {
  record: IRecordViewModel;
  dynamicFields: Record<string, any>;
}

export interface IGridFilterOperationDescriptions {
  between: string;
  contains: string;
  endsWith: string;
  equal: string;
  greaterThan: string;
  greaterThanOrEqual: string;
  isBlank: string;
  isNotBlank: string;
  lessThan: string;
  lessThanOrEqual: string;
  notContains: string;
  notEqual: string;
  startsWith: string;
}

export interface IGridGroupOperationDescriptions {
  and: string;
  notAnd: string;
  notOr: string;
  or: string;
}

export interface IDisplayAndEditTemplateRendererInfo {
  ShowDropdownBadgeStyle?: boolean;
  PlaceHolderText?: string;
  SwitchOnText?: string;
  SwitchOffText?: string;
  GridDefaultValue?: string[];
  GridDefaultItems?: DefaultItems[];
}
//#endregion

//#region data grid enums
export enum GridStartEditActionEnum {
  Click = 'click',
  DblClick = 'dblClick'
}

export enum GridFilterRowApplyFilterEnum {
  Auto = 'auto',
  OnClick = 'onClick'
}

export enum GridKeyNavEnterKeyActionEnum {
  StartEdit = 'startEdit',
  MoveFocus = 'moveFocus'
}

export enum GridKeyNavEnterKeyDirectionEnum {
  None = 'none',
  Column = 'column',
  Row = 'row'
}

export enum GridColumnChooserModeEnum {
  DragAndDrop = 'dragAndDrop',
  Select = 'select'
}

export enum GridGroupingExpandModeEnum {
  ButtonClick = 'buttonClick',
  RowClick = 'rowClick'
}

export enum GridEditingModeEnum {
  Batch = 'batch',
  Cell = 'cell',
  Row = 'row',
  Form = 'form',
  PopUp = 'popup'
}

export enum GridRefreshModeEnum {
  Full = 'full',
  Reshape = 'reshape',
  Repaint = 'repaint'
}

export enum GridDataSortingModeEnum {
  None = 'none',
  Single = 'single',
  Multiple = 'multiple'
}

export enum GridShowScrollbarModeEnum {
  Always = 'always',
  Never = 'never',
  OnHover = 'onHover',
  OnScroll = 'onScroll'
}

export enum GridSelectionModeEnum {
  None = 'none',
  Single = 'single',
  Multiple = 'multiple'
}

export enum GridSelectAllModeEnum {
  Page = 'page',
  AllPages = 'allPages'
}

export enum GridSelectShowCheckBoxesModeEnum {
  None = 'none',
  OnClick = 'onClick',
  OnLongTap = 'onLongTap',
  Always = 'always'
}

export enum GridDataScrollingModeEnum {
  Standard = 'standard',
  Infinite = 'infinite',
  Virtual = 'virtual'
}

export enum GridDataDisplayScrollingModeEnum {
  Standard = 'standard',
  Virtual = 'virtual'
}

export enum DataGridDataTypeEnum {
  String = 'string',
  Number = 'number',
  Boolean = 'boolean',
  Date = 'date',
  DateTime = 'datetime',
  Object = 'object'
}

export enum GridFilterComparisonOperatorsEnum {
  Equals = '=',
  NotEquals = '<>',
  Gt = '>',
  Gte = '>=',
  Lt = '<',
  Lte = '<=',
  StartsWith = 'startswith',
  EndsWith = 'endswith',
  Contains = 'contains',
  NotContains = 'notcontains',
  Between = 'between',
  NotInBetween = 'notinbetween',
  IsBlank = "isblank",
  IsNotBlank = "isnotblank",
  CurrentUser = "_CurrentUser",
  Today = "_Today",
  CurrentMonth = "_ThisMonth",
  CurrentYear = "_ThisYear",
}

export enum FilterRuleComparisonOperatorsEnum {
  Equals = '=',
  NotEquals = '!=',
  Gt = '>',
  Gte = '>=',
  Lt = '<',
  Lte = '<=',
  StartsWith = 'startswith',
  EndsWith = 'endswith',
  Contains = 'contains',
  NotContains = 'not contains',
  IsBlank = "isEmpty",
  IsNotBlank = "isNotEmpty",
  Between = "in range",
  NotInBetween = "not in range"
}

export enum FilterGroupOperatorsEnum {
  And = 'and',
  Or = 'or',
  Not = '!'
}

export enum SorlGroupOperatorsEnum {
  And = 'AND',
  Or = 'OR',
  Not = '-'
}

export enum DataGridDisplayTemplateEnum {
  PhotoTemplate = 'PhotoTemplate',
  ParentPhotoTemplate = 'ParentPhotoTemplate',
  BarcodePhotoTemplate = 'BarcodePhotoTemplate',
  EntityDetailsTemplate = 'EntityDetailsTemplate',
  TextFieldTemplate = 'TextFieldTemplate',
  RatingTemplate = 'RatingTemplate',
  DropDownTemplate = 'DropDownTemplate',
  CheckBoxAndSwitchTemplate = 'CheckBoxAndSwitchTemplate',
  MultiSelectTemplate = 'MultiSelectTemplate',
  CustomLoaderInfoTemplate = 'CustomLoaderInfoTemplate',
  ExportButtonTemplate = 'ExportButtonTemplate',
  ImportButtonTemplate = 'ImportButtonTemplate',
  PrintButtonTemplate = 'PrintButtonTemplate',
  DefaultUserInvitationStatusTemplate = 'DefaultUserInvitationStatusTemplate',
  DefaultUserInvitationButtonTemplate = "DefaultUserInvitationButtonTemplate",
  DefaultUserRoleTemplate = "DefaultUserRoleTemplate",
  MultipleRecordsDeleteButtonTemplate = "MultipleRecordsDeleteButtonTemplate"
}

export enum DataGridEditorTemplateEnum {
  TextAreaEditTemplate = 'TextAreaEditTemplate',
  SwitchEditTemplate = 'SwitchEditTemplate',
  CheckBoxEditTemplate = 'CheckBoxEditTemplate',
  DropDownEditTemplate = 'DropDownEditTemplate',
  MultiSelectEditTemplate = 'MultiSelectEditTemplate',
  RatingEditTemplate = 'RatingEditTemplate',
  TodayCustomFilterTemplate = "TodayCustomFilterTemplate"
}

export enum DataGridExportOptionsEnum {
  ExportAllAsExcell = 'ExportAllAsExcell',
  ExportSelectedAsExcell = 'ExportSelectedAsExcell',
}

export enum DataGridHorizontalAlignmentEnum {
  Center = 'center',
  Left = 'left',
  Right = 'right'
}

export enum EnumOpenedIn {
  MENU,
  CHILD_TAB,
  RIGHT_SIDE_BAR,
  SCHEDULER_FORM
}

export enum EnumGridType {
  CHILD,
  PARENT
}

export enum EnumStatus {
  NONE = 0,
  InActive = 1,
  Active = 2,
  Deleted = 3,
  Flagged = 4,
  CheckedIn = 5,
  CheckedOut = 6
}

export enum DataGridInternalFieldNameEnum {
  TemplateModel = 'TemplateModel',
  DisplayValue = 'DisplayValue',
  SelectedValue = 'SelectedValue',
  DisplayColor = 'DisplayColor',
}
//#endregion

//#region data constants
export abstract class GridConstants {
  static readonly TOOLBAR_ITEM_GROUP_PANEL: string = "groupPanel";
  static readonly TOOLBAR_ITEM_CUSTOM_LOADER: string = "itemCustomLoader";
  static readonly TOOLBAR_ITEM_SEARCH_PANEL: string = "searchPanel";
  static readonly TOOLBAR_ITEM_EXPORT_BUTTON: string = "exportButton";
  static readonly TOOLBAR_ITEM_IMPORT_BUTTON: string = "importButton";
  static readonly TOOLBAR_ITEM_PRINT: string = "printButton";
  static readonly TOOLBAR_ITEM_APPLY_FILTER_BUTTON: string = "applyFilterButton";
  static readonly TOOLBAR_ITEM_RELOAD_BUTTON: string = "reloadButton";
  static readonly EDIT_LOCK_UNLOCK_BUTTON: string = "editLockUnlockButton";
  static readonly TOOLBAR_ITEM_DEFAULT_USER_INVITATION_BUTTON: string = "defaultUserInvitationButton";
  static readonly TOOLBAR_ITEM_ADD_BUTTON: string = "addButton";
  static readonly TOOLBAR_ITEM_COLUMN_CHOOSER_BUTTON: string = "columnChooserButton";
  static readonly TOOLBAR_MULTIPLE_RECORDS_DELETE_BUTTON: string = "multipleRecordsDeleteButton";
  static readonly SAVE_BUTTON: string = "saveButton";
  static readonly REVERT_BUTTON: string = "revertButton";
  static readonly SEARCH_PANEL: string = "searchPanel";
}

export abstract class GridElementIdConstants {
  static readonly RECORD_ADD_BUTTON_ID = "dataGridRecordAddBtn";
  static readonly RECORD_EDIT_LOCK_BUTTON_ID = "dataGridRecordEditLockBtn";
  static readonly RECORD_EDIT_UNLOCK_BUTTON_ID = "dataGridRecordEditUnLockBtn";
  static readonly RECORD_DELETE_BUTTON_ID = "dataGridRecordDeleteBtn";
  static readonly MULTIPLE_RECORD_DELETE_BUTTON_ID = "dataGridMultiRecordDeleteBtn";
  static readonly DATA_IMPORT_BUTTON_ID = "dataGridDataImportBtn";
  static readonly DATA_EXPORT_BUTTON_ID = "dataGridDataExportBtn";
  static readonly DATA_EXPORT_ALL_BUTTON_ID = "dataGridDataExportAllBtn";
  static readonly DATA_EXPORT_SELECTED_BUTTON_ID = "dataGridDataExportSelectedBtn";
  static readonly DATA_PRINT_BUTTON_ID = "dataGridDataPrintBtn";
  static readonly DATA_RELOAD_BUTTON_ID = "dataGridDataReloadBtn";
  static readonly SEARCH_PANEL_TEXTBOX_ID = "dataGridSearchPanelTxt";
  static readonly DEFAULT_USER_REINVITE_BUTTON_ID = "dataGridDefaultUserReinviteBtn";
  static readonly DEFAULT_USER_REMOVE_LOGIN_ACCESS_BUTTON_ID = "dataGridDefaultUserRemoveLoginAccessBtn";
  static readonly DEFAULT_USER_ENABLE_LOGIN_ACCESS_BUTTON_ID = "dataGridDefaultUserEnableLoginAccessBtn";
}
//#endregion

//#region data grid classes
export class GridBaseEvent {
  Schema: ISchemaViewModel;
  RecordId: string;
  IsNewRecord: boolean;
}

export class GridAddEventModel extends GridBaseEvent {
  ParentTypeId: string;
  ParentRecordId: string;
  ParentRecord: Partial<IRecordViewModel>;
  GridType: EnumGridType;
  ParentDisplayName: string;
  ParentDisplayPicture: string;
  RowData: IRecordViewModel;
  IsBrowseControlAddState?: boolean;
  BrowseFormControlName?: string;
  RecordAddedFromBrowseControlAddState?: IRecordViewModel;
  FormControlValueAddedFromBrowseControlAddState?: string;
  IsSwitchFromBrowseControlAddState?: boolean;
  PreviousSelectedIndex?: number;
  BrowseData: EntityBrowsedData;
  CalendarDataForSidebar: ICalendarDataForSidebar;
  ScheduleId: string;
  CurrentCellDateForScheduler: string;
  IsDirectEditFromKanbanView: boolean;
}

export class GridRecordFetchEventModel extends GridBaseEvent {
  Count: number;
  RecordId: string;
}

export class GridDeleteEventModel extends GridBaseEvent {
  RecordId: string;
}


export class DefaultDataGridConfiguration implements IDataGridConfiguration {

  gridDisplayConfig = <IGridDisplayConfig>{
    height: '76vh',
    width: 'inherit',
    showBorders: false,
    showRowLines: true,
    rowAlternationEnabled: false,
    showColumnHeaders: true,
    showColumnLines: false,
    columnAutoWidth: true,
    columnMinWidth: 100,
    wordWrapEnabled: false,
    noDataText: 'NoDataFound'
  };
  gridOperationConfig = <IGridOperationConfig>{
    remoteOperations: <IGridRemoteOperationsConfiguration>{
      filtering: true,
      sorting: true,
      paging: true,
      grouping: false,
      groupPaging: false,
      summary: false
    },
    repaintChangesOnly: true,
    renderColumnsAsynchronously: false,
    cacheEnabled: true,
    focusStateEnabled: true,
    keyboardNavigation: <IGridKeyboardNavigationConfiguration>{
      enabled: true,
      editOnKeyPress: true,
      enterKeyAction: GridKeyNavEnterKeyActionEnum.StartEdit,
      enterKeyDirection: GridKeyNavEnterKeyDirectionEnum.Row
    },
    allowColumnReordering: true,
    allowColumnResizing: true
  };
  searchAndFilterPanelConfig = <IGridSearchAndFilterPanelConfig>{
    searchPanelConfig: <IGridSearchPanelConfig>{
      visible: true,
      width: '250',
      placeholder: 'SearchHere',
      highlightSearchText: true,
      highlightCaseSensitive: false
    },
    filterPanelVisible: false,
    filterRowVisible: true,
    filterRowApplyFilter: GridFilterRowApplyFilterEnum.Auto
  };
  selectionConfiguration = <IGridSelectionConfiguration>{
    selectionMode: GridSelectionModeEnum.Multiple,
    selectAllMode: GridSelectAllModeEnum.Page,
    showCheckBoxesMode: GridSelectShowCheckBoxesModeEnum.Always
  };
  groupingConfiguration = <IGridGroupingConfiguration>{
    groupPanelVisible: true,
    groupEmptyPanelText: "DragColumnHeaderHereForGrouping",
    autoExpandAll: false,
    contextMenuEnabled: true,
    expandMode: GridGroupingExpandModeEnum.RowClick
  };
  dataExportImportConfiguration = <IGridDataExportImportConfiguration>{
    dataExportEnabled: true,
    allowExportSelectedData: true,
    dataImportEnabled: true
  };
  dataSortingMode = GridDataSortingModeEnum.Multiple;
  isOnBoarding = true;
  scrollingConfiguration = <IGridScrollingConfiguration>{
    pageSize: 20,
    dataScrollingMode: GridDataScrollingModeEnum.Standard,
    rowRenderingMode: GridDataDisplayScrollingModeEnum.Standard,
    columnRenderingMode: GridDataDisplayScrollingModeEnum.Virtual,
    preloadEnabled: true,
    useNative: false,
    showScrollbar: GridShowScrollbarModeEnum.Always
  };
  columnConfiguration = <IGridColumnConfiguration>{
    columnFixingEnabled: true,
    columnChooseEnabled: true,
    columnChooserMode: GridColumnChooserModeEnum.Select
  };
  editingConfiguration = <IGridEditingConfiguration>{
    allowUpdating: true,
    allowDeleting: true,
    useIcons: true,
    editingMode: GridEditingModeEnum.Cell, // cell editing mode comes with default auto save
    refreshMode: GridRefreshModeEnum.Repaint, //only repaint the UI
    startEditAction: GridStartEditActionEnum.Click
  };
}

export class MinDataGridConfiguration implements IDataGridConfiguration {

  gridDisplayConfig = <IGridDisplayConfig>{
    height: 'auto',
    width: 'inherit',
    showBorders: false,
    showRowLines: true,
    rowAlternationEnabled: false,
    showColumnHeaders: true,
    showColumnLines: false,
    columnAutoWidth: true,
    columnMinWidth: 100,
    wordWrapEnabled: false,
    noDataText: 'NoDataFound'
  };
  gridOperationConfig = <IGridOperationConfig>{
    remoteOperations: <IGridRemoteOperationsConfiguration>{
      filtering: true,
      sorting: true,
      paging: true,
      grouping: false,
      groupPaging: false,
      summary: false
    },
    repaintChangesOnly: true,
    renderColumnsAsynchronously: false,
    cacheEnabled: true,
    focusStateEnabled: true,
    keyboardNavigation: <IGridKeyboardNavigationConfiguration>{
      enabled: true,
      editOnKeyPress: true,
      enterKeyAction: GridKeyNavEnterKeyActionEnum.StartEdit,
      enterKeyDirection: GridKeyNavEnterKeyDirectionEnum.Row
    },
    allowColumnReordering: true,
    allowColumnResizing: true
  };
  searchAndFilterPanelConfig = <IGridSearchAndFilterPanelConfig>{
    searchPanelConfig: <IGridSearchPanelConfig>{
      visible: true,
      width: '250',
      placeholder: 'SearchHere',
      highlightSearchText: true,
      highlightCaseSensitive: false
    },
    filterPanelVisible: false,
    filterRowVisible: true,
    filterRowApplyFilter: GridFilterRowApplyFilterEnum.Auto
  };
  selectionConfiguration = <IGridSelectionConfiguration>{
    selectionMode: GridSelectionModeEnum.Multiple,
    selectAllMode: GridSelectAllModeEnum.Page,
    showCheckBoxesMode: GridSelectShowCheckBoxesModeEnum.Always
  };
  groupingConfiguration = <IGridGroupingConfiguration>{
    groupPanelVisible: false, // disabled for min grid
    groupEmptyPanelText: "DragColumnHeaderHereForGrouping",
    autoExpandAll: false,
    contextMenuEnabled: true,
    expandMode: GridGroupingExpandModeEnum.RowClick
  };
  dataExportImportConfiguration = <IGridDataExportImportConfiguration>{
    dataExportEnabled: false, // disabled for min grid
    allowExportSelectedData: false, // disabled for min grid
    dataImportEnabled: false // disabled for min grid
  };
  dataSortingMode = GridDataSortingModeEnum.Single;
  isOnBoarding = false;
  scrollingConfiguration = <IGridScrollingConfiguration>{
    pageSize: 20,
    dataScrollingMode: GridDataScrollingModeEnum.Standard,
    rowRenderingMode: GridDataDisplayScrollingModeEnum.Standard,
    columnRenderingMode: GridDataDisplayScrollingModeEnum.Virtual,
    preloadEnabled: true,
    useNative: true, // use native scrollbar for min grid
    showScrollbar: GridShowScrollbarModeEnum.Always
  };
  columnConfiguration = <IGridColumnConfiguration>{
    columnFixingEnabled: true, // disabled for min grid
    columnChooseEnabled: false, // disabled for min grid
    columnChooserMode: GridColumnChooserModeEnum.Select
  };
  editingConfiguration = <IGridEditingConfiguration>{
    allowUpdating: true,
    allowDeleting: true,
    useIcons: true,
    editingMode: GridEditingModeEnum.Cell, // cell editing mode comes with default auto save
    refreshMode: GridRefreshModeEnum.Repaint, //only repaint the UI
    startEditAction: GridStartEditActionEnum.Click
  };
}


export class GridFilterOperationDescriptions implements IGridFilterOperationDescriptions {
  between = "Between";
  contains = "Contains";
  endsWith = "EndsWith";
  equal = "Equals";
  greaterThan = "GreaterThan";
  greaterThanOrEqual = "GreaterThanOrEqualTo";
  isBlank = "IsBlank";
  isNotBlank = "IsNotBlank";
  lessThan = "LessThan";
  lessThanOrEqual = "LessThanOrEqualTo";
  notContains = "DoesNotContain";
  notEqual = "DoesNotEqual";
  startsWith = "StartsWith";
}

export class GridGroupOperationDescriptions implements IGridGroupOperationDescriptions {
  and = "And";
  notAnd = "NotAnd";
  notOr = "NotOr";
  or = "Or";
}

export enum GridCustomOperationDescriptions {
  _CurrentUser = "IsCurrentUser",
  _Today = "IsToday",
  _ThisMonth = "IsCurrentMonth",
  _ThisYear = "IsCurrentYear"
}
//#endregion
