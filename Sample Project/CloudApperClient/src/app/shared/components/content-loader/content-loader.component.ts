import { ChangeDetectionStrategy, Component, OnInit, Input, HostListener } from '@angular/core';
import {
  EnumChartType
} from '@CloudApperClients/app-model';
@Component({
  selector: 'app-content-loader',
  templateUrl: './content-loader.component.html',
  styleUrls: ['./content-loader.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomContentLoaderComponent implements OnInit {

  chartTypeEnum = EnumChartType;

  @Input()
  name: EnumChartType;

  @Input()
  height: number;

  @Input()
  width: number;

  viewBox = '0 0 150 100';
  style: {};
  primaryColor = '#ddddddc9'

  constructor() { }

  ngOnInit() {
    this.initChartStyle();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    //re-init chart height and width
    this.initChartStyle();
  }

  initChartStyle() {
    this.viewBox = `0 0 ${this.width} ${this.height}`
    this.style = { height: `${this.height}`, width: `${this.width}` }
  }

}
