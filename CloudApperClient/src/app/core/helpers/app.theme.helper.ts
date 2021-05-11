import { IAppTheme, EnumThemeColor } from '@CloudApperClients/app-model';

export function getAppTheme(themeColor: EnumThemeColor): IAppTheme {
    let appTheme: IAppTheme = <IAppTheme>{};
    const appThemes = getAllAppThemes();
    appTheme = appThemes.find(x => x.themeColor === themeColor);
    return appTheme;
}

function getAllAppThemes(): IAppTheme[] {
    return [
        {
            themeName: "Green",
            themeColor: EnumThemeColor.Green,
            themePrimaryColorCode: "#374351",
            themeSecondaryColorCode: "#4a5968",
            themeTartiaryColorCode: "",
            themeTextColorForMenu: '#ffffff' 
        },
        {
            themeName: "Cyan",
            themeColor: EnumThemeColor.Cyan,
            themePrimaryColorCode: "#6d6daf",
            themeSecondaryColorCode: "#7c7cc1",
            themeTartiaryColorCode: "",
            themeTextColorForMenu: '#ffffff' 
        },
        {
            themeName: "Red",
            themeColor: EnumThemeColor.Red,
            themePrimaryColorCode: "#fc1043",
            themeSecondaryColorCode: "#e02045",
            themeTartiaryColorCode: "",
            themeTextColorForMenu: '#ffffff'
        },
        {
            themeName: "Blue",
            themeColor: EnumThemeColor.Blue,
            themePrimaryColorCode: "#4f7eff",
            themeSecondaryColorCode: "#6192ff",
            themeTartiaryColorCode: "",
            themeTextColorForMenu: '#ffffff'
        },
        {
            themeName: "Gray",
            themeColor: EnumThemeColor.Gray,
            themePrimaryColorCode: "#b6cbef",
            themeSecondaryColorCode: "#d4e2fc",
            themeTartiaryColorCode: "",
            themeTextColorForMenu: '#000000'
        },
        {
            themeName: "GradientOrange",
            themeColor: EnumThemeColor.GradientOrange,
            themePrimaryColorCode: "#00b6ad",
            themeSecondaryColorCode: "#039191",
            themeTartiaryColorCode: "",
            themeTextColorForMenu: '#ffffff'
        },
        {
            themeName: "GradientBlue",
            themeColor: EnumThemeColor.GradientBlue,
            themePrimaryColorCode: "#d6dbe8",
            themeSecondaryColorCode: "#e1e7ef",
            themeTartiaryColorCode: "",
            themeTextColorForMenu: '#000000'
        },
        {
            themeName: "GradientRed",
            themeColor: EnumThemeColor.GradientRed,
            themePrimaryColorCode: "#f46b3b",
            themeSecondaryColorCode: "#fc7e51",
            themeTartiaryColorCode: "",
            themeTextColorForMenu: '#ffffff'
        },
        {
            themeName: "GradientGreen",
            themeColor: EnumThemeColor.GradientGreen,
            themePrimaryColorCode: "#3185af",
            themeSecondaryColorCode: "#4f94ba",
            themeTartiaryColorCode: "#4f94baeb",
            themeTextColorForMenu: '#ffffff'
        },
        {
            themeName: "HeadImg1",
            themeColor: EnumThemeColor.HeadImg1,
            themePrimaryColorCode: "#f9d987",
            themeSecondaryColorCode: "#fae3af",
            themeTartiaryColorCode: "",
            themeTextColorForMenu: '#000000'
        }
    ]
}

