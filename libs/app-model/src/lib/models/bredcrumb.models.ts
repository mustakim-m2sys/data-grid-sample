export interface BreadCrumbModel {
  IconUrl: string;
  Title: string;
  IconType: EnumIconType;
  Route: string;
}

export enum EnumIconType {
  URL,
  ICON_ION,
  FA_ICON
}

export enum BreadCrumbType {
  FIXED,
  PARENT_MENU,
  CHILD_MENU
}
