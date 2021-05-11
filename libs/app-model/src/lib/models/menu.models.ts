import {
  EnumListViewType,
  EnumMenuOperationType,
  EnumMenuViewLayout,
  EnumSchemaType,
  IAppClientMapperModel
} from '../..';

//#region Request Models
//#endregion

//#region Response Models
export interface IMenuResponseModel {
  Id: string;
  Title: string;
  Type: EnumSchemaType;
  TypeId: string;
  Mode: EnumMenuOperationType;
  AppSequenceNo: number;
  WebSequenceNo: number;
  IconUrl: string;
  FilterQuery: string;
  SortQuery: string;
  ViewType: EnumListViewType;
  MenuViewLayout: EnumMenuViewLayout;
  ParentId: string;
  KanbanField: string;
}
//#endregion

//#region View Models
export interface IMenuViewModel extends IAppClientMapperModel, IMenuResponseModel {
  ParentMenu?: IMenuViewModel;
  Childs?: IMenuViewModel[];
}
//#endregion

//#region helper interface/class/enum
export interface IDxMenu {
  id: string;
  text: string;
  icon: string;
  defaultIcon: string;
  mode: EnumMenuOperationType;
  template: DxMenuTemplateEnum;
  closeMenuOnClick: boolean;
  menuType?: DxMenuTypeEnum;
  isStaticMenu: boolean;
  items: IDxMenu[];
  onBoardId?: string
}

export interface IDxMenuConfiguration {
  menuTitleFontStyle: string;
  parentMenuPadding: number;
  menuMinWidth: number;
  parentMenuMaxWidth: number;
  childMenuMaxWidth: number;
  menuIconWidth: number;
  menuTextRightMargin: number;
  menuTextRightNavigationIconWidth: number;
  submenuMode: any;
}

export class DefaultDxMenuConfiguration implements IDxMenuConfiguration {
  menuTitleFontStyle = "14px Helvetica Neue,Segoe UI,Helvetica,Verdana,sans-serif";
  parentMenuPadding = 20;
  menuMinWidth = 120;
  parentMenuMaxWidth = 500;
  childMenuMaxWidth = 600;
  menuIconWidth = 30;
  menuTextRightMargin = 10;
  menuTextRightNavigationIconWidth = 30;
  submenuMode = { name: "onHover", delay: { show: 0, hide: 300 } };
}

export enum DxMenuTemplateEnum {
  ParentMenuTemplate = 'ParentMenuTemplate',
  ChildMenuTemplate = 'ChildMenuTemplate'
}

export enum DxMenuTypeEnum {
  Parent = 'Parent',
  Child = 'Child',
  Dashboard = 'Dashboard',
  Scheduler = 'Scheduler',
  Report = 'Report',
  Dashed = 'Dashed'
}

export enum DxMenuOrientationEnum {
  Horizontal = 'horizontal',
  Vertical = 'vertical'
}

export class DxMenuDefaultImageName {
  public static readonly DEFAULT_MENU = 'root.png';
  public static readonly ADD_MENU = 'add.png';
  public static readonly LIST_MENU = 'list.png';
  public static readonly DASHBOARD_WHITE = 'dashboard-white.png';
  public static readonly DASHBOARD_BLACK = 'dashboard.png';
  public static readonly SCHEDULER_WHITE = 'scheduler-white.png';
  public static readonly SCHEDULER_BLACK = 'scheduler-black.png';
  public static readonly REPORT_WHITE = 'report-white.png';
  public static readonly REPORT_BLACK = 'report.png';
  public static readonly DASHED_WHITE = 'more-menu-white.png';
  public static readonly DASHED_BLACK = 'more-menu.png';
}
//#endregion
