import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
@Pipe({
    name: 'EnumKeyWithLanguage',
    pure: true
})
export class EnumKeyWithLanguagePipe implements PipeTransform {
    constructor(private translocoService: TranslocoService) { }
    public transform(value: number | string, EnumData: object) {
        // getting key name of enum from value
        const obj = Object.keys(EnumData).find(key => EnumData[key] === value)
        // returning key name in translated form
        if (obj) {
            return this.translocoService.translate(obj);
        } else {
            return this.translocoService.translate('Unknown');
        }
    }
}
