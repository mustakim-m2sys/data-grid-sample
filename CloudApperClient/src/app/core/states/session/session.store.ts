import { Injectable } from '@angular/core';
import { IClientViewModel, IRoleViewModel, IRoutingDetailViewModel, IUserInfoViewModel } from '@CloudApperClients/app-model';
import { Store, StoreConfig, toBoolean } from '@datorama/akita';

import { IsNullOrUndefined } from '../../utils/object.helper';

export function createInitialUserInfoViewModel(): IUserInfoViewModel {
  return <IUserInfoViewModel>{
    Id: '',
    Name: '',
    Email: '',
    ProfilePicData: '',
    IsDefaultUser: false,
    IsSignupUser: false,
    CreateDate: '',
    LastModifiedDate: '',
    IsProfileComplete: false,
    IsNewTokenReceived: false,
    ActiveClient: <IClientViewModel>{},
    Clients: [],
    TemplateReferenceId: "",
    SignupStatusForTemplateUser: null,
    IsSignupForbiddenForTemplateUser: null,
    FetchUpdatedUserInfo: false,
    FetchingUpdatedUserAndAppInfo: false,
    FirstName: '',
    LastName: '',
    PhoneNumber: '',
    CapitalizedNameIcon: '',
    CurrentLanguage: '',
    RoutingDetailForUser: <IRoutingDetailViewModel>{},
    UserDetailsFetchDateTime: null,
    Latitude: 0,
    Longitude: 0
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'session', resettable: true })
export class SessionStore extends Store<IUserInfoViewModel> {
  constructor() {
    super(createInitialUserInfoViewModel());
  }

  updateTemplateInfo(templateReferenceId: string, signupStatusForTemplateUser: boolean, isSignupForbiddenForTemplateUser: boolean, referalCodeForTemplate: string) {
    const templateInfo: Partial<IUserInfoViewModel> = {};
    if (templateReferenceId && templateReferenceId.trim()) {
      templateInfo.TemplateReferenceId = templateReferenceId;
    }
    if (!IsNullOrUndefined(signupStatusForTemplateUser)) {
      templateInfo.SignupStatusForTemplateUser = toBoolean(signupStatusForTemplateUser);
    }
    if (!IsNullOrUndefined(isSignupForbiddenForTemplateUser)) {
      templateInfo.IsSignupForbiddenForTemplateUser = toBoolean(signupStatusForTemplateUser);
    }
    if (referalCodeForTemplate && referalCodeForTemplate.trim()) {
      templateInfo.ReferalCodeForTemplate = referalCodeForTemplate;
    }
    this.update(templateInfo);
  }

  clearTemplateReferenceId() {
    this.update({ TemplateReferenceId: "" });
  }

  setNewTokenReceived() {
    this.update({ IsNewTokenReceived: true });
  }

  clearNewTokenReceived() {
    this.update({ IsNewTokenReceived: false });
  }

  updateCLients(clients: IClientViewModel[]) {
    this.update({ Clients: clients });
  }

  setFetchUpdatedUserInfo(fetchUpdatedUserInfo: boolean) {
    this.update(state => ({ FetchUpdatedUserInfo: fetchUpdatedUserInfo }));
  }

  setFetchingUpdatedUserAndAppInfo(fetchingUpdatedUserAndAppInfo: boolean) {
    this.update(state => ({ FetchingUpdatedUserAndAppInfo: fetchingUpdatedUserAndAppInfo }));
  }

  setRoutingDetailForUser(routingDetailForUser: IRoutingDetailViewModel) {
    this.update({ RoutingDetailForUser: routingDetailForUser });
  }

  setUserLocation(latitude: number, longitude: number) {
    this.update({ Latitude: latitude, Longitude: longitude });
  }

}
