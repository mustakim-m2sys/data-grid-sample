import { RecordState, RecordStore } from './record.store';
import { IRecordViewModel } from '@CloudApperClients/app-model';
import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

@Injectable({
  providedIn: 'root'
})
export class RecordQuery extends QueryEntity<RecordState, IRecordViewModel> {
  allRecords$ = this.selectAll();
  totalRecords$ = this.selectCount();

  constructor(protected store: RecordStore) {
    super(store);
  }

  selectRecordsBySchema$(schemaId: string) {
    return this.selectAll({ filterBy: x => x.TypeId === schemaId });
  }
}
