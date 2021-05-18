import { Injectable } from '@angular/core';
import { IAppViewModel } from '@CloudApperClients/app-model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface AppState extends EntityState<IAppViewModel> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'App', idKey: 'Id', resettable: true })
export class AppStore extends EntityStore<AppState, IAppViewModel> {
  constructor() {
    super();
  }
}
