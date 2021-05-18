import { Injectable } from '@angular/core';
import {
  DefaultRecordViewModel,








  IFieldViewModel,






  IRecordResponseModel,




  IRecordViewModel,
  ISchemaViewModel,

  ServiceResponse,

  SolrControlNameConstants
} from '@CloudApperClients/app-model';
import { AppConfig } from 'CloudApperClient/src/app.config';
import { LoadOptions } from 'devextreme/data/load_options';
import { of } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import * as SampleRecord from '../../../assets/Record.json';
import { RecordsUserQuery, SessionQuery } from '../states';
import { RecordStore } from '../states/record/record.store';


@Injectable({
  providedIn: 'root'
})
export class RecordService {

  reloadDataOnSampleDataDelete$ = new Subject<boolean>();
  currentBrowseControlField$ = new BehaviorSubject<IFieldViewModel>(null);
  currentBrowseControlFieldRecords$ = new BehaviorSubject<IRecordViewModel[]>(null);
  constructor(
    private recordStore: RecordStore,
  ) { }

  getAllRecords(schema: ISchemaViewModel, predefinedFilterQuery?: string, predefinedSortQuery?: string, loadOptions?: LoadOptions, globalFilterQuery?: string,): Observable<any> {
    //creating request model
    const serviceResponse = new ServiceResponse<IRecordResponseModel[], IRecordViewModel[]>(SampleRecord.default, true);
    if (serviceResponse.IsSuccess) {
      //map models
      serviceResponse.Data = this.mapToRecordViewModels(serviceResponse.RawData);
      //if record saving to local state is allowed then save to store
      if (AppConfig.settings.recordSavingToLocalStateIsAllowed) {
        this.recordStore.upsertMany(serviceResponse.Data);
      }
      return of(serviceResponse);
    }
  }
  mapToRecordViewModel(recordResponseModel: IRecordResponseModel): IRecordViewModel {
    const recordViewModel: IRecordViewModel = new DefaultRecordViewModel();
    //map recordResponseModel property to recordViewModel property
    if (recordResponseModel && recordResponseModel.id) {
      for (const property in recordResponseModel) {
        if (property === SolrControlNameConstants.ID) {
          recordViewModel.Id = recordResponseModel[property];
        } else if (property === SolrControlNameConstants.VERSION) {
          recordViewModel.Version = recordResponseModel[property];
        } else {
          //add recordResponseModel property to recordViewModel property
          recordViewModel[property] = recordResponseModel[property];
          //if recordViewModel does not have the property then add that to the DynamicFields object
          if (!recordViewModel.hasOwnProperty(property))
            recordViewModel.DynamicFields[property] = recordResponseModel[property];
        }
      }
    }
    return recordViewModel;
  }

  mapToRecordViewModels(recordResponseModels: IRecordResponseModel[]): IRecordViewModel[] {
    const recordViewModels: IRecordViewModel[] = [];
    if (recordResponseModels && recordResponseModels.length) {
      recordResponseModels.forEach(recordResponseModel => {
        recordViewModels.push(this.mapToRecordViewModel(recordResponseModel));
      });
    }
    return recordViewModels;
  }
  //#endregion
}
