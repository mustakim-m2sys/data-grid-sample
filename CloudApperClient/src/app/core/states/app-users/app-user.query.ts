import { Injectable } from '@angular/core';
import { IAppUserViewModel } from '@CloudApperClients/app-model';
import { QueryEntity } from '@datorama/akita';

import { AppUsersState, AppUsersStore } from './app-user.store';

@Injectable({
  providedIn: 'root'
})
export class AppUsersQuery extends QueryEntity<AppUsersState, IAppUserViewModel> {
  allRoles$ = this.selectAll();
  totalRoles$ = this.selectCount();

  constructor(protected store: AppUsersStore) {
    super(store);
  }

  selectAllUsersOfApp$(appId: string, clientId: number) {
    return this.selectAll({ filterBy: x => x.AppId === appId && x.ClientId === clientId });
  }

  getUserOfApp(userId: string, appId: string, clientId: number): IAppUserViewModel {
    const appUsers = this.getAll({ filterBy: x => x.Id === userId && x.AppId === appId && x.ClientId === clientId });
    return appUsers?.length ? appUsers[0] : null;
  }
}
