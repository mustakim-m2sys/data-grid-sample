import { Injectable } from '@angular/core';
import { IAppSchemaViewModel, IAppViewModel, IClientViewModel, ISchemaViewModel } from '@CloudApperClients/app-model';
import { uniq } from 'lodash';
import { of } from 'rxjs';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';
import { auditTime } from 'rxjs/internal/operators/auditTime';
import { map } from 'rxjs/internal/operators/map';
import { switchMap } from 'rxjs/internal/operators/switchMap';

import { RecordRolePreviledgeQuery, SchemaQuery, SessionQuery, UIQuery } from '..';
import { AppQuery } from '../app/app.query';
import { FormViewQuery } from '../form-views/form.views.query';
import { MenuQuery } from '../menu/menu.query';
import { ParentChildRelationQuery } from '../paret-child-relation/parent.child.relation.query';
import { RecordsUserQuery } from '../records-user/records.user.query';
import { RoleQuery } from '../role/role.query';

@Injectable({
  providedIn: 'root'
})
export class AppWrapperQuery {
  allApps$ = this.appQuery.selectAll(); //return apps without related entities(role,schema..)
  allAppsWithDetails$ = this.selectAllAppsWithDetails$(); //return apps with related entities(role,schema..)
  allClientsWithApps$ = this.selectAllClientsWithApps$(); //return client list with apps property wheere apps are sorted by the client
  allSortedApps$ = this.selectAllSortedApps$(); //return app list with apps property wheere apps are sorted by the client
  totalApps$ = this.appQuery.selectCount(); //returns count for apps
  totalAppsForSearch$ = this.findTotalAppsForSearch$(); //returns count for apps filtered by search text

  constructor(
    private uiQuery: UIQuery,
    private sessionQuery: SessionQuery,
    private appQuery: AppQuery,
    private roleQuery: RoleQuery,
    private schemaQuery: SchemaQuery,
    private recordPreviledgeQuery: RecordRolePreviledgeQuery,
    private menuQuery: MenuQuery,
    private parentChildRelationQuery: ParentChildRelationQuery,
    private recordsUserQuery: RecordsUserQuery,
    private viewsQuery: FormViewQuery
  ) { }

  isChartSettingsFetched$(appId: string) {
    return this.appQuery.selectEntity(appId, entity => entity.IsChartSettingsFetched)
  }

  selectAppWithDetails$(appId: string) {
    return this.appQuery.selectEntity(appId).pipe(
      switchMap(app => {
        if (app && app.Id && app.ClientId) {
          return combineLatest([
            this.roleQuery.selectAll({ filterBy: x => x.AppId === app.Id && x.ClientId === app.ClientId }),
            this.schemaQuery.selectAll({ filterBy: x => x.AppId === app.Id && x.ClientId === app.ClientId }),
            this.recordPreviledgeQuery.selectAll({ filterBy: x => x.AppId === app.Id && x.ClientId === app.ClientId }),
            this.menuQuery.selectAll({ filterBy: x => x.AppId === app.Id && x.ClientId === app.ClientId }),
            this.parentChildRelationQuery.selectAll({ filterBy: x => x.AppId === app.Id && x.ClientId === app.ClientId }),
            this.recordsUserQuery.selectAll({ filterBy: x => x.AppId === app.Id && x.ClientId === app.ClientId }),
          ]).pipe(
            auditTime(0),
            map(([roles, schemas, recordPreviledges, menus, parentChildRelations, recordsUsers]) => {
              return {
                ...app,
                ...{
                  LoggedInUserRole: roles.find(x => x.Id === app.RoleId),
                  Roles: roles ? roles : [],
                  Schemas: schemas ? schemas.map((schema: ISchemaViewModel) => {
                    let parentSchemaIds = [];
                    let childSchemaIds = [];
                    //find parent and child ids from parentChildRelations
                    if (parentChildRelations) {
                      parentSchemaIds = uniq(parentChildRelations.filter(x => x.ChildId === schema.Id).map(a => a.ParentId));
                      childSchemaIds = uniq(parentChildRelations.filter(x => x.ParentId === schema.Id).map(a => a.ChildId));
                    }
                    return {
                      ...schema,
                      ...{
                        ParentSchemas: schemas.filter(function (filteredSchema) {
                          return parentSchemaIds.indexOf(filteredSchema.Id) !== -1;
                        }),
                        ChildSchemas: schemas.filter(function (filteredSchema) {
                          return childSchemaIds.indexOf(filteredSchema.Id) !== -1;
                        })
                      }
                    }
                  }) : [],
                  RecordRolePrivileges: recordPreviledges ? recordPreviledges : [],
                  Menus: menus ? menus : [],
                  ParentChildRelations: parentChildRelations ? parentChildRelations : [],
                  RecordsUser: recordsUsers ? recordsUsers : [],
                }
              };
            })
          );
        } else {
          return of(null);
        }
      })
    );
  }

