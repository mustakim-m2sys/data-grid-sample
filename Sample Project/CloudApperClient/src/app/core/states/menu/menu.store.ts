import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { IMenuViewModel } from '@CloudApperClients/app-model';

export interface MenuState extends EntityState<IMenuViewModel> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'Menu', idKey: 'Id', resettable: true })
export class MenuStore extends EntityStore<MenuState, IMenuViewModel> {
  constructor() {
    super();
  }
}
