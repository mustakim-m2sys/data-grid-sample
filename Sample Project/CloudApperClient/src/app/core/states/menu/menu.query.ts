import { IMenuViewModel, EnumSchemaType, EnumMenuOperationType } from '@CloudApperClients/app-model';
import { MenuState, MenuStore } from './menu.store';
import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { DeepClone } from '../../utils/object.helper';

@Injectable({
  providedIn: 'root'
})
export class MenuQuery extends QueryEntity<MenuState, IMenuViewModel> {
  allMenus$ = this.selectAll();
  totalMenuCount$ = this.selectCount();
  constructor(protected store: MenuStore) {
    super(store);
  }

  getMenuWithParent(menuId: string) {
    const storedMenu = this.getEntity(menuId);
    let menu: IMenuViewModel;
    //get the parent menu info
    if (storedMenu) {
      menu = DeepClone<IMenuViewModel>({}, storedMenu);
      menu.ParentMenu = this.getEntity(menu.ParentId);
    }
    return menu;
  }

  // getting menu id list
  getMenuIds(clientId: number, appId: string, typeId: string) {
    // casting to number if client id comes text
    clientId = Number(clientId);
    if (clientId && appId && typeId) {
      const allMenu = this.getAll();
      const menuIds = allMenu.filter(menu => menu.AppId === appId && menu.ClientId === clientId && menu.TypeId === typeId).map(menu => menu.Id)
      return menuIds;
    }
  }
}