import { HttpClient } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import {
  Translation,
  TRANSLOCO_CONFIG,
  TRANSLOCO_LOADER,
  translocoConfig,
  TranslocoLoader,
  TranslocoModule,
} from '@ngneat/transloco';
import { TranslocoMessageFormatModule } from '@ngneat/transloco-messageformat';
import * as Package from '../../../package.json';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private http: HttpClient) { }

  getTranslation(lang: string) {
    //format lang if startswith path slasher
    if (lang.startsWith('/')) { lang = lang.replace('/', ''); }
    const assetVersion = Package?.default?.assetVersion?.trim() ? Package.default.assetVersion : '1.0.0.0';
    //for hmr local build consider the lang file without asset version
    if (environment.hmr || environment.local) {
      return this.http.get<Translation>(`../assets/i18n/${lang}.json`);
    } else {
      return this.http.get<Translation>(`../assets/i18n/${assetVersion}_${lang}.json`);
    }
  }
}

@NgModule({
  imports: [TranslocoMessageFormatModule.init({
    locales: ['en']
  })],
  exports: [TranslocoModule],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: [{ "id": "en", "label": "English" }],
        defaultLang: 'en',
        fallbackLang: 'en',
        missingHandler: {
          useFallbackTranslation: true
        },
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        failedRetries: 1,
        prodMode: environment.production || environment.dev,
        flatten: {
          aot: environment.production || environment.dev
        }
      })
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader }
  ]
})
export class TranslocoRootModule { }