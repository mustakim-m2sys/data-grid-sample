import { Directive, HostBinding, HostListener, Input } from '@angular/core';

// Displays a fallback image in case image load error e.g. 404
@Directive({
  selector: '[appFallbackImage]'
})
export class FallbackImageDirective {

  @Input() appFallbackImage = '../../../assets/img/error-image.svg';
  constructor() { }

  @HostListener('error')
  onError() {
    this.src = this.appFallbackImage;
  }

  @HostBinding('src')
  @Input()
  src: string;

}
