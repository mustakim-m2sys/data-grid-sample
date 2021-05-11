import { Injectable } from '@angular/core';
import { GridDataScrollingModeEnum, EnumOpenedIn, EnumRecordUiMode } from '@CloudApperClients/app-model';


@Injectable({ providedIn: "root" })
export class WindowDimensionService {

  consoleTopHeaderHeight = 60;
  appTopHeaderHeight = 50;
  topMenuBarHeight = 40;
  footerHeight = 30;
  breadCrumbHeight = 0;
  sidebarMenuWidth = 250;
  sidebarHeaderHeight = 50;
  sidebarFooterHeight = 45;

  constructor() {
  }

  public getConsolePageContainerHeight(): number {
    let containerHeight = 765;
    if (window && window.innerHeight) {
      containerHeight = window.innerHeight - (this.consoleTopHeaderHeight + this.footerHeight);
    }
    return containerHeight;
  }


  public getConsoleReportPageContainerWidth(): number {
    let innerPageContainerWidth = 765;
    if (window && window.innerWidth) {
      innerPageContainerWidth = window.innerWidth;
    }
    return innerPageContainerWidth;
  }

  public getConsoleReportPagePopupWidth() {

    return (this.getConsoleReportPageContainerWidth() * 2) / 3;
  }


  //height with footer
  public getAppPageContainerHeight(): number {
    let containerHeight = 765;
    if (window && window.innerHeight) {
      containerHeight = window.innerHeight - (this.isTopMenuBarActive() ? (this.appTopHeaderHeight + this.topMenuBarHeight) : this.appTopHeaderHeight);
    }
    return containerHeight;
  }

  //height with footer but not with top menubar
  public getAppPageContainerHeightwithoutTopMenu(): number {
    let containerHeight = 765;
    if (window && window.innerHeight) {
      containerHeight = window.innerHeight - this.appTopHeaderHeight;
    }
    return containerHeight;
  }

  //height without footer
  public getAppInnerPageContainerHeight(): number {
    return this.getAppPageContainerHeight() - this.footerHeight;
  }

  public getAppInnerPageContainerWidth(): number {
    let appInnerPageContainerWidth = 765;
    if (window && window.innerWidth) {
      appInnerPageContainerWidth = window.innerWidth;
      //if sidebar active then substract the sidebar width
      if (this.isSideBarActive()) { appInnerPageContainerWidth = appInnerPageContainerWidth - this.sidebarMenuWidth; }
    }
    return appInnerPageContainerWidth;
  }

  private getInnerPageContainerHeight(): number {
    let innerPageContainerHeight = 765;
    if (window && window.innerHeight) {
      if (this.isTopMenuBarActive()) {
        innerPageContainerHeight = window.innerHeight - (this.appTopHeaderHeight + this.topMenuBarHeight + this.breadCrumbHeight + this.footerHeight);
      } else {
        innerPageContainerHeight = window.innerHeight - (this.appTopHeaderHeight + this.breadCrumbHeight + this.footerHeight);
      }
    }
    return innerPageContainerHeight;
  }

  private getInnerClientPageContainerHeight(): number {
    let innerPageCLientContainerHeight = 765;
    if (window && window.innerHeight) {
      innerPageCLientContainerHeight = window.innerHeight - 174;
    }
    return innerPageCLientContainerHeight;
  }

  public getTopMenuBarWidth(): number {
    let topMenuBarWidth = 1366;
    if (window && window.innerWidth) {
      topMenuBarWidth = window.innerWidth;
    }
    return topMenuBarWidth;
  }

  public getInnerPageContainerHeightForPopup(): number {
    return this.getInnerPageContainerHeight();
  }

  public getInnerPageContainerWidthForPopup(): number {
    return this.getInnerPageContainerWidth();
  }

  public getInnerPageContainerHeightForIFrame(): number {
    let appPageContentHeight = 765;
    if (window && window.innerHeight) {
      appPageContentHeight = window.innerHeight - (this.appTopHeaderHeight + this.footerHeight + 131);
    }
    return appPageContentHeight;
  }

  public getInnerPageContainerHeightForClientCreate(): number {
    return this.getInnerClientPageContainerHeight();
  }

  public getInnerPageContainerHeightForDashboard(): number {
    return this.getInnerClientPageContainerHeight();
  }

  private getInnerPageContainerWidth(): number {
    let innerPageContainerWidth = 765;
    if (window && window.innerWidth) {
      innerPageContainerWidth = window.innerWidth;
    }
    return innerPageContainerWidth;
  }

  public getInnerPageCotainerWidh(): number {
    let innerPageContainerWidth = 765;
    if (window && window.innerWidth) {
      innerPageContainerWidth = window.innerWidth - 400;
    }
    return innerPageContainerWidth;
  }

  private getInnerPageContainerHeightForSidebar(): number {
    let innerPageContainerHeight = 765;
    if (window && window.innerHeight) {
      innerPageContainerHeight = window.innerHeight - (this.sidebarHeaderHeight + this.sidebarFooterHeight);
    }
    return innerPageContainerHeight;
  }

