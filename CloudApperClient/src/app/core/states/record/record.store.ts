import { Injectable } from '@angular/core';
import { IRecordViewModel } from '@CloudApperClients/app-model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface RecordState extends EntityState<IRecordViewModel> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'Record', idKey: 'Id', resettable: true })
export class RecordStore extends EntityStore<RecordState, IRecordViewModel> {
  constructor() {
    super();
  }
}
