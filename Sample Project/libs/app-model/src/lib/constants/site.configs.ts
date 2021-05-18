export interface IAppConfig {
  env: string;
  version: string;
  assetVersion: string;
  appBaseUrl: string;
  designAppUrl: string;
  vemioBaseUrl: string;
  contactUsUrl: string;
  liveChatProviderUrl: string;
  stripeClientKey: string;
  knowledgeBaseUrl: string;
  apiConfigs: IApiConfigs;
  languages: ILanguageConfig[];
  recordSavingToLocalStateIsAllowed: boolean;
  oidcIdentityServerConfig: IOidcIdentityServerConfig;
}

export interface IAppEnvConfig {
  env: string;
  appBaseUrl: string;
  designAppUrl: string;
  vemioBaseUrl: string;
  contactUsUrl: string;
  liveChatProviderUrl: string;
  stripeClientKey: string;
  knowledgeBaseUrl: string;
  apiBaseUrl: string;
  apiVersion: string;
  paymentApiUrl: string;
  paymentApiVersion: string;
  iconRepoApiUrl: string;
  iconRepoApiVersion: string;
  marketplaceApiUrl: string;
  marketplaceApiVersion: string;
  accountServerApiUrl: string;
  accountServerApiVersion: string;
  recordSavingToLocalStateIsAllowed: string;
  stsAuthority: string;
  clientId: string;
  postLoginRedirectUri: string;
  postLogoutRedirectUri: string;
  scope: string;
  responseType: string;
  silentRedirectUri: string;
  reportApiUrl : string;
  reportApiVersion: string;
}

export interface IApiConfigs {
  apiBaseUrl: string;
  apiVersion: string;
  paymentApiUrl: string;
  paymentApiVersion: string;
  iconRepoApiUrl: string;
  iconRepoApiVersion: string;
  marketplaceApiUrl: string;
  marketplaceApiVersion: string;
  accountServerApiUrl: string;
  accountServerApiVersion: string;
  reportApiUrl : string;
  reportApiVersion: string;
}

export interface ILanguageConfig {
  id: string;
  label: string;
  isDefault: boolean;
}

export interface IOidcIdentityServerConfig {
  stsAuthority: string;
  clientId: string;
  postLoginRedirectUri: string;
  postLogoutRedirectUri: string;
  scope: string;
  responseType: string;
  silentRedirectUri: string;
}

export class AppConfigFieldConstant {
  public static readonly RECORD_SAVING_TO_LOCAL_STATE_IS_ALLOWED = 'recordSavingToLocalStateIsAllowed';
  public static readonly API_CONFIGS = 'apiConfigs';
  public static readonly OIDC_IDENTITY_SERVER_CONFIG = 'oidcIdentityServerConfig';
}