import { Injectable } from '@angular/core';
import { UIStore } from '../states';
import { TranslocoService } from '@ngneat/transloco';
import { applyTransaction } from '@datorama/akita';



@Injectable({ providedIn: "root" })
export class GlobalLoaderService {
  defaultLoaderTextkey = 'Please wait...';

  constructor(private uiStore: UIStore, private translocoService: TranslocoService) {

  }

  public startLoader(loaderText?: string, showIconOnly?: boolean) {
    applyTransaction(() => {
      this.uiStore.setGlobalLoaderVisible(true);
      this.uiStore.setGlobalLoaderIconOnly(showIconOnly);
      if (showIconOnly) {
        //set empty text if we need to show only the icon
        this.uiStore.setGlobalLoaderText("");
        //update the css vars for global loader
        this.updateCssVarsForGlobalLoader('none', '40px', '40px');
      } else {
        //set the text
        this.uiStore.setGlobalLoaderText(loaderText && loaderText.trim() ? loaderText : this.translocoService.translate(this.defaultLoaderTextkey));
        //update the css vars for global loader
        this.updateCssVarsForGlobalLoader('block', '32px', '32px');
      }
    });
  }

  public stopLoader() {
    applyTransaction(() => {
      //set the loader flag to false
      this.uiStore.setGlobalLoaderVisible(false);
      //set the text
      this.uiStore.setGlobalLoaderText(this.translocoService.translate(this.defaultLoaderTextkey));
      //update the css vars for global loader
      this.updateCssVarsForGlobalLoader('block', '32px', '32px');
    });
  }

  private updateCssVarsForGlobalLoader(loaderTextDisplay: string, loaderIconHeight: string, loaderIconwidth: string) {
    //set message display css var
    document.documentElement.style.setProperty('--global-loader-text-display', loaderTextDisplay);
    //set load icon height,width css var
    document.documentElement.style.setProperty('--global-loader-icon-height', loaderIconHeight);
    document.documentElement.style.setProperty('--global-loader-text-width', loaderIconwidth);
  }
}
