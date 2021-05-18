export class CloudapperCodeConstants {
  //#region signup
  /// <summary>
  /// This status code will be used to identify an user using Identity Server information has been created.
  /// Now, user need to prompt to provide information to create a Client.
  /// </summary>
  public static readonly RESOURCE_OK = 200;
  public static readonly RESOURCE_CREATED = 201;
  public static readonly STATUS_CLIENT_CREATE_CALLBACK = 299;

  /// <summary>
  /// This status code will be used to identify a Client against Identity Server User has been created.
  /// Now, user need to subscribe.
  /// </summary>
  public static readonly STATUS_CLIENT_SUBSCRIPTION_CALLBACK = 298;

  public static readonly CLIENT_TAKEN = 297;
  public static readonly SOMETHING_WENT_WRONG = 500;
  //#endregion

  //#region User-1000
  public static readonly THIS_EMAIL_IS_ALREADY_USED_IN_ANOTHER_DEFAULT_USER_FORM = 1000;
  public static readonly UNABLE_TO_SAVE_USER_RECORD = 1001;
  public static readonly UNABLE_TO_SAVE_USER_APP_RECORD = 1002;
  public static readonly UNABLE_TO_SAVE_USER_CLIENT_RECORD = 1003;
  public static readonly UNABLE_TO_UPDATE_USER_RECORD = 1004;
  public static readonly UNABLE_TO_UPDATE_USER_APP_RECORD = 1005;
  public static readonly UNABLE_TO_SAVE_USER_PROFILE_RECORD = 1006;
  public static readonly USER_DATA_SAVED_SUCCESSFULLY_BUT_UNABLE_TO_SEND_USER_INVITATION_EMAIL = 1007;
  public static readonly UNABLE_TO_REMOVE_THE_DEFAULT_USER = 1008;
  public static readonly NUMBER_OF_USER_LIMIT_EXCEED = 1009;
  public static readonly UNABLE_TO_SAVE_THE_USER_IN_IDENTITY_SERVER = 1010;
  //#endregion

  //#region Data-20
  public static readonly QUEUE_LIMIT_EXCEED = 2000;
  public static readonly ACTIVE_QUEUE_EXIST = 2001;
  public static readonly PLUGIN_EXECUTION_FAILED = 2003;
  public static readonly DISPLAY_PICTURE_UPDATE_FAILED = 2004;
  public static readonly RECORD_DELETE_FAILED = 2005;
  public static readonly FAILED_TO_CHECKOUT_THE_QUEUE_ITEM = 2006;
  public static readonly UPDATED_RECORD_FOUND = 2007;
  public static readonly VERSION_NUMBER_REQUIRED = 2009;
  public static readonly NO_DATA_FOUND = 204;
  public static readonly REQUIRED_PARAMETER_MISSING = 400;

  //#endregion

  //#region DefaultUserAttachAndDetach
  public static readonly EMAIL_HAS_ALREADY_USED = 4000;
  public static readonly USER_FOUND_BUT_NOT_ATTACHED_YET = 4001;
  public static readonly THIS_EMAIL_IS_NOT_REGISTERED_YET = 4002;
  //#endregion

  //#region Subscriptions
  //KPS payment successfully but failed to save payment info into cloudapper
  public static readonly KPS_PAYMENT_SUCCESS_CA_SAVE_FAILED = 5000;
  //Failed to payment
  public static readonly KPS_PAYMENT_FAILED = 5001;
  //Total number of apps in plan exceeds
  public static readonly TOTAL_NUMBER_OF_APPS_LIMIT = 5002;
  //selected template id not available in cloudapper
  public static readonly NO_TEMPLATE_AVAILABLE = 5003;
  //subscription info not found in cloudapper
  public static readonly NO_SUBSCRIPTION_FOUND = 5004;
  //subscription not activated in cloudapper
  public static readonly SUBSCRIPTION_NOT_ACTIVE = 5005;
  //Total number of user in plan exceeds
  public static readonly TOTAL_NUMBER_OF_USER_LIMIT = 5006;
  //Client payment expired
  public static readonly CLIENT_PAYMENT_EXPIRED = 5007;
  //no subscription found in KPS
  public static readonly NO_SUBSCRIPTION_FOUND_IN_KPS = 5008;
  //KPS error without success
  public static readonly KPS_ERROR = 5009;
  //Subscription Inactive
  public static readonly KPS_SUBSCRIPTION_INACTIVE = 5010;
  public static readonly KPS_TRIAL_SUBSCRIPTION_FAILED = 5011;
  public static readonly DONT_NEED_TO_INSTALL_TEMPLATE = 6000;
  public static readonly TEMPLATE_NOT_AVAILABLE = 6001;
  public static readonly APP_ALREADY_INSTALLED = 6002;
  public static readonly SHARED_SCHEMA_ERROR_WHILE_APP_DELETE = 7000;
  //#endregion

  //#region MENU ACTION
  public static readonly MENU_LIST_ACTION = 'list';
  public static readonly MENU_ADD_ACTION = 'create';
  public static readonly MENU_KANBAN_ACTION = 'kanban';
  public static readonly MENU_DASHBOARD_ACTION = 'dashboard';
  public static readonly MENU_REPORT_ACTION = 'report';
  public static readonly MENU_VIEW_CREATION_ACTION = "form-view";
  public static readonly MENU_VIEW_VIEW_ACTION = "view-details";

  public static readonly MENU_DASHBOARD_VIEW = 'Dashboard';
  public static readonly MENU_REPORT_VIEW = 'Rashboard';
  public static readonly MENU_HOME_VIEW = 'Home';

  ////#endregion

  //#region EVENT NAME FOR APP PUB SUB ARCHITECTURE
  public static readonly PARENT_DATA_CHANGED = 'PARENT_DATA_CHANGED';
  public static readonly BROWSE_DATA_CHANGED = 'BROWSE_DATA_CHANGED';
  public static readonly CONDITIONAL_CONTROL_CHANGED = 'CONDITIONAL_CONTROL_CHANGED';
  public static readonly DETAILS_OPENED = 'DETAILS_OPENED';
  public static readonly CHILD_DETAILS_OPENED = 'CHILD_DETAILS_OPENED';
  public static readonly ADD_FROM_GRID = 'ADD_FROM_GRID';
  public static readonly ADD_FROM_GRID_CHILD = 'ADD_FROM_GRID_CHILD';
  public static readonly CLOSE_RIGHT_SIDE_BAR = 'CLOSE_RIGHT_SIDE_BAR';
  public static readonly GRID_DATA_CHANGED = 'GRID_DATA_CHANGED';
  public static readonly KANBAN_DATA_CHANGED = 'KANBAN_DATA_CHANGED';
  public static readonly FORMULA_DATA_CHANGED = 'FORMULA_DATA_CHANGED';
  public static readonly CALENDAR_DATA_CHANGED = 'CALENDAR_DATA_CHANGED';
  public static readonly SIDEBAR_CLOSED_ON_CANCEL = 'SIDEBAR_CLOSED_ON_CANCEL';
  public static readonly DEFAULT_USER_DATA_CHANGED = 'DEFAULT_USER_DATA_CHANGED';
  public static readonly MAKE_OUTSIDE_CLICK_ON = 'MAKE_OUTSIDE_CLICK_ON';
  public static readonly MAKE_OUTSIDE_CLICK_OFF = 'MAKE_OUTSIDE_CLICK_OFF';
  public static readonly SIDEBAR_CLOSED_DISABLE_ON = 'SIDEBAR_CLOSED_DISABLE_ON';
  public static readonly SIDEBAR_CLOSED_DISABLE_OFF = 'SIDEBAR_CLOSED_DISABLE_OFF';
  public static readonly DETAILS_RECORD_COUNT_FROM_GRID = 'DETAILS_RECORD_COUNT_FROM_GRID';
  public static readonly DELETE_FROM_GRID = 'DELETE_FROM_GRID';
  public static readonly NOTIFICATION_FROM_DASHBOARD = 'NOTIFICATION_FROM_DASHBOARD';
  public static readonly CLOSE_LAYOUT_MAP_POPUP = 'CLOSE_LAYOUT_MAP_POPUP';
  public static readonly NOTIFICATION_FROM_ROOT = 'NOTIFICATION_FROM_ROOT';
  public static readonly NOTIFICATIONS_TAKE_PER_REQUEST = 50;
  public static readonly NOTIFICATIONS_INITIAL_START = 0;
  public static readonly NOTIFICATIONS_INITIAL_START_DATE = "2020-01-01T00:00:00.000Z";
  public static readonly LAYOUT_MAP_DATA_CHANGED = 'LAYOUT_MAP_DATA_CHANGED';
  public static readonly DETAILS_RECORD_COUNT_FROM_FORM_ADD = 'DETAILS_RECORD_COUNT_FROM_FORM_ADD';
  //#endregion
}

