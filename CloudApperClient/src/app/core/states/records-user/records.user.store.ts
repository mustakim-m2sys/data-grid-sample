import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { IRecordsUserViewModel } from '@CloudApperClients/app-model';
import { Injectable } from '@angular/core';

export interface RecordsUserState extends EntityState<IRecordsUserViewModel> { }
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'RecordsUser', idKey: 'Id', resettable: true })
export class RecordsUserStore extends EntityStore<RecordsUserState, IRecordsUserViewModel> {
  constructor() {
    super();
  }

  akitaPreAddEntity(x: Readonly<IRecordsUserViewModel>): IRecordsUserViewModel {
    return {
      ...x,
      Id: [x.AppId, x.RoleId].join(',')
    };
  }
}
