import { formatDate } from '@angular/common';
import { isString } from 'lodash';
import * as moment from 'moment';
import * as momentTimeZone from 'moment-timezone';

export function convertDateToSolrDate(date: string | number | Date): string {
    return formatDate(date, 'yyyy-MM-dd' + 'T' + 'HH:mm:ss', 'en') + 'Z';
}

export function replaceDateSecondMiliSecondWithZero(date: string): string {
    const dateFragments = date.split("T");
    if (dateFragments && dateFragments.length) {
        date = dateFragments[0] + "T00:00:00Z";
    }
    return date;
}

export function formatTimeToDateTimeStringLocal(timeString: string): string {
    const time = moment(timeString, 'hh:mm:ss a').format('HH:mm:ss');
    const dateTime = '1111-11-11T' + time; //without Z as time is considered as always local
    return dateTime;
}

export function formatDateTimeToTimeStringLocal(dateTimeString: string): string {
    dateTimeString = dateTimeString.replace('Z', '').replace('T', ' ');
    const time = moment(dateTimeString, 'YYYY-MM-DD HH:mm:ss').format('hh:mm:ss a');  // YYYY-MM-DD in moment is 2020-05-31
    return time;
}

// export function formatSolrDateToFullDateStringLocal(dateString: string, isUTCTime: boolean): string {
//     let fullDateStringLocal = "";
//     if (dateString?.trim()) {
//         //remove z from date string to convert it to local date
//         const date: Date = new Date(isUTCTime ? dateString : dateString.replace('Z', ''));
//         const formatOptions = { year: 'numeric', month: 'short', day: '2-digit' };
//         fullDateStringLocal = date.toLocaleString("en-US", formatOptions);
//     }
//     return fullDateStringLocal;
// }


// export function formatSolrDateTimeToFullDateTimeStringLocal(dateTimeString: string, isUTCTime: boolean): string {
//     let fullDateTimeStringLocal = "";
//     if (dateTimeString?.trim()) {
//         //remove z from date string to convert it to local date
//         const date: Date = new Date(isUTCTime ? dateTimeString : dateTimeString.replace('Z', ''));
//         const formatOptions = { year: 'numeric', month: 'short', day: '2-digit', hour: "2-digit", minute: "2-digit", hour12: true };
//         fullDateTimeStringLocal = date.toLocaleString("en-US", formatOptions);
//     }
//     return fullDateTimeStringLocal;
// }

export function formatDateTimeStringLocal(dateTimeString: string): string {
    dateTimeString = dateTimeString.replace('Z', ''); //without Z data grid will consider it as local
    return dateTimeString;
}

export function formatUtcDateTimeStringLocal(dateTimeString: string): string {
    dateTimeString = moment.utc(dateTimeString).local().format('YYYY-MM-DD HH:mm:ss');
    return dateTimeString;
}

export function formatLocalDateTimeStringToUtc(dateTimeString: string): string {
    dateTimeString = moment(dateTimeString, "YYYY-MM-DDTHH:mm:ss").utc().format();
    return dateTimeString;
}

export function getCurrentTimeAsDateTimeStringLocal(): string {
    const currentTime = moment().format('hh:mm:ss a');
    const dateTimeString = formatTimeToDateTimeStringLocal(currentTime);
    return dateTimeString;
}

export function getCurrentDateTimeStringUTC(): string {
    const currentdateTime = moment().toISOString();
    return currentdateTime;
}

export function getCurrentDateTimeStringLocal(): string {
    let currentdateTime = "";
    const currentdate = moment().format("YYYY-MM-DD");
    const currentTime = moment().format("HH:mm:ss");
    currentdateTime = currentdate + "T" + currentTime;
    return currentdateTime;
}

export function convertSchedulerDateTimeToDateTimeStringUTC(dateTime: Date | string): string {
    let convertedDatetimeStringUtc = "";
    if (dateTime && dateTime instanceof Date) {
        convertedDatetimeStringUtc = dateTime.toISOString();
    } else if (dateTime && isString(dateTime)) {
        const dateTimeObj = new Date(dateTime);
        convertedDatetimeStringUtc = dateTimeObj.toISOString();
    }
    return convertedDatetimeStringUtc;
}

export function convertDateTimeToSchedulerDateTimeFormat(dateTime: string): string {
    if (dateTime) {
        dateTime = dateTime.replace(/\-/g, '');
        dateTime = dateTime.replace(/\:/g, '');
        dateTime = dateTime.replace(/\./g, '');
    }
    return dateTime;
}

export function formatDateTimeToDateObject(dateTimeString: string, isUTCTime: boolean): Date {
    let date: Date;
    if (dateTimeString?.trim()) {
        /*if utc enabled then date time string must ends with Z
        else if utc is not enabled then date time string must not ends with Z*/
        if (isUTCTime) {
            if (!dateTimeString.endsWith('Z')) dateTimeString = dateTimeString + 'Z';
        } else {
            if (dateTimeString.endsWith('Z')) dateTimeString = dateTimeString.replace(/Z/g, '');
        }
        date = new Date(dateTimeString);
    }
    return date;
}

