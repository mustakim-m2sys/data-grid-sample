import { Injectable } from '@angular/core';
import { IAppViewModel } from '@CloudApperClients/app-model';
import { QueryEntity } from '@datorama/akita';

import { AppState, AppStore } from './app.store';

@Injectable({
  providedIn: "root"
})
export class AppQuery extends QueryEntity<AppState, IAppViewModel> {
  allApps$ = this.selectAll();
  totalApps$ = this.selectCount();

  constructor(protected store: AppStore) {
    super(store);
  }
}
