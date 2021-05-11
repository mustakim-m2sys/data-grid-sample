import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { UIQuery } from 'CloudApperClient/src/app/core/states';

@Component({
  selector: "app-global-loader",
  templateUrl: "./global.loader.component.html",
  styleUrls: ["./global.loader.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlobalLoaderComponent {

  constructor(public uiQuery: UIQuery) {
  }

}
