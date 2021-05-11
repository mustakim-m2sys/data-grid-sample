import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  AppRouteUrlConstant,
  CloudapperCodeConstants,
  DataGridDataTypeEnum,
  DataGridDisplayTemplateEnum,
  DataGridEditorTemplateEnum,
  DataGridExportOptionsEnum,
  DataGridInternalFieldNameEnum,
  DefaultUserUpdate,
  EntityBrowsedData,
  EnumControlType,
  EnumDataType,
  EnumGridType,
  EnumMenuStyle,
  EnumPrintOptions,
  EnumUserInvitationStatus,
  GridAddEventModel,
  GridBaseEvent,
  GridConstants,
  GridDataScrollingModeEnum,
  GridDeleteEventModel,
  GridElementIdConstants,
  GridFilterOperationDescriptions,
  GridRecordFetchEventModel,
  GridSelectionModeEnum,
  IAppUserViewModel,
  IAppViewModel,
  IDataGridConfiguration,
  IDynamicTemplateViewModel,
  IFieldViewModel,
  IFormViewVM,
  IGridDataForUpdate,
  IGridFilterOperationDescriptions,
  ILayoutSettingViewModel,
  IMenuViewModel,
  InlineMinLoaderOperationType,
  IRecordDeleteRequestModel,
  IRecordResponseModel,
  IRecordViewModel,
  IRoleViewModel,
  IScheduleFormDataViewModel,
  ISchemaViewModel,
  RegExpConstants,
  ServiceResponse,
  SolrControlNameConstants,
  SvgIconEnum,
} from '@CloudApperClients/app-model';
import { TranslocoService } from '@ngneat/transloco';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
import { QRCodeComponent } from 'angularx-qrcode';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import { exportDataGrid } from 'devextreme/excel_exporter';
import * as ExcelJS from 'exceljs';
import * as saveAs from 'file-saver';
import * as introJs from 'intro.js';
import * as Mustache from 'mustache';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
import Swal from 'sweetalert2';

