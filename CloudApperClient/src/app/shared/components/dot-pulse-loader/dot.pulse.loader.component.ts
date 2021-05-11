import { Component, Input, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';


@Component({
  selector: 'app-dot-pulse-loader',
  templateUrl: './dot.pulse.loader.component.html',
  styleUrls: ['./dot.pulse.loader.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DotPulseLoaderComponent implements OnInit, OnDestroy {

  @Input()
  IsAsync: boolean;

  @Input()
  IsLoading$?: Observable<boolean>;

  @Input()
  IsLoading?: boolean;

  private _color?: string;
  @Input()
  set color(color: string) {
    this._color = color;
    if (this._color) {
      document.documentElement.style.setProperty('--dot-pulse-loader-color', color);
    }
  }

  get color(): string {
    return this._color;
  }


  @Input() isRelative ?: boolean;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
