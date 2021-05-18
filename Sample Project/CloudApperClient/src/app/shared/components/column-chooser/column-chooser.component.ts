import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { IFieldViewModel, EnumControlType } from '@CloudApperClients/app-model';
import { DeepClone } from 'CloudApperClient/src/app/core/utils/object.helper';

@Component({
  selector: 'app-column-chooser',
  templateUrl: './column-chooser.component.html',
  styleUrls: ['./column-chooser.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ColumnChooserComponent implements OnInit, OnDestroy {
  get EnumControlType() { return EnumControlType; }

  //#region input fields
  @Input()
  viewHeight: string;

  private _fields: IFieldViewModel[] = [];
  @Input()
  set fields(fields: IFieldViewModel[]) {
    if (fields && fields.length) {
      this._fields = DeepClone([], fields);
    }
  }
  get fields(): IFieldViewModel[] {
    return this._fields;
  }

  private _selectedFields: IFieldViewModel[] = [];
  @Input()
  set selectedFields(selectedFields: IFieldViewModel[]) {
    if (selectedFields && selectedFields.length) {
      this._selectedFields = DeepClone([], selectedFields);
    }
  }
  get selectedFields(): IFieldViewModel[] {
    return this._selectedFields;
  }
  //#endregion

  //#region output event emitter
  @Output() ColumnChooserChange: EventEmitter<string[]> = new EventEmitter(); //filter query change
  //#endregion

  constructor() {

  }

  ngOnInit() {

  }

  onItemDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
    //emit selected columns
    this.emitSelectedColumns(this.selectedFields);
  }

  emitSelectedColumns(selectedFields: IFieldViewModel[]) {
    if (selectedFields && selectedFields.length) {
      this.ColumnChooserChange.emit(selectedFields.map(x => x.Name));
    } else {
      this.ColumnChooserChange.emit([]);
    }
  }

  ngOnDestroy() {

  }

}
