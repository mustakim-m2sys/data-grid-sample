import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig, EntityUIStore } from '@datorama/akita';
import { ISchemaViewModel, PaginationInfo } from '@CloudApperClients/app-model';

export interface SchemaState extends EntityState<ISchemaViewModel> { }
export interface PaginationUIState extends EntityState<PaginationInfo> { }
const initialPaginationUIState: PaginationInfo = new PaginationInfo();

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'Schema', idKey: 'Id', resettable: true })
export class SchemaStore extends EntityStore<SchemaState, ISchemaViewModel> {

  ui: EntityUIStore<PaginationUIState>;

  constructor() {
    super();
    this.createUIStore().setInitialEntityState(entity => (initialPaginationUIState));
  }

  updateCachedPagesForPagination(schemaId: string, cachedPages: number) {
    this.ui.upsert(schemaId, { CachedPages: cachedPages });
  }

  updateCurrentPageForPagination(schemaId: string, currentPage: number) {
    this.ui.upsert(schemaId, { CurrentPage: currentPage });
  }

  updateNoMoreitemForPagination(schemaId: string, hasNoMoreItem: boolean) {
    this.ui.upsert(schemaId, { HasNoMoreItem: hasNoMoreItem });
  }

}
