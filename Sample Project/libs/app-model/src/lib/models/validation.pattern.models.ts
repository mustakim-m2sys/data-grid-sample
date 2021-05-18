export class PatternMessage {
    constructor(key: string, msg: string) {
        this.PatternKey = key;
        this.ErrorMsg = msg;
    }
    public PatternKey: string;
    public ErrorMsg: string;
}

export class ValidationPattern {
    constructor() {
        // this.AlphaNumeric = /^[a-zA-Z0-9 ]*$/  [\W]* /[\W]*/;  /^[@!#$%^&*()\-+={}|'";:.,~?<>]+/i;
        this.AlphaNumeric = /\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|\s/g

        this.AlphaNumericWithSpace = /\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:/g

        this.TitleAlphaNumeric = /\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:/g

        this.CommonNonAllowedSpecialCharacters = /\`|\~|\!|\$|\^|\*|\+|\=|\[|\{|\]|\}|\||\\|\<|\>|\?|\/|\""|\;|\,/g
        this.RandomPrefixNonAllowedSpecialCharacters = /\/|\""|\"|\\/g
        this.userNamePattern = /^[\w\.\-\s]+$/i;
        this.NonAllowedSemicolonComma = /\;|\,/g

        this.AlphaNumericWith_Braces_Apostrophe = /^[a-zA-Z0-9 ()']*$/;
        this.EnglishAlphaNumeric = /^[a-zA-Z0-9 ]*$/;
        this.PatternMessage = [new PatternMessage('AlphaNumeric', 'Only alpha numeric characters allowed'), new PatternMessage('AlphaNumeric', 'Only alpha numeric and braces characters allowed')]; //0=AlphaNumeric,
    }

    userNamePattern: any;
    public AlphaNumeric: any;
    public AlphaNumericWithSpace: any;
    public TitleAlphaNumeric: any;

    public CommonNonAllowedSpecialCharacters: any;
    public RandomPrefixNonAllowedSpecialCharacters: any;
    public EnglishAlphaNumeric: any;
    public AlphaNumericWith_Braces_Apostrophe: any;
    public NonAllowedSemicolonComma: any;
    public PatternMessage: PatternMessage[];
}
