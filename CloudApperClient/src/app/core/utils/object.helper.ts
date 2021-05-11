import { InternalFieldNameConstant, OAuthLoginRedirectParams, SolrControlNameConstants } from '@CloudApperClients/app-model';
import { guid } from '@datorama/akita';
import { isString } from 'lodash';
import * as JSON_PRO from 'lossless-json';
import * as escapeStringRegexp from 'escape-string-regexp';

export function DeepClone<T>(empty: {} | [], object: T): T {
    return Object.assign(empty, JSON.parse(JSON.stringify(object)));
}

export function IsNullOrUndefined(value: any) {
    return value === null || value === undefined || typeof value === 'undefined';
}

export function GetUnique(value, index, self) {
    return self.indexOf(value) === index;
}

export function HasWhiteSpace(text: string) {
    return /\s/g.test(text);
}

export function ReplaceAll(sourceText: string, searchText: string, replaceText: string) {
    if (sourceText?.trim()) {
        const regex = new RegExp(searchText, "gi");
        sourceText = sourceText.replace(regex, replaceText);
    }
    return sourceText;
}

export function ReplaceMultipleSpacesWithSingleSpace(text: string) {
    return text.replace(/  +/g, ' ');
}

export function ReplaceAllSpacesWithPlus(text: string) {
    text = ReplaceMultipleSpacesWithSingleSpace(text);
    return text.split(' ').join('+');
}

