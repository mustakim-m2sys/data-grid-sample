import { DataServiceRequest, IRoleViewModel } from '@CloudApperClients/app-model';

import { IAppClientMapperModel } from './app.models';
import {
    CalendarRecurrenceEditModeEnum,
    CalendarViewTypeEnum,
    ICalendarConfiguration,
    ICalendarDisplayConfig,
    ICalendarEditingConfig,
    ICalendarFieldNamesConfig,
    ICalendarOperationConfig,
} from './calendar.models';
import { IAppUserViewModel } from './user.models';

//#region Request Models

export interface IScheduleGetRequestModel {
    getAllRequestModel?: DataServiceRequest<IScheduleGetAllRequestModel>;
    getDeltaRequestModel?: DataServiceRequest<IScheduleGetDeltaRequestModel>;
}

export interface IScheduleGetAllRequestModel {
    UserId?: string;
    DateFrom?: string;
    DateTo?: string;
    ScheduleId?: string;
    /** Note : Child schema id */
    RecordTypeId?: string;
    /** Note : Child schema's record id */
    RecordId?: string;
    RecordParentId?: string;
    RecordParentTypeId?: string;
}

export interface IScheduleGetDeltaRequestModel {
    /** Note : Last sync date time */
    DateFrom?: string;
    DateTo?: string;
    UserId?: string;
    ScheduleId?: string;
    RoleId?: string;
    RecordId?: string;
    RecordTypeId?: string;
    RecordParentId?: string;
    RecordParentTypeId?: string;
    PageIndex?: number;
    PageSize?: number;
}

export interface IEventLogGetRequestModel {
    getAllRequestModel?: DataServiceRequest<IEventLogGetAllRequestModel>;
    getDeltaRequestModel?: DataServiceRequest<IEventLogGetDeltaRequestModel>;
}

export interface IEventLogGetAllRequestModel {
    ScheduleId?: string;
    RecordTypeId?: string;
    RecordId?: string;
    DateFrom?: string;
    DateTo?: string;
    CreateBy?: string;
}

export interface IEventLogGetDeltaRequestModel {
    ScheduleId?: string;
    RecordTypeId?: string;
    RecordId?: string;
    /** Note : Last sync date time */
    DateFrom?: string;
    DateTo?: string;
    CreateBy?: string;
    PageIndex?: number;
    PageSize?: number;
}

export interface IScheduleSaveRequestModel extends Omit<IScheduleResponseModel, "Id"> {
    Id?: string;
}

export interface IEventLogCreateRequestModel extends IEventLogResponseModel {

}

export interface IEventLogupdateRequestModel {
    Id: string;
}

export interface IScheduleDeleteRequestModel {
    Id: string;
}
//#endregion

//#region Response Models
export interface IScheduleResponseModel {
    Id: string;
    /** Note : Parent schema id */
    RecordParentTypeId: string;
    /** Note : Parent schema's record id */
    RecordParentId: string;
    /** Note : Parent schema's record disaply name */
    RecordParentDisplayName: string;
    /** Note : Child schema id */
    RecordTypeId: string;
    /** Note : Child schema's record id */
    RecordId?: string;
    /** Note : Child schema's record disaply name */
    RecordDisplayName?: string;
    Title: string;
    Description: string;
    StartDateTime: string;
    EndDateTime: string;
    RecurrentRule: string;
    RecurrentEndDateTime?: string;
    RecurrentRuleExceptions: string;
    Allday: boolean;
    Reminders: IReminder[];
    AdditionalData: Record<string, any>;
    UserIds: string[];
    RoleIds: string[];
    ColorCode: EnumScheduleColorCode;
    Deleted: boolean;
    CreateDate: string;
    CreatedBy: string;
    LastModifiedBy?: string;
    LastModifiedDate?: string;
}


export interface IEventLogResponseModel {
    Id: string;
    ScheduleId: string;
    /** Note : Child schema id */
    RecordTypeId: string;
    /** Note : Child schema's record id */
    RecordId?: string;
    Status: EnumEventLogStatus;
    ActionDateTime: string;
    CreatedBy: string;
    CreateDate: string;
}
//#endregion

//#region View Models
export interface IScheduleViewModel extends IScheduleResponseModel, IAppClientMapperModel {
    EventLogs?: IEventLogViewModel[];
}


// tslint:disable-next-line: no-empty-interface
export interface IEventLogViewModel extends IEventLogResponseModel {
    ActionDateTimeInDate: Date;
}

