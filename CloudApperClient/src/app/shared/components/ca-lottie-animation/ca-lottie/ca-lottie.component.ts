import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Lottiepath } from 'CloudApperClient/src/assets/lottie-path/lottiepath';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-ca-lottie',
  templateUrl: './ca-lottie.component.html',
  styleUrls: ['./ca-lottie.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CALottieComponent implements OnInit {
  options: AnimationOptions;

  @Input() height?: string;
  @Input() width?: string;
  @Input() message?: string;

  @Input()
  set name(lottieFilePath: string) {
    this.options = {
      path: Lottiepath[lottieFilePath]
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
