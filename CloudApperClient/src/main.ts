import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { IndexedDbNameConstants } from '@CloudApperClients/app-model';
import { akitaConfig, enableAkitaProdMode, persistState } from '@datorama/akita';
import * as localForage from 'localforage';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production || environment.dev) {
  enableProdMode();
  enableAkitaProdMode();
}

//local storage driver config
localForage.config({
  driver: [
    localForage.INDEXEDDB,
    localForage.LOCALSTORAGE, //falback db
    localForage.WEBSQL //falback db
  ],
  name: IndexedDbNameConstants.CloudApperClientDB,
  version: 1,
  storeName: 'akita_local_state'
});


//for persistant state  after page reload in akita
export const akitaPersistStorage = persistState({
  storage: localForage
});

//for resetting akita stores
akitaConfig({
  resettable: true
});

const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);
bootstrap().catch(err => console.log(err));