export interface IScheduleFormDataViewModel extends Partial<IScheduleViewModel> {
    /** Note : frequency. recurrence type */
    RepeatType?: IRepeatConfig[];
    interval?: number;
    byWeekDay?: IWeekDay[];
    byMonthDay?: number;
    byYearMonth?: number;
    byYearMonthDate?: number;
    EndRepeatType?: EnumRepeatType;
    count?: number;
    ReminderOne?: IReminder;
    ReminderTwo?: IReminder;
    ReminderThree?: IReminder;
    ReminderFour?: IReminder;
    ReminderFive?: IReminder;
}
//#endregion

//#region Helper Interfaces, Models
export interface IReminder {
    Id?: string;
    Medium: EnumReminderMedium;
    Trigger: EnumReminderTrigger;
    OffsetType: EnumReminderOffsetType;
    OffsetValue: number;
}

export interface ISchedulerConfiguration extends ICalendarConfiguration {
    sourceConfig: ISchedulerSourceConfig;
}

export interface ISchedulerSourceConfig {
    AppId: string;
    ClientId: number;
    /** Note : Parent schema id */
    RecordParentTypeId?: string;
    /** Note : Parent schema's record id */
    RecordParentId?: string;
    /** Note : Parent schema's record disaply name */
    RecordParentDisplayName?: string;
    /** Note : Child schema id */
    RecordTypeId?: string;
    /** Note : Child schema's record id */
    RecordId?: string;
    /** Note : Child schema's record disaply name */
    RecordDisplayName?: string;
    FilterEnabled?: boolean;
}

export interface IGetSchedulesFromLocalParams {
    appId: string;
    clientId: number;
    userId?: string;
    scheduleId?: string;
    recordId?: string;
    recordTypeId?: string;
    recordParentId?: string;
    recordParentTypeId?: string;
}

// tslint:disable-next-line: no-empty-interface
export interface IGetSchedulesServiceParams extends IGetSchedulesFromLocalParams {

}

export interface IGetSchedulesDeltaServiceParams {
    appId: string;
    clientId: number;
    scheduleId?: string;
    recordId?: string;
    recordTypeId?: string;
    recordParentId?: string;
    recordParentTypeId?: string;
    lastSyncTime?: string;
}

export interface IScheduleParticipant {
    Id: string;
    Name: string;
    Type: EnumScheduleParticipantType;
    Source: IAppUserViewModel | IRoleViewModel;
    ProfilePicSrc?: string;
}

// tslint:disable-next-line: no-empty-interface
export interface IGetEventLogsServiceParams extends IGetSchedulesServiceParams {
}

export interface ISchedulerDropdownOption {
    id: string | number;
    name: string;
    icon?: string;
}

export interface ISchedulePopupModel {
    Schedule: IScheduleViewModel;
    RecurringSchedule: IScheduleViewModel;
}

export interface IScheduleRepeatMonth {
    /** Note : translated month name */
    name: string;
    /** Note : index starts with 1*/
    index: number;
    /** Note : day count in that particular month of that year*/
    dateCount: number;
}

export interface IScheduleFilterCondition {
    ShowOnlyMySchedules: boolean;
    ParticipantIds: string[];
    CreatedByUserIds: string[];
    RecordParentIds: string[];
    RecordTypeIds: string[];
}
//#endregion

//#region  Enums, Consts
export enum EnumReminderMedium {
    Email = 0,
    Push = 1
}

export enum EnumReminderTrigger {
    Before = 0
    //NOTE: ACTIVATE THIS ONLY AFTER SOLID USE CASES FOUND
    // After = 1,
    // OnTime = 2
}

export enum EnumReminderOffsetType {
    Minute = 0,
    Hour = 1,
    Day = 2,
    Month = 4
}

export enum EnumEventLogStatus {
    Complete = 0,
    InComplete = 1,
    None = 999
}

export enum EnumDeleteOptionsForRecurringSchedule {
    ThisEvent = 1,
    ThisAndFutureEvent = 2,
    AllEvents = 3
}
export enum EnumRepeatType {
    Never = 'Never',
    Daily = 'Daily',
    Weekly = 'Weekly',
    Monthly = 'Monthly',
    Yearly = 'Yearly',
    On = "On",
    After = 'After'
}
export enum EnumWeekDays {
    MON = 'MO',
    TUE = 'TU',
    WED = 'WE',
    THU = 'TH',
    FRI = 'FR',
    SAT = 'SA',
    SUN = 'SU'
}
export enum EnumStaticReminderKeyNames {
    ReminderOne = 'ReminderOne',
    ReminderTwo = 'ReminderTwo',
    ReminderThree = 'ReminderThree',
    ReminderFour = 'ReminderFour',
    ReminderFive = 'ReminderFive',
}
export enum EnumScheduleParticipantType {
    User = 'User',
    Role = 'Role',
}

export interface IWeekDay {
    /** Note : translated day name */
    text: string;
    /** Note : day name enum*/
    name: EnumWeekDays;
    /** Note : rrule.js weekday code*/
    code: any;
}

