import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ILanguageConfig } from '@CloudApperClients/app-model';
import { ErrorModule } from '@CloudApperClients/error-handler';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { HotToastModule } from '@ngneat/hot-toast';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import {
  PERSIST_TRANSLATIONS_STORAGE,
  TranslocoPersistTranslations,
  TranslocoPersistTranslationsModule,
} from '@ngneat/transloco-persist-translations';
import { NgxPubSubModule } from '@pscoped/ngx-pub-sub';
import { OAuthModule } from 'angular-oauth2-oidc';
import { DxAccordionModule, DxButtonGroupModule, DxButtonModule, DxCheckBoxModule, DxDataGridModule, DxDrawerModule, DxDropDownButtonModule, DxFileManagerModule, DxFileUploaderModule, DxGalleryModule, DxListModule, DxLoadIndicatorModule, DxMenuModule, DxPopupModule, DxRadioGroupModule, DxSchedulerModule, DxScrollViewModule, DxSelectBoxModule, DxSortableModule, DxSwitchModule, DxTabPanelModule, DxTagBoxModule, DxTemplateModule, DxTextAreaModule, DxTextBoxModule, DxToolbarModule, DxTooltipModule, DxTreeViewModule, DxValidatorModule } from 'devextreme-angular';
import * as localForage from 'localforage';
import { QrCodeModule } from 'ng-qrcode';
import { RatingModule } from 'ng-starrating';
import { AvatarModule } from 'ngx-avatar';
import { LinkyModule } from 'ngx-linky';

import { AppConfig } from '../app.config';
import { environment } from '../environments/environment';
import { DataGridComponent } from './app-launch/data-grid/data-grid.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { TranslocoHttpLoader, TranslocoRootModule } from './transloco-root.module';

//init app config
export function initializeApp(appConfig: AppConfig, transloco: TranslocoService) {
  return () => appConfig.load().then(() => {
    const availableLangs = AppConfig.settings.languages;
    if (availableLangs && availableLangs.length) {
      //iterate all the available lang and async pre-load
      availableLangs.forEach((lang: ILanguageConfig) => {
        transloco.load(lang.id).toPromise();
      });
    }
  })
}

@NgModule({
  declarations: [AppComponent, DataGridComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ErrorModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    environment.production || environment.dev ? [] : [AkitaNgDevtools.forRoot()],
    AppRoutingModule,
    CoreModule,
    SharedModule,
    TranslocoRootModule,
    TranslocoPersistTranslationsModule.init({
      loader: TranslocoHttpLoader,
      storage: {
        provide: PERSIST_TRANSLATIONS_STORAGE,
        useValue: localForage
      }
    }),
    NgxPubSubModule,
    HotToastModule.forRoot(),

    CommonModule,
    FormsModule,
    TranslocoModule,
    DxDrawerModule,
    DxScrollViewModule,
    DxSortableModule,
    DxDataGridModule,
    DxTabPanelModule,
    DxTemplateModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxTagBoxModule,
    RatingModule,
    DxTooltipModule,
    DxTextAreaModule,
    DxSwitchModule,
    DxListModule,
    DxToolbarModule,
    DxGalleryModule,
    QrCodeModule,
    DxAccordionModule,
    DxButtonModule,
    DxSchedulerModule,
    DxDropDownButtonModule,
    DxFileManagerModule,
    DxPopupModule,
    DxTextBoxModule,
    DxValidatorModule,
    DxTreeViewModule,
    LinkyModule,
    DxFileUploaderModule,
    DxRadioGroupModule,
    DxButtonGroupModule,
    DxMenuModule,
    AvatarModule,
    DxLoadIndicatorModule,
    ContentLoaderModule,
  ],
  exports: [
    SharedModule
  ],
  providers: [
    AppConfig,
    { provide: APP_INITIALIZER, useFactory: initializeApp, deps: [AppConfig, TranslocoService], multi: true },
    TranslocoPersistTranslations,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
