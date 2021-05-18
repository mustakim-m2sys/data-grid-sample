import { Injectable } from '@angular/core';
import { EnumControlType, ISchemaViewModel } from '@CloudApperClients/app-model';
import { QueryEntity } from '@datorama/akita';
import { uniq } from 'lodash';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';
import { map } from 'rxjs/internal/operators/map';

import { SchemaState, SchemaStore } from './schema.store';

@Injectable({
  providedIn: 'root'
})
export class SchemaQuery extends QueryEntity<SchemaState, ISchemaViewModel> {
  allSchemas$ = this.selectAll();
  totalSchemas$ = this.selectCount();

  constructor(protected store: SchemaStore) {
    super(store);
  }

  getAllSchemasWithParentChildRelation(appId: string, clientId: number) {
    const schemas = this.getAll({ filterBy: x => x.AppId === appId && x.ClientId === clientId });
    return schemas.map(x => this.getSchemaWithParentChildRelation(x.Id));
  }

  getSchemaWithParentChildRelation(schemaId: string) {
    const schema = this.getEntity(schemaId);
    if (schema && schema.Id) {
      let parentSchemaIds = [];
      let childSchemaIds = [];
      //find parent and child ids from parentChildRelations

      //make parent and child schemas list to maintain sequence
      const allSchemaList = this.getAll();
      const parentSchemas = [];
      const childSchemas = [];
      if (allSchemaList && parentSchemaIds) {
        parentSchemaIds.forEach(parentSchemaId => {
          const parentSchema = allSchemaList.find(i => i.Id === parentSchemaId);
          if (parentSchema) {
            parentSchemas.push(parentSchema);
          }
        });
      }
      if (allSchemaList && childSchemaIds) {
        childSchemaIds.forEach(childSchemaId => {
          const childSchema = allSchemaList.find(i => i.Id === childSchemaId);
          if (childSchema) {
            childSchemas.push(childSchema);
          }
        });
      }

      return {
        ...schema,
        ...{
          ParentSchemas: parentSchemas,
          ChildSchemas: childSchemas
        }
      }
    } else {
      return schema;
    }
  }

  selectSchemaWithPaginationInfo$(schemaId: string) {
    return combineLatest([
      this.selectEntity(schemaId),
      this.ui.selectEntity(schemaId)
    ]).pipe(map(([schema, paginationInfo]) => ({
      ...schema, PaginationInfo: paginationInfo
    })));
  }

  selectSchemaWithMarkerControl(clientId: number, appId: string) {
    const schemaWithMarkerControl = [];
    const allSchemas = this.getAll({ filterBy: entity => entity.ClientId === clientId && entity.AppId === appId });
    allSchemas.forEach(schema => {
      if (schema.Fields?.find(i => i.ControlType === EnumControlType.PlaceMarker)) {
        schemaWithMarkerControl.push(schema);
      }
    });
    return schemaWithMarkerControl;
  }

  isSchemaValidForScheduler(schemaId: string): boolean {
    let isSchemaValid = false;
    const schemaWithParentChildRelation = this.getSchemaWithParentChildRelation(schemaId);
    //schema has no parent but has childs
    if (schemaWithParentChildRelation?.Id && !schemaWithParentChildRelation.ParentSchemas?.length && schemaWithParentChildRelation?.ChildSchemas?.length) {
      isSchemaValid = true;
    }
    return isSchemaValid;
  }

}
