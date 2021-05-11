import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import * as moment from 'moment';
import { formatUtcDateTimeStringLocal } from '../../core/helpers';

@Pipe({
    name: 'formatDateStringDuration'
})
export class DateStringDurationFormatterPipe implements PipeTransform {

    constructor(private translocoService: TranslocoService) { }

    public transform(dateStr: string, isConvertToLocal?: boolean) {
        let result = '';
        const now: any = new Date();
        let value: Date;

        // converting to local if the time is in UTC 0
        if (isConvertToLocal) {
            dateStr = formatUtcDateTimeStringLocal(dateStr);
        }
        // checking if value is text field
        value = new Date(dateStr);

        //calculate difference in milliseconds
        let diffInMilliSeconds = Math.abs(<any>value - now) / 1000;

        // calculate days
        const days = Math.floor(diffInMilliSeconds / 86400);
        diffInMilliSeconds -= days * 86400;

        // calculate months
        const months = Math.floor(days / 31);

        // calculate years
        const years = Math.floor(months / 12);

        //show result in years
        if (years > 0) {
            if (years === 1) {
                result = this.translocoService.translate("YEARAGO", { data: years });
            }
            else {
                result = this.translocoService.translate("YEARSAGO", { data: years });
            }
        }
        //show result in months or days or hours or minutes
        else {
            //show result in months
            if (months > 0) {
                if (months === 1) {
                    result = this.translocoService.translate("MONTHAGO", { data: months });
                }
                else {
                    result = this.translocoService.translate("MONTHSAGO", { data: months });
                }
            }
            //show result in days or hours or minutes
            else {
                //show result in days
                if (days > 0) {
                    if (days === 1) {
                        result = this.translocoService.translate("DAYAGO", { data: days });
                    }
                    else {
                        result = this.translocoService.translate("DAYSAGO", { data: days });
                    }
                }
                //show result in hours or minutes
                else {
                    // calculate hours
                    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
                    diffInMilliSeconds -= hours * 3600;

                    //show result in hours
                    if (hours > 0) {
                        if (hours === 1) {
                            result = this.translocoService.translate("HOURAGO", { data: hours });
                        }
                        else {
                            result = this.translocoService.translate("HOURSAGO", { data: hours });
                        }
                    }
                    //show result in minutes
                    else {
                        // calculate minutes
                        const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
                        diffInMilliSeconds -= minutes * 60;

                        if (minutes === 0 || minutes === 1) {
                            result = this.translocoService.translate("JUSTNOW", { data: minutes });
                        }
                        else {
                            result = this.translocoService.translate("MINUTESAGO", { data: minutes });
                        }
                    }
                }
            }
        }
        return result;
    }
}
