import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { LanguageState, LanguageStore } from './language.store';
import { LanguageFile } from '@CloudApperClients/app-model';

@Injectable({
    providedIn: 'root'
})
export class LanguageQuery extends QueryEntity<LanguageState, LanguageFile> {
    allLanguageFiles$ = this.selectAll();
    totalLanguageFileCount$ = this.selectCount();

    constructor(protected store: LanguageStore) {
        super(store);
    }
}