import {
  formatDateTimeStringLocal,
  formatDateTimeToTimeStringLocal,
  formatFieldForDatagrid,
  formatFieldsForSorting,
  formatGridRecordsBeforeRendering,
  formatTimeToDateTimeStringLocal,
  generateGlobalFilterQuery,
  getAutoCompleteTextBoxControlText,
  getCurrentDateTimeStringLocal,
  getCurrentDateTimeStringUTC,
  getCurrentTimeAsDateTimeStringLocal,
  getGridPhotoTemplateImageUrl,
  getGridPhotoTemplateImageUrls,
  getRecordDetailsUrl,
  getSwitchControlText,
  isMultipleGridPhoto,
  isViewEnabledInGrid,
  mergePredefinedFilterQueryWithViewAndMenuFilterQuery,
  mergePredefinedSortQueryWithViewAndMenuSortQuery,
} from '../../core/helpers';
import { GlobalLoaderService, RecordService } from '../../core/services';
import { GlobalAlertService } from '../../core/services/global.alert.service';
import { AppQuery, AppRoleQuery, AppUsersQuery, RoleQuery, SessionQuery } from '../../core/states';
import {
  DeepClone,
  Get32BitUniqueId,
  MoveArrayItem,
  ReplaceMultipleSpacesWithSingleSpace,
} from '../../core/utils/object.helper';
import { SchemaQuery } from './../../core/states/schema/schema.query';
import { UIStore } from './../../core/states/ui/ui.store';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridComponent implements OnInit, OnDestroy {
  introJS: introJs.IntroJs;
  subscriptions: Subscription[] = new Array<Subscription>();
  exportButtonOptions = [];
  importButtonOptions = [];
  printButtonOptions = [];
  dataSource: any = {};
  seletedRecords: IRecordViewModel[];
  selectedRecordIds: string[] = [];
  app?: IAppViewModel;
  appLayoutSetting: ILayoutSettingViewModel;
  RoleId: string;
  roles: IRoleViewModel[] = [];
  dxErrorImage = "../../assets/img/error-image.svg";
  maxPageSizesList: number[] = [20, 30, 50, 100, 500];
  allowedPageSizes$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([])
  isGlobalSearchEvent: boolean;
  globalSearchText = "";
  filterOperationDescriptions: IGridFilterOperationDescriptions = new GridFilterOperationDescriptions();
  sendqrcode: any;
  private _refresh: boolean
  selectionMode = GridSelectionModeEnum;
  updatingRecordsKeyBuffer: string[] = [];

  @ViewChild('dataGridView', { static: false }) dataGrid: DxDataGridComponent;
  @ViewChildren(QRCodeComponent) qrcodechild: QueryList<QRCodeComponent>;

  get RegExpConstants() { return RegExpConstants; }

  //#region component variables
  private _gridVisibleFields: IFieldViewModel[] = [];
  gridVisibleFields$: BehaviorSubject<IFieldViewModel[]> = new BehaviorSubject<IFieldViewModel[]>(this.gridVisibleFields);
  set gridVisibleFields(gridVisibleFields: IFieldViewModel[]) {
    this._gridVisibleFields = gridVisibleFields;
    this.gridVisibleFields$.next(gridVisibleFields);
  }
  get gridVisibleFields(): IFieldViewModel[] {
    return this._gridVisibleFields;
  }

  private _showDataGridLoader = false;
  showDataGridLoader$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.showDataGridLoader);

  rawSolarDataForExport: IRecordViewModel[];
  payloadForConfiguration = {};

  datePipe = new DatePipe('en-US'); // Use your own locale
  SchemaTitle: string;
  dynamicTemplates: IDynamicTemplateViewModel[];
  set showDataGridLoader(showDataGridLoader: boolean) {
    this._showDataGridLoader = showDataGridLoader;
    this.showDataGridLoader$.next(showDataGridLoader);
  }
  get showDataGridLoader(): boolean {
    return this._showDataGridLoader;
  }

  private _noDataTextForGrid = '';
  noDataTextForGrid$: BehaviorSubject<string> = new BehaviorSubject<string>(this.noDataTextForGrid);
  set noDataTextForGrid(noDataTextForGrid: string) {
    this._noDataTextForGrid = noDataTextForGrid;
    this.noDataTextForGrid$.next(noDataTextForGrid);
  }
  get noDataTextForGrid(): string {
    return this._noDataTextForGrid;
  }

  private _totalRecords = 0;
  totalRecords$: BehaviorSubject<number> = new BehaviorSubject<number>(this.totalRecords);
  set totalRecords(totalRecords: number) {
    this._totalRecords = totalRecords;
    this.totalRecords$.next(totalRecords);
  }
  get totalRecords(): number {
    return this._totalRecords;
  }

  private _fetchedRecords = 0;
  fetchedRecords$: BehaviorSubject<number> = new BehaviorSubject<number>(this.fetchedRecords);
  set fetchedRecords(fetchedRecords: number) {
    this._fetchedRecords = fetchedRecords;
    this.fetchedRecords$.next(fetchedRecords);
  }
  get fetchedRecords(): number {
    return this._fetchedRecords;
  }

  private _totalSelectedRecords = 0;
  totalSelectedRecords$: BehaviorSubject<number> = new BehaviorSubject<number>(this.totalSelectedRecords);
  set totalSelectedRecords(totalSelectedRecords: number) {
    this._totalSelectedRecords = totalSelectedRecords;
    this.totalSelectedRecords$.next(totalSelectedRecords);
  }
  get totalSelectedRecords(): number {
    return this._totalSelectedRecords;
  }

  private _parentDisplayPictureEnabled = false;
  parentDisplayPictureEnabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.parentDisplayPictureEnabled);
  set parentDisplayPictureEnabled(parentDisplayPictureEnabled: boolean) {
    this._parentDisplayPictureEnabled = parentDisplayPictureEnabled;
    this.parentDisplayPictureEnabled$.next(parentDisplayPictureEnabled);
  }
  get parentDisplayPictureEnabled(): boolean {
    return this._parentDisplayPictureEnabled;
  }

  private _isEditLocked = true;
  isEditLocked$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isEditLocked);
  set isEditLocked(isEditLocked: boolean) {
    this._isEditLocked = isEditLocked;
    this.isEditLocked$.next(isEditLocked);
  }
  get isEditLocked(): boolean {
    return this._isEditLocked;
  }

  private _showCustomLoaderLoadingInfo = false;
  showCustomLoaderLoadingInfo$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.showCustomLoaderLoadingInfo);
  set showCustomLoaderLoadingInfo(showCustomLoaderLoadingInfo: boolean) {
    this._showCustomLoaderLoadingInfo = showCustomLoaderLoadingInfo;
    this.showCustomLoaderLoadingInfo$.next(showCustomLoaderLoadingInfo);
  }
  get showCustomLoaderLoadingInfo(): boolean {
    return this._showCustomLoaderLoadingInfo;
  }

  private _showCustomLoaderSavingInfo = false;
  showCustomLoaderSavingInfo$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.showCustomLoaderSavingInfo);
  set showCustomLoaderSavingInfo(showCustomLoaderSavingInfo: boolean) {
    this._showCustomLoaderSavingInfo = showCustomLoaderSavingInfo;
    this.showCustomLoaderSavingInfo$.next(showCustomLoaderSavingInfo);
  }
  get showCustomLoaderSavingInfo(): boolean {
    return this._showCustomLoaderSavingInfo;
  }

  private _showCustomLoaderOperationType: InlineMinLoaderOperationType;
  showCustomLoaderOperationType$: BehaviorSubject<InlineMinLoaderOperationType> = new BehaviorSubject<InlineMinLoaderOperationType>(this.showCustomLoaderOperationType);
  set showCustomLoaderOperationType(showCustomLoaderOperationType: InlineMinLoaderOperationType) {
    this._showCustomLoaderOperationType = showCustomLoaderOperationType;
    this.showCustomLoaderOperationType$.next(showCustomLoaderOperationType);
  }
  get showCustomLoaderOperationType(): InlineMinLoaderOperationType {
    return this._showCustomLoaderOperationType;
  }


  private _showCustomLoaderSaveInfo = false;
  showCustomLoaderSaveInfo$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.showCustomLoaderSaveInfo);
  set showCustomLoaderSaveInfo(showCustomLoaderSaveInfo: boolean) {
    this._showCustomLoaderSaveInfo = showCustomLoaderSaveInfo;
    this.showCustomLoaderSaveInfo$.next(showCustomLoaderSaveInfo);
  }
  get showCustomLoaderSaveInfo(): boolean {
    return this._showCustomLoaderSaveInfo;
  }

  private _isDefaultUserFlowEnabled = false;
  isDefaultUserFlowEnabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isDefaultUserFlowEnabled);
  set isDefaultUserFlowEnabled(isDefaultUserFlowEnabled: boolean) {
    this._isDefaultUserFlowEnabled = isDefaultUserFlowEnabled;
    this.isDefaultUserFlowEnabled$.next(isDefaultUserFlowEnabled);
  }
  get isDefaultUserFlowEnabled(): boolean {
    return this._isDefaultUserFlowEnabled;
  }

  private _showDefaultUserReInviteButton = false;
  showDefaultUserReInviteButton$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.showDefaultUserReInviteButton);
  set showDefaultUserReInviteButton(showDefaultUserReInviteButton: boolean) {
    this._showDefaultUserReInviteButton = showDefaultUserReInviteButton;
    this.showDefaultUserReInviteButton$.next(showDefaultUserReInviteButton);
  }
  get showDefaultUserReInviteButton(): boolean {
    return this._showDefaultUserReInviteButton;
  }

  private _showDefaultUserRemoveLoginAccessButton = false;
  showDefaultUserRemoveLoginAccessButton$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.showDefaultUserRemoveLoginAccessButton);
  set showDefaultUserRemoveLoginAccessButton(showDefaultUserRemoveLoginAccessButton: boolean) {
    this._showDefaultUserRemoveLoginAccessButton = showDefaultUserRemoveLoginAccessButton;
    this.showDefaultUserRemoveLoginAccessButton$.next(showDefaultUserRemoveLoginAccessButton);
  }
  get showDefaultUserRemoveLoginAccessButton(): boolean {
    return this._showDefaultUserRemoveLoginAccessButton;
  }

  private _showDefaultUserEnableLoginAccessButton = false;
  showDefaultUserEnableLoginAccessButton$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.showDefaultUserEnableLoginAccessButton);
  set showDefaultUserEnableLoginAccessButton(showDefaultUserEnableLoginAccessButton: boolean) {
    this._showDefaultUserEnableLoginAccessButton = showDefaultUserEnableLoginAccessButton;
    this.showDefaultUserEnableLoginAccessButton$.next(showDefaultUserEnableLoginAccessButton);
  }
  get showDefaultUserEnableLoginAccessButton(): boolean {
    return this._showDefaultUserEnableLoginAccessButton;
  }

  private _showRoleSelectionModal = false;
  showRoleSelectionModal$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.showRoleSelectionModal);
  set showRoleSelectionModal(showRoleSelectionModal: boolean) {
    this._showRoleSelectionModal = showRoleSelectionModal;
    this.showRoleSelectionModal$.next(showRoleSelectionModal);
  }
  get showRoleSelectionModal(): boolean {
    return this._showRoleSelectionModal;
  }

  private _loadIndicatorVisibleForReInviting = false;
  loadIndicatorVisibleForReInviting$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.loadIndicatorVisibleForReInviting);
  set loadIndicatorVisibleForReInviting(loadIndicatorVisibleForReInviting: boolean) {
    this._loadIndicatorVisibleForReInviting = loadIndicatorVisibleForReInviting;
    this.loadIndicatorVisibleForReInviting$.next(loadIndicatorVisibleForReInviting);
  }
  get loadIndicatorVisibleForReInviting(): boolean {
    return this._loadIndicatorVisibleForReInviting;
  }

  private _loadIndicatorVisibleForRemoving = false;
  loadIndicatorVisibleForRemoving$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.loadIndicatorVisibleForRemoving);
  set loadIndicatorVisibleForRemoving(loadIndicatorVisibleForRemoving: boolean) {
    this._loadIndicatorVisibleForRemoving = loadIndicatorVisibleForRemoving;
    this.loadIndicatorVisibleForRemoving$.next(loadIndicatorVisibleForRemoving);
  }
  get loadIndicatorVisibleForRemoving(): boolean {
    return this._loadIndicatorVisibleForRemoving;
  }

  private _loadIndicatorVisibleForEnabling = false;
  loadIndicatorVisibleForEnabling$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.loadIndicatorVisibleForEnabling);
  set loadIndicatorVisibleForEnabling(loadIndicatorVisibleForEnabling: boolean) {
    this._loadIndicatorVisibleForEnabling = loadIndicatorVisibleForEnabling;
    this.loadIndicatorVisibleForEnabling$.next(loadIndicatorVisibleForEnabling);
  }
  get loadIndicatorVisibleForEnabling(): boolean {
    return this._loadIndicatorVisibleForEnabling;
  }

  showMultipleRecordsDeleteButton$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loadIndicatorVisibleForMultipleRecordsDelete$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  selectionModeEnabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  //properties for scheduler
  allRolesOfApp$: Observable<IRoleViewModel[]>;
  allusersOfApp$: Observable<IAppUserViewModel[]>;
  isSchemaValidForScheduler$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  formDataForScheduleFormPopup$: BehaviorSubject<IScheduleFormDataViewModel> = new BehaviorSubject<IScheduleFormDataViewModel>(null);
  parentSchemasForScheduleFormPopup$: BehaviorSubject<ISchemaViewModel[]> = new BehaviorSubject<ISchemaViewModel[]>([]);
  showScheduleFormPopup$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  //#endregion

  //#region enum declartion for view
  get GridDataScrollingModeEnum() { return GridDataScrollingModeEnum; }
  get EnumControlType() { return EnumControlType; }
  get EnumDataType() { return EnumDataType; }
  get GridDataTypeEnum() { return DataGridDataTypeEnum; }
  get DisplayTemplateEnum() { return DataGridDisplayTemplateEnum; }
  get EditorTemplateEnum() { return DataGridEditorTemplateEnum; }
  get ControlNameConstants() { return SolrControlNameConstants; }
  get DataGridInternalFieldNameEnum() { return DataGridInternalFieldNameEnum; }
  get SvgIconEnum() { return SvgIconEnum; }
  get EnumPrintOptions() { return EnumPrintOptions; }
  get EnumMenuStyle() { return EnumMenuStyle; }
  get EnumOperationType() { return InlineMinLoaderOperationType; }
  get GridElementIdConstants() { return GridElementIdConstants; }
  //#endregion

  //#region input fields
  private _schema: ISchemaViewModel;
  @Input()
  set schema(schema: ISchemaViewModel) {
    this._schema = schema;
    if (this._schema && this._schema.Id) {
      this.initGridVisibleFields();
      this.initCustomStore();
      //load app details
      this.app = this.appQuery.getEntity(this.schema.AppId);
      this.appLayoutSetting = this.app.LayoutSettings
      //init roles for the app
      this.initRoles();
      //check the schema is valid for scheduler or not
      this.isSchemaValidForScheduler$.next(this.schemaQuery.isSchemaValidForScheduler(schema.Id));
      //get app roles and users
      this.allRolesOfApp$ = this.appRoleQuery.selectAllRolesOfApp$(schema.AppId, schema.ClientId);
      this.allusersOfApp$ = this.appUsersQuery.selectAllUsersOfApp$(schema.AppId, schema.ClientId);
      //emit parent schemas for schedule form popup
      this.parentSchemasForScheduleFormPopup$.next([schema]);
    }
  }
  get schema(): ISchemaViewModel {
    return this._schema;
  }

  @Input()
  menu?: IMenuViewModel;

  private _isReloadData?: boolean;
  @Input()
  set isReloadData(isReloadData: boolean) {
    this._isReloadData = isReloadData;
    if (this._isReloadData) {
      this.reloadData();
      //toggle back to false for next reload
      if (!this.isReloadDataChange) {
        this.isReloadDataChange = new EventEmitter<boolean>();
      }
      this.isReloadDataChange.emit(false);
    }
  }
  get isReloadData(): boolean {
    return this._isReloadData;
  }

  @Output()
  isReloadDataChange = new EventEmitter<boolean>();

  private _config?: IDataGridConfiguration;
  @Input()
  set config(config: IDataGridConfiguration) {
    this._config = config;
  }
  get config(): IDataGridConfiguration {
    return this._config;
  }

  private _view?: IFormViewVM;
  @Input()
  set view(view: IFormViewVM) {
    this._view = view;
    if (this._view && this._view.Id) {
      this.initGridVisibleFields();
      this.initCustomStore();
    }
  }
  get view(): IFormViewVM {
    return this._view;
  }

  @Input()
  predefinedFilterQuery?: string;

  @Input()
  predefinedSortQuery?: string;

  @Input()
  parentRecord?: Partial<IRecordViewModel>;

  @Input() gridType: EnumGridType;
  @Input() isOpenedInSideBar?: boolean;

  //used for linked data grid
  @Input() linkedRecordId: string;
  @Input() linkedSchemaId: string;
  @Input() browseDisplayName: string;

  @Input()
  set refresh(refresh: boolean) {
    this._refresh = refresh;
    if (refresh) {
      // reloading data for refresh true value
      this.reloadData();
    }
  }
  get refresh(): boolean {
    return this._refresh;
  }
  //#endregion

  constructor(
    private router: Router,
    private translocoService: TranslocoService,
    private recordService: RecordService,
    private alertService: GlobalAlertService,
    private uiStore: UIStore,
    private appQuery: AppQuery,
    private eventBus: NgxPubSubService,
    private schemaQuery: SchemaQuery,
    private globalLoaderService: GlobalLoaderService,
    private roleQuery: RoleQuery,
    private appUsersQuery: AppUsersQuery,
    private appRoleQuery: AppRoleQuery,
    private sessionQuery: SessionQuery,
  ) { }

  ngOnInit() {
    this.translocoService.langChanges$.subscribe(lang => {
      //iterate filterOperationDescriptions prop for translation
      //tslint:disable-next-line: forin
      for (const prop in this.filterOperationDescriptions) {
        this.filterOperationDescriptions[prop] = this.translocoService.translate(this.filterOperationDescriptions[prop], {}, lang);
      }
    });
    // initially no need any loading indicator
    this.loadIndicatorVisibleForReInviting = false;
    this.loadIndicatorVisibleForRemoving = false;
    this.loadIndicatorVisibleForEnabling = false;
    //listen to sample data delete event
    this.recordService.reloadDataOnSampleDataDelete$.pipe(untilDestroyed(this)).subscribe((reloadDataOnSampleDataDelete) => {
      if (reloadDataOnSampleDataDelete) {
        //get fresh data again for data grid if sample data is deleted
        this.reloadData();
      }
    });
  }

  initGridVisibleFields() {
    //if view has fields then assign from it or assign from schema
    if (this.view && this.view.ViewDefinition && this.view.ViewDefinition.Fields && this.view.ViewDefinition.Fields.length) {
      //iterate view fields and find schema fields
      const viewFields: IFieldViewModel[] = [];
      this.view.ViewDefinition.Fields.forEach(fieldName => {
        const field = this.schema.Fields.find(x => x.Name === fieldName);
        if (field && field.Name) {
          viewFields.push(field);
        }
      });
      this.gridVisibleFields = DeepClone<IFieldViewModel[]>([], viewFields);
    } else if (this.schema && this.schema.GridVisibleFields && this.schema.GridVisibleFields.length) {
      this.gridVisibleFields = DeepClone<IFieldViewModel[]>([], this.schema.GridVisibleFields);
      //if display picture enabled then make that field GridSequenceNumber to 0 so that it comes first
      const multiMediaFieldIndex = this.gridVisibleFields.findIndex(
        x => x.ControlType === EnumControlType.MultiMedia && x.EnableDisplayPicture
      );
      if (this.gridVisibleFields[multiMediaFieldIndex]?.Name) { this.gridVisibleFields[multiMediaFieldIndex].GridSequenceNumber = 0; }
      //sort the gridVisibleFields by GridSequenceNumber
      this.gridVisibleFields = this.gridVisibleFields.sort((a, b) => a.GridSequenceNumber - b.GridSequenceNumber);
    } else {
      this.gridVisibleFields = [];
    }
    //now sort and format gridvisible fields
    if (this.gridVisibleFields && this.gridVisibleFields.length) {
      //exclude GroupBox type fields
      this.gridVisibleFields = this.gridVisibleFields.filter(x => x.ControlType !== EnumControlType.GroupBox);
      //exclude Column type fields
      this.gridVisibleFields = this.gridVisibleFields.filter(x => x.ControlType !== EnumControlType.Column);
      //exclude fields that are hidden in view
      this.gridVisibleFields = this.gridVisibleFields.filter(x => isViewEnabledInGrid(x.HiddenInUI));
      //omit the user id field
      this.gridVisibleFields = this.gridVisibleFields.filter(x => x.Name !== SolrControlNameConstants.USER_ID);
      // need to check if schema is available in the store, otherwise remove the field
      const entityList = this.gridVisibleFields.filter(x => x.ControlType === EnumControlType.Entity);
      if (entityList && entityList.length) {
        entityList.forEach((entityField) => {
          const schema = this.schemaQuery.getSchemaWithParentChildRelation(entityField.ReferenceTypeId);
          if (!schema) {
            this.gridVisibleFields = this.gridVisibleFields.filter(x => x.Name !== entityField.Name);
          }
        });
      }
      //format data type,default value,editor options for dx data grid
      this.gridVisibleFields.forEach((gridVisibleField, index) => {
        this.gridVisibleFields[index] = formatFieldForDatagrid(gridVisibleField, this.schema.AppId, this.schema.ClientId);
      });
      //check if default user flow enabled or not
      const defaultUserInvitatonStatusField = this.gridVisibleFields.find(
        x => x.Name === SolrControlNameConstants.USER_LOGIN_STATUS
      );
      this.isDefaultUserFlowEnabled = (defaultUserInvitatonStatusField && defaultUserInvitatonStatusField.Name) ? true : false;
    }

    this.parentDisplayPictureEnabled = false;
    //determine display picture enabled or not for any of the parent
    if (this.schema.ParentSchemas && this.schema.ParentSchemas.length) {
      this.schema.ParentSchemas.forEach(parentSchema => {
        if (parentSchema && parentSchema.Fields && parentSchema.Fields.length) {
          const displayPictureEnabledMultiMediaField = parentSchema.Fields.find(
            x => x.ControlType === EnumControlType.MultiMedia && x.EnableDisplayPicture
          );
          if (displayPictureEnabledMultiMediaField && displayPictureEnabledMultiMediaField.Name) {
            this.parentDisplayPictureEnabled = true;
          }
        }
      });
    }

    //merge any predefined sort query with view or menu sort query then format gridvisible fields to assign sortIndex and sortOrder
    const mergedPredefinedSortQuery = mergePredefinedSortQueryWithViewAndMenuSortQuery(this.predefinedSortQuery, this.view, this.menu);
    if (mergedPredefinedSortQuery) {
      this.gridVisibleFields = formatFieldsForSorting(this.gridVisibleFields, mergedPredefinedSortQuery);
    }
  }

  initCustomStore() {
    let initView = true;
    this.RegisterEvents();
    this.dataSource = new CustomStore({
      key: 'Id', // unique property of record view model
      load: (loadOptions: any) => {
        //disabling this block to solve the data fetching issue for language change
        //first check the data load is caused by the updated user and app info fetch or not
        //if true then skip data load and return empty data promise
        // const isFetchingUpdatedUserAndAppInfo = this.sessionQuery.getFetchingUpdatedUserAndAppInfoState();
        // if (isFetchingUpdatedUserAndAppInfo) {
        //   return new Promise(function (resolve, reject) {
        //     resolve({ data: [], totalCount: 0 });
        //   });
        // }
        //dx grid loads for first time
        if (initView && this.dataGrid && this.dataGrid.instance) {
          //refresh component fields
          this.initComponentFields();
          //clear data grid filters
          this.dataGrid.instance.clearFilter();
          if (loadOptions.filter) loadOptions.filter = null;
          //refresh data grid view
          this.dataGrid.instance.repaint();
          //start the data grid loader for first time loading
          this.showDataGridLoader = true;
          //modify loadOptions skip and take to load from start
          loadOptions.skip = 0;
          loadOptions.take = this.config.scrollingConfiguration.pageSize;
          //reset page index
          const currentIndex = this.dataGrid.instance.pageIndex();
          if (currentIndex !== 0) {
            this.dataGrid.instance.pageIndex(0);
            return;
          }
          //mark grid view as loaded
          initView = false;
        } else {
          //show custom loader loading info while loading
          this.showCustomLoaderLoadingInfo = true;
        }

        //if records are selected then clear selection before fetching records as it generates undefined filter array
        if (this.dataGrid?.instance && this.dataGrid.instance.getSelectedRowKeys()?.length) {
          this.dataGrid.instance.clearSelection();
        }

        let allDataIsLoaded = false;
        //modify loadOptions skip and take if we need to load all data for data export or grouping
        if ((!loadOptions.skip && !loadOptions.take) || loadOptions.isLoadingAll) {
          allDataIsLoaded = true;
          loadOptions.skip = 0;
          loadOptions.take = this.totalRecords;
          //stop custom loader loading info for loading
          this.showCustomLoaderLoadingInfo = false;
          if (!loadOptions.isLoadingAll) {
            //show loader only for grouping as default loader is shown for data export
            this.globalLoaderService.startLoader(this.translocoService.translate('PreparingData'));
          }
        }

        let globalFilterQuery = "";
        //if there is global search text
        if (this.globalSearchText && this.globalSearchText.trim()) {
          //replace multiple spaces with one
          this.globalSearchText = ReplaceMultipleSpacesWithSingleSpace(this.globalSearchText);
          //generate global filter query
          globalFilterQuery = generateGlobalFilterQuery(this.globalSearchText);
          //always clear loadOptions filter and existing filter from filter row if there is global search text
          loadOptions.filter = [];
          //clear all row filters
          this.dataGrid?.instance?.clearFilter("row");
          // //if it is global search event
          // if (this.isGlobalSearchEvent) {
          //   //clear loadOptions filter for clearing any existing filter
          //   loadOptions.filter = [];
          //   //clear all row filters
          //   this.dataGrid.instance.clearFilter("row");
          // } else {
          //   //find and clear the filter array from loadoptions for global search text
          //   loadOptions.filter = findAndClearGlobalSearchFilterArray(loadOptions.filter, this.globalSearchText);
          // }
        } else if (this.globalSearchText && !this.globalSearchText.trim()) {
          //if global search text is empty string with spaces then make it empty
          this.globalSearchText = "";
          //clear filter array and row
          loadOptions.filter = [];
          this.dataGrid?.instance?.clearFilter("row");
        }

        return this.recordService
          .getAllRecords(
            this.schema,
            mergePredefinedFilterQueryWithViewAndMenuFilterQuery(this.schema, this.predefinedFilterQuery, this.view, this.menu), "",
            loadOptions,
            globalFilterQuery
          )
          .toPromise()
          .then((response: ServiceResponse<IRecordResponseModel[], IRecordViewModel[]>) => {
            //if all data loaded then init fetch records count with total records
            if (allDataIsLoaded) {
              this.fetchedRecords = response.Count;
            } else {
              this.fetchedRecords = this.calculateFetchedRecords(
                this.fetchedRecords,
                this.totalRecords,
                response.Count,
                this.config.scrollingConfiguration.pageSize
              );
            }
            this.totalRecords = response.Count ? response.Count : 0;
            // setting total record data in detail page
            this.onRecordFetch(this.totalRecords);
            // after getting total records, setting allow page size list
            const allowedPageSizes = []
            this.maxPageSizesList.forEach(elem => {
              // checking if the total record is greater than page sizes
              if (this.totalRecords >= elem) {
                allowedPageSizes.push(elem);
              }
            });
            // after getting the list, asigning for use
            this.allowedPageSizes$.next(allowedPageSizes);

            //init/re-init dropdown button options for export
            this.initExportButtonOptions(this.totalRecords, this.totalSelectedRecords);
            // init import dropdown
            // this.initImportButtonOptions();

            // init print method
            this.initPrintButtonOptions();

            //if no data found then set the no data text manually to avoid txt shown early issue
            if (this.totalRecords === 0) {
              this.noDataTextForGrid = this.translocoService.translate(this.config.gridDisplayConfig.noDataText);
            }
            const data = response.Data ? formatGridRecordsBeforeRendering(response.Data, this.schema, this.gridVisibleFields, this.roleQuery) : [];
            this.rawSolarDataForExport = data;
            //stop the global loader
            this.globalLoaderService.stopLoader();
            //stop the data grid loader
            this.showDataGridLoader = false;
            //stop custom loader loading info for loading
            this.showCustomLoaderLoadingInfo = false;
            return {
              data: data,
              totalCount: response.Count ? response.Count : 0
            };
          }).catch((error: ServiceResponse) => {
            //stop the global loader
            this.globalLoaderService.stopLoader();
            //stop the data grid loader
            this.showDataGridLoader = false;
            //stop custom loader loading info for loading
            this.showCustomLoaderLoadingInfo = false;
            throw new Error(error?.Message ? error?.Message : this.translocoService.translate('CANT_LOAD_DATA'));
          });
      },
    });
  }

  deleteSingleRecord(e) {
    const record = e?.row?.data;
    const multipleRecordsDeleteOperationIsRunning = this.loadIndicatorVisibleForMultipleRecordsDelete$.getValue();
    //if valid record id, no selected records ids and multiple delete operation is not running then proceed
    if (record?.Id && !this.selectedRecordIds?.length && !multipleRecordsDeleteOperationIsRunning) {
      Swal.fire({
        position: 'center',
        width: '450px',
        padding: '1em',
        icon: 'warning',
        text: this.translocoService.translate("RecordDeleteConfirmation"),
        showCancelButton: true,
        confirmButtonColor: '#d9534f',
        cancelButtonColor: '#aaa',
        confirmButtonText: '<i class="dx-icon-trash"></i> ' + this.translocoService.translate('Delete'),
        cancelButtonText: this.translocoService.translate('Cancel'),
        allowOutsideClick: false
      }).then(result => {
        //if user proceeds
        if (result.isConfirmed && this.dataGrid?.instance) {
          //find the row index from record id
          const rowIndex = this.dataGrid.instance.getRowIndexByKey(record.Id);
          //init custom store delete flow using row index
          this.dataGrid.instance.deleteRow(rowIndex);
        }
      });
    }
  }

  deleteMultipleRecords() {
    //if there is selected records ids then proceed
    if (this.selectedRecordIds?.length) {
      Swal.fire({
        position: 'center',
        width: '450px',
        padding: '1em',
        icon: 'warning',
        text: this.selectedRecordIds.length > 1 ? this.translocoService.translate("MultipleRecordsDeleteConfirmation", { count: this.selectedRecordIds.length }) : this.translocoService.translate("RecordDeleteConfirmation"),
        showCancelButton: true,
        confirmButtonColor: '#d9534f',
        cancelButtonColor: '#aaa',
        confirmButtonText: '<i class="dx-icon-trash"></i> ' + this.translocoService.translate('Delete'),
        cancelButtonText: this.translocoService.translate('Cancel'),
        allowOutsideClick: false
      }).then(result => {
        //if user proceeds
        if (result.isConfirmed) {
          //show loading indicator
          this.loadIndicatorVisibleForMultipleRecordsDelete$.next(true);
          //start global loader large records(more than 10) delete to block the UI for long processing time
          if (this.selectedRecordIds.length > 10) {
            this.globalLoaderService.startLoader(this.translocoService.translate('DeletingLargeNumberOfRecords', { count: this.selectedRecordIds.length }));
          }
          //iterate selected records ids to decide default user is enabled for the record or not and map to request model
          const recordsForDelete: IRecordDeleteRequestModel[] = [];
          this.selectedRecordIds.forEach(selectedRecordId => {
            const record = this.dataGrid.instance.getDataSource().items().find(i => i.Id === selectedRecordId);
            recordsForDelete.push(<IRecordDeleteRequestModel>{
              Id: selectedRecordId,
              IsDefaultUser: this.schema.IsDefaultUser && record &&
                (record[SolrControlNameConstants.USER_LOGIN_STATUS] === EnumUserInvitationStatus.Sent ||
                  record[SolrControlNameConstants.USER_LOGIN_STATUS] === EnumUserInvitationStatus.Accepted ||
                  record[SolrControlNameConstants.USER_LOGIN_STATUS] === EnumUserInvitationStatus.ReSend)
            })
          });
        }
      });
    }
  }

  openScheduleFormPopup(e) {
    const record: IRecordViewModel = e?.row?.data;
    //emit true to template to show the schedule form popup
    this.showScheduleFormPopup$.next(true);
    //for add schedule set parent schema id and parent record id with current records info
    const initialScheduleFormData: Partial<IScheduleFormDataViewModel> = {
      RecordParentId: record?.Id,
      RecordParentTypeId: record?.TypeId
    };
    //emit form data with deepclone for cd in input
    this.formDataForScheduleFormPopup$.next(DeepClone({}, initialScheduleFormData));
  }

  onScheduleFormPopupHiding(hideScheduleFormPopup: boolean) {
    //emit false to template to hide the schedule form popup
    if (hideScheduleFormPopup) this.showScheduleFormPopup$.next(false);
  }

  initComponentFields() {
    this.showDataGridLoader = false;
    this.showCustomLoaderLoadingInfo = false;
    this.showCustomLoaderSavingInfo = false;
    this.showCustomLoaderSaveInfo = false;
    this.showDefaultUserReInviteButton = false;
    this.showDefaultUserRemoveLoginAccessButton = false;
    this.showDefaultUserEnableLoginAccessButton = false;
    this.totalRecords = 0;
    this.fetchedRecords = 0;
    this.totalSelectedRecords = 0;
    this.noDataTextForGrid = '';
    this.showRoleSelectionModal = false;
    //clear seleceted record,seleceted record ids and hide multiple multiple records delete button
    this.seletedRecords = [];
    this.selectedRecordIds = [];
    this.showMultipleRecordsDeleteButton$.next(false);
    //disable the selection mode
    this.selectionModeEnabled$.next(false);
    this.isEditLocked = true; //at first lock the edit
  }

  onRowUpdating(options) {
    /*first check the key is in updating records key buffer or not.
    if found then skip update as we are allowing only one update of a record at a time */
    const keyIndex = this.updatingRecordsKeyBuffer.indexOf(options?.key);
    if (keyIndex !== -1) {
      options.cancel = true;
      console.log("update canceled for record=>", options?.key);
    } else {
      options.newData = <IGridDataForUpdate>{
        record: options.oldData,
        dynamicFields: options.newData
      };
    }
  }

  ngOnDestroy() {
    this.UnRegisterEvents();
  }

  onToolbarPreparing(e) {
    const toolbarItems = e.toolbarOptions.items;
    //first determine the selection mode is enabled or not
    const selectionModeEnabled = this.selectionModeEnabled$.getValue();
    //init/re-init dropdown button options for export
    if (this.config.dataExportImportConfiguration.dataExportEnabled) {
      this.initExportButtonOptions(this.totalRecords, this.totalSelectedRecords);
    }

    //init import button if edit mode is disabled
    if (this.config.dataExportImportConfiguration.dataImportEnabled) {
      // this.initImportButtonOptions();
      //add import button at index 3 after the export button
      toolbarItems.splice(3, 0,
        {
          widget: 'dxButton',
          name: GridConstants.TOOLBAR_ITEM_IMPORT_BUTTON,
          location: 'after',
          template: DataGridDisplayTemplateEnum.ImportButtonTemplate
        }
      );
    }

    //if user has print permission, he will print
    this.initPrintButtonOptions();
    if (this.dynamicTemplates && this.dynamicTemplates.length > 0) {
      //push the button
      toolbarItems.splice(4, 0,
        {
          widget: 'dxButton',
          name: GridConstants.TOOLBAR_ITEM_PRINT,
          location: 'after',
          template: DataGridDisplayTemplateEnum.PrintButtonTemplate
        }
      );
    }

    //add new item buttons before default items
    toolbarItems.unshift(
      {
        name: GridConstants.TOOLBAR_ITEM_CUSTOM_LOADER,
        location: 'after',
        template: DataGridDisplayTemplateEnum.CustomLoaderInfoTemplate
      },
      {
        name: GridConstants.TOOLBAR_ITEM_DEFAULT_USER_INVITATION_BUTTON,
        location: 'after',
        template: DataGridDisplayTemplateEnum.DefaultUserInvitationButtonTemplate
      }
    );

    //if user has delete permission and deleteing is allowed from system config then push the multiple delete button
    if (this.schema.HasDeletePermission && this.config.editingConfiguration.allowDeleting) {
      toolbarItems.push({
        name: GridConstants.TOOLBAR_MULTIPLE_RECORDS_DELETE_BUTTON,
        location: 'after',
        template: DataGridDisplayTemplateEnum.MultipleRecordsDeleteButtonTemplate
      });
    }

    //add new item buttons after default items
    //if user has create permission then push the add button and if not selection mode is enabled
    if (this.schema.HasCreatePermission && !selectionModeEnabled) {
      toolbarItems.push({
        widget: 'dxButton',
        name: GridConstants.TOOLBAR_ITEM_ADD_BUTTON,
        options: {
          icon: 'plus',
          text: this.translocoService.translate('Add') + ' ' + this.schema.Title,
          type: 'default',
          stylingMode: 'contained',
          hint: this.translocoService.translate('Add') + ' ' + this.schema.Title,
          onClick: this.onAddClick.bind(this),
          elementAttr: { id: GridElementIdConstants.RECORD_ADD_BUTTON_ID }
        },
        location: 'after'
      });
    }

    //if user has edit permission and edite enabled from config then push  edit lock/unlock button
    if (this.schema.HasEditPermission && this.config.editingConfiguration.allowUpdating) {
      //push the button
      toolbarItems.push(
        {
          widget: 'dxButton',
          name: GridConstants.EDIT_LOCK_UNLOCK_BUTTON,
          options: {
            icon: this.isEditLocked ? 'fas fa-lock' : 'fas fa-unlock edit-lock-icon',
            type: this.isEditLocked ? 'success' : 'normal',
            elementAttr: this.isEditLocked ? { id: GridElementIdConstants.RECORD_EDIT_UNLOCK_BUTTON_ID, class: 'edit-unlock-btn' } :
              { id: GridElementIdConstants.RECORD_EDIT_LOCK_BUTTON_ID, class: 'edit-lock-btn' },
            stylingMode: 'outlined',
            text: this.isEditLocked ? this.translocoService.translate('UnlockEditing') : this.translocoService.translate('LockEditing'),
            hint: this.isEditLocked ? this.translocoService.translate('ClickHereForUnlockEditing') : this.translocoService.translate('ClickHereForLockEditing'),
            onClick: this.editLockUnlockBtnClick.bind(this)
          },
          location: 'after',
          showText: 'always'
        }
      );
    }

    //now push the refresh button
    toolbarItems.push(
      {
        widget: 'dxButton',
        name: GridConstants.TOOLBAR_ITEM_RELOAD_BUTTON,
        options: {
          icon: 'refresh',
          type: 'default',
          stylingMode: 'text',
          hint: this.translocoService.translate('ReloadData'),
          onClick: this.reloadDataOnBtnClick.bind(this),
          elementAttr: { id: GridElementIdConstants.DATA_RELOAD_BUTTON_ID }
        },
        location: 'after'
      }
    );

    //configure save changes and revert changes manually
    const saveIndex = toolbarItems.findIndex(i => i.name === GridConstants.SAVE_BUTTON);
    if (saveIndex !== -1) {
      toolbarItems[saveIndex].options.type = 'success';
      toolbarItems[saveIndex].options.stylingMode = 'contained';
      toolbarItems[saveIndex].options.visible = this.isEditLocked ? false : true;
      toolbarItems[saveIndex].showText = 'always';
      toolbarItems[saveIndex].options.text = this.translocoService.translate('SaveChanges');
      toolbarItems[saveIndex].options.hint = this.translocoService.translate('SaveChanges');
      toolbarItems[saveIndex].onClick = event => {
        this.dataGrid.instance.saveEditData(); // this saves the data
        this.isEditLocked = true;
      };
    }
    const revertIndex = toolbarItems.findIndex(i => i.name === GridConstants.REVERT_BUTTON);
    if (revertIndex !== -1) {
      toolbarItems[revertIndex].options.type = 'default';
      toolbarItems[revertIndex].options.stylingMode = 'contained';
      toolbarItems[revertIndex].options.visible = this.isEditLocked ? false : true;
      toolbarItems[revertIndex].showText = 'always';
      toolbarItems[revertIndex].options.text = this.translocoService.translate('RevertChanges');
      toolbarItems[revertIndex].options.hint = this.translocoService.translate('RevertChanges');
      toolbarItems[revertIndex].onClick = event => {
        this.dataGrid.instance.cancelEditData(); // this reverts the data
        this.isEditLocked = true;
      };
    }

    // reorder elements
    let index = 0;
    let replaceIndex = 0;
    const groupPanelItem = toolbarItems.find(c => c.name === GridConstants.TOOLBAR_ITEM_GROUP_PANEL);
    if (groupPanelItem) {
      replaceIndex = toolbarItems.indexOf(groupPanelItem);
      MoveArrayItem(toolbarItems, replaceIndex, index);
      index++;
    }

    const itemCustomLoaderItem = toolbarItems.find(c => c.name === GridConstants.TOOLBAR_ITEM_CUSTOM_LOADER);
    if (itemCustomLoaderItem) {
      replaceIndex = toolbarItems.indexOf(itemCustomLoaderItem);
      MoveArrayItem(toolbarItems, replaceIndex, index);
      index++;
    }

    const searchPanelItem = toolbarItems.find(c => c.name === GridConstants.TOOLBAR_ITEM_SEARCH_PANEL);
    if (searchPanelItem) {
      replaceIndex = toolbarItems.indexOf(searchPanelItem);
      MoveArrayItem(toolbarItems, replaceIndex, index);
      index++;
    }

    const columnChooserButtonItem = toolbarItems.find(c => c.name === GridConstants.TOOLBAR_ITEM_COLUMN_CHOOSER_BUTTON);
    if (columnChooserButtonItem) {
      replaceIndex = toolbarItems.indexOf(columnChooserButtonItem);
      MoveArrayItem(toolbarItems, replaceIndex, index);
      index++;
    }

    const exportButtonItem = toolbarItems.find(c => c.name === GridConstants.TOOLBAR_ITEM_EXPORT_BUTTON);
    if (exportButtonItem) {
      replaceIndex = toolbarItems.indexOf(exportButtonItem);
      MoveArrayItem(toolbarItems, replaceIndex, index);
      index++;
    }

    //if user has create permission then push the import button
    if (this.schema.HasCreatePermission) {
      const importButtonItem = toolbarItems.find(c => c.name === GridConstants.TOOLBAR_ITEM_IMPORT_BUTTON);
      if (importButtonItem) {
        replaceIndex = toolbarItems.indexOf(importButtonItem);
        MoveArrayItem(toolbarItems, replaceIndex, index);
        index++;
      }
    }

    const applyFilterButtonItem = toolbarItems.find(c => c.name === GridConstants.TOOLBAR_ITEM_APPLY_FILTER_BUTTON);
    if (applyFilterButtonItem) {
      replaceIndex = toolbarItems.indexOf(applyFilterButtonItem);
      MoveArrayItem(toolbarItems, replaceIndex, index);
      index++;
    }

    const reloadButtonItem = toolbarItems.find(c => c.name === GridConstants.TOOLBAR_ITEM_RELOAD_BUTTON);
    if (reloadButtonItem) {
      replaceIndex = toolbarItems.indexOf(reloadButtonItem);
      MoveArrayItem(toolbarItems, replaceIndex, index);
      index++;
    }

    const printButtonItem = toolbarItems.find(c => c.name === GridConstants.TOOLBAR_ITEM_PRINT);
    if (printButtonItem) {
      replaceIndex = toolbarItems.indexOf(printButtonItem);
      MoveArrayItem(toolbarItems, replaceIndex, index);
      index++;
    }

    const defaultUserInvitationButtonItem = toolbarItems.find(c => c.name === GridConstants.TOOLBAR_ITEM_DEFAULT_USER_INVITATION_BUTTON);
    if (defaultUserInvitationButtonItem) {
      replaceIndex = toolbarItems.indexOf(defaultUserInvitationButtonItem);
      MoveArrayItem(toolbarItems, replaceIndex, index);
      index++;
    }

    const editLockUnlockButtonItem = toolbarItems.find(c => c.name === GridConstants.EDIT_LOCK_UNLOCK_BUTTON);
    if (editLockUnlockButtonItem) {
      replaceIndex = toolbarItems.indexOf(editLockUnlockButtonItem);
      MoveArrayItem(toolbarItems, replaceIndex, index);
      index++;
    }

    const multipleDeleteButtonItem = toolbarItems.find(c => c.name === GridConstants.TOOLBAR_MULTIPLE_RECORDS_DELETE_BUTTON);
    if (multipleDeleteButtonItem) {
      replaceIndex = toolbarItems.indexOf(multipleDeleteButtonItem);
      MoveArrayItem(toolbarItems, replaceIndex, index);
      index++;
    }

    const addButtonItem = toolbarItems.find(c => c.name === GridConstants.TOOLBAR_ITEM_ADD_BUTTON);
    if (addButtonItem) {
      replaceIndex = toolbarItems.indexOf(addButtonItem);
      MoveArrayItem(toolbarItems, replaceIndex, index);
      index++;
    }
  }

  onContentReady(e) {
    //disable row selection by row click .. only select a row by clicking checkbox
    $(".dx-command-select").off("dxclick");
    $(".dx-select-checkbox").off("dxclick");
    //set id in search panel textbox
    $(".dx-datagrid-search-panel .dx-texteditor-input")?.attr("id", GridElementIdConstants.SEARCH_PANEL_TEXTBOX_ID);
    // initializing on board if it is list view and is not inititalized before
  }

  onOptionChanged(e) {
    //disabling global search event as it is not needed anymore
    // if (e.fullName === "searchPanel.text" && e.value && e.value.trim()) {
    //   //mark global search event
    //   this.isGlobalSearchEvent = true;
    // } else {
    //   this.isGlobalSearchEvent = false;
    // }
  }

  onSelectionChanged(e) {
    if (e?.selectedRowKeys?.length) {
      //first enable the selection mode
      this.selectionModeEnabled$.next(true);
      //set total selected records count
      this.totalSelectedRecords = e.selectedRowKeys.length;
      //if there is selected records then set seleceted rcord ids and show multiple multiple records delete button
      this.selectedRecordIds = e.selectedRowKeys;
      this.showMultipleRecordsDeleteButton$.next(true);
    } else {
      //first disable the selection mode
      this.selectionModeEnabled$.next(false);
      //reset total selected records count
      this.totalSelectedRecords = 0;
      //if there is no selected records then clear seleceted record ids and hide multiple multiple records delete button
      this.selectedRecordIds = [];
      this.showMultipleRecordsDeleteButton$.next(false);
    }
    //init/re-init dropdown button options for export
    this.initExportButtonOptions(this.totalRecords, this.totalSelectedRecords);

    // init import
    // this.initImportButtonOptions();

    // init print
    this.initPrintButtonOptions();

    //if default user flow enabled and it is parent grid then hide/show inivitation button
    if (this.isDefaultUserFlowEnabled && this.gridType === EnumGridType.PARENT) {
      this.hideShowDefaultUserInvitationButtons(e.selectedRowsData);
    }
  }

  hideShowDefaultUserInvitationButtons(seletedRecords: IRecordViewModel[]) {
    this.seletedRecords = [];
    if (seletedRecords && seletedRecords.length) {
      //map records to the invitation status array
      let inivitationStatusArray = seletedRecords.map(x => x[SolrControlNameConstants.USER_LOGIN_STATUS]);
      //replace the undefined items with 0
      inivitationStatusArray = inivitationStatusArray.map(x => {
        if (!x) {
          return 0;
        } else {
          return x;
        }
      });
      //check
      const selectedItemsAreInSameInvitationState = inivitationStatusArray.every((val, i, arr) => val === arr[0]);
      if (selectedItemsAreInSameInvitationState) {
        this.seletedRecords = seletedRecords;
        if (inivitationStatusArray[0] === EnumUserInvitationStatus.None) {
          //only enable access button
          this.showDefaultUserReInviteButton = false;
          this.showDefaultUserRemoveLoginAccessButton = false;
          this.showDefaultUserEnableLoginAccessButton = true;
        } else if (inivitationStatusArray[0] === EnumUserInvitationStatus.Sent) {
          //reinvite and remove access button
          this.showDefaultUserReInviteButton = true;
          this.showDefaultUserRemoveLoginAccessButton = true;
          this.showDefaultUserEnableLoginAccessButton = false;
        } else if (inivitationStatusArray[0] === EnumUserInvitationStatus.Accepted) {
          //only remove access button
          this.showDefaultUserReInviteButton = false;
          this.showDefaultUserRemoveLoginAccessButton = true;
          this.showDefaultUserEnableLoginAccessButton = false;
        } else if (inivitationStatusArray[0] === EnumUserInvitationStatus.NeverSend) {
          // restristing operations for neversend
          this.showDefaultUserReInviteButton = false;
          this.showDefaultUserRemoveLoginAccessButton = false;
          this.showDefaultUserEnableLoginAccessButton = false;
        } else if (inivitationStatusArray[0] === EnumUserInvitationStatus.ReSend) {
          //same as sent
          //reinvite and remove access button
          this.showDefaultUserReInviteButton = true;
          this.showDefaultUserRemoveLoginAccessButton = true;
          this.showDefaultUserEnableLoginAccessButton = false;
        }
      } else {
        this.showDefaultUserReInviteButton = false;
        this.showDefaultUserRemoveLoginAccessButton = false;
        this.showDefaultUserEnableLoginAccessButton = false;
      }
    } else {
      this.showDefaultUserReInviteButton = false;
      this.showDefaultUserRemoveLoginAccessButton = false;
      this.showDefaultUserEnableLoginAccessButton = false;
    }
  }

  onReInviteClick() {
   
  }

  onRemoveLoginAccessClick() {
    
  }

  initRoles() {
    this.roleQuery.allRoles$.pipe(untilDestroyed(this)).subscribe(roles => {
      if (roles.length) {
        this.roles = roles.filter(i => i.AppId === this.schema.AppId && i.ClientId === this.schema.ClientId && !i.HasDesignPermission);
      }
    });
  }

  showEnableLoginAccessModal() {
    this.RoleId = '';
    this.showRoleSelectionModal = true;
  }

  hideEnableLoginAccessModal() {
    this.showRoleSelectionModal = false;
  }

  onEnableLoginAccessClick() {
    
  }

  makeDefaultUserModel(status) {
    //generate request
    const userList: DefaultUserUpdate[] = [];
    this.seletedRecords.forEach(element => {
      const defUser: DefaultUserUpdate = {
        Email: element.UserEmail ? element.UserEmail : null,
        UserName: element.UserName ? element.UserName : null,
        UserId: element.UserId ? element.UserId : Get32BitUniqueId(),
        RoleId: (status === EnumUserInvitationStatus.NeverSend) ? this.RoleId : element.RoleId ? element.RoleId : null,
        RecordId: element.Id ? element.Id : null,
        LanguageFileId: this.app.LanguageFileId ? this.app.LanguageFileId : null
      };
      userList.push(defUser);
    });
    return userList;
  }

  onExportButtonOptionsClick(e) {
    if (e.itemData && e.itemData.value === DataGridExportOptionsEnum.ExportAllAsExcell) {
      //TODO: need to add custom export logic here for all data
    } else if (e.itemData && e.itemData.value === DataGridExportOptionsEnum.ExportSelectedAsExcell) {
      //TODO: need to add custom export logic here for selected data
    }
  }

  onImportButtonOptionsClick(eventData) {
    if (eventData.itemData && eventData.itemData?.parentId) {
      this.router.navigate([this.schema.ClientId + '/' + AppRouteUrlConstant.APP + '/' + this.schema.AppId + '/' + AppRouteUrlConstant.IMPORT_DATA + '/' + eventData.itemData.schema.Id, {parentId: eventData.itemData.parentId}]);
    } else {
      this.router.navigate([this.schema.ClientId + '/' + AppRouteUrlConstant.APP + '/' + this.schema.AppId + '/' + AppRouteUrlConstant.IMPORT_DATA + '/' + eventData.itemData.schema.Id]);
    }
  }

  getSchemaConfigurationData() {
    // schema name for file name and json object name
    this.SchemaTitle = this.schema.Title;

    // getting fields for sort out configuration data from solar data
    const fields = this.gridVisibleFields.map(data => {
      return { Name: data.Name, Label: data.Label, ControlType: data.ControlType }
    });

    // adding extra 3 fields for configuration data
    fields.push({ Name: 'CreatedBy', Label: 'Created By', ControlType: EnumControlType.TextBox });
    fields.push({ Name: 'CreateDate', Label: 'Created Date', ControlType: EnumControlType.DateTime });
    fields.push({ Name: 'DisplayName', Label: 'Display Name', ControlType: EnumControlType.TextBox });

    // creating config payload
    const payloadBeforeSetConfig = [];
    this.rawSolarDataForExport.forEach(element => {
      const obj = {};
      fields.forEach(field => {
        if (field.ControlType === EnumControlType.DateTime || field.ControlType === EnumControlType.TimeOnly) {
          obj[field.Label] = this.datePipe.transform(element[field.Name], 'short');
        } else if (field.ControlType === EnumControlType.Barcode) {
          // if bar code is Available
          if (element[field.Name] && element[field.Name].trim()) {
            const barCodeArrayList = this.qrcodechild.toArray();
            if (barCodeArrayList && barCodeArrayList.length > 0) {
              // finding barcoderecord by current element name
              // if multiple record have same name, since the bar code will generate with that name, so it will not create any issue
              const barcodeHtmlRecord = barCodeArrayList.find(value => value.qrdata === element[field.Name])
              // gettting innerhtml for extracting data
              const htmlForConvert = barcodeHtmlRecord.qrcElement.nativeElement.innerHTML;
              // extracting base64
              const img64: string = htmlForConvert.substr(0, htmlForConvert.length - 2).split('base64,')[1];
              // will always create barcode as png
              const dispimg64 = "data:image/png;base64," + img64;
              // pass the configuration named BarcodeBase64String
              obj['BarcodeBase64String'] = dispimg64;
            }
          }
        } else if (field.ControlType === EnumControlType.MultiMedia) {
          // if the control is Multimedia
          // getting multimedia display value
          const fieldNameForMultimedia = field.Name + 'DisplayValue';
          obj[field.Label] = element[fieldNameForMultimedia];
          obj['EntityPictureContent'] = element[fieldNameForMultimedia];
        } else {
          obj[field.Label] = element[field.Name];
        }
      });
      payloadBeforeSetConfig.push(obj);
    });

    this.payloadForConfiguration[this.SchemaTitle] = payloadBeforeSetConfig
  }
  // print mustache data or configuration
  onPrintButtonOptionsClick(event) {
    // getting schedule configuration
    this.getSchemaConfigurationData();

    // if the button is download configuration
    if (event.itemData.value === EnumPrintOptions.DOWNLOAD_CONFIGURATION) {
      // downloading data configuration in txt format
      const dataSource = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.payloadForConfiguration));
      const downloadHandler = document.createElement('a');
      downloadHandler.setAttribute("href", dataSource);
      downloadHandler.setAttribute("download", this.SchemaTitle + ".txt");
      document.body.appendChild(downloadHandler);
      downloadHandler.click();
      downloadHandler.remove();
    } else {
      const dataForMustache = this.dynamicTemplates.find(data => data.Id === event.itemData.Id);
      if (dataForMustache && dataForMustache.Content) {
        let output = Mustache.render(`${dataForMustache.Content}`, this.payloadForConfiguration);
        output = output.replace(/&#x2F;/g, "/");
        const target = document.getElementById('targetDivForMustacheTemplate');
        target.innerHTML = output;

        const win = window.open('', 'Print Window');
        win.document.title = `${this.SchemaTitle}`;
        win.document.write(target.innerHTML);
        win.document.close();
        self.focus();
        win.print()
      }
    }
  }

  onExporting(e) {
    //get app info
    const app = this.appQuery.getEntity(this.schema.AppId);
    const fileName = app ? app.Name + ' (' + this.schema?.Title + ')' : 'Untitled File';
    const workbookTitle = this.menu && this.menu.Title ? this.menu.Title : this.translocoService.translate('UntitledList');
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(workbookTitle);
    // Id is disabling for filter and selection not working issue
    // e.component.beginUpdate();
    // e.component.columnOption("Id", "visible", true);
    exportDataGrid({
      component: e.component,
      worksheet: worksheet,
      autoFilterEnabled: true,
      customizeCell: options => {
        const { excelCell, gridCell } = options;
        // this is for background color of data rows in excel file, will be designed later
        // setAlternatingRowsBackground(gridCell, excelCell)
        if (gridCell.rowType === 'data' && gridCell.column && gridCell.data) {
          const field = this.gridVisibleFields.find(x => x.Name === gridCell.column.dataField);
          if (field) {
            if (field.ControlType === EnumControlType.TimeOnly && gridCell.data[gridCell.column.dataField]) {
              excelCell.value = formatDateTimeToTimeStringLocal(gridCell.data[gridCell.column.dataField]);
            } else if (field.ControlType === EnumControlType.Switch) {
              excelCell.value = getSwitchControlText(field, gridCell.data[gridCell.column.dataField]);
            } else if (field.ControlType === EnumControlType.AutoCompleteTextBox) {
              excelCell.value = getAutoCompleteTextBoxControlText(field, gridCell.data[gridCell.column.dataField]);
            } else if (field.ControlType === EnumControlType.Entity) {
              excelCell.value = gridCell.data[gridCell.column.dataField];
            } else if (field.LookupControlType === EnumControlType.RadioButton) {
              excelCell.value = gridCell.data[gridCell.column.dataField];
            } else if (field.LookupControlType === EnumControlType.ComboBox) {
              excelCell.value = gridCell.data[gridCell.column.dataField];
            }
          }
          // if (gridCell.column.cellTemplate === DataGridDisplayTemplateEnum.PhotoTemplate || gridCell.column.cellTemplate === DataGridDisplayTemplateEnum.BarcodePhotoTemplate) {
          //   const imageUrl = getGridPhotoTemplateImageUrl(gridCell.data[gridCell.column.dataField]);
          //   if (imageUrl) {
          //     excelCell.value = undefined;
          //     const image = workbook.addImage({
          //       filename: imageUrl,
          //       extension: 'jpeg',
          //     });
          //     worksheet.getRow(excelCell.row).height = 90;
          //     worksheet.addImage(image, {
          //       tl: { col: excelCell.col - 1, row: excelCell.row - 1 },
          //       br: { col: excelCell.col, row: excelCell.row }
          //     });
          //   }
          // } else if (gridCell.column.cellTemplate === DataGridDisplayTemplateEnum.BarcodePhotoTemplate) {
          // }
        }
      }
    }).then(function () {
      //save the file
      workbook.xlsx.writeBuffer().then(function (buffer) {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), fileName + '.xlsx');
      });
    });
    e.cancel = true;
  }

  onExported(e) {
    // Id is disabling for filter and selection not working issue
    // e.component.columnOption("Id", "visible", false);
    // e.component.endUpdate();
  }

  onEditorPreparing(e) {
    //Note: disabled palceholder to show the plachoder of operations in filter row
    // if (e.parentType === 'filterRow') { e.editorOptions.placeholder = '';}

    //for data row before editor is prepared init browse control related infos for entity type control
    if (e && e.parentType === "dataRow") {
      //first find the field
      const field = this.gridVisibleFields.find(i => i.Name === e.dataField);
      //check control type is entity
      if (field?.ControlType === EnumControlType.Entity) {
        //change the editor type to lookup and set width
        e.editorName = "dxLookup";
        e.editorOptions.width = "400";
        //set current browse control field for browse control custom store
        this.recordService.currentBrowseControlField$.next(field);
        //re-set current browse control fields records
        this.recordService.currentBrowseControlFieldRecords$.next([]);
      }
    }
  }

  onEditingStart(editCellInfo) {
    const gridVisibleField = this.gridVisibleFields.find(x => x.Name === editCellInfo.column.dataField);
    const dataFieldValue = editCellInfo.data[editCellInfo.column.dataField];
    const rowIndex = editCellInfo.component.getRowIndexByKey(editCellInfo.key);
    //if the cell does not have any value and gridVisibleField has default value then replace with it
    //for textbox,email,integer,number field,random,date,datetime,time,dropdown,radio,multi select
    if (
      (gridVisibleField.ControlType === EnumControlType.TextBox ||
        gridVisibleField.ControlType === EnumControlType.ComboBox ||
        gridVisibleField.ControlType === EnumControlType.RadioButton ||
        gridVisibleField.ControlType === EnumControlType.AutoCompleteTextBox) &&
      !dataFieldValue &&
      gridVisibleField &&
      gridVisibleField.Value
    ) {
      editCellInfo.component.cellValue(rowIndex, editCellInfo.column.dataField, gridVisibleField.Value);
    } else if (
      (gridVisibleField.ControlType === EnumControlType.DateOnly ||
        gridVisibleField.ControlType === EnumControlType.DateTime ||
        gridVisibleField.ControlType === EnumControlType.TimeOnly) &&
      !dataFieldValue &&
      gridVisibleField
    ) {
      //if AutofillCurrentTime is enabled then populate the curent date/time as default value
      //else set the value as default value
      if (gridVisibleField.AutofillCurrentTime) {
        let currentDateTime = '';
        if (gridVisibleField.ControlType === EnumControlType.DateOnly) {
          currentDateTime = getCurrentDateTimeStringLocal(); //for date support only local for now
        } else if (gridVisibleField.ControlType === EnumControlType.DateTime) {
          currentDateTime = gridVisibleField.IsUTCTime
            ? getCurrentDateTimeStringUTC()
            : getCurrentDateTimeStringLocal();
        } else if (gridVisibleField.ControlType === EnumControlType.TimeOnly) {
          currentDateTime = getCurrentTimeAsDateTimeStringLocal(); //for time support only local
        }
        editCellInfo.component.cellValue(rowIndex, editCellInfo.column.dataField, currentDateTime);
      } else if (gridVisibleField.Value) {
        let defaultDateTime = '';
        if (gridVisibleField.ControlType === EnumControlType.DateOnly) {
          defaultDateTime = formatDateTimeStringLocal(gridVisibleField.Value); //for date support only local for now
        } else if (gridVisibleField.ControlType === EnumControlType.DateTime) {
          //if UTC enabled then grid value is the UTC or format to local
          defaultDateTime = gridVisibleField.IsUTCTime
            ? gridVisibleField.Value
            : formatDateTimeStringLocal(gridVisibleField.Value);
        } else if (gridVisibleField.ControlType === EnumControlType.TimeOnly) {
          //format the default time value from time to date time string
          defaultDateTime = formatTimeToDateTimeStringLocal(gridVisibleField.Value); //for time support only local
        }
        editCellInfo.component.cellValue(rowIndex, editCellInfo.column.dataField, defaultDateTime);
      }
    }
  }

  onRate(event, cell) {
    //first update the cell value
    cell?.setValue(event?.newValue);
    //then udate the cell UI
    cell?.component?.updateDimensions();
  }

  onDetailsButtonClick(event) {
    const record: IRecordViewModel = <IRecordViewModel>event.row.data;
    this.openDetailsInSidebar(record);
  };

  onCellDblClick(event) {
    //open sidebar or redirect to details page only if the edit mode is locked
    if (this.isEditLocked) {
      const record: IRecordViewModel = <IRecordViewModel>event.data;
      //if record id,client id,app id and type id is valid
      if (record && record.Id && record.Id.trim() && record.AppId && record.AppId.trim() &&
        record.ClientId && record.TypeId && record.TypeId.trim()) {
        //if opened in sidebar or is child grid then always show details in sidebar
        if (this.isOpenedInSideBar || this.gridType === EnumGridType.CHILD) {
          this.openDetailsInSidebar(record);
        } else {
          //switch to the details page
          const recordDetailsUrl = getRecordDetailsUrl(record, this.schema);
          if (recordDetailsUrl && recordDetailsUrl.trim()) {
            this.router.navigate([recordDetailsUrl]);
          } else {
            this.alertService.error({ messagekey: 'InvalidRedirectUrlForRecord' });
          }
        }
      }
    }
  }

  openDetailsInSidebar(record: IRecordViewModel) {
    if (record?.Id?.trim() && this.schema) {
      const eventDataModel = new GridAddEventModel();
      eventDataModel.Schema = this.schema;
      if (this.gridType === EnumGridType.CHILD && this.parentRecord) {
        eventDataModel.ParentRecord = this.parentRecord;
        eventDataModel.ParentRecordId = this.parentRecord.Id;
        eventDataModel.ParentTypeId = this.parentRecord.TypeId;
        eventDataModel.ParentDisplayName = this.parentRecord.DisplayName;
      }
      eventDataModel.RowData = record;
      eventDataModel.GridType = this.gridType;
      //event does not fire without delay
      setTimeout(() => {
        this.eventBus.publishEvent(CloudapperCodeConstants.DETAILS_OPENED, eventDataModel);
      }, 250);
    } else {
      this.alertService.error({ messagekey: 'NoSchemaOrRecordFound', isFromSidebar: this.isOpenedInSideBar });
    }
  }

  editLockUnlockBtnClick() {
    //toggle edit lock
    this.isEditLocked = !this.isEditLocked;
  }

  reloadDataOnBtnClick() {
    //start the data grid loader
    // note: Dot pulse loader, control from template is creating this data grid breaking
    // switching off this data grid loader
    // this.showDataGridLoader = true;
    this.reloadData();
  }

  reloadData() {
    if (this.dataGrid && this.dataGrid.instance) {
      this.dataGrid.instance.refresh();
    }
  }

  onAddClick() {
    //If add button is clicked from main menu. There there will be no parent selected for child menu.
    const eventDataModel = new GridAddEventModel();
    eventDataModel.Schema = this.schema;
    if (this.gridType === EnumGridType.CHILD && this.parentRecord) {
      eventDataModel.ParentRecord = this.parentRecord;
      eventDataModel.ParentRecordId = this.parentRecord.Id;
      eventDataModel.ParentTypeId = this.parentRecord.TypeId;
      eventDataModel.ParentDisplayName = this.parentRecord.DisplayName;
    }
    eventDataModel.GridType = this.gridType;

    if (this.linkedRecordId && this.linkedSchemaId && this.browseDisplayName) {
      const browseData = new EntityBrowsedData();
      browseData.recordId = this.linkedRecordId;
      browseData.referenceTypeId = this.linkedSchemaId;
      browseData.displayName = this.browseDisplayName;
      eventDataModel.BrowseData = browseData;
    }

    this.eventBus.publishEvent(CloudapperCodeConstants.ADD_FROM_GRID, eventDataModel);
  }

  onRecordFetch(Count: number) {
    // this method will update record count by fetching record count
    //if a record inserted, this event record will be changed with data count
    //if a record deleted from another place, this event record will be changed with data count
    const eventDataModel = new GridRecordFetchEventModel();
    eventDataModel.Schema = this.schema;
    // record id pass if it is linked or from parent
    if (this.linkedRecordId) {
      eventDataModel.RecordId = this.linkedRecordId;
    } else if (this.parentRecord) {
      eventDataModel.RecordId = this.parentRecord.Id;
    }
    // saving the data amount
    eventDataModel.Count = Count;
    this.eventBus.publishEvent(CloudapperCodeConstants.DETAILS_RECORD_COUNT_FROM_GRID, eventDataModel);
  }

  onRecordDelete() {
    //If single record deleted from the action button
    const eventDataModel = new GridDeleteEventModel();
    eventDataModel.Schema = this.schema;
    // record id pass if it is linked or from parent
    if (this.linkedRecordId) {
      eventDataModel.RecordId = this.linkedRecordId;
    } else if (this.parentRecord) {
      eventDataModel.RecordId = this.parentRecord.Id;
    }
    this.eventBus.publishEvent(CloudapperCodeConstants.DELETE_FROM_GRID, eventDataModel);
  }

  showValidationErrors(errors) {
    if (errors && errors.brokenRules && errors.brokenRules.length) {
      this.alertService.error({ messagekey: 'PleaseCheckValidationErrorsInGrid' });
    }
  }

  getGridPhotoTemplateImageUrls(url: string | string[]) {
    const gridPhotoTemplateImageUrls = getGridPhotoTemplateImageUrls(url);
    return gridPhotoTemplateImageUrls;
  }

  getGridPhotoTemplateImageUrl(url: string | string[]) {
    const gridPhotoTemplateImageUrl = getGridPhotoTemplateImageUrl(url);
    return gridPhotoTemplateImageUrl;
  }

  isMultipleGridPhoto(url: string | string[]) {
    const isMultipleGridPhotoResult = isMultipleGridPhoto(url);
    return isMultipleGridPhotoResult;
  }

  loadRecordDetailsInSideBar(detailsRecord: IRecordViewModel) {
    //create event data model to pass it in the event
    const eventDataModel = new GridAddEventModel();
    eventDataModel.RowData = detailsRecord;
    eventDataModel.Schema = this.schemaQuery.getSchemaWithParentChildRelation(detailsRecord.TypeId);
    eventDataModel.GridType = EnumGridType.PARENT;
    if (detailsRecord?.Id?.trim() && eventDataModel?.Schema) {
      setTimeout(() => {
        this.eventBus.publishEvent(CloudapperCodeConstants.DETAILS_OPENED, eventDataModel);
      }, 250);
    } else {
      this.alertService.error({ messagekey: 'NoSchemaOrRecordFound', isFromSidebar: this.isOpenedInSideBar });
    }
  }

  loadEntityDetails(cellInfo) {
    const record: IRecordViewModel = <IRecordViewModel>cellInfo.data;
    //if parent entity
    if (cellInfo.column.dataField === SolrControlNameConstants.PARENT_DISPLAY_NAME) {
      const detailsRecord = <IRecordViewModel>{
        Id: record.ParentId,
        TypeId: record.ParentTypeId,
        DisplayName: record.ParentDisplayName
      };
      this.loadRecordDetailsInSideBar(detailsRecord);
    } else {
      //check entity type
      const gridVisibleField = this.gridVisibleFields.find(x => x.Name === cellInfo.column.dataField);
      if (gridVisibleField.ControlType === EnumControlType.Entity) {
        const detailsRecord = <IRecordViewModel>{
          Id: record[cellInfo.column.dataField + SolrControlNameConstants.REFERENCE_ID],
          TypeId: record[cellInfo.column.dataField + SolrControlNameConstants.TYPE_ID] ? record[cellInfo.column.dataField + SolrControlNameConstants.TYPE_ID] : record[cellInfo.column.dataField + SolrControlNameConstants.REFERENCE_TYPE_ID], // if record is not found with TYPE_ID, find record with REFERENCE_TYPE_ID
          DisplayName: record[cellInfo.column.dataField]
        };
        this.loadRecordDetailsInSideBar(detailsRecord);
      } else {
        this.alertService.error({ messagekey: 'UnknownEntityType' });
      }
    }
  }

  toggleCustomSaveLoader(statLoader: boolean, operationType: InlineMinLoaderOperationType, isSuccess?: boolean) {
    this.showCustomLoaderOperationType = operationType;
    if (statLoader) {
      this.showCustomLoaderSavingInfo = true;
    } else {
      this.showCustomLoaderSavingInfo = false;
      //if success then show save info only for five seconds
      if (isSuccess) {
        this.showCustomLoaderSaveInfo = true;
        setTimeout(() => { this.showCustomLoaderSaveInfo = false; }, 5000);
      }
    }
  }

  calculateFetchedRecords(lastFetched, lastTotal, currentTotal, pageSize) {
    let currentFetched = 0;
    if (lastTotal === currentTotal) {
      currentFetched = lastFetched + pageSize;
    } else {
      currentFetched = pageSize;
    }
    return currentFetched;
  }

  initExportButtonOptions(totalRecords: number, totalSelectedRecords: number) {
    this.exportButtonOptions = [];
    this.exportButtonOptions.push({
      value: DataGridExportOptionsEnum.ExportAllAsExcell,
      name: this.totalRecords
        ? this.translocoService.translate('ExportAll') + ' ' + this.totalRecords + ' ' + this.translocoService.translate('Items')
        : this.translocoService.translate('ExportAllItems'),
      icon: 'xlsxfile',
      elementAttr: { id: GridElementIdConstants.DATA_EXPORT_ALL_BUTTON_ID }
    });

    if (totalSelectedRecords) {
      this.exportButtonOptions.push({
        value: DataGridExportOptionsEnum.ExportSelectedAsExcell,
        name:
          this.translocoService.translate('ExportSelected') + ' ' +
          this.totalSelectedRecords + ' ' +
          this.translocoService.translate('Items'),
        icon: 'exportselected',
        elementAttr: { id: GridElementIdConstants.DATA_EXPORT_SELECTED_BUTTON_ID }
      });
    }
  }

  initImportButtonOptions() {
    // reseting import buttons
    this.importButtonOptions = [];
    if (this.schema.ParentSchemas.length < 2) {
      this.importButtonOptions = [
        {
          schema: this.schema,
          value: this.schema.Id,
          name: `${this.translocoService.translate('Import')} ${this.schema.Title}`,
          elementAttr: { id: GridElementIdConstants.DATA_IMPORT_BUTTON_ID + '_' + this.schema.Id }
        }
      ];
    } else {
      this.schema.ParentSchemas.forEach(parentSchema => {
        this.importButtonOptions.push({
          schema: this.schema,
          value: this.schema.Id,
          parentId: parentSchema.Id,
          name: `${this.translocoService.translate('DataImportFromParent', { child: this.schema.Title, parent: parentSchema.Title})}`,
          elementAttr: { id: GridElementIdConstants.DATA_IMPORT_BUTTON_ID + '_' + this.schema.Id }
        });
      });
    }

    if (this.schema.ChildSchemas) {
      this.schema.ChildSchemas.forEach(element => {
        this.importButtonOptions.push({
          schema: element,
          value: element.Id,
          parentId: this.schema.Id,
          name: `${this.translocoService.translate('Import')} ${element.Title}`,
          elementAttr: { id: GridElementIdConstants.DATA_IMPORT_BUTTON_ID + '_' + element.Id }
        });
      });
    }
  }
  initPrintButtonOptions() {
    this.printButtonOptions = [];
    if (this.app && this.app.DynamicTemplates && this.app.DynamicTemplates.length > 0) {
      this.dynamicTemplates = this.app.DynamicTemplates.filter(data => data.TypeId === this.schema.Id && data.ListView);
    }
    if (this.dynamicTemplates && this.dynamicTemplates.length > 0) {
      this.dynamicTemplates.forEach(element => {
        this.printButtonOptions.push({
          value: EnumPrintOptions.TEMPLATE,
          name: element.Name,
          Id: element.Id
        });
      });
      this.printButtonOptions.push({
        name: this.translocoService.translate('DOWNLOAD_CONFIGURATION'),
        value: EnumPrintOptions.DOWNLOAD_CONFIGURATION,
        Id: 0
      });
    }
  }

  //#region Listen to Events
  RegisterEvents() {
    this.subscriptions.push(
      this.eventBus.subscribe(CloudapperCodeConstants.GRID_DATA_CHANGED, data => {
        const eventData: GridBaseEvent = data;
        let schemaId = '';
        if (eventData && eventData.Schema) {
          schemaId = eventData.Schema.Id;
        }
        if (schemaId === this.schema.Id) {
          this.reloadData();
        }
      })
    );
  }

  UnRegisterEvents() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
  //#endregion
}
