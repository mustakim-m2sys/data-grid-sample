import { IAppSchemaViewModel, IRoleViewModel } from '@CloudApperClients/app-model';
import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { AppSchemaState, AppSchemaStore } from './app-schema.store';

@Injectable({
  providedIn: 'root'
})
export class AppSchemaQuery extends QueryEntity<AppSchemaState, IAppSchemaViewModel> {
  allRoles$ = this.selectAll();
  totalRoles$ = this.selectCount();

  constructor(protected store: AppSchemaStore) {
    super(store);
  }

  selectAllAppSchemaofClient$(clientId : number){
    return this.selectAll({ filterBy: x =>x.ClientId == clientId});

  }

  selectAllAppSchemaofClientWithAppID$(clientId : number, appId : String){
    return this.selectAll({ filterBy: x =>x.ClientId == clientId && x.AppId == appId});

  }
}
