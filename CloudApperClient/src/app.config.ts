import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AppConfigFieldConstant,
  IApiConfigs,
  IAppConfig,
  IAppEnvConfig,
  IOidcIdentityServerConfig,
} from '@CloudApperClients/app-model';
import { toBoolean } from '@datorama/akita';

import * as Package from '../../package.json';
import { environment } from './environments/environment';

@Injectable()
export class AppConfig {
  static settings: IAppConfig;
  constructor(private http: HttpClient) { }
  load() {
    let environmentName = "local";
    if (environment.production) {
      environmentName = "prod";
    } else if (environment.dev) {
      environmentName = "dev";
    } else if (environment.hmr || environment.local) {
      environmentName = "local";
    }
    //find the asset version from package json
    const assetVersion = Package?.default?.assetVersion?.trim() ? Package.default.assetVersion : '1.0.0.0';
    let jsonFile = "";
    //for hmr local build consider the config file without asset version
    if (environment.hmr || environment.local) {
      jsonFile = `./assets/config/config.${environmentName}.json`;
    } else {
      jsonFile = `./assets/config/${assetVersion}_config.${environmentName}.json`;
    }
    const envJsonFile = `./assets/config/config.env.json`;
    return new Promise<void>((resolve, reject) => {
      this.http.get(jsonFile).toPromise().then((response: IAppConfig) => {
        const settings = <IAppConfig>response;
        //load env json file
        return new Promise<void>((envResolve, envReject) => {
          this.http.get(envJsonFile).toPromise().then((envResponse: IAppEnvConfig) => {
            const envSettings = <IAppEnvConfig>envResponse;
            //map json settings to AppConfig settings
            AppConfig.settings = <IAppConfig>{};
            //set version number from pacakge json
            AppConfig.settings.version = environment?.projectVersion?.trim() ? environment.projectVersion : '1.0.0.0';
            AppConfig.settings.assetVersion = assetVersion;
            AppConfig.settings.apiConfigs = <IApiConfigs>{};
            AppConfig.settings.oidcIdentityServerConfig = <IOidcIdentityServerConfig>{};
            //iterate every property of settings and search that in envSettings ..
            for (const prop in settings) {
              //if property found in envSettings,use that or use from original settings
              if (envSettings[prop] && envSettings[prop].trim()) { //as al values in envSettings search for empty string
                if (prop === AppConfigFieldConstant.RECORD_SAVING_TO_LOCAL_STATE_IS_ALLOWED) {
                  AppConfig.settings[prop] = toBoolean(envSettings[prop]);
                } else {
                  AppConfig.settings[prop] = envSettings[prop];
                }
              } else if (prop === AppConfigFieldConstant.API_CONFIGS && settings[prop]) {
                //iterate apiConfigs object
                const apiConfigs = settings[prop];
                for (const propApiConfig in apiConfigs) {
                  //if property found in envSettings,use that or use from original settings
                  if (envSettings[propApiConfig] && envSettings[propApiConfig].trim()) { //as al values in envSettings search for empty string
                    AppConfig.settings.apiConfigs[propApiConfig] = envSettings[propApiConfig];
                  } else {
                    AppConfig.settings.apiConfigs[propApiConfig] = apiConfigs[propApiConfig];
                  }
                }
              } else if (prop === AppConfigFieldConstant.OIDC_IDENTITY_SERVER_CONFIG && settings[prop]) {
                //iterate apiConfigs object
                const oidcIdentityServerConfig = settings[prop];
                for (const propIdentityServerConfig in oidcIdentityServerConfig) {
                  //if property found in envSettings,use that or use from original settings
                  if (envSettings[propIdentityServerConfig] && envSettings[propIdentityServerConfig].trim()) { //as al values in envSettings search for empty string
                    AppConfig.settings.oidcIdentityServerConfig[propIdentityServerConfig] = envSettings[propIdentityServerConfig];
                  } else {
                    AppConfig.settings.oidcIdentityServerConfig[propIdentityServerConfig] = oidcIdentityServerConfig[propIdentityServerConfig];
                  }
                }
              } else {
                if (prop === AppConfigFieldConstant.RECORD_SAVING_TO_LOCAL_STATE_IS_ALLOWED) {
                  AppConfig.settings[prop] = toBoolean(settings[prop]);
                } else {
                  AppConfig.settings[prop] = settings[prop];
                }
              }
            }
            resolve();
          }).catch((envResponse: any) => {
            reject(`Could not load file '${envJsonFile}': ${JSON.stringify(envResponse)}`);
          });
        });
      }).catch((response: any) => {
        reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
      });
    });
  }
}

