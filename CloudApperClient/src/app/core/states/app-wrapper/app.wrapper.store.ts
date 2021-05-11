import { Injectable } from '@angular/core';
import { EnumPrivileges, IAppViewModel } from '@CloudApperClients/app-model';
import { applyTransaction, guid } from '@datorama/akita';

import {
  AppStore,
  MenuStore,
  ParentChildRelationStore,
  RecordRolePreviledgeStore,
  RecordsUserStore,
  RoleStore,
  SchemaStore,
  SessionStore,
  UIStore,
} from '..';
import { FormViewStore } from '../form-views/form.views.store';
import { formatSchemaBeforeSavingToLocalSate } from '../../helpers';

@Injectable({ providedIn: 'root' })
export class AppWrapperStore {
  constructor(
    private uiStore: UIStore,
    private sessionStore: SessionStore,
    private appStore: AppStore,
    private roleStore: RoleStore,
    private schemaStore: SchemaStore,
    private recordPreviledgeStore: RecordRolePreviledgeStore,
    private menuStore: MenuStore,
    private parentChildRelationStore: ParentChildRelationStore,
    private recordsUserStore: RecordsUserStore,
    private formViewStore: FormViewStore
  ) { }

  addOrUpdateApp(appId: string, clientId: number, app: Partial<IAppViewModel>, isAppDetailsFetched?: boolean) {
    applyTransaction(() => {
      //update the related entities first and remove that entity
      if (app.Roles && app.Roles.length) {
        app.Roles = app.Roles.map(role => ({ ...role, ...{ AppId: appId, ClientId: clientId } }));
        // remove previous role from store
        this.roleStore.remove(({ AppId, ClientId }) => AppId === appId && ClientId === clientId);
        // insert new role in store
        this.roleStore.upsertMany(app.Roles);
        delete app.Roles;
      }

      if (app.RecordRolePrivileges && app.RecordRolePrivileges.length) {
        app.RecordRolePrivileges = app.RecordRolePrivileges.map(recordRolePrivilege => ({
          ...recordRolePrivilege,
          ...{ AppId: appId, ClientId: clientId }
        }));
        app.RecordRolePrivileges.forEach(element => {
          // tslint:disable-next-line: no-bitwise
          const HasCreatePermission = Boolean(Number(element.PrivilegeCodes) & Number(EnumPrivileges.Create));
          // tslint:disable-next-line: no-bitwise
          const HasEditPermission = Boolean(Number(element.PrivilegeCodes) & Number(EnumPrivileges.Edit));
          // tslint:disable-next-line: no-bitwise
          const HasDeletePermission = Boolean(Number(element.PrivilegeCodes) & Number(EnumPrivileges.Delete));
          // tslint:disable-next-line: no-bitwise
          const HasViewPermission = Boolean(Number(element.PrivilegeCodes) & Number(EnumPrivileges.View));
          // tslint:disable-next-line: no-bitwise
          const HasImageCreatePermission = Boolean(Number(element.PrivilegeCodes) & Number(EnumPrivileges.ImageCreate));
          // tslint:disable-next-line: no-bitwise
          const HasImageEditPermission = Boolean(Number(element.PrivilegeCodes) & Number(EnumPrivileges.ImageEdit));
          // tslint:disable-next-line: no-bitwise
          const HasImageDeletePermission = Boolean(Number(element.PrivilegeCodes) & Number(EnumPrivileges.ImageDelete));
          // tslint:disable-next-line: no-bitwise
          const HasImageViewPermission = Boolean(Number(element.PrivilegeCodes) & Number(EnumPrivileges.ImageView));
          // tslint:disable-next-line: no-bitwise
          const HasFileCreatePermission = Boolean(Number(element.PrivilegeCodes) & Number(EnumPrivileges.FileCreate));
          // tslint:disable-next-line: no-bitwise
          const HasFileEditPermission = Boolean(Number(element.PrivilegeCodes) & Number(EnumPrivileges.FileEdit));
          // tslint:disable-next-line: no-bitwise
          const HasFileDeletePermission = Boolean(Number(element.PrivilegeCodes) & Number(EnumPrivileges.FileDelete));
          // tslint:disable-next-line: no-bitwise
          const HasFileViewPermission = Boolean(Number(element.PrivilegeCodes) & Number(EnumPrivileges.FileView));
          if (app.Schemas && app.Schemas.length) {
            if (app.Schemas.find(i => i.Id === element.TypeId)) {
              const schema = app.Schemas.find(i => i.Id === element.TypeId);
              schema.HasCreatePermission = HasCreatePermission;
              schema.HasEditPermission = HasEditPermission;
              schema.HasDeletePermission = HasDeletePermission;
              schema.HasViewPermission = HasViewPermission;
              schema.HasImageCreatePermission = HasImageCreatePermission;
              schema.HasImageEditPermission = HasImageEditPermission;
              schema.HasImageDeletePermission = HasImageDeletePermission;
              schema.HasImageViewPermission = HasImageViewPermission;
              schema.HasFileCreatePermission = HasFileCreatePermission;
              schema.HasFileEditPermission = HasFileEditPermission;
              schema.HasFileDeletePermission = HasFileDeletePermission;
              schema.HasFileViewPermission = HasFileViewPermission;
            }
          }
        });
        // remove previous record previledge from store
        this.recordPreviledgeStore.remove(({ AppId, ClientId }) => AppId === appId && ClientId === clientId);
        // insert new record previledge in store
        this.recordPreviledgeStore.upsertMany(app.RecordRolePrivileges);
        delete app.RecordRolePrivileges;
      }

      if (app.Schemas && app.Schemas.length) {
        app.Schemas = app.Schemas.map(schema => ({ ...schema, ...{ AppId: appId, ClientId: clientId } }));
        // remove previous schema from store
        this.schemaStore.remove(({ AppId, ClientId }) => AppId === appId && ClientId === clientId);
        //format schemas for field name change
        app.Schemas = app.Schemas.map(x => formatSchemaBeforeSavingToLocalSate(x));
        //insert new schema in store
        this.schemaStore.upsertMany(app.Schemas);
        delete app.Schemas;
      }

      if (app.Menus && app.Menus.length) {
        app.Menus = app.Menus.map(menu => ({ ...menu, ...{ AppId: appId, ClientId: clientId } }));
        // remove previous menu from store
        this.menuStore.remove(({ AppId, ClientId }) => AppId === appId && ClientId === clientId);
        // insert new menu in store
        this.menuStore.upsertMany(app.Menus);
        delete app.Menus;
      }

      if (app.ParentChildRelations && app.ParentChildRelations.length) {
        let sequenceNo = 1;
        app.ParentChildRelations = app.ParentChildRelations.map(parentChildRelation => ({
          ...parentChildRelation,
          ...{ AppId: appId, ClientId: clientId, Id: guid(), SequenceNo: sequenceNo++ }
        }));
        // remove previous parent child relation from store
        this.parentChildRelationStore.remove(({ AppId, ClientId }) => AppId === appId && ClientId === clientId);
        // insert new parent child relation in store
        this.parentChildRelationStore.upsertMany(app.ParentChildRelations);
        delete app.ParentChildRelations;
      }

      if (app.RecordsUser && app.RecordsUser.length) {
        app.RecordsUser = app.RecordsUser.map(recordsUser => ({
          ...recordsUser,
          ...{ AppId: appId, ClientId: clientId }
        }));
        // remove previous records user from store
        this.recordsUserStore.remove(({ AppId, ClientId }) => AppId === appId && ClientId === clientId);
        // insert new records user in store
        this.recordsUserStore.upsertMany(app.RecordsUser);
        delete app.RecordsUser;
      }


      if (app.FormViews && app.FormViews.length) {
        app.FormViews = app.FormViews.map(formView => ({ ...formView, ...{ AppId: appId, ClientId: clientId } }));
        // remove previous form view from store
        this.formViewStore.remove(({ AppId, ClientId }) => AppId === appId && ClientId === clientId);
        // insert new form view in store
        this.formViewStore.upsertMany(app.FormViews);
        delete app.FormViews;
      }

      //set app details fetch status
      if (isAppDetailsFetched) {
        app.IsAppDetailsFetched = true;
        app.AppDetailsFetchDateTime = new Date(); //set current date time
      }

      //now update the app store
      this.appStore.upsert(appId, app);
    });
  }

  setAppChartSettingsFetchedStatus(appId: string, isChartSettingsFetched: boolean) {
    this.appStore.update(appId, entity => ({ IsChartSettingsFetched: isChartSettingsFetched }));
  }

  setSchedulesFetchedStatus(appId: string, isSchedulesFetched: boolean) {
    this.appStore.update(appId, entity => ({ IsSchedulesFetched: isSchedulesFetched }));
  }

  updateLastSyncTime(appId: string, lastSyncTime: string) {
    this.appStore.update(appId, entity => ({ LastSchedulesSyncTime: lastSyncTime }));
  }

  setAppLaunchDateTime(appId: string, dateTime: Date) {
    this.appStore.update(appId, entity => ({ AppLaunchDateTime: dateTime }));
  }
}
