import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'localeString'
})
export class LocaleString implements PipeTransform {

	constructor() { }

	public transform(value: number, type: string) {
		return value.toLocaleString("en-US");
	}
}