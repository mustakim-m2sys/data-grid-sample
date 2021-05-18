import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { UIState, UIStore } from './ui.store';

@Injectable({
  providedIn: 'root'
})
export class UIQuery extends Query<UIState> {
  redirectUrl$ = this.select(state => state.redirectUrl);
  redirectMenuUrl$ = this.select(state => state.redirectMenuUrl);
  isSidebarHidden$ = this.select(state => state.isSidebarHidden);
  isDashboardMenuActive$ = this.select(state => state.isDashboardMenuActive);
  isRightSidebarVisible$ = this.select(state => state.isRightSidebarOpen);
  activeLang$ = this.select(state => state.activeLang);
  appSearchText$ = this.select(state => state.appSearchText);
  isGlobalLoaderVisible$ = this.select(state => state.isGlobalLoaderVisible);
  showIconOnlyInGlobalLoader$ = this.select(state => state.showIconOnlyInGlobalLoader);
  globalLoaderText$ = this.select(state => state.globalLoaderText);
  resizedGridsterItemComponent$ = this.select(state => state.resizedGridsterItemComponent);
  currentImportStep$ = this.select(state => state.CurrentImportStep);
  isHelpLoaderVisible$ = this.select(state => state.isHelpLoaderVisible);
  helpLoaderText$ = this.select(state => state.helpLoaderText);
  helpLoadUrl$ = this.select(state => state.helpLoadUrl); 
  dotPulseLoaderForHelp$ = this.select(state => state.dotPulseLoaderForHelp);
  breadCrumbArray = this.select(state => state.breadcrumb);
  isSidebarHidden = this.getValue().isSidebarHidden;
  cacheErrorCount = this.getValue().cacheErrorCount;

 

  //#region Report UI State Related data obversavbles
    currentReportUiState$ = this.select(state=> state.reportUiState);
    currentReport$ = this.select(state=> state.CurrentReport);
    isReportDesigning$ = this.select(state=> state.reportUiState.IsEditingReport);
    reportEditingMode$ = this.select(state=> state.reportUiState.EditingType);
    isViewingReport$ = this.select(state=> state.reportUiState.IsViewingReport);
    isViewingReportList$ = this.select(state=> state.reportUiState.IsViewingReportList);
    currentReportCount$ = this.select(state=> state.reportUiState.CurrentReportCount);
    currentReportScope$ = this.select(state=> state.reportUiState.CurrentReportScope);
    currentReport = this.getValue().CurrentReport;
    currentReportHeaderInformation = this.getValue().currentReportHeaderInformation;
    currentReportCount = this.getValue().reportUiState.CurrentReportCount;
    currentReportHeaderInformation$ = this.select(state => state.currentReportHeaderInformation)
    NeedReportSaving$ = this.select(state=> state.ReportNeedSaving);
    NeedReportInfoSaving$ = this.select(state=> state.ReportInfomrationNeedSaving);
    isReportInfomrtionEditing$ = this.select(state=> state.reportUiState.IsReportInformationChanging)
    IsEditingExistingReportInformation$ = this.select(state=> state.IsEditingExistingReportInformation)

  //#endregion

  constructor(protected store: UIStore) {
    super(store);
  }

  getActiveLang() {
    return this.getValue().activeLang;
  }

  getRedirectUrl() {
    return this.getValue().redirectUrl;
  }

  getRedirectMenuUrl() {
    return this.getValue().redirectMenuUrl;
  }

  getPreviousLoggedInUserId() {
    return this.getValue().PreviousLoggedInUserId;
  }

  getAppSearchText() {
    return this.getValue().appSearchText;
  }

  getAuthErrorCount() {
    return this.getValue().authErrorCount;
  }

  getCurrentFormViewForSaving() {
    return this.getValue().CurrentFormViewForSaving;
  }
}
