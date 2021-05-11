import { IRecordViewModel, SolrControlNameConstants } from '@CloudApperClients/app-model';

import { IBaseViewConfiguration } from './data.grid.models';

//#region calendar interfaces
export interface ICalendarConfiguration extends IBaseViewConfiguration {
  displayConfig: ICalendarDisplayConfig;
  fieldNamesConfig: ICalendarFieldNamesConfig;
  operationConfig: ICalendarOperationConfig;
  editingConfiguration: ICalendarEditingConfig;
}

export interface ICalendarDisplayConfig {
  height: string | number;
  width: string | number;
  views: CalendarViewTypeEnum[];
  currentView: CalendarViewTypeEnum;
  useDropDownViewSwitcher: boolean;
  startDayHour: number;
  endDayHour: number;
  currentDate: Date;
  showCurrentTimeIndicator: boolean;
  cellDuration: number;
  firstDayOfWeek: number;
  agendaDuration: number;
}

export interface ICalendarOperationConfig {
  remoteFiltering: boolean;
}


export interface ICalendarFieldNamesConfig {
  calendarScheduleTitleFieldName?: string;
  calendarScheduleDescriptionFieldName?: string;
  calendarScheduleStartDateFieldName?: string;
  calendarScheduleEndDateFieldName?: string;
  calendarScheduleAllDayFieldName?: string;
  calendarScheduleRecurrenceRuleFieldName?: string;
  calendarScheduleRecurrenceExceptionFieldName?: string;
}

export interface ICalendarEditingConfig {
  allowAdding: boolean;
  allowUpdating: boolean;
  allowDeleting: boolean;
  allowResizing: boolean;
  allowDragging: boolean;
  recurrenceEditMode: CalendarRecurrenceEditModeEnum
}

export interface ICalendarLoadOption {
  startDate: string | Date;
  endDate: string | Date;
  resources?: [];
}

export interface ICalendarDataForUpdate {
  record: IRecordViewModel;
  dynamicFields: Record<string, any>;
}

export interface ICalendarDataForSidebar {
  renderCalendarForm: boolean;
  recordWithCalendarData: IRecordViewModel;
  calendarConfig: ICalendarConfiguration;
}

export interface ICalendarConfigDateTimeField {
  Name: string;
  Label: string;
}
//#endregion

//#region calendar enums
export enum CalendarViewTypeEnum {
  Day = "day",
  Week = "week",
  WorkWeek = "workWeek",
  Month = "month",
  TimelineDay = "timelineDay",
  TimelineWeek = "timelineWeek",
  TimelineWorkWeek = "timelineWorkWeek",
  TimelineMonth = "timelineMonth",
  Agenda = "agenda"
}

export enum CalendarRecurrenceEditModeEnum {
  Dialog = 'dialog',
  Occurrence = 'occurrence',
  Series = 'series'
}
//#endregion

//#region calendar classes
export class DefaultCalendarConfiguration implements ICalendarConfiguration {
  filterArray: any[];
  sortConfiguration: any;
  displayConfig = <ICalendarDisplayConfig>{
    height: '67vh',
    views: [CalendarViewTypeEnum.Day, CalendarViewTypeEnum.Week, CalendarViewTypeEnum.Month, CalendarViewTypeEnum.Agenda],
    useDropDownViewSwitcher: false,
    currentView: CalendarViewTypeEnum.Month,
    startDayHour: 0,
    endDayHour: 24,
    currentDate: new Date(),
    showCurrentTimeIndicator: true,
    cellDuration: 30,
    firstDayOfWeek: 1,
    agendaDuration: 30
  };
  fieldNamesConfig = <ICalendarFieldNamesConfig>{
    calendarScheduleTitleFieldName: SolrControlNameConstants.DISPLAY_NAME,
    calendarScheduleDescriptionFieldName: SolrControlNameConstants.CALENDAR_SCHEDULE_DESCRIPTION,
    calendarScheduleStartDateFieldName: SolrControlNameConstants.CREATE_DATE, //default start date is create date
    calendarScheduleEndDateFieldName: SolrControlNameConstants.CALENDAR_SCHEDULE_ENDDATE,
    calendarScheduleAllDayFieldName: SolrControlNameConstants.CALENDAR_SCHEDULE_ALL_DAY,
    calendarScheduleRecurrenceRuleFieldName: SolrControlNameConstants.CALENDAR_SCHEDULE_RECURRENCE_RULE
  };
  operationConfig = <ICalendarOperationConfig>{
    remoteFiltering: false
  };
  editingConfiguration = <ICalendarEditingConfig>{
    allowAdding: true,
    allowUpdating: true,
    allowDeleting: true,
    allowResizing: false,
    allowDragging: true,
    recurrenceEditMode: CalendarRecurrenceEditModeEnum.Series
  };
}
//#endregion