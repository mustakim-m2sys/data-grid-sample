import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'splitLang'
})
export class LanguageSplitPipe implements PipeTransform {
    transform(input: string): string {
        const langArray = input.split(",");
        if (langArray.length > 2) {
            input = langArray[0] + "," + langArray[1] + " +" + (langArray.length - 2) + " more";
        }
        return input;
    }

}