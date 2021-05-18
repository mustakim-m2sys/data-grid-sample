import { AppRoleState, AppRoleStore } from './app-role.store';
import { IRoleViewModel } from '@CloudApperClients/app-model';
import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

@Injectable({
  providedIn: 'root'
})
export class AppRoleQuery extends QueryEntity<AppRoleState, IRoleViewModel> {
  allRoles$ = this.selectAll();
  totalRoles$ = this.selectCount();

  constructor(protected store: AppRoleStore) {
    super(store);
  }
  selectAllRolesOfApp$(appId: string, clientId: number) {
    return this.selectAll({ filterBy: x => x.AppId === appId && x.ClientId === clientId });
  }
}
