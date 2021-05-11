import { Injectable } from '@angular/core';
import { IRoleViewModel } from '@CloudApperClients/app-model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface AppRoleState extends EntityState<IRoleViewModel> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'AppRole', idKey: 'Id', resettable: true })
export class AppRoleStore extends EntityStore<AppRoleState, IRoleViewModel> {
  constructor() {
    super();
  }
}
