import {
  AppRouteUrlConstant,
  EnumListViewType,
  EnumMenuOperationType,
  IAppViewModel,
  IMenuViewModel,
  IRecordViewModel,
  ISchemaViewModel,
  IUserInfoViewModel,
  TemplateParamKey,
} from '@CloudApperClients/app-model';


export function getAppLandingPageUrl(app: IAppViewModel, currentRouteURL?: string): string {
  //by default route to console page
  let appLandingPageUrl = '';
  //first check if valid current route url then update app landing page url
  if (currentRouteURL && currentRouteURL.trim() && checkRouteURLValidity(currentRouteURL.trim())) {
    appLandingPageUrl = currentRouteURL;
  }
  //if app landing page is still empty then get landing page url from the app
  if (app && app.LayoutSettings && (!appLandingPageUrl || !appLandingPageUrl.trim())) {
    const appBaseUrl = app.ClientId + '/' + AppRouteUrlConstant.APP + '/' + app.Id;
    //if dashboard is enabled then set dashboard page url
    if (app.LayoutSettings.DashboardEnabled) {
      appLandingPageUrl = appBaseUrl + '/' + AppRouteUrlConstant.DASHBOARD;
    } else {
      //if app has menus then choose page url from it
      if (app.Menus && app.Menus.length) {
        //if landing page menu is active set its url
        if (app.LayoutSettings.LandingPageMenuId) {
          const landingPageMenu = app.Menus.find(menu => menu.Id === app.LayoutSettings.LandingPageMenuId);
          if (landingPageMenu && landingPageMenu.Id && landingPageMenu.TypeId) {
            appLandingPageUrl = appBaseUrl + '/' + AppRouteUrlConstant.LIST + '/' + landingPageMenu.TypeId + '/' + landingPageMenu.Id;
          }
        } else {
          //first sort the menus by WebSequenceNo ASC
          const menus = app.Menus.sort((a, b) => a.WebSequenceNo - b.WebSequenceNo);
          //now find the top parent menu with empty ParentId
          const topParentMenus = menus.filter(x => !x.ParentId || !x.ParentId.trim());
          //now find the first search menu(List menu) by iterating the parents
          let firstMenuItem: IMenuViewModel;
          for (let i = 0; i < topParentMenus.length; i++) {
            //first check if the parent menu itslef is a list type or not
            if (topParentMenus[i]?.Mode === EnumMenuOperationType.Search) {
              firstMenuItem = topParentMenus[i];
              break;
            }
            const firstMenuItemOfParent = menus.find(x => x.ParentId === topParentMenus[i].Id && x.Mode === EnumMenuOperationType.Search);
            //if parent has valid search menu(List menu) assign it abnd break the loop
            if (firstMenuItemOfParent && firstMenuItemOfParent.Id) {
              firstMenuItem = firstMenuItemOfParent;
              break;
            }
          }
          if (firstMenuItem && firstMenuItem.Id && firstMenuItem.TypeId) {
            appLandingPageUrl = appBaseUrl + '/' + AppRouteUrlConstant.LIST + '/' + firstMenuItem.TypeId + '/' + firstMenuItem.Id;
          }
        }
      }
    }
  }
  return appLandingPageUrl;
}
export function processReturnUrl(returnUrl: string, currentLoggedInUser: IUserInfoViewModel, previousLoggedInUserId: string): string {
  //if invalid current user then redirect to console page
  if (!currentLoggedInUser || !currentLoggedInUser.Id) {
    return AppRouteUrlConstant.CONSOLE_ALT;
  }
  //if current logged in user profile is not complete then redirect to client create page
  if (!currentLoggedInUser.IsProfileComplete) {
    return AppRouteUrlConstant.ROUTE_DEVIDER + AppRouteUrlConstant.CLIENT_CREATE;
  }
  //if previous logged in user found and it does not matches with current user id then redirect to console page
  if (previousLoggedInUserId && previousLoggedInUserId.trim() && previousLoggedInUserId !== currentLoggedInUser.Id) {
    return AppRouteUrlConstant.CONSOLE_ALT;
  }
  //if return url is empty then redirect to console page
  if (!returnUrl || !returnUrl.trim()) {
    return AppRouteUrlConstant.CONSOLE_ALT;
  }
  //if client create page then set console url
  if (returnUrl === (AppRouteUrlConstant.ROUTE_DEVIDER + AppRouteUrlConstant.CLIENT_CREATE)) {
    return AppRouteUrlConstant.CONSOLE_ALT;
  }
  //if route contains login redirect page then set console url
  if (returnUrl.includes(AppRouteUrlConstant.LOGIN_REDIRECT) || returnUrl.includes(AppRouteUrlConstant.AUTH_LOGIN_REDIRECT)) {
    return AppRouteUrlConstant.CONSOLE_ALT;
  }
  //if route contains refresh token page then set console url
  if (returnUrl.includes(AppRouteUrlConstant.REFRESH_TOKEN)) {
    return AppRouteUrlConstant.CONSOLE_ALT;
  }
  //if route contains refresh token page then set console url
  if (returnUrl.includes(AppRouteUrlConstant.APP_CREATE)) {
    return AppRouteUrlConstant.CONSOLE_ALT;
  }
  //if route contains my schedule page then set console url
  if (returnUrl.includes(AppRouteUrlConstant.SCHEDULER)) {
    return AppRouteUrlConstant.CONSOLE_ALT;
  }
  //if it passes all the break conditions then redirect to the returnUrl
  return returnUrl;
}

