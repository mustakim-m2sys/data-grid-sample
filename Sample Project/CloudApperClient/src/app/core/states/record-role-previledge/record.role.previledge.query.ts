import { IRecordRolePrivilegeViewModel } from '@CloudApperClients/app-model';
import { RecordRolePrivilegeState, RecordRolePreviledgeStore } from './record.role.previledge.store';
import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RecordRolePreviledgeQuery extends QueryEntity<RecordRolePrivilegeState, IRecordRolePrivilegeViewModel> {
  allRecordRolePrivileges$ = this.selectAll();
  totalRecordRolePrivileges$ = this.selectCount();

  constructor(store: RecordRolePreviledgeStore) {
    super(store);
  }
}