export enum EnumScheduleColorCode {
    Tomato = '#D50000',
    Flamingo = '#E67C73',
    Tangerine = '#F4511E',
    Banana = '#F6BF26',
    Sage = '#33B679',
    Basil = '#0B8043',
    Peacock = '#039BE5',
    Blueberry = '#3F51B5',
    Levender = '#7986CB',
    Grape = '#8E24AA',
    Graphite = '#616161'
}

export enum EnumScheduleUIPermission {
    View = 'View',
    Add = 'Add',
    Edit = 'Edit',
    Delete = 'Delete',
    MarkAsCompleteInComplete = 'MarkAsCompleteInComplete',
    TakeAction = 'TakeAction',
    ActionRecordView = 'ActionRecordView'
}

export class SchedulerFieldNameConstant {
    public static readonly SCHEDULER_KEY = "Id";
    public static readonly SCHEDULER_TITLE = "Title";
    public static readonly SCHEDULER_DESCRIPTION = "Description";
    public static readonly SCHEDULER_START_DATE = "StartDateTime";
    public static readonly SCHEDULER_END_DATE = "EndDateTime";
    public static readonly SCHEDULER_RECURRENCE_RULE = "RecurrentRule";
    public static readonly SCHEDULER_RECURRENCE_RULE_EXCEPTIONS = "RecurrentRuleExceptions";
    public static readonly SCHEDULER_ALL_DAY = "Allday";
    public static readonly SCHEDULER_USERS = "UserIds";
    public static readonly SCHEDULER_ROLES = "RoleIds";
    public static readonly REMINDER_OFFSET_VALUE_TEMP = "ReminderOffsetValueTemp";
    public static readonly REMINDER_OFFSET_TYPE_TEMP = "ReminderOffsetTypeTemp";
    public static readonly REMINDER_TRIGGER_TEMP = "ReminderTriggerTemp";
    public static readonly REMINDER_MEDIUM_TEMP = "ReminderMediumTemp";
}

export interface ISchedulerDropdownOption {
    id: string | number;
    name: string;
    icon?: string;
}

export interface ISchedulePopupModel {
    Schedule: IScheduleViewModel;
    RecurringSchedule: IScheduleViewModel;
}

export interface IRepeatConfig {
    name: EnumRepeatType;
    text: string;
    suffix: string;
    code: number;
}

export class SchedulerDateConstant {
    public static readonly DATE_PICKER_DISPLAY_FORMAT = "d MMM y";
    public static readonly DATETIME_PICKER_DISPLAY_FORMAT = "d MMM y h:mm a";
    public static readonly DATE_SERIALIZATION_FORMAT = "yyyy-MM-ddTHH:mm:ssZ";
}

//#endregion

//#region Classes
export class DefaultSchedulerConfiguration implements ISchedulerConfiguration {
    sourceConfig = <ISchedulerSourceConfig>{
        AppId: "",
        ClientId: 0
    };
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
        calendarScheduleTitleFieldName: SchedulerFieldNameConstant.SCHEDULER_TITLE,
        calendarScheduleDescriptionFieldName: SchedulerFieldNameConstant.SCHEDULER_DESCRIPTION,
        calendarScheduleStartDateFieldName: SchedulerFieldNameConstant.SCHEDULER_START_DATE,
        calendarScheduleEndDateFieldName: SchedulerFieldNameConstant.SCHEDULER_END_DATE,
        calendarScheduleRecurrenceRuleFieldName: SchedulerFieldNameConstant.SCHEDULER_RECURRENCE_RULE,
        calendarScheduleAllDayFieldName: SchedulerFieldNameConstant.SCHEDULER_ALL_DAY,
        calendarScheduleRecurrenceExceptionFieldName: SchedulerFieldNameConstant.SCHEDULER_RECURRENCE_RULE_EXCEPTIONS
    };
    operationConfig = <ICalendarOperationConfig>{
        remoteFiltering: false
    };
    editingConfiguration = <ICalendarEditingConfig>{
        allowAdding: true,
        allowUpdating: true,
        allowDeleting: true,
        allowResizing: false,
        allowDragging: false,
        recurrenceEditMode: CalendarRecurrenceEditModeEnum.Series
    };

    constructor(sourceConfig?: ISchedulerSourceConfig) {
        if (sourceConfig?.AppId && sourceConfig?.ClientId) {
            this.sourceConfig = sourceConfig;
        }
    }
}

export class DefaultScheduleFilterCondition implements IScheduleFilterCondition {
    ShowOnlyMySchedules = false;
    ParticipantIds = [];
    CreatedByUserIds = [];
    RecordParentIds = [];
    RecordTypeIds = [];
}
//#endregion