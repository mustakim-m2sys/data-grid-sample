import { IDataGridConfiguration, IBaseViewConfiguration } from './data.grid.models';
import { ICalendarConfiguration } from './calendar.models';
import { KanbanModel } from './kanban.models';
import { ViewTypeEnum } from '@CloudApperClients/app-model';

export interface IViewConfiguration extends IBaseViewConfiguration{
  Id: string;
  AppId: string;
  ClientId: number;
  SchemaId: string;
  MenuId: string;
  CurrentView: ViewTypeEnum,
  DataGridConfig: IDataGridConfiguration;
  CalendarConfig: ICalendarConfiguration;
  KanbanConfig: KanbanModel;
}


export class DefaultViewConfiguration implements IViewConfiguration{
  Id: string;
  AppId: string;
  ClientId: number;
  SchemaId: string;
  MenuId: string;
  CurrentView: ViewTypeEnum;
  DataGridConfig: IDataGridConfiguration;
  CalendarConfig: ICalendarConfiguration;
  KanbanConfig: KanbanModel;
  filterArray: any[];
  sortConfiguration: any;

  constructor(appId: string , clientId : number , menuId : string ){
    this.AppId =appId;
    this.ClientId = clientId;
    this.MenuId = menuId;
  }

}

