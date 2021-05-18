
export class DynamicLink {
    action: string;
    scheduleId?: string;
    clientId?: number;
    appId?: string;
    userId?: string;
    templaterefid?: string;
    issignup?: boolean;
    recordTypeId?: string;
    recordId?: string;
    TypeId?: string;
    triggerDateTime: string;
}


// Dynamic Link Format Model

export class ScheduleTakeAction {
    action: string;
    scheduleId: string;
    triggerDateTime: string;
    clientId: number;
    appId: string;
    userId: string;
    constructor() {
        this.action = '';
        this.scheduleId = '';
        this.triggerDateTime = '';
        this.clientId = 0;
        this.appId = '';
        this.userId = '';
    }
}

export class InstallApp {
    action: string;
    templaterefid: string;
    issignup: boolean;
    constructor() {
        this.action = '';
        this.templaterefid = '';
        this.issignup = false;
    }
}

export class RecordDetails {
    action: string;
    clientId: number;
    appId: string;
    recordTypeId: string;
    recordId: string;
    constructor() {
        this.action = '';
        this.clientId = 0;
        this.appId = '';
        this.recordTypeId = '';
        this.recordId = '';
    }
}

export class RecordCreate {
    action: string;
    clientId: number;
    appId: string;
    userId: string
    TypeId: string;
    constructor() {
        this.action = '';
        this.clientId = 0;
        this.appId = '';
        this.userId = '';
        this.TypeId = '';
    }
}

export class RecordEdit {
    action: string;
    recordId: string;
    TypeId: string
    clientId: number;
    appId: string;
    userId: string
    constructor() {
        this.action = '';
        this.clientId = 0;
        this.appId = '';
        this.TypeId = '';
        this.userId = '';
        this.recordId = '';
    }
}