export class ServiceResponseCodeConstants {
  public static readonly HTTP_ERROR = 'SR_000_E';
  public static readonly UPDATED_USER_INFO_FETCH_SUCCESS = 'SR_001_S';
  public static readonly UPDATED_USER_INFO_FETCH_ERROR = 'SR_001_E';
  public static readonly UPDATED_APP_INFO_FETCH_SUCCESS = 'SR_002_S';
  public static readonly UPDATED_APP_INFO_FETCH_ERROR = 'SR_002_E';
  public static readonly UPDATED_USER_AND_APP_INFO_FETCH_SUCCESS = 'SR_003_S';
  public static readonly UPDATED_USER_AND_APP_INFO_FETCH_ERROR = 'SR_003_E';
  public static readonly UPDATED_USER_APP_INFO_FETCH_NOT_NEEDED = 'SR_003_N';
  public static readonly LOGGED_IN_USER_NOT_FOUND = 'SR_004_E';
  public static readonly USER_ROUTING_DETAIL_ERROR = 'SR_005_E';
  public static readonly USER_INFOS_FETCH_SUCCESS = 'SR_006_S';
  public static readonly USER_INFOS_FETCH_ERROR = 'SR_006_E';
  public static readonly USER_INFO_FETCH_ERROR = 'SR_007_E';
}