  getApp(appId: string) {
    const app = this.appQuery.getEntity(appId);
    if (app && app.Id && app.ClientId) {
      return {
        ...app,
        ...{
          LoggedInUserRole: this.roleQuery.getEntity(app.RoleId),
        }
      };
    } else {
      return null;
    }
  }

  getAppWithDetails(appId: string) {
    const app = this.appQuery.getEntity(appId);

    if (app && app.Id && app.ClientId) {
      const roles = this.roleQuery.getAll({ filterBy: x => x.AppId === app.Id && x.ClientId === app.ClientId });
      const schemas = this.schemaQuery.getAll({ filterBy: x => x.AppId === app.Id && x.ClientId === app.ClientId });
      const recordPreviledges = this.recordPreviledgeQuery.getAll({ filterBy: x => x.AppId === app.Id && x.ClientId === app.ClientId });
      const menus = this.menuQuery.getAll({ filterBy: x => x.AppId === app.Id && x.ClientId === app.ClientId });
      const parentChildRelations = this.parentChildRelationQuery.getAll({ filterBy: x => x.AppId === app.Id && x.ClientId === app.ClientId });
      const recordsUsers = this.recordsUserQuery.getAll({ filterBy: x => x.AppId === app.Id && x.ClientId === app.ClientId });
      const formViews = this.viewsQuery.getAll({ filterBy: x => x.AppId === app.Id && x.ClientId === app.ClientId });
      return {
        ...app,
        ...{
          LoggedInUserRole: roles.find(x => x.Id === app.RoleId),
          Roles: roles ? roles : [],
          Schemas: schemas ? schemas.map((schema: ISchemaViewModel) => {
            let parentSchemaIds = [];
            let childSchemaIds = [];
            //find parent and child ids from parentChildRelations
            if (parentChildRelations) {
              parentSchemaIds = uniq(parentChildRelations.filter(x => x.ChildId === schema.Id).map(a => a.ParentId));
              childSchemaIds = uniq(parentChildRelations.filter(x => x.ParentId === schema.Id).map(a => a.ChildId));
            }
            return {
              ...schema,
              ...{
                ParentSchemas: schemas.filter(function (filteredSchema) {
                  return parentSchemaIds.indexOf(filteredSchema.Id) !== -1;
                }),
                ChildSchemas: schemas.filter(function (filteredSchema) {
                  return childSchemaIds.indexOf(filteredSchema.Id) !== -1;
                })
              }
            }
          }) : [],
          RecordRolePrivileges: recordPreviledges ? recordPreviledges : [],
          Menus: menus ? menus : [],
          ParentChildRelations: parentChildRelations ? parentChildRelations : [],
          RecordsUser: recordsUsers ? recordsUsers : [],
          FormViews: formViews ? formViews : []
        }
      };
    } else {
      return null;
    }
  }

  selectAllSortedApps$() {
    return this.appQuery.selectAll().pipe(
      auditTime(0),
      map((apps) => {
        if (apps && apps.length) {
          //map all client app to replace undefined app launch date time
          apps = apps.map(app => ({
            ...app,
            AppLaunchDateTime: app.AppLaunchDateTime ? app.AppLaunchDateTime : new Date(1900, 1, 1)
          }));
          //now sort by AppLaunchDateTime DESC
          apps = apps.sort((a, b) => b.AppLaunchDateTime.valueOf() - a.AppLaunchDateTime.valueOf());
        }
        return apps && apps.length ? apps : [];
      })
    );
  }

