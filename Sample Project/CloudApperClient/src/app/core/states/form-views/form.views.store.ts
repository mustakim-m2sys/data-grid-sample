import { Injectable } from '@angular/core';
import { IFormViewVM } from '@CloudApperClients/app-model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface FormViewsState extends EntityState<IFormViewVM> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'FormViews', idKey: 'Id', resettable: true })
export class FormViewStore extends EntityStore<FormViewsState, IFormViewVM> {
  constructor() {
    super();
  }

  changeDefaultFormViewsToNonDefault(defaultFormViews: IFormViewVM[]) {
    if (defaultFormViews && defaultFormViews.length) {
      defaultFormViews = defaultFormViews.map(formView => ({
        ...formView,
        DefaultView: false
      }));
      this.upsertMany(defaultFormViews);
    }
  }
}