export class GlobalFilterConstants {
  public static readonly CURRENT_USER_STRING = "_CurrentUser";
  public static readonly DATE_NOW_STRING = "_Now";
  public static readonly ACTIVE_STRING = "_Active";
  public static readonly CREATED_BY_ME_STRING = "_CreatedByMe";
  public static readonly MODIFIED_BY_ME_STRING = "_ModifiedByMe";
  public static readonly THIS_MONTH = "_ThisMonth";
  public static readonly THIS_YEAR = "_ThisYear";
  public static readonly TODAY = "_Today";
  public static readonly CURRENT_LOCATION = "_CurrentLocation";
}

export class LocalStorageKey {
  public static readonly SESSION_STATE = 'session_state';
  public static readonly EXPIRES_AT = 'expires_at';
  public static readonly GRANTED_SCOPES = 'granted_scopes';
  public static readonly ACCESS_TOKEN = 'accessToken';
  public static readonly OAUTH_ACCESS_TOKEN = 'access_token';
  public static readonly ID_TOKEN = 'idToken';
  public static readonly ACCESS_TOKEN_USERID = 'AccessToken_UserId';
  public static readonly CURRENT_USER = 'currentUser';
  public static readonly CURRENT_LANGUAGE = 'currentUserLanguage';
  public static readonly NONCE = 'nonce';
  public static readonly SUBSCRIPTION_INFO = 'SubscriptionInfo';
  public static readonly DESIGN_APP_INDEXEDDB_STORE_KEY = 'CloudApperDesign';
  public static readonly IS_USER_PROFILE_UPDATED_FROM_DESIGN_APP = 'isUserProfileUpdateFromDesignApp';
  public static readonly SIGNUP_CLIENT_INFO = 'SignupClientInfo';
  public static readonly CLIENT_WISE_ROUTING_DETAILS = 'clientWiseRoutingDetails';
  public static readonly TOKEN_REFRESH_REQUEST_FROM_DESIGN_APP = "tokenRefreshRequestFromDesignApp";
}

