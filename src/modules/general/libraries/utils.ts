import React from 'react';
import { baseXEncoder, } from './base-x';
import { PayableOrder, } from './payable-order-type';
import { SessionContextValue, } from 'next-auth/react';
import { ReadonlyHeaders, } from 'next/dist/server/web/spec-extension/adapters/headers';
import { setSignInPopupCaller, setSignInPopupStatus, } from '@/modules/general/store/general-slice';
import {
  DASHBOARD_DOMAIN_DETAIL, DASHBOARD_HOST_DETAIL,
  DASHBOARD_PLESK_DETAIL, DASHBOARD_SERVICESTORE_DETAIL,
  DASHBOARD_SSL_DETAIL, DASHBOARD_VM_DETAIL,
} from './urls';
import {
  API_KEY, GENERAL_ERROR,
  PanelVariant,
  PayableOrderType,
  SignInPopupStatusType,
  StatusCodeError,
} from './constants';
import {
  AdvancedSession, FormatDateType,
  StepType, StepperStatus,
} from './general-types';
import { store, } from '@/redux/store';

export function newGuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g,];
export const arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g,];
export const fixNumbers = (str: string) => {
  try {
    if (typeof str === 'string') {
      for (var i = 0; i < 10; i++) {
        str = str.replace(persianNumbers[i], `${i}`).replace(arabicNumbers[i], `${i}`);
      }
    }
  }
  catch {
  }
  return str;
};

export const hasInvalidChar = (key: string) => {
  return `${fixNumbers(key)}` !== `${key}`;
};

export function checkLogin(session: AdvancedSession | null, sessionStatus: string, checkExpiration: boolean) {
  try {
    let isLogined = false;
    if (session) {
      if (sessionStatus.toLowerCase() === 'authenticated') {
        if (checkExpiration) {
          isLogined = new Date() < new Date(session.expires || session.user?.expires || '');
        } else {
          isLogined = true;
        }
      }
    }
    return isLogined;
  } catch {

  }
  return false;
}

export function checkLogin2(sessionContext: SessionContextValue, callerName: string = '') {
  let isLogined = false;
  try {
    if (sessionContext.data) {
      const clientSession = sessionContext.data as AdvancedSession;
      if (sessionContext.status.toLowerCase() === 'authenticated') {
        isLogined = new Date() < new Date(clientSession.expires || clientSession.user?.expires || '');
      }
    }
  } catch {
  }
  if (!isLogined) {
    store.dispatch(setSignInPopupStatus({ signInPopupStatus: SignInPopupStatusType.open, }));
    if (callerName) {
      store.dispatch(setSignInPopupCaller({ signInPopupCaller: callerName, }));
    }
  }
  return isLogined;
}

export const checkSession = async (sessionContext: SessionContextValue, additionalInfo: string = '') => {
  const
    {
      data: clientSession,
      status: sessionStatus,
      update,
    } = sessionContext,
    session = clientSession as AdvancedSession;

  try {
    let userIsInValidDate = false;
    if (session) {
      if (sessionStatus.toLowerCase() === 'authenticated') {
        userIsInValidDate = new Date() < new Date(session.expires || session.user?.expires || '');
        if (!userIsInValidDate) {
          const data = await update();
          if (data) {
            userIsInValidDate = new Date() < new Date(data.expires || session.user?.expires || '');
          }
        }
      }
    }
    return userIsInValidDate;
  } catch {
  }
  return false;
};

