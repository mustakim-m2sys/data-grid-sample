import { Pipe, PipeTransform } from '@angular/core';
import { RRule, Options } from 'rrule';

@Pipe({
    name: 'parseRRuleText'
})
export class RRuleTextPipe implements PipeTransform {
    constructor() { }
    public transform(value: string): string {
        let rRuleText = "";
        const rRuleOptions: Partial<Options> = RRule.parseString(value);
        if (rRuleOptions) {
            const text = new RRule(rRuleOptions)?.toText();
            if (text) {
                //making first character capital
                rRuleText = text.charAt(0).toUpperCase() + text.substring(1);
            }
        }
        return rRuleText;
    }
}