export function isDateTimeStringsEqualUptoMinutes(firstDateTimeString, secondDateTimeString): boolean {
    let dateTimeStringsEqual = false;
    if (firstDateTimeString && secondDateTimeString) {
        const firstDateTimeStringInDate = new Date(firstDateTimeString);
        const secondDateTimeStringInDate = new Date(secondDateTimeString);
        if (firstDateTimeStringInDate.getFullYear() === secondDateTimeStringInDate.getFullYear() &&
            firstDateTimeStringInDate.getMonth() === secondDateTimeStringInDate.getMonth() &&
            firstDateTimeStringInDate.getDate() === secondDateTimeStringInDate.getDate() &&
            firstDateTimeStringInDate.getHours() === secondDateTimeStringInDate.getHours() &&
            firstDateTimeStringInDate.getMinutes() === secondDateTimeStringInDate.getMinutes()) {
            dateTimeStringsEqual = true;
        }
        return dateTimeStringsEqual;
    }
}

//#region date time helper for date time between a range
export function getCurrentDateTimeString(isUtc: boolean): string {
    const currentdateTime = isUtc ? moment().toISOString() : convertDateToSolrDate(moment().toLocaleString());
    return currentdateTime;
}

export function getMonthDateRange(year: number, month: number, isUtc: boolean): {
    startDate: string;
    endDate: string;
} {
    //month in moment is 0 based, so 9 is actually october, subtract 1 to compensate
    const startDateM = moment([year, month - 1]);
    const endDateM = moment(startDateM).endOf('month');
    const startDateString = isUtc ? startDateM.toISOString() : convertDateToSolrDate(startDateM.toLocaleString());
    const endDateString = isUtc ? endDateM.toISOString() : convertDateToSolrDate(endDateM.toLocaleString());
    return { startDate: startDateString, endDate: endDateString };
}

export function getMonthDateRangeFromDateString(date: string, isUtc: boolean): {
    startDate: string;
    endDate: string;
} {
    const startDateM = moment(date).startOf('month');
    const endDateM = moment(date).endOf('month');
    const startDateString = isUtc ? startDateM.toISOString() : convertDateToSolrDate(startDateM.toLocaleString());
    const endDateString = isUtc ? endDateM.toISOString() : convertDateToSolrDate(endDateM.toLocaleString());
    return { startDate: startDateString, endDate: endDateString };
}

export function getCurrentMonthStartDateTimeString(isUtc: boolean): string {
    const startOfMonth = isUtc ? moment().startOf('month').toISOString() : convertDateToSolrDate(moment().startOf('month').toLocaleString());
    return startOfMonth;
}

export function getCurrentMonthEndDateTimeString(isUtc: boolean): string {
    const endOfMonth = isUtc ? moment().endOf('month').toISOString() : convertDateToSolrDate(moment().endOf('month').toLocaleString());
    return endOfMonth;
}

export function getCurrentYearStartDateTimeString(isUtc: boolean): string {
    const startOfYear = isUtc ? moment().startOf('year').toISOString() : convertDateToSolrDate(moment().startOf('year').toLocaleString());
    return startOfYear;
}

export function getCurrentYearEndDateTimeString(isUtc: boolean): string {
    const endOfYear = isUtc ? moment().endOf('year').toISOString() : convertDateToSolrDate(moment().endOf('year').toLocaleString());
    return endOfYear;
}

export function getCurrentDayStartDateTimeString(isUtc: boolean): string {
    const startOfDay = isUtc ? moment().startOf('day').toISOString() : convertDateToSolrDate(moment().startOf('day').toLocaleString());
    return startOfDay;
}

export function getCurrentDayEndDateTimeString(isUtc: boolean): string {
    const endOfDay = isUtc ? moment().endOf('day').toISOString() : convertDateToSolrDate(moment().endOf('day').toLocaleString());
    return endOfDay;
}

export function getCurrentHourStartDateTimeString(isUtc: boolean): string {
    const startOfHour = isUtc ? moment().startOf('hour').toISOString() : convertDateToSolrDate(moment().startOf('hour').toLocaleString());
    return startOfHour;
}

export function getCurrentHourEndDateTimeString(isUtc: boolean): string {
    const endOfDay = isUtc ? moment().endOf('hour').toISOString() : convertDateToSolrDate(moment().endOf('hour').toLocaleString());
    return endOfDay;
}

export function getGivenDateStartDateTimeString(dateTimeString: string, isUtc: boolean): string {
    const startOfDay = isUtc ? moment(dateTimeString).startOf('day').toISOString() : convertDateToSolrDate(moment(dateTimeString).startOf('day').toLocaleString());
    return startOfDay;
}

export function getCurrentTimeZoneName(): string {
    return momentTimeZone?.tz?.guess?.();
}
//#endregion