export class TemplateParamKey {
  public static readonly TEMPLATE_REFERENCE_ID = 'templaterefid';
  public static readonly SIGNUP_STATUS_FOR_TEMPLATE_USER = 'issignup';
  public static readonly IS_SIGNUP_FORBIDDEN_FOR_TEMPLATE_USER = 'issignupforbidden';
  public static readonly REFERAL_CODE = 'ref';
}

export class AuthParamKey {
  public static readonly CURRENT_LANG = 'currentlang';
  public static readonly RETURN_URL = 'returnUrl';
}

export class AppInstallationParamKey {
  public static readonly TEMPLATE_ID = 'templateId';
  public static readonly TEMPLATE_VERSION = 'templateVersion';
  public static readonly ACTION = 'action';
  public static readonly IS_UPDATE = "isupdate";
  public static readonly APP_ID = "appId";
}

export class AppRouteUrlConstant {
  public static readonly CONSOLE = "";
  public static readonly CONSOLE_ALT = "/";
  public static readonly ROUTE_DEVIDER = "/";
  public static readonly ROUTE_API = "api";
  public static readonly APP = "app";
  public static readonly LIST = "list";
  public static readonly ADD = "create";
  public static readonly EDIT = "edit";
  public static readonly KANBAN = "kanban";
  public static readonly DASHBOARD = "dashboard";
  public static readonly SCHEDULER = "my-schedules";
  public static readonly REPORT = "report";
  public static readonly FORM_VIEW = "form-view";
  public static readonly CLIENT_CREATE = "client/create";
  public static readonly APP_CREATE = "app-create";
  public static readonly LOGIN = "login";
  public static readonly AUTH_LOGIN_REDIRECT = "auth/login-redirect";
  public static readonly LOGIN_REDIRECT = "login-redirect";
  public static readonly DETAILS = "details";
  public static readonly IMPORT_DATA = "import-data";
  public static readonly FILE_REPOSITORY = "file-repository";
  public static readonly MARKET_PLACE = "marketplace";
  public static readonly CONSOLE_REPORTS = "console-reports";
  public static readonly END_SESSION = "/connect/endsession";
  public static readonly CLIENT_MARKET_PLACE = "/marketplace/marketplace-apps";
  public static readonly DESIGN_APP = "/design";
  public static readonly REFRESH_TOKEN = "refresh-token";
  public static readonly NOTIFICATIONS = "notifications";
  public static readonly DYNAMIC_RECORD_CREATE_LINK = "dynamic-record-create-link";
}

export class StripeErrorCode {

  public static readonly AMOUNT_TOO_LARGE = 'amount_too_large';
  public static readonly AMOUNT_TOO_SMALL = 'amount_too_small';
  public static readonly BALANCE_INSUFFICIENT = 'balance_insufficient';
  public static readonly BANK_ACCOUNT_DECLINED = 'bank_account_declined';
  public static readonly CARD_DECLINED_RATE_LIMIT_EXCEEDED = 'card_decline_rate_limit_exceeded';
  public static readonly CARD_DECLINED = 'card_declined';
  public static readonly CARD_EXPIRED = 'expired_card';
  public static readonly INCORRECT_CVC = 'incorrect_cvc';
  public static readonly INVALID_CVC = 'invalid_cvc';
  public static readonly INVALID_EXPIRY_MONTH = 'invalid_expiry_month';
  public static readonly INVALID_EXPIRY_YEAR = 'invalid_expiry_year';
  public static readonly POSTAL_CODE_INVALID = 'postal_code_invalid';
  public static readonly COUPON_EXPIRED = 'coupon_expired';
  public static readonly RESOURCE_ALREADY_EXISTS = 'resource_already_exists';
  public static readonly RESOURCE_MISSING = 'resource_missing';
  public static readonly INVOICE_UPCOMING_NONE = 'invoice_upcoming_none';

}

