import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Pipe({
  name: 'niceDate'
})
export class NiceDatePipe implements PipeTransform {

  constructor(private translocoService: TranslocoService){}

  public transform(value: string) {
    const _val = Date.parse(value);

    const dif = Math.floor((Date.now() - _val) / 1000 / 86400);

    if (dif === 1) {
      return 'YESTERDAY';
    } else if (dif === 0) {
      return 'TODAY';
    } else {
      return value;
    }
  }
}
