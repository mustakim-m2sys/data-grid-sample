import { RoleState, RoleStore } from './role.store';
import { IRoleViewModel } from '@CloudApperClients/app-model';
import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

@Injectable({
  providedIn: 'root'
})
export class RoleQuery extends QueryEntity<RoleState, IRoleViewModel> {
  allRoles$ = this.selectAll();
  totalRoles$ = this.selectCount();

  constructor(protected store: RoleStore) {
    super(store);
  }
}
