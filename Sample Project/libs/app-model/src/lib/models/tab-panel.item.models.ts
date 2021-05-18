export class TabPanelItem {
  IconUrl: string;
  Title: string;
  PanelType: EnumPanelType;
  RecordId: string;
  SchemaId: string;
  ChildSchemaId: string;
  Count?: number;
}

export enum EnumPanelType {
  DETAILS,
  CHILD,
  AUDIT_LOG,
  LINKED_TAB,
  ATTACHMENT,
  PHOTO,
  SCHEDULER
}
