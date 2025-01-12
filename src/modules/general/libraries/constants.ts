import { Error, } from './general-types';

export const LOCALES = ['fa', ];
export const WEBSITE_DEFAULT_LOCALE = 'fa';
export const API_VERSION = 'v1';
export const DOMAIN = process.env.NODE_ENV !== 'production'
  ? process.env.DOMAIN_DEVELOPMENT : process.env.DOMAIN_PRODUCTION;
export const LOGIN_INFO_VERBOSE: boolean = `${process.env.LOGIN_INFO_VERBOSE}` === '1';
export const API_KEY = process.env.API_KEY || '';
export const API_DOMAIN = process.env.API_DOMAIN || '';
export const HTTP_CLIENT_IP_HEADER = 'HTTP_X_CLIENT_IP ';
export const BROKEN_IMAGE = `${DOMAIN}/images/broken-image.png`;
export const PIN_LENGTH = 4;
export const VERIFICATION_CODE_DELAY = 120;
export const ACCESS_TOKEN_VALIDITY_LOCAL_IN_MINUTES = 60 * 24 * 30;
export const ACCESS_TOKEN_VALIDITY_SERVER_IN_MINUTES = 2;
export const GA_MEASUREMENT_ID = process.env.GA_MEASUREMENT_ID || '';
export const GOOGLE_WEBMASTER_VERIFICATION_CODE = process.env.GOOGLE_WEBMASTER_VERIFICATION_CODE || '';
export const INSTALLED_MODULES = `${process.env.INSTALLED_MODULES}`;
export const DEFAULT_LIMIT = 12;
export const KB_DEFAULT_LIMIT = 6;
export const BLOG_DEFAULT_LIMIT = 6;
export const CUSTOMER_DEFAULT_LIMIT = 24;
export const ENABLE_VOICE_RECORD: boolean = true;
export const TAX_RATE: number = 0.09;
export const GET_CLIENT_IP_ROUTE = '/api/ip';
export const MAP_DEFAULT_LATITUDE = 35.74471094374383;
export const MAP_DEFAULT_LONGITUDE = 51.37528900962155;
export const IRAN_COUNTRY_ID = 78;
export const IRAN_COUNTRY_CALLING_CODE = 98;
export const TEHRAN_PROVINCE_ID = 8;
export const TEHRAN_CITY_ID = 95;
export const REVALIDATE_TIME = 600;
export const REVALIDATE_TIME_VERY_SHORT = 120;
export const REVALIDATE_TIME_SHORT = 300;
export const REVALIDATE_TIME_LONG = 3600;
export const MAX_LIMIT = 200;
export const DASHBOARD_DEFAULT_LIMIT = 10;
export const REVERSE_PIN = true;
export const DEFAULT_THEME = 'light';
export const THEME_COOKIE_NAME = 'theme';
export const SALT = process.env.SALT || '';

export const AUDIO_STATE = {
  PLAY: 1,
  PAUSE: 2,
  STOP: 3,
};
export const GENERAL_ERROR: Error = {
  error_code: 500,
  error_message: 'Unknown Error',
};

export enum ConfirmType {
  success = 1,
  error = 2
}

export enum LocaleType {
  fa = 'fa',
  en = 'en'
}

export type PanelVariant = 'general' | 'dashboard' | 'dashboardSection' | 'fullWidth';

export enum PayableOrderType {
  host = 0,
  domain = 1,
  ssl = 2,
  license = 3,
  serviceStore = 4,
  vm = 5
}

export enum SignInPopupStatusType {
  closed = 1,
  open = 2,
  logined = 3
}

export enum StatusCodeError {
  NotAuthorized = 401,
  NotFound = 404,
  ServerError = 500
}
