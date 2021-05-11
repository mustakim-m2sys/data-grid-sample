import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
@Pipe({
    name: 'NameParser',
    pure: true
})
export class NameParserPipe implements PipeTransform {
    constructor(private translocoService: TranslocoService) { }
    public transform(value: string, dataList: [], setting: { from: string, to: string }, prefix?: string, postfix?: string) {
        // getting 'from'  -> 'to' with a list
        const obj: any = dataList.find((data: any) => data[setting.from] === value);
        if (obj) {
            let result = obj[setting.to];
            if (prefix?.trim()) {
                result = prefix + ' ' + result;
            }
            if (postfix?.trim()) {
                result = result + ' ' + postfix;
            }
            return result;
        } else {
            return this.translocoService.translate('Unknown')
        }
    }
}
