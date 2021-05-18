import { Injectable } from '@angular/core';
import {
  IClientViewModel,
  IRoutingDetailViewModel,
  ISubscriptionViewModel,
  IUserInfoViewModel,
} from '@CloudApperClients/app-model';
import { isString, Query, toBoolean } from '@datorama/akita';

import { RoleQuery } from '../role/role.query';
import { SessionStore } from './session.store';

@Injectable({
  providedIn: 'root'
})
export class SessionQuery extends Query<IUserInfoViewModel> {

  isNewTokenReceived$ = this.select((state) => state.IsNewTokenReceived);
  IsProfileComplete$ = this.select((state) => state.IsProfileComplete);
  IsSignupUser$ = this.select((state) => state.IsSignupUser);
  SignupClient$ = this.select((state) => state.Clients.find(x => x.IsSignupUserForClient));
  user$ = this.select((state) => state);
  allClients$ = this.select((state) => state.Clients);
  activeClient$ = this.select((state) => state.ActiveClient);
  templateReferenceId$ = this.select((state) => state.TemplateReferenceId);
  fetchUpdatedUserInfo$ = this.select(state => state.FetchUpdatedUserInfo);
  fetchingUpdatedUserAndAppInfo$ = this.select(state => state.FetchingUpdatedUserAndAppInfo);

  constructor(protected store: SessionStore, private roleQuery: RoleQuery) {
    super(store);
  }

  getUser() {
    return this.getValue();
  }

  getClients() {
    return this.getValue().Clients;
  }

  getActiveClient() {
    return this.getValue().ActiveClient;
  }

  getClientSubscription(clientId: number) {
    let subscription = <ISubscriptionViewModel>{};
    const client = this.getValue().Clients.find(x => x.Id === clientId);
    if (client && client.Id) {
      subscription = client.Subscription;
    }
    return subscription;
  }

  clientHasValidSubscription(clientId: number): boolean {
    let hasValidSubscription = false;
    const client = this.getValue().Clients.find(x => x.Id === clientId);
    if (client && client.Id) {
      hasValidSubscription = client.HasValidSubscription;
    }
    return hasValidSubscription;
  }

  isProfileComplete() {
    return toBoolean(this.getValue().IsProfileComplete);
  }

  isValidSubscription() {
    return toBoolean(this.getValue().IsValidSubscription);
  }

  isSignUpUser() {
    return toBoolean(this.getValue().IsSignupUser);
  }

  getTemplateReferenceId() {
    return this.getValue().TemplateReferenceId;
  }

  getSignupStatusForTemplateUser() {
    return this.getValue().SignupStatusForTemplateUser;
  }

  getIsSignupForbiddenForTemplateUser() {
    return this.getValue().IsSignupForbiddenForTemplateUser;
  }

  getReferalCodeForTemplate() {
    return this.getValue().ReferalCodeForTemplate;
  }

  getDefaultUser() {
    return this.getValue().IsDefaultUser;
  }

  getUserDetailsFetchDateTime() {
    return this.getValue().UserDetailsFetchDateTime;
  }

  getSignupClientsSubscription() {
    if (this.getValue().IsSignupUser && this.getValue().Email) {
      let subscription = <ISubscriptionViewModel>{};
      const client = this.getValue().Clients.find(x => x.ClientEmail === this.getValue().Email);
      if (client && client.Subscription) {
        subscription = client.Subscription;
      }

      return subscription;
    }
    else {
      return null;
    }
  }

  getSignupClient() {
    let signupClient = <IClientViewModel>{};
    const isSignupUser = this.getValue()?.IsSignupUser;
    const userEmail = this.getValue()?.Email;
    //first check current user is signup user or not and has valid email
    if (isSignupUser && userEmail?.trim()) {
      //find the client with same email
      const client = this.getValue().Clients.find(x => x.ClientEmail === userEmail);
      if (client && client.Id) {
        signupClient = client;
      }
    }
    return signupClient;
  }

  getMarketPlaceClientId(): number {
    if (this.getValue().Email) {
      const marketPlaceClient = <IClientViewModel>{};
      const client = this.getValue().Clients.find(x => x.ClientEmail === this.getValue().Email);
      if (client) {
        return client.Id;
      }
      else {
        if (this.getValue().Clients && this.getValue().Clients.length)
          return this.getValue().Clients[0].Id;
      }
      return marketPlaceClient.Id;
    }
    else {
      return -1;
    }
  }

  getRoutingDetailForClient(clientId: number): IRoutingDetailViewModel {
    let routingDetailForClient = <IRoutingDetailViewModel>{};
    //if clientId is string then convert to number
    if (isString(clientId)) {
      clientId = Number(clientId);
    }
    const client = this.getValue().Clients.find(x => x.Id === clientId);
    if (client && client.RoutingDetailForClient) {
      routingDetailForClient = client.RoutingDetailForClient;
    }
    return routingDetailForClient;
  }

  getFetchingUpdatedUserAndAppInfoState(): boolean {
    return this.getValue().FetchingUpdatedUserAndAppInfo;
  }

  getUserLocationInString(): string {
    const lat = this.getValue().Latitude ? this.getValue().Latitude : 0;
    const long = this.getValue().Longitude ? this.getValue().Longitude : 0;
    return '' + lat + ',' + long + '';
  }

}
