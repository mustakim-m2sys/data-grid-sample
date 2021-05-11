import { Injectable } from '@angular/core';
import { IRoleViewModel } from '@CloudApperClients/app-model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface RoleState extends EntityState<IRoleViewModel> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'Role', idKey: 'Id', resettable: true })
export class RoleStore extends EntityStore<RoleState, IRoleViewModel> {
  constructor() {
    super();
  }
}
