export interface IToastOption {
    message: string;
    type: ToastTypeEnum;
    position: IPostionOption;
    shading?: boolean;
    shadingColor?: string;
    displayTime?: number;
    height?: string;
    maxHeight?: string;
    minHeight?: string;
    width?: string;
    maxWidth?: string;
    minWidth?: string;
    closeOnClick?: boolean;
    closeOnOutsideClick?: boolean;
}

export interface IPostionOption {
    at: PositionEnum;
    my: PositionEnum;
    of: any;
    offset: string;
}

//#region dx toast enums
export enum ToastTypeEnum {
    Success = 'success',
    Error = 'error',
    Info = 'info',
    Warning = 'warning'
}

export enum PositionEnum {
    Top = 'top',
    Bottom = 'bottom',
    Center = 'center',
    Left = 'left',
    Right = 'right',
    LeftBottom = 'left bottom',
    LeftTop = 'left top',
    RightBottom = 'right bottom',
    RightTop = 'right top'
}
  //#endregion