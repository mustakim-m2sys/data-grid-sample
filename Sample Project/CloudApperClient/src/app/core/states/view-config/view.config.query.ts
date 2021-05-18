import { ViewConfigState, ViewConfigStore } from './view.config.store';
import { IViewConfiguration } from '@CloudApperClients/app-model';
import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

@Injectable({
  providedIn: 'root'
})
export class ViewConfigQuery extends QueryEntity<ViewConfigState, IViewConfiguration> {
  allViewConfigs$ = this.selectAll();
  totalViewConfigs$ = this.selectCount();

  constructor(protected store: ViewConfigStore) {
    super(store);
  }

  selectViewConfig$(appId: string, clientId: number, schemaId: string, menuId: string) {
    return this.selectAll({ filterBy: x => x.AppId === appId && x.ClientId === clientId && x.SchemaId === schemaId && x.MenuId === menuId });
  }

}