export const smoothScroll = (e: any, id: string) => {
  try {
    if (e) {
      e.preventDefault();
    }
    var element = document.getElementById(id);
    var headerOffset = 60;
    if (element) {
      var elementPosition = element.getBoundingClientRect().top;
      var offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  } catch {

  }
};

export function formatNumber(inputNumber: number | undefined | null, delimiter = ','): string {
  try {
    if (inputNumber) {
      const temp = `${inputNumber}`;
      const separator = delimiter || ',';
      const split = temp.split('.');
      split[0] = split[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, `$1${separator}`);
      return split.join('.');
    }
  } catch {
  }
  return '';
}

export const renderHTML = (rawHTML: string | null) => React.createElement('div', { dangerouslySetInnerHTML: { __html: rawHTML || '', }, });

export function dateFormat(
  dateString: string | undefined | null,
  locale: string,
  type: FormatDateType,
  separator: string = '/',
  hasTime?: boolean,
  timeSeparator?: string
): string {
  try {
    if (dateString) {
      const
        language = locale === 'fa' ? 'fa-IR' : 'en-GB',
        originalDate = new Date(dateString),
        currentYear = originalDate.toLocaleString(language, { year: 'numeric', }),
        currentMonthLong = originalDate.toLocaleString(language, { month: 'long', }),
        currentMonthNumeric = originalDate.toLocaleString(language, { month: 'numeric', }).padStart(2, '0'),
        currentDay = originalDate.toLocaleString(language, { day: 'numeric', }).padStart(2, '0'),
        currentDayNoZero = originalDate.toLocaleString(language, { day: 'numeric', }).padStart(1, '0'),
        time = `${originalDate.getHours()}:${originalDate.getMinutes()}`;

      switch (type) {
        case FormatDateType.long: /* like  2023 Nov 21 */
          return `${currentDayNoZero} ${currentMonthLong} ${currentYear}${`${hasTime ? (timeSeparator || ' ') + time : ''}`}`;
        case FormatDateType.short: /* like  2023/11/21 */
          return `${currentYear}${separator}${currentMonthNumeric}${separator}${currentDay}${`${hasTime ? (timeSeparator || ' ') + time : ''}`}`;
        default:
          return '';
      }
    }
  } catch {

  }
  return '';
}

export function timeFormat(
  dateString: string | undefined | null
): string {
  try {
    if (dateString) {
      const
        originalDate = new Date(dateString),
        hour = originalDate.getHours(),
        minute = originalDate.getMinutes();

      return `${(hour < 10 ? '0' : '') + hour}:${(minute < 10 ? '0' : '') + minute}`;
    }
  } catch {
  }
  return '';
}

export default function stepperStepChange(stepperItems: StepType[], currentStep: number): StepType[] {
  try {
    // Fix incorrect date
    let step = currentStep;
    if (currentStep > stepperItems.length - 1) {
      step = stepperItems.length - 1;
    }
    if (currentStep < 0) {
      step = 0;
    }

    // Set current step to running
    const result = [...stepperItems,];
    result[step].status = StepperStatus.running;

    // Modify other step status
    for (let i = 0; i < result.length; i++) {
      if (i < step) {
        result[i].status = StepperStatus.done;
      }
      if (i > step) {
        result[i].status = StepperStatus.waiting;
      }
    }

    return result;
  } catch {

  }
  return [] as StepType[];
}

export const serverFetch = async (url: string, validationTime: number) => {
  try {
    const response = await fetch(url,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
        next: { revalidate: validationTime, },
      });

    return await response.json();
  } catch (error: any) {
    if (error.response && error.response.data) {
      return Promise.reject({
        status_code: error.response.data.status_code,
        error_message: error.response.data.error.error_message,
      });
    }
  }
  return Promise.reject(GENERAL_ERROR);
};

export function trimUrlKeywords(keywords: string | undefined | null) {
  try {
    if (keywords) {
      return keywords.trim().toLowerCase().replace(/[_ ,،/\\]/g, '-').substring(0, 50).replace(':', '-').replace('.', '').replace('---', '-').replace('--', '-');
    }
  } catch {
  }
  return '';
}

export function trimText(input: string, length: number) {
  try {
    if (input) {
      return input.length > length ? `${input.substring(0, length)}...` : input;
    }
  } catch {
  }
  return '';
}

export function fixMobileNumberDisplay(mobile: string) {
  let temp = '';
  try {
    if (mobile) {
      temp = mobile.split('').reverse().filter((item: string, index: number) => index < 10).reverse().join('');
    }
  } catch {
  }
  return temp;
}