  selectAllAppsWithDetails$() {
    return combineLatest([
      this.appQuery.allApps$,
      this.roleQuery.allRoles$,
      this.schemaQuery.allSchemas$,
      this.recordPreviledgeQuery.allRecordRolePrivileges$,
      this.menuQuery.allMenus$,
      this.parentChildRelationQuery.allParentChildRelations$,
      // this.recordsUserQuery.allRecordsUsers$
    ]).pipe(
      auditTime(0),
      map(([apps, roles, schemas, recordPreviledges, menus, parentChildRelations]) => {
        return apps.map((app: IAppViewModel) => {
          return {
            ...app,
            ...{
              Roles: roles ? roles.filter(x => x.AppId === app.Id && x.ClientId === app.ClientId) : [],
              Schemas: schemas ? schemas.filter(x => x.AppId === app.Id && x.ClientId === app.ClientId) : [],
              RecordRolePrivileges: recordPreviledges
                ? recordPreviledges.filter(x => x.AppId === app.Id && x.ClientId === app.ClientId)
                : [],
              Menus: menus ? menus.filter(x => x.AppId === app.Id && x.ClientId === app.ClientId) : [],
              ParentChildRelations: parentChildRelations
                ? parentChildRelations.filter(x => x.AppId === app.Id && x.ClientId === app.ClientId)
                : []
              // RecordsUser: recordsUsers ? recordsUsers.filter(x => x.AppId === app.Id && x.ClientId === app.ClientId) : []
            }
          };
        });
      })
    );
  }


  selectAllAppsWithDetailsForClient$(clientId : number) {
    return combineLatest([
      this.appQuery.selectAll({ filterBy: x => x.ClientId === clientId }),
      this.schemaQuery.allSchemas$,
    ]).pipe(
      auditTime(0),
      map(([apps, schemas]) => {
        return apps.map((app: IAppViewModel) => {
          return {
            ...app,
            ...{
              Schemas: schemas ? schemas.filter(x => x.AppId === app.Id && x.ClientId === app.ClientId) : [],              
            }
          };
        });
      })
    );
  }

  

  selectAllClientsWithApps$() {
    return combineLatest([this.appQuery.selectAll(), this.sessionQuery.allClients$, this.uiQuery.appSearchText$]).pipe(
      auditTime(0),
      map(([apps, clients, appSearchText]) => {
        const allClientsWithApps = clients.map((client: IClientViewModel) => {
          //first filter the apps by client id and serach text if any
          let clientApps = appSearchText && appSearchText.trim() ?
            apps.filter(x => x.ClientId === client.Id && x.Name.toLowerCase().includes(appSearchText.toLowerCase())) : apps.filter(x => x.ClientId === client.Id);
          if (clientApps && clientApps.length) {
            //map all client app to replace undefined app launch date time
            clientApps = clientApps.map(app => ({
              ...app,
              AppLaunchDateTime: app.AppLaunchDateTime ? app.AppLaunchDateTime : new Date(1900, 1, 1)
            }));
            //now sort by AppLaunchDateTime DESC
            clientApps = clientApps.sort((a, b) => b.AppLaunchDateTime.valueOf() - a.AppLaunchDateTime.valueOf());
          }
          return {
            ...client,
            Apps: clientApps && clientApps.length ? clientApps : []
          };
        });

        if (allClientsWithApps?.length) {
          //getting signupClient index from array
          const signupClientIndex = allClientsWithApps.findIndex(item => item && item.IsSignupUserForClient)
          //if signupClientIndex has value >0 then setting its position to first position
          if (signupClientIndex) {
            allClientsWithApps.splice(0, 0, allClientsWithApps.splice(signupClientIndex, 1)[0]);
          }
        }
        return allClientsWithApps;
      })
    );
  }

  findTotalAppsForSearch$() {
    return combineLatest([this.appQuery.selectAll(), this.uiQuery.appSearchText$]).pipe(
      auditTime(0),
      map(([apps, appSearchText]) => {
        const length = appSearchText
          ? apps.filter(x => x.Name.toLowerCase().includes(appSearchText.toLowerCase())).length
          : 0;
        return length;
      })
    );
  }
}
