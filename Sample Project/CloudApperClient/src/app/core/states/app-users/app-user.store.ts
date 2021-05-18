import { Injectable } from '@angular/core';
import { IRoleViewModel, IAppUserViewModel } from '@CloudApperClients/app-model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface AppUsersState extends EntityState<IAppUserViewModel> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'AppUsers', idKey: 'Id', resettable: true })
export class AppUsersStore extends EntityStore<AppUsersState, IAppUserViewModel> {
  constructor() {
    super();
  }
}