export function parseAppIdFromRouteUrl(routeURL: string): string {
  let appId = "";
  if (routeURL && routeURL.trim()) {
    //split the route url
    const splittedRouteArray = routeURL.split(AppRouteUrlConstant.ROUTE_DEVIDER);
    //for appId splitted route lenght must be atleast 4 and 3rd index will be equal to "app"
    if (splittedRouteArray && splittedRouteArray.length && splittedRouteArray.length >= 4 && splittedRouteArray[2] === AppRouteUrlConstant.APP) {
      //3rd index will be app id
      appId = splittedRouteArray[3];
    }
  }
  return appId;
}

export function parseClientIdFromRouteUrl(routeURL: string): number {
  let clientId = 0;
  if (routeURL && routeURL.trim()) {
    //split the route url
    const splittedRouteArray = routeURL.split(AppRouteUrlConstant.ROUTE_DEVIDER);
    //for client id splitted route lenght must be atleast 3 and 3rd index will be equal to "app"
    if (splittedRouteArray && splittedRouteArray.length && splittedRouteArray.length >= 3 && splittedRouteArray[2] === AppRouteUrlConstant.APP) {
      //2nd index will be client id
      clientId = Number(splittedRouteArray[1]);
    }
  }
  return clientId;
}

export function isRouteUrlForAppModule(routeURL: string): boolean {
  let routeUrlForAppModule = false;
  if (routeURL && routeURL.trim()) {
    //split the route url
    const splittedRouteArray = routeURL.split(AppRouteUrlConstant.ROUTE_DEVIDER);
    //for appId splitted route lenght must be atleast 4 and 3rd index will be equal to "app"
    if (splittedRouteArray && splittedRouteArray.length && splittedRouteArray.length >= 4 && splittedRouteArray[2] === AppRouteUrlConstant.APP) {
      routeUrlForAppModule = true;
    }
  }
  return routeUrlForAppModule;
}

export function isRouteUrlForTemplateInstall(routeURL: string): boolean {
  let routeUrlForTemplateInstall = false;
  if (routeURL && routeURL.trim()) {
    //split the route url
    const splittedRouteArray = routeURL.split(AppRouteUrlConstant.ROUTE_DEVIDER);
    //for tempalte install route lenght must be atleast 2 and 2nd index will contains "login" and  "templaterefid"
    if (splittedRouteArray && splittedRouteArray.length && splittedRouteArray.length >= 2 &&
      splittedRouteArray[1].includes(AppRouteUrlConstant.LOGIN) && splittedRouteArray[1].includes(TemplateParamKey.TEMPLATE_REFERENCE_ID)) {
      routeUrlForTemplateInstall = true;
    }
  }
  return routeUrlForTemplateInstall;
}

export function isRouteUrlForLoginRedirect(routeURL: string): boolean {
  let routeUrlForLoginRedirect = false;
  //for login redirect route url will contain "login-redirect"
  if (routeURL && routeURL.trim() && (routeURL.includes(AppRouteUrlConstant.LOGIN_REDIRECT) || routeURL.includes(AppRouteUrlConstant.AUTH_LOGIN_REDIRECT))) {
    routeUrlForLoginRedirect = true;
  }
  return routeUrlForLoginRedirect;
}

export function isRouteUrlForTokenRefresh(routeURL: string): boolean {
  let routeUrlForTokenRefresh = false;
  //route url will contain "refresh-token"
  if (routeURL && routeURL.trim() && routeURL.includes(AppRouteUrlConstant.REFRESH_TOKEN)) {
    routeUrlForTokenRefresh = true;
  }
  return routeUrlForTokenRefresh;
}