export class UserRoutingUrlFieldNameConstant {
  public static readonly CLIENT_APP_URL = "ca_client-app-url";
  public static readonly API_URL = "ca_api-url";
  public static readonly LEGACY_API_URL = "ca_legacy-api-url";
  public static readonly MARKET_PLACE_APP_URL = "ca_marketplace-app-url";
  public static readonly MARKET_PLACE_API_URL = "ca_marketplace-api-url";
  public static readonly ICON_RESPOSITORY_URL = "ca_icon-repository-url";
  public static readonly THUMBNAILS_URL = "ca_thumbnails-url";
  public static readonly PAYMENT_API_URL = "ca_payment-api-url";
  public static readonly REPORT_API_URL = "ca_report-api-url";

}

export class InternalFieldNameConstant {
  public static readonly LOSS_LESS_NUMBER_TYPE = "LosslessNumber";
}


export enum TemplateCategoryType {
  Category = 1,
  SubCategory = 2
}

export class BrowserTypeConstant {
  public static readonly Safari = "safari";
}

export class BooleanDataAsString {
  public static readonly TRUE = "true";
  public static readonly FALSE = "false";
}

export class RegExpConstants {
  public static readonly EmailRegualrExpresssion: RegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  public static readonly PhoneRegualrExpresssion: RegExp = /(\+|00)(297|93|244|1264|358|355|376|971|54|374|1684|1268|61|43|994|257|32|229|226|880|359|973|1242|387|590|375|501|1441|591|55|1246|673|975|267|236|1|61|41|56|86|225|237|243|242|682|57|269|238|506|53|5999|61|1345|357|420|49|253|1767|45|1809|1829|1849|213|593|20|291|212|34|372|251|358|679|500|33|298|691|241|44|995|44|233|350|224|590|220|245|240|30|1473|299|502|594|1671|592|852|504|385|509|36|62|44|91|246|353|98|964|354|972|39|1876|44|962|81|76|77|254|996|855|686|1869|82|383|965|856|961|231|218|1758|423|94|266|370|352|371|853|590|212|377|373|261|960|52|692|389|223|356|95|382|976|1670|258|222|1664|596|230|265|60|262|264|687|227|672|234|505|683|31|47|977|674|64|968|92|507|64|51|63|680|675|48|1787|1939|850|351|595|970|689|974|262|40|7|250|966|249|221|65|500|4779|677|232|503|378|252|508|381|211|239|597|421|386|46|268|1721|248|963|1649|235|228|66|992|690|993|670|676|1868|216|90|688|886|255|256|380|598|1|998|3906698|379|1784|58|1284|1340|84|678|681|685|967|27|260|263)(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{4,20}$/;
}

export class HiddenInUIModeConstants {
  public static readonly View = "View";
}

export class IndexedDbNameConstants {
  public static readonly CloudApperClientDB = "CloudApperClient";
  public static readonly CloudApperDesignDB = "CloudApperDesign";
}

//#region all constants of dashboard
export abstract class AvailableViewOnBaordIdConstant {
  static readonly ON_BOARD_LIST_VIEW = "onBoardListView";
  static readonly ON_BOARD_CALENDAR_VIEW = "onBoardCalendarView";
  static readonly ON_BOARD_KANVAN_VIEW = "onBoardKanvanView";
}
//#endregion