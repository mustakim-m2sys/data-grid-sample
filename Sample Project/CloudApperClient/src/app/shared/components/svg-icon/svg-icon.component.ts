import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit } from '@angular/core';
import { SvgIconEnum } from '@CloudApperClients/app-model';

@Component({
  selector: 'app-svg-icon',
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgIconComponent implements OnInit {

  @Input()
  set name(icon: SvgIconEnum) {
    if (icon) {
      this.element.nativeElement.innerHTML = icon;
    }
  }

  constructor(private element: ElementRef) { }

  ngOnInit() {
  }

}