  public isTopMenuBarActive(): boolean {
    const topMenuBar = document.getElementById("topMenuBar");
    return (topMenuBar && topMenuBar.offsetHeight) ? true : false;
  }

  public isSideBarActive(): boolean {
    const sideMenuBar = document.getElementById("sideMenuBar");
    return (sideMenuBar && sideMenuBar.offsetHeight) ? true : false;
  }

  public getSidebarHeight(): number {
    let sidebarHeight = 765;
    if (window && window.innerHeight) {
      sidebarHeight = window.innerHeight - this.appTopHeaderHeight;
    }
    return sidebarHeight;
  }

  public getDashboardContainerHeight(): number {
    const dashboardPadding = 5;
    return this.getInnerPageContainerHeight() - dashboardPadding;
  }

  public getFormViewHeight(): number {
    return this.getInnerPageContainerHeight();
  }

  public getDataGridContainerHeight(dataScrollingMode: GridDataScrollingModeEnum): number {
    const formPadding = 47;
    const gridPadding = dataScrollingMode === GridDataScrollingModeEnum.Standard ? 0 : 20;
    return this.getInnerPageContainerHeight() - gridPadding - formPadding;
  }

  public getDataGridContainerHeightForChild(dataScrollingMode: GridDataScrollingModeEnum, IsSidebar: boolean): number {
    const formPadding = 126;
    const gridPadding = dataScrollingMode === GridDataScrollingModeEnum.Standard ? 0 : 20;
    if (!IsSidebar) {
      return this.getInnerPageContainerHeight() - gridPadding - formPadding;
    }
    else {
      return this.getInnerPageContainerHeightForSidebar() - gridPadding;
    }
  }

  public getCalendarContainerHeight(): number {
    const calendarPadding = 120;
    return this.getInnerPageContainerHeight() - calendarPadding;
  }

  public getCalendarContainerWidth(): number {
    const calendarPadding = this.isSideBarActive() ? 249 : 0;
    return this.getInnerPageContainerWidth() - calendarPadding;
  }

  public getMySchedulesContainerHeight(): number {
    const padding = 45;
    return this.getInnerPageContainerHeight() - padding;
  }

  public getMySchedulesContainerHeightForDetails(IsSidebar: boolean): number {
    const formPadding = IsSidebar ? 215 : 193;
    if (!IsSidebar) {
      return this.getInnerPageContainerHeight() - formPadding;
    }
    else {
      return this.getInnerPageContainerHeightForSidebar() - formPadding;
    }
  }

  public getMySchedulesContainerWidth(): number {
    const padding = this.isSideBarActive() ? 249 : 0;
    return this.getInnerPageContainerWidth() - padding;
  }

  public getKanbanContainerHeight(IsListMenu: boolean): number {
    const kanbanPadding = IsListMenu ? 147 : 100;
    return this.getInnerPageContainerHeight() - kanbanPadding;
  }

  public getKanbanContainerWidth(): number {
    const kanbanPadding = this.isSideBarActive() ? 249 : 0;
    return this.getInnerPageContainerWidth() - kanbanPadding;
  }

  public getFormContainerHeight(OpenedIn: EnumOpenedIn, Mode: EnumRecordUiMode): number {
    const formPadding = OpenedIn === EnumOpenedIn.SCHEDULER_FORM ? 110 : Mode === EnumRecordUiMode.CREATE ? 70 : 126;
    if (OpenedIn === EnumOpenedIn.MENU) {
      return this.getInnerPageContainerHeight() - formPadding;
    }
    else if (OpenedIn === EnumOpenedIn.SCHEDULER_FORM) {
      return this.getInnerPageContainerHeightForSidebar() - formPadding;
    }
    else {
      return this.getInnerPageContainerHeightForSidebar();
    }
  }

  public getDetailsContainerHeight(IsSidebar: boolean): number {
    return this.getInnerPageContainerHeight();
  }

  public getViewContainerHeight() {
    return this.getDetailsContainerHeight(false);
  }

  public getViewSwitchToolbarTop(): number {
    return this.isTopMenuBarActive() ? 104 : 64;
  }

  public getDashboardConfigButonTop(): number {
    return this.isTopMenuBarActive() ? 110 : 70;
  }

  public getDashboardConfigSaveButtonBottom(): number {
    return this.isTopMenuBarActive() ? 120 : 90;
  }

  public getDashboardConfigCancelButtonBottom(): number {
    return this.isTopMenuBarActive() ? 60 : 30;
  }

  public getDashboardConfigButtonRight(): number {
    return this.isTopMenuBarActive() ? 90 : 45;
  }

  public getAddViewToolbarTop(): number {
    return this.isTopMenuBarActive() ? 106 : 66;
  }

  public getAuditLogHeight(IsSidebar: boolean): number {
    const formPadding = 246;
    if (!IsSidebar) {
      return this.getInnerPageContainerHeight() - formPadding;
    }
    else {
      return this.getInnerPageContainerHeightForSidebar() - formPadding;
    }
  }
}

