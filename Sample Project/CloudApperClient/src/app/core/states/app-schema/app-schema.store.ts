import { Injectable } from '@angular/core';
import { IAppSchemaViewModel } from '@CloudApperClients/app-model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface AppSchemaState extends EntityState<IAppSchemaViewModel> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'AppSchemaModel', idKey: 'EntityTypeId', resettable: true })
export class AppSchemaStore extends EntityStore<AppSchemaState, IAppSchemaViewModel> {
  constructor() {
    super();
  }
}
