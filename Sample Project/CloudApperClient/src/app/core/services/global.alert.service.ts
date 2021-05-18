import { Injectable } from '@angular/core';
import { IGlobalAlertLoaderParams, IGlobalAlertParams } from '@CloudApperClients/app-model';
import { HotToastService } from '@ngneat/hot-toast';
import { TranslocoService } from '@ngneat/transloco';


@Injectable({ providedIn: "root" })
export class GlobalAlertService {
  defaultLoaderTextkey = 'Please wait...';

  constructor(private toastService: HotToastService, private translocoService: TranslocoService) {
    //overriding default styles
    const style = {};
    style['max-width'] = "35%";
    style['color'] = "#343a40eb";
    style['box-shadow'] = "var(--hot-toast-shadow,0 3px 10px rgba(0,0,0,.1),0 3px 3px rgb(0 0 0 / 20%))";
    this.toastService.defaultConfig.style = style;
  }

  public info({ messagekey, translationOptions, currentlang, isFromSidebar, timeOutDurationInMs }: IGlobalAlertParams) {
    this.toastService.show(this.translocoService.translate(messagekey, translationOptions, currentlang), {
      icon: '🔔'
    });
  }

  public success({ messagekey, translationOptions, currentlang, isFromSidebar, timeOutDurationInMs }: IGlobalAlertParams) {
    this.toastService.success(this.translocoService.translate(messagekey, translationOptions, currentlang));
  }

  public error({ messagekey, translationOptions, currentlang, isFromSidebar, timeOutDurationInMs }: IGlobalAlertParams) {
    this.toastService.error(this.translocoService.translate(messagekey, translationOptions, currentlang));
  }

  public warning({ messagekey, translationOptions, currentlang, isFromSidebar, timeOutDurationInMs }: IGlobalAlertParams) {
    this.toastService.warning(this.translocoService.translate(messagekey, translationOptions, currentlang));
  }

  public asyncLoader$(loadingMessageParams: IGlobalAlertLoaderParams, successMessageParams: IGlobalAlertLoaderParams, errorMessageParams: IGlobalAlertLoaderParams) {
    return this.toastService.observe({
      loading: this.translocoService.translate(loadingMessageParams.messagekey, loadingMessageParams.translationOptions, loadingMessageParams.currentlang),
      success: this.translocoService.translate(successMessageParams.messagekey, successMessageParams.translationOptions, successMessageParams.currentlang),
      error: this.translocoService.translate(errorMessageParams.messagekey, errorMessageParams.translationOptions, errorMessageParams.currentlang)
    });
  }

  public minLoader(loadingMessageParams?: IGlobalAlertLoaderParams) {
    return this.toastService.loading(this.translocoService.translate(loadingMessageParams?.messagekey ? loadingMessageParams.messagekey : this.defaultLoaderTextkey,
      loadingMessageParams?.translationOptions, loadingMessageParams?.currentlang), {
      autoClose: false,
      iconTheme: {
        primary: '#03a9f4',
        secondary: '#FFFAEE',
      }
    });
  }
}