export const fetchFromObject = (obj: any, prop: string): any => {
  try {
    if (typeof obj === 'undefined') {
      return false;
    }

    let index = prop.indexOf('.');
    if (index > -1) {
      return fetchFromObject(obj[prop.substring(0, index)], prop.substring(index + 1));
    }
    return obj[prop];
  } catch {
  }
  return null;
};

export const checkObjectIsEmpty = (object: any, prop: string) => {
  let isEmpty = true;
  try {
    if (object) {
      const propItem = fetchFromObject(object, prop);
      const values = Object.values(propItem);
      if (values.length > 0) {
        isEmpty = values.every(x => {
          let result: boolean = false;
          switch (typeof x) {
            case 'string':
              result = x === null || x === '';
              break;
            case 'number':
              result = x === null || x < 0;
              break;
            case 'boolean':
              result = x === null || x === false;
              break;
            default:
              result = x === null || x === '';
              break;
          }
          return result;
        });
      } else {
        let result: boolean = false;
        switch (typeof propItem) {
          case 'string':
            result = propItem === null || propItem === '';
            break;
          case 'number':
            result = propItem === null || propItem < 0;
            break;
          case 'boolean':
            result = propItem === null || propItem === false;
            break;
          default:
            result = propItem === null || propItem === '' || propItem < 0;
            break;
        }
        isEmpty = result;
      }
    }
  } catch {
  }

  return isEmpty;
};

export const getCriteriaItemValue = (object: any, prop: string) => {
  let result = null;
  try {
    if (object) {
      const propItem = fetchFromObject(object, prop);
      result = propItem;
    }
  } catch { }
  return result;
};

export const stringReverse = (string: string) => {
  try {
    return string.split('').reduce((acc, char) => char + acc, '');
  } catch {
  }
  return '';
};

export const combineMobileNumber = (mobileNumber: string, countryCode: number): string => {
  try {
    //Remove 0 from the first of mobile number in case of having 11 digits
    const mNumber = mobileNumber.split('').reverse().filter((item: string, index: number) => index < 10).reverse().join('');

    //Returning combination of CountryCode and MobileNumber, '+' is required for API
    return `+${countryCode}${fixNumbers(mNumber)}`;
  } catch {
  }
  return '';
};

export function convertHMS(value: string) {
  try {
    const sec = parseInt(value, 10);
    let hours = Math.floor(sec / 3600);
    let minutes = Math.floor((sec - (hours * 3600)) / 60);
    let seconds = sec - (hours * 3600) - (minutes * 60);

    let hourString = '';
    if (hours > 0) {
      hourString = (hours >= 10 ? '' : '0') + hours + ':';
    }

    return hourString +
      (minutes >= 10 ? minutes : '0' + minutes) + ':' +
      (seconds >= 10 ? seconds : '0' + seconds);
  } catch {
  }
  return '';
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target && typeof event.target.result === 'string') {
        const base64String = event.target.result;
        resolve(base64String);

      } else {
        reject(new Error('Invalid file format.'));
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      reject(new Error('Undefined File!'));
    }
  });
}

export function getVariantStyle(s: any, v: PanelVariant) {
  let result: any;

  try {
    switch (`${v}`) {
      case 'general':
        result = s.general;
        break;
      case 'dashboard':
        result = s.dashboard;
        break;
      case 'dashboardSection':
        result = s.dashboardSection;
        break;
      case 'fullWidth':
        result = s.fullWidth;
        break;
      default:
        result = s.general;
        break;
    }
  } catch {
  }

  return result;
}

export const getClientIPFromRequest = (headers: ReadonlyHeaders) => {
  try {
    const FALLBACK_IP_ADDRESS = '0.0.0.0';
    const forwardedFor = headers.get('x-forwarded-for');
    if (forwardedFor) {
      return forwardedFor.split(',')[0] ?? FALLBACK_IP_ADDRESS;
    }
    return headers.get('x-real-ip') ?? FALLBACK_IP_ADDRESS;
  } catch {
  }

  return '0.0.0.0';
};

export function mobileFormatter(mobileNumber: string | number) {
  let result = `${mobileNumber}`;
  try {
    if (result[0] === '0') {
      result = result.substring(1, result.length);
    }
  } catch {
  }
  return result;
}

