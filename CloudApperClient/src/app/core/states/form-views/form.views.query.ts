import { Injectable } from '@angular/core';
import { IFormViewVM } from '@CloudApperClients/app-model';
import { QueryEntity } from '@datorama/akita';

import { FormViewsState, FormViewStore } from './form.views.store';

@Injectable({
  providedIn: 'root'
})
export class FormViewQuery extends QueryEntity<FormViewsState, IFormViewVM> {
  allViews$ = this.selectAll();
  totalViews$ = this.selectCount();

  constructor(protected store: FormViewStore) {
    super(store);
  }

  selectFormViews$(schemaId: string) {
    return this.selectAll({ filterBy: x => x.TypeId === schemaId });
  }

  getDefaultFormViews(schemaId: string) {
    return this.getAll({ filterBy: x => x.TypeId === schemaId && x.DefaultView });
  }

}


