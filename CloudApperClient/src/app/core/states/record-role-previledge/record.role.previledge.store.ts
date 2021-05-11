import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { IRecordRolePrivilegeViewModel } from '@CloudApperClients/app-model';
import { Injectable } from '@angular/core';

export interface RecordRolePrivilegeState extends EntityState<IRecordRolePrivilegeViewModel> {}
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'RecordRolePreviledge', idKey: 'Id', resettable: true })
export class RecordRolePreviledgeStore extends EntityStore<RecordRolePrivilegeState, IRecordRolePrivilegeViewModel> {
  constructor() {
    super();
  }

  akitaPreAddEntity(x: Readonly<IRecordRolePrivilegeViewModel>): IRecordRolePrivilegeViewModel {
    return {
      ...x,
      Id: [x.RoleId, x.TypeId].join(',')
    };
  }
}
