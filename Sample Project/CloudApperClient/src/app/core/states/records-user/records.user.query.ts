import { Injectable } from '@angular/core';
import { IRecordsUserViewModel } from '@CloudApperClients/app-model';
import { QueryEntity } from '@datorama/akita';

import { AppQuery } from '../app/app.query';
import { RecordsUserState, RecordsUserStore } from './records.user.store';

@Injectable({ providedIn: 'root' })
export class RecordsUserQuery extends QueryEntity<RecordsUserState, IRecordsUserViewModel> {
  allRecordsUsers$ = this.selectAll();
  totalRecordsUsers$ = this.selectCount();

  constructor(store: RecordsUserStore, private appQuery: AppQuery) {
    super(store);
  }

  selectRecordsByAppAndRole(appId: string, roleId: string) {
    return this.selectAll({ filterBy: x => x.AppId === appId && x.RoleId === roleId });
  }

  getRecordUserByApp(appId: string): IRecordsUserViewModel {
    let recordUser = <IRecordsUserViewModel>{};
    const app = this.appQuery.getEntity(appId);
    if (app?.Id?.trim()) {
      const recordUsers = this.getAll({ filterBy: x => x.AppId === app.Id && x.RoleId === app.RoleId });
      if (recordUsers?.length) {
        recordUser = recordUsers[0];
      }
    }
    return recordUser;
  }
}