export const getMIMEType = (extension: string) => {
  let result = '';
  try {
    switch (extension) {
      case 'png':
        result = 'image/png';
        break;
      case 'pdf':
        result = 'application/pdf';
        break;
      case 'jpg':
        result = 'image/jpg';
        break;
      case 'jpeg':
        result = 'image/jpeg';
        break;
      case 'gif':
        result = 'image/gif';
        break;
      case 'wav':
        result = 'audio/wave';
        break;
      case 'ogg':
        result = 'audio/ogg';
        break;
      case 'mp3':
        result = 'audio/mpeg';
        break;
      case 'svg':
        result = 'image/svg+xml';
        break;
      default:
        result = '';
    }
  } catch {
  }
  return result;
};

export const generateSuccessToken = (): string => {
  try {
    const params = `status=ok&date=${Date.now()}`;
    const base58 = baseXEncoder('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz');
    return base58.encode(`${params}`);
  } catch {
  }
  return '';
};

export const decodeSuccessToken = (params: string): boolean => {
  if (params) {
    try {
      const base58 = baseXEncoder('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz');
      const values = base58.decode(params);
      if (values) {
        const parametersList = values.split('&');
        if (parametersList && parametersList.length > 0) {
          return parametersList[0].toLowerCase() === 'status=ok';
        }
      }
    } catch {
    }
  }
  return false;
};

export function convertToLocalDate(
  dateString: string | undefined | null,
  locale: string
): string {
  try {
    if (dateString) {
      const
        language = locale === 'fa' ? 'fa-IR' : 'en-GB',
        originalDate = new Date(dateString),
        currentYear = originalDate.toLocaleString(language, { year: 'numeric', }),
        currentMonthLong = originalDate.toLocaleString(language, { month: 'long', }),
        currentDayNoZero = originalDate.toLocaleString(language, { day: 'numeric', }).padStart(1, '0'),
        time = `${originalDate.getHours()}:${originalDate.getMinutes()}:${originalDate.getSeconds()}`;
      return `${currentDayNoZero} ${currentMonthLong} ${currentYear} - ${time}`;
    }
  } catch {

  }
  return '';
}

export const getPayableOrderDetailUrl = (item: PayableOrder) => {
  let url = '';
  switch (item.type) {
    case PayableOrderType.host:
      url = `${DASHBOARD_HOST_DETAIL}/${item.id}`;
      break;
    case PayableOrderType.domain:
      url = `${DASHBOARD_DOMAIN_DETAIL}/${item.id}`;
      break;
    case PayableOrderType.ssl:
      url = `${DASHBOARD_SSL_DETAIL}/${item.id}`;
      break;
    case PayableOrderType.license:
      url = `${DASHBOARD_PLESK_DETAIL}/${item.id}`;
      break;
    case PayableOrderType.serviceStore:
      url = `${DASHBOARD_SERVICESTORE_DETAIL}/${item.id}`;
      break;
    case PayableOrderType.vm:
      url = `${DASHBOARD_VM_DETAIL}/${item.id}`;
      break;
  }
  return url;
};

export const parseError = (error: any) => {
  if (error.response) {
    return Promise.reject({
      status_code: error.response.data?.status_code || error.response.status || 500,
      error_message: error.response.data?.error?.error_message || error.message || 'General Error',
    });
  }
  return Promise.reject(GENERAL_ERROR);
};

export const parseThunkError = (error: any, thunkApi: any) => {
  if (error.response) {
    return thunkApi.rejectWithValue(
      {
        error_code: error.response.data?.status_code || error.response.data?.error?.error_code || error.response.status || 500,
        error_message: error.response.data?.error?.error_message || error.message || 'General Error',
      }
    );
  }

};

export const checkNotAuthorized = (error: any) => {
  let result: boolean = false;
  if (error && error.status_code === StatusCodeError.NotAuthorized) {
    store.dispatch(setSignInPopupStatus({ signInPopupStatus: SignInPopupStatusType.open, }));
    result = true;
  }
  return result;
};
