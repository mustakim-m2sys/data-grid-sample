import { Injectable } from '@angular/core';
import { IViewConfiguration, ICalendarConfiguration, KanbanModel, ViewTypeEnum } from '@CloudApperClients/app-model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Get32BitUniqueId } from '../../utils/object.helper';

export interface ViewConfigState extends EntityState<IViewConfiguration> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'ViewConfig', idKey: 'Id', resettable: true })
export class ViewConfigStore extends EntityStore<ViewConfigState, IViewConfiguration> {
  constructor() {
    super();
  }

  setCurrentView(appId: string, clientId: number, schemaId: string, menuId: string, currentView: ViewTypeEnum, viewConfigId?: string) {
    if (!viewConfigId) viewConfigId = Get32BitUniqueId();
    //add or update view config
    this.upsert(viewConfigId, { AppId: appId, ClientId: clientId, SchemaId: schemaId, MenuId: menuId, CurrentView: currentView });
  }

  setCalendarViewConfig(appId: string, clientId: number, schemaId: string, menuId: string, calendarConfig: ICalendarConfiguration, viewConfigId?: string) {
    if (!viewConfigId) viewConfigId = Get32BitUniqueId();
    //add or update view config
    this.upsert(viewConfigId, { AppId: appId, ClientId: clientId, SchemaId: schemaId, MenuId: menuId, CalendarConfig: calendarConfig });
  }

  setKanbanViewConfig(
    appId: string,
    clientId: number,
    schemaId: string,
    menuId: string,
    kanbanConfig: KanbanModel,
    viewConfigId?: string
  ) {
    if (!viewConfigId) viewConfigId = Get32BitUniqueId();
    //add or update view config
    this.upsert(viewConfigId, {
      AppId: appId,
      ClientId: clientId,
      SchemaId: schemaId,
      MenuId: menuId,
      KanbanConfig: kanbanConfig
    });
  }
}
