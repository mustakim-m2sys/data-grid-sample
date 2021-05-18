import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SvgContentLoaderEnum } from '@CloudApperClients/app-model';

@Component({
  selector: 'app-content-placeholder-loader',
  templateUrl: './content-placeholder-loader.component.html',
  styleUrls: ['./content-placeholder-loader.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentPlaceholderLoaderComponent implements OnInit {

  //Opt-out of animations with false
  @Input() animate?: boolean; //Defaults to true
  //Required if you're using <base url="/" /> document <head/>. This prop is common used as: <ContentLoader baseUrl={window.location.pathname} /> which will fill the SVG attribute with the relative path.
  @Input() baseUrl?: string; //Defaults to an empty string
  //Animation speed in seconds.
  @Input() speed?: number; //Defaults to 1.2
  //Interval of time between runs of the animation, as a fraction of the animation speed.
  @Input() interval?: number; //Defaults to 0.25
  //Use viewBox props to set a custom viewBox value
  @Input() viewBox?: string; //Defaults to undefined
  //Width of the animated gradient as a fraction of the view box width.
  @Input() gradientRatio?: number; //Defaults to 1.2
  //Content right-to-left.
  @Input() rtl?: boolean; //Defaults to false
  //Used as background of animation.
  @Input() backgroundColor?: string; //Defaults to #f5f6f7
  //Used as the foreground of animation.
  @Input() foregroundColor?: string; //Defaults to #eee
  //Background opacity (0 = transparent, 1 = opaque) used to solve an issue in Safari
  @Input() backgroundOpacity?: number; //Defaults to 1
  //Animation opacity (0 = transparent, 1 = opaque) used to solve an issue in Safari
  @Input() foregroundOpacity?: number; //Defaults to 1

  //@Input() style?: CSSProperties; //Defaults to {}
  @Input() svgFile: SvgContentLoaderEnum;

  svgContentLoaderEnum = SvgContentLoaderEnum;

  constructor() { }

  ngOnInit() {
  }

}
