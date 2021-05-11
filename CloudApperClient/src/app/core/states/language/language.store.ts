import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { LanguageFile } from '@CloudApperClients/app-model';

export interface LanguageState extends EntityState<LanguageFile> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'LanguageFiles', idKey: 'FileId', resettable: true })
export class LanguageStore extends EntityStore<LanguageState, LanguageFile> {
    constructor() {
        super();
    }
}