export function NormalizeSpecialCharacters(text: string) {
    let normalizedText = '';
    if (isString(text)) {
        //first replace - with as RegexpDashCharacter delimeter it will be replaced by escapeStringRegexp and need to handle normalization later
        text = text.replace(/\-/g, 'RegexpReservedSpecialCharacterDash');
        normalizedText = escapeStringRegexp(text);
        //manually handle some special sharacters
        normalizedText = normalizedText.replace(/\!/g, '\\\!');
        normalizedText = normalizedText.replace(/"/g, '\\\"');
        normalizedText = normalizedText.replace(/'/g, '\\\'');
        normalizedText = normalizedText.replace(/\#/g, '\\\#');
        normalizedText = normalizedText.replace(/\%/g, '\\\%');
        normalizedText = normalizedText.replace(/\@/g, '\\\@');
        normalizedText = normalizedText.replace(/\&/g, '\\\&');
        normalizedText = normalizedText.replace(/\,/g, '\\\,');
        normalizedText = normalizedText.replace(/\:/g, '\\\:');
        normalizedText = normalizedText.replace(/\;/g, '\\\;');
        normalizedText = normalizedText.replace(/\</g, '\\\<');
        normalizedText = normalizedText.replace(/\>/g, '\\\>');
        normalizedText = normalizedText.replace(/\=/g, '\\\=');
        normalizedText = normalizedText.replace(/\_/g, '\\\_');
        normalizedText = normalizedText.replace(/\`/g, '\\\`');
        normalizedText = normalizedText.replace(/\~/g, '\\\~');
        normalizedText = normalizedText.replace(/\//g, '\\\/');
        //now handle RegexpDashCharacter
        normalizedText = ReplaceAll(normalizedText, 'RegexpReservedSpecialCharacterDash', '\-');
        normalizedText = normalizedText.replace(/\-/g, '\\\-');
    } else {
        normalizedText = text;
    }
    return normalizedText;
}

export function IsValidDate(dateString: string) {
    const dateObject = new Date(dateString);
    return dateObject instanceof Date && !isNaN(dateObject.getTime());
}

export function Get32BitUniqueId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export function GetRandomBetweenTwoNumbers(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function GetIntegerArrayBetweenTwoNumbers(min: number, max: number): number[] {
    const intArrayBetweenTwoNumbers = [];
    for (let i = min; i <= max; i++) {
        intArrayBetweenTwoNumbers.push(i);
    }
    return intArrayBetweenTwoNumbers;
}

export function ReplaceBracketsAtStartEnd(text: string, wrapWithBrackets: boolean): string {
    if (text) {
        text = text.trim();
        //first replace tripple brackets
        const startTBracketCount = (text.match(/\(\(\(/g) || []).length;
        const endTBracketCount = (text.match(/\)\)\)/g) || []).length;
        if (startTBracketCount === 1 && endTBracketCount === 1 && text.startsWith("(((") && text.endsWith(")))")) {
            //only replace the first match
            text = text.replace("(((", "(");
            //only replace the last match
            text = text.substring(0, text.lastIndexOf(')))')) + ")";
        }
        const startDBracketCount = (text.match(/\(\(/g) || []).length;
        const endDBracketCount = (text.match(/\)\)/g) || []).length;
        //then replace double brackets
        if (startDBracketCount === 1 && endDBracketCount === 1 && text.startsWith("((") && text.endsWith("))")) {
            //only replace the first match
            text = text.replace("((", "(");
            //only replace the last match
            text = text.substring(0, text.lastIndexOf('))')) + ")";
        }
        const startSBracketCount = (text.match(/\(/g) || []).length;
        const endSBracketCount = (text.match(/\)/g) || []).length;
        //if not wrapWithBrackets then replace single brackets
        if (!wrapWithBrackets && startSBracketCount === 1 && endSBracketCount === 1 && text.startsWith("(") && text.endsWith(")")) {
            //only replace the first match
            text = text.replace("(", "");
            //only replace the last match
            text = text.substring(0, text.lastIndexOf(')')) + "";
            //trim
            text = text.trim();
        }
        //if wrapWithBrackets then add single brackets if do not have
        if (wrapWithBrackets && (!text.startsWith("(") || !text.endsWith(")"))) {
            text = "(" + text + ")";
        }
    }
    return text;
}

export function ParseOAuthLoginRedirectParams(fragment: string): OAuthLoginRedirectParams {
    const oAuthLoginRedirectParams = <OAuthLoginRedirectParams>{};
    if (fragment && fragment.trim()) {
        const fragments = fragment.split('&');
        if (fragments && fragments.length) {
            fragments.forEach(x => {
                const y = x.split('=')
                oAuthLoginRedirectParams[y[0]] = y[1]
            });
        }
    }
    return oAuthLoginRedirectParams;
}

export function GetTextWidth(text: string, font: string): number {
    let textWidth = 0;
    if (text && text.trim() && font && font.trim()) {
        const element = document.createElement('canvas');
        const context = element.getContext("2d");
        context.font = font;
        const contextWidth = Math.ceil(context.measureText(text).width);
        textWidth = contextWidth ? contextWidth : 0;
    }
    return textWidth;
}

export function ParseHttpResponseTypeText(response: string) {
    if (response && response.trim()) {
        //parse json without changing the version number and convert to string
        response = JSON_PRO.parse(response, (key, value) => {
            if (key && value.type && value.type === InternalFieldNameConstant.LOSS_LESS_NUMBER_TYPE && value.value) {
                if (key === SolrControlNameConstants.VERSION) {
                    value = value.value;
                } else {
                    value = Number(value.value);
                }
            }
            return value;
        });
    }
    return response;
}

export function MoveArrayItem(array: [], fromIndex: number, toIndex: number): [] {
    if (array) {
        const element = array[fromIndex];
        array.splice(fromIndex, 1);
        array.splice(toIndex, 0, element);
    }
    return array;
}

export function TryParseJSON(value: string, returnOrginalValueIfFailes: boolean) {
    try {
        return JSON.parse(value);
    }
    catch (e) {
        return (returnOrginalValueIfFailes ? value : {});
    }
}

// getting key from value in Enum
export function getEnumKeyByValue(EnumData: object, value: number | string) {
    return Object.keys(EnumData).find(key => EnumData[key] === value);
}

export function getEnumValuesAsArray(EnumData: object) {
    const result = [];
    // tslint:disable-next-line: forin
    for (const key in EnumData) {
        result.push(EnumData[key]);
    }
    return result;
}


