export interface IIntroSetting {
    element: string;
    intro: string;
    postion: 'bottom' | 'top' | 'left' | 'right' | 'bottom-left-aligned' | 'bottom-middle-aligned' | 'bottom-right-aligned' | 'auto'
}

export interface IIntroModule {
    Id: string;
    ProdId?: string;
    NameOfTheModule: string;
    Settings: IIntroSetting[];
}

export interface IIntroConfig {
    TemplateId: string;
    AppName: string;
    Modules: IIntroModule[];
}

export interface IIntroAppName {
    TemplateId: string;
    AppName: string;
}

// Model for on board global form init setting
export interface IOnBoardGlobalFormInitSetting {
    Id: string;
    ClientId: number;
    AppId: string;
    GlobalFormId: string;
    IsInitialized: boolean
}
