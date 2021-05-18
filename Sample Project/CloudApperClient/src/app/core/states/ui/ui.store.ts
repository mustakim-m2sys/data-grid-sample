import { Injectable } from '@angular/core';
import { DefaultReportUiState, IFormViewVM, IGridsterItemComponent, IReportUiState, IReportViewModel, ReportHeaderInformation } from '@CloudApperClients/app-model';
import { Store, StoreConfig } from '@datorama/akita';

export interface UIState {
  redirectUrl: string;
  redirectMenuUrl: string;
  isSidebarHidden: boolean;
  activeLang: string;
  isDashboardMenuActive: boolean;
  breadcrumb: any[];
  currentView: string;
  appSearchText: string;
  isRightSidebarOpen: boolean;
  isGlobalLoaderVisible: boolean;
  showIconOnlyInGlobalLoader: boolean,
  globalLoaderText: string;
  resizedGridsterItemComponent: IGridsterItemComponent;
  DataGridFilter: Array<any>
  Sorting: any
  CurrentFormViewForSaving: IFormViewVM,
  CurrentImportStep: any;
  PreviousLoggedInUserId: string;
  isHelpLoaderVisible: boolean;
  helpLoaderText: string;
  helpLoadUrl: string;
  dotPulseLoaderForHelp: boolean;
  authErrorCount: number;
  cacheErrorCount: number;
  reportUiState : IReportUiState;
  currentReportHeaderInformation : ReportHeaderInformation;
  CurrentReport : IReportViewModel;
  ReportNeedSaving : boolean;
  ReportInfomrationNeedSaving : boolean;
  IsEditingExistingReportInformation : boolean;
}

export function createInitialUIState(): UIState {
  return {
    redirectUrl: '',
    redirectMenuUrl: '',
    isSidebarHidden: false,
    activeLang: '',
    isDashboardMenuActive: false,
    breadcrumb: [],
    currentView: '',
    appSearchText: '',
    isRightSidebarOpen: false,
    isGlobalLoaderVisible: false,
    showIconOnlyInGlobalLoader: false,
    globalLoaderText: '',
    resizedGridsterItemComponent: null,
    DataGridFilter: [],
    Sorting: '',
    CurrentFormViewForSaving: null,
    CurrentImportStep: '',
    PreviousLoggedInUserId: '',
    isHelpLoaderVisible: false,
    helpLoaderText: '',
    helpLoadUrl: '',
    dotPulseLoaderForHelp: false,
    authErrorCount: 0,
    cacheErrorCount: 0,
    reportUiState : new DefaultReportUiState(),
    currentReportHeaderInformation : null,
    CurrentReport:null,
    ReportNeedSaving : false,
    ReportInfomrationNeedSaving : false,
    IsEditingExistingReportInformation  : false

  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'ui', resettable: false })
export class UIStore extends Store<UIState> {
  constructor() {
    super(createInitialUIState());
  }

  dynamicUpdate(property: string, value: any) {
    const state: Partial<UIState> = {};
    state[property] = value;
    this.update(state);
  }

  updateRedirectUrl(redirectUrl: string) {
    this.update(state => ({
      redirectUrl: redirectUrl
    }));
  }

  setPreviousLoggedInUserId(previousLoggedInUserId: string) {
    this.update(state => ({
      PreviousLoggedInUserId: previousLoggedInUserId ? previousLoggedInUserId : ""
    }));
  }

  updateRedirectMenuUrl(redirectMenuUrl: string) {
    this.update(state => ({
      redirectMenuUrl: redirectMenuUrl
    }));
  }

  toggleSidebar(isSidebarHidden: boolean) {
    this.update(state => ({
      isSidebarHidden: isSidebarHidden
    }));
  }

  toggleSidebarVisible(isRightSidebarOpen: boolean) {
    this.update(state => ({
      isRightSidebarOpen: isRightSidebarOpen
    }));
  }

  setActiveLang(activeLang: string) {
    this.update(state => ({ activeLang: activeLang }));
  }

  updateAppSearchText(appSearchText: string) {
    this.update(state => ({ appSearchText: appSearchText }));
  }

  setBreadCrumb(breadcrumbArray: any[]) {
    this.update(state => ({ breadcrumb: breadcrumbArray }));
  }

  setDashboardMenuActive(isDashboardMenuActive: boolean) {
    this.update(state => ({ isDashboardMenuActive: isDashboardMenuActive }));
  }

  setCurrentView(currentView: string) {
    this.update(state => ({ currentView: currentView }));
  }

  setGlobalLoaderVisible(isGlobalLoaderVisible: boolean) {
    this.update(state => ({ isGlobalLoaderVisible: isGlobalLoaderVisible }));
  }

  setGlobalLoaderIconOnly(showIconOnlyInGlobalLoader: boolean) {
    this.update(state => ({ showIconOnlyInGlobalLoader: showIconOnlyInGlobalLoader }));
  }

  setGlobalLoaderText(globalLoaderText: string) {
    this.update(state => ({ globalLoaderText: globalLoaderText }));
  }

  setCurrentGridFilter(Filter: any[]) {
    this.update(state => ({ DataGridFilter: Filter }));
  }
  setCurrentFormViewForSaving(viewModel: IFormViewVM) {
    this.update(state => ({ CurrentFormViewForSaving: viewModel }));
  }

  setResizedGridsterItemComponent(resizedGridsterItemComponent: IGridsterItemComponent) {
    //update and then reset to emit same data next time
    this.update(state => ({ resizedGridsterItemComponent: resizedGridsterItemComponent }));
    this.update(state => ({ resizedGridsterItemComponent: null }));
  }

  setCurrentImportStep(currentStep: any) {
    this.update(state => ({ CurrentImportStep: currentStep }));
  }

  setHelpLoaderVisible(isHelpLoaderVisible: boolean) {
    this.update(state => ({ isHelpLoaderVisible: isHelpLoaderVisible }));
  }

  setHelpLoaderText(helpLoaderText: string) {
    this.update(state => ({ helpLoaderText: helpLoaderText }));
  }

  setHelpLoadUrl(helpLoadUrl: string) {
    this.update(state => ({ helpLoadUrl: helpLoadUrl }));
  }

  setDotPulseLoaderForHelp(dotPulseLoaderForHelp: boolean) {
    this.update(state => ({ dotPulseLoaderForHelp: dotPulseLoaderForHelp }));
  }

  setAuthErrorCount(authErrorCount: number) {
    this.update(state => ({ authErrorCount: authErrorCount }));
  }

  setCacheErrorCount(cacheErrorCount: number) {
    this.update(state => ({ cacheErrorCount: cacheErrorCount }));
  }

  updateReportUiState(reportUIState : IReportUiState)
  {
    this.update(state => ({ reportUiState: reportUIState }));
  }

  updateCurrentReportHeader(reportHeader : ReportHeaderInformation)
  {
    this.update(state => ({ currentReportHeaderInformation: reportHeader }));
  }

  updateCurrentReport(currentReport : IReportViewModel)
  {
    this.update(state => ({ CurrentReport: currentReport }));

  }
  updateReportSaving(needReportSaving : boolean)
  {
    this.update(state => ({ ReportNeedSaving: needReportSaving }));
  }


  updateReportInformationSaving(needReportInformation : boolean)
  {
    this.update(state => ({ ReportInfomrationNeedSaving: needReportInformation }));
  }
  updateIsEditingExistingReportInformation(isEditingExistingReportInformation : boolean)
  {
    this.update(state => ({ IsEditingExistingReportInformation: isEditingExistingReportInformation }));
  }
}