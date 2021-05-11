import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IInlineMinLoaderConfig, InlineMinLoaderOperationType } from '@CloudApperClients/app-model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';


@Component({
  selector: 'app-inline-min-loader',
  templateUrl: './inline.min.loader.component.html',
  styleUrls: ['./inline.min.loader.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InlineMinLoaderComponent implements OnInit, OnDestroy {

  //#region component variables
  showLoader$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  operationType$: BehaviorSubject<InlineMinLoaderOperationType> = new BehaviorSubject<InlineMinLoaderOperationType>(InlineMinLoaderOperationType.None);
  showLoadingIcon$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true); //by default show loading icon
  get EnumOperationType() { return InlineMinLoaderOperationType; }
  //#endregion

  //#region input fields
  private _inlineMinLoaderConfig: IInlineMinLoaderConfig;
  @Input()
  set inlineMinLoaderConfig(inlineMinLoaderConfig: IInlineMinLoaderConfig) {
    this._inlineMinLoaderConfig = inlineMinLoaderConfig;
    if (inlineMinLoaderConfig) {
      //emit template variables
      this.showLoader$.next(inlineMinLoaderConfig?.showLoader);
      this.operationType$.next(inlineMinLoaderConfig?.operationType);
      /*if opertion is saved/updated/deleted then show checked icon and then hide it automatically after a delay
      else always show loading icon*/
      if ([InlineMinLoaderOperationType.Saved, InlineMinLoaderOperationType.Updated, InlineMinLoaderOperationType.Deleted].includes(inlineMinLoaderConfig?.operationType)) {
        this.showLoadingIcon$.next(false);
        setTimeout(() => {
          this.showLoader$.next(false);
          this.operationType$.next(InlineMinLoaderOperationType.None);
        }, 5000);
      } else {
        this.showLoadingIcon$.next(true);
      }
    }
  }
  get inlineMinLoaderConfig(): IInlineMinLoaderConfig {
    return this._inlineMinLoaderConfig;
  }
  //#endregion

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
