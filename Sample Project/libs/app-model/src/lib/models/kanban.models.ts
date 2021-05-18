import { IBaseViewConfiguration } from './data.grid.models';
export class KanbanModel implements IBaseViewConfiguration {
  filterArray: any[];
  sortConfiguration: any;
  public statusField: string;
  public titleField: string;
  public subtitleField: string;
  public descriptionField: string;
  public colorTypeField: string;
  public imageField: string;
  //bottom tile fields . Show tile type data
  public tileFieldList: Array<FieldData>;
  public summaryFieldList: Array<FieldData>;
  public tileFieldNameList: String[];
  public summaryFieldNameList: String[];
  public kanbanType: string;
}

export class FieldData {
  public Name: string;
  public Label: String;
  public Sequence: string;
  public Value: string;
}

export interface IKanbanConfigComboField {
  Name: string;
  Label: string;
}