export function isRouteUrlValidForUpdatedUserInfoFetch(currentUrl: string): boolean {
  let isValidUrl = false;
  if (currentUrl?.trim() && !isRouteUrlForTemplateInstall(currentUrl) && !isRouteUrlForLoginRedirect(currentUrl) &&
    !isRouteUrlForTokenRefresh(currentUrl) && !isRouteUrlForAppModule(currentUrl)) {
    isValidUrl = true;
  }
  return isValidUrl;
}

function checkRouteURLValidity(currentRouteURL: string): boolean {
  //TODO : need to menu, schema id validity for the app
  let isValidUrl = false;
  if (currentRouteURL && currentRouteURL.trim()) {
    //split the route url and check 4th index contains a AppRouteUrlConstant or not
    const splittedRouteArray = currentRouteURL.split('/');
    if (splittedRouteArray && splittedRouteArray.length) {
      for (const key of Object.keys(AppRouteUrlConstant)) {
        if (splittedRouteArray[4] && splittedRouteArray[4] === AppRouteUrlConstant[key]) {
          isValidUrl = true;
        }
      }
    }
  }
  return isValidUrl;
}

export function getMenuUrl(clientId: number, appId: string, menu: IMenuViewModel): string {
  let menuUrl = '';
  if (clientId && appId && appId.trim() && menu && menu.Id && menu.Mode) {
    //by deault list type menu
    let menuType = AppRouteUrlConstant.LIST;
    if (menu.Mode === EnumMenuOperationType.Add) {
      menuType = AppRouteUrlConstant.ADD;
    }
    else if (menu.Mode === EnumMenuOperationType.Search && menu.ViewType === EnumListViewType.KANBAN) {
      menuType = AppRouteUrlConstant.KANBAN;
    }
    menuUrl = clientId + '/' + AppRouteUrlConstant.APP + '/' + appId + '/' + menuType + '/' + menu.TypeId + '/' + menu.Id;
  }
  return menuUrl;
}

export function getDashboardMenuUrl(clientId: number, appId: string): string {
  let dashboardMenuUrl = '';
  if (clientId && appId && appId.trim()) {
    dashboardMenuUrl = clientId + '/' + AppRouteUrlConstant.APP + '/' + appId + '/' + AppRouteUrlConstant.DASHBOARD;
  }
  return dashboardMenuUrl;
}

export function getSchedulerMenuUrl(clientId: number, appId: string): string {
  let schedulerMenuUrl = '';
  if (clientId && appId?.trim()) {
    schedulerMenuUrl = clientId + '/' + AppRouteUrlConstant.APP + '/' + appId + '/' + AppRouteUrlConstant.SCHEDULER;
  }
  return schedulerMenuUrl;
}

export function getReportMenuUrl(clientId: number, appId: string): string {
  let reportMenuUrl = '';
  if (clientId && appId && appId.trim()) {
    reportMenuUrl = clientId + '/' + AppRouteUrlConstant.APP + '/' + appId + '/' + AppRouteUrlConstant.REPORT;
  }
  return reportMenuUrl;
}

export function getRecordDetailsUrl(record: IRecordViewModel, schema: ISchemaViewModel): string {
  let recordDetailsUrl = '';
  //if record id,client id,app id and type id is valid
  if (record && record.Id && record.Id.trim() && schema && schema.Id && schema.Id.trim() && schema.AppId && schema.AppId.trim() && schema.ClientId) {
    recordDetailsUrl = schema.ClientId + '/' + AppRouteUrlConstant.APP + '/' + schema.AppId + '/' +
      AppRouteUrlConstant.DETAILS + '/' + schema.Id + '/' + record.Id;
  }
  return recordDetailsUrl;
}

export function getFormViewUrl(schema: ISchemaViewModel, menu: IMenuViewModel, formViewId: string): string {
  let formViewUrl = '';
  //if has valid schema and menu
  if (schema?.Id && schema?.ClientId && schema?.AppId && menu?.Id) {
    formViewUrl = schema.ClientId + AppRouteUrlConstant.ROUTE_DEVIDER + AppRouteUrlConstant.APP + AppRouteUrlConstant.ROUTE_DEVIDER +
      schema.AppId + AppRouteUrlConstant.ROUTE_DEVIDER + AppRouteUrlConstant.FORM_VIEW + AppRouteUrlConstant.ROUTE_DEVIDER +
      schema.Id + AppRouteUrlConstant.ROUTE_DEVIDER + menu.Id;
    //if formViewId is valid then append it at the end
    if (formViewId?.trim()) {
      formViewUrl = formViewUrl + AppRouteUrlConstant.ROUTE_DEVIDER + formViewId;
    }
  }
  return formViewUrl;
}

export function mergeRoutePaths(paths: string[]): string {
  let finalPath = '';
  if (paths && paths.length) {
    for (let i = 0; i < paths.length; i++) {
      if (paths[i] && paths[i].trim()) {
        let path = paths[i].trim();
        if (i === 0) {
          //if first path does not ends with "/" add it
          if (!path.endsWith(AppRouteUrlConstant.ROUTE_DEVIDER)) { path = path + AppRouteUrlConstant.ROUTE_DEVIDER };
        } else if (i === paths.length - 1) {
          //last item can not start with "/"
          if (path.startsWith(AppRouteUrlConstant.ROUTE_DEVIDER)) { path = path.replace(AppRouteUrlConstant.ROUTE_DEVIDER, '').trim(); }
          //last item can not end with '/'
          if (path.endsWith(AppRouteUrlConstant.ROUTE_DEVIDER)) { path = path.substring(0, path.lastIndexOf(AppRouteUrlConstant.ROUTE_DEVIDER)).trim(); }
        } else {
          //other items can not start with "/"
          if (path.startsWith(AppRouteUrlConstant.ROUTE_DEVIDER)) { path = path.replace(AppRouteUrlConstant.ROUTE_DEVIDER, '').trim(); }
          //if path does not ends with "/" add it
          if (!path.endsWith(AppRouteUrlConstant.ROUTE_DEVIDER)) { path = path + AppRouteUrlConstant.ROUTE_DEVIDER };
        }
        //merge the path
        finalPath = finalPath + path;
      }
    }
  }
  return finalPath;
}

export function getAppDefaultUrl(app: IAppViewModel): string {
  //by default route to console page
  let appDefaultUrl = '';
  //generate default app redirect url
  if (app && app.Id && app.ClientId) {
    appDefaultUrl = app.ClientId + '/' + AppRouteUrlConstant.APP + '/' + app.Id;
  }
  return appDefaultUrl;
}

// for generating schedule URL from deep link
export function getSchedulePageUrl(clientId: number, appId: string): string {
  let scheduleUrl = '';
  if (clientId && appId && appId.trim()) {
    //by deault in my schedule
    scheduleUrl = clientId + '/' + AppRouteUrlConstant.APP + '/' + appId + '/' + AppRouteUrlConstant.SCHEDULER;
  }
  return scheduleUrl;
}

// for generating install app URL from deep link
export function getInstallAppPageUrl(templaterefid: string, issignup: boolean): string {
  let installAppUrl = '';
  if (templaterefid && templaterefid.trim()) {
    //by deault in my install app url
    installAppUrl = 'login?' + TemplateParamKey.TEMPLATE_REFERENCE_ID + '=' + templaterefid + TemplateParamKey.SIGNUP_STATUS_FOR_TEMPLATE_USER + '=' + issignup;
  }
  return installAppUrl;
}

// for generating Record Create from deep link
export function getRecordCreateUrlForDeepLink(clientId: number, appId: string, TypeId: string): string {
  let recordCreateUrl = '';
  //if record id,client id,app id and type id is valid
  if (clientId && TypeId && TypeId.trim() && appId && appId.trim()) {
    recordCreateUrl = clientId + '/' + AppRouteUrlConstant.APP + '/' + appId + '/' +
      AppRouteUrlConstant.ADD + '/' + TypeId + '/' + AppRouteUrlConstant.DYNAMIC_RECORD_CREATE_LINK;
  }
  return recordCreateUrl;
}

// for generating Record details from deep link
export function getDynamicRecordDetailsUrl(recordId: string, schema: { Id: string, AppId: string, ClientId: number }): string {
  let recordDetailsUrl = '';
  //if record id,client id,app id and type id is valid
  if (recordId && recordId.trim() && schema && schema.Id && schema.Id.trim() && schema.AppId && schema.AppId.trim() && schema.ClientId) {
    recordDetailsUrl = schema.ClientId + '/' + AppRouteUrlConstant.APP + '/' + schema.AppId + '/' +
      AppRouteUrlConstant.DETAILS + '/' + schema.Id + '/' + recordId;
  }
  return recordDetailsUrl;
}

// for generating Record update from deep link
export function getDynamicRecordEditUrl(recordId: string, schema: { Id: string, AppId: string, ClientId: number }): string {
  let recordDetailsUrl = '';
  //if record id,client id,app id and type id is valid
  if (recordId && recordId.trim() && schema && schema.Id && schema.Id.trim() && schema.AppId && schema.AppId.trim() && schema.ClientId) {
    recordDetailsUrl = schema.ClientId + '/' + AppRouteUrlConstant.APP + '/' + schema.AppId + '/' +
      AppRouteUrlConstant.DETAILS + '/' + schema.Id + '/' + recordId + '/' + AppRouteUrlConstant.EDIT;
  }
  return recordDetailsUrl;
}