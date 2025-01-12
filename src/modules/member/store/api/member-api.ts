import axios from 'axios';
import { getClientIP, } from '@modules/general/store/api/general-api';
import { MobileLoginEntity, } from '@modules/member/libraries/login-types';
import { Profile, ProfileDetailEntity, } from '@modules/member/libraries/profile-types';
import {
  CONFIRM_EMAIL_URL, LegalType, NotificationMethodType, RESET_PASSWORD_URL,
} from '@modules/member/libraries/constants';
import {
  API_DOMAIN, API_KEY, API_VERSION, DOMAIN, GENERAL_ERROR, HTTP_CLIENT_IP_HEADER,
  IRAN_COUNTRY_ID, WEBSITE_DEFAULT_LOCALE,
} from '@modules/general/libraries/constants';
import { parseError, } from '@/modules/general/libraries/utils';

export const getCurrentMemberProfileUrl = (locale: string = WEBSITE_DEFAULT_LOCALE) => {
  return `${API_DOMAIN}/${API_VERSION}/sitemember/${locale || WEBSITE_DEFAULT_LOCALE}/members/current`;
};

export async function fetchCurrentMemberProfile(accessToken: string, locale: string = WEBSITE_DEFAULT_LOCALE): Promise<ProfileDetailEntity> {
  try {
    const response = await axios.get<any>(getCurrentMemberProfileUrl(locale), {
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.data) {
      const detail = response.data;
      return detail;
    }
  } catch (error: any) {
    return parseError(error);
  }

  return Promise.reject(GENERAL_ERROR);
}

export async function sendMobileLoginOTP(
  mobile: string,
  captchaId: string,
  captchaValue: string,
  accessToken: string,
  locale?: string
): Promise<MobileLoginEntity> {
  try {
    const url = `${API_DOMAIN}/${API_VERSION}/sitemember/${locale || WEBSITE_DEFAULT_LOCALE}/authentication/mobileloginotp`;
    const crd = {
      mobile,
      captcha: {
        id: captchaId,
        input: captchaValue,
      },
    };

    const clientIP: string = await getClientIP();
    const response = await axios.post<any>(url, JSON.stringify(crd), {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        Authorization: `Bearer ${accessToken}`,
        [`${HTTP_CLIENT_IP_HEADER}`]: clientIP,
      },
    });

    if (response.data) {
      const detail = response.data;
      return detail;
    }
  } catch (error: any) {
    return parseError(error);
  }

  return Promise.reject(GENERAL_ERROR);
}

export async function sendMobileSignupOTP(
  mobile: string,
  captchaId: string,
  captchaValue: string,
  locale?: string
): Promise<MobileLoginEntity> {
  try {
    const url = `${API_DOMAIN}/${API_VERSION}/sitemember/${locale || WEBSITE_DEFAULT_LOCALE}/members/mobilesignupotp`;
    const crd = {
      mobile,
      captcha: {
        id: captchaId,
        input: captchaValue,
      },
    };

    const clientIP: string = await getClientIP();
    const response = await axios.post<any>(url, JSON.stringify(crd), {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        [`${HTTP_CLIENT_IP_HEADER}`]: clientIP,
      },
    });

    if (response.data) {
      const detail = response.data;
      return detail;
    }
  } catch (error: any) {
    return parseError(error);
  }

  return Promise.reject(GENERAL_ERROR);
}

export async function sendMobileSignup(
  firstName: string,
  lastName: string,
  uniqueId: string,
  verificationCode: string,
  locale?: string
): Promise<MobileLoginEntity> {
  try {
    const url = `${API_DOMAIN}/${API_VERSION}/sitemember/${locale || WEBSITE_DEFAULT_LOCALE}/members/mobilesignup`;
    const userData = {
      first_name: firstName,
      last_name: lastName,
      validation_request: {
        unique_id: uniqueId,
        verification_code: verificationCode,
      },
    };

    const clientIP: string = await getClientIP();
    const response = await axios.post<any>(url, JSON.stringify(userData), {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        [`${HTTP_CLIENT_IP_HEADER}`]: clientIP,
      },
    });

    if (response.data) {
      const detail = response.data;
      return detail;
    }
  } catch (error: any) {
    return parseError(error);
  }

  return Promise.reject(GENERAL_ERROR);
}

export async function sendMobileLogin(
  uniqueId: string,
  verificationCode: string,
  locale?: string
): Promise<MobileLoginEntity> {
  try {
    const url = `${API_DOMAIN}/${API_VERSION}/sitemember/${locale || WEBSITE_DEFAULT_LOCALE}/authentication/mobilelogin`;
    const crd = {
      unique_id: uniqueId,
      verification_code: verificationCode,
    };

    const clientIP: string = await getClientIP();
    const response = await axios.post<any>(url, JSON.stringify(crd), {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        [`${HTTP_CLIENT_IP_HEADER}`]: clientIP,
      },
    });

    if (response.data) {
      const detail = response.data;
      return detail;
    }
  } catch (error: any) {
    return parseError(error);
  }

  return Promise.reject(GENERAL_ERROR);
}

export async function sendMembersEditedPersonalInfo(
  first_name: string,
  last_name: string,
  email: string,
  accessToken: string,
  locale: string
): Promise<ProfileDetailEntity> {
  try {
    const url = `${API_DOMAIN}/${API_VERSION}/sitemember/${locale || WEBSITE_DEFAULT_LOCALE}/Members/editprofile`;
    const crd = {
      first_name,
      last_name,
      email,
    };
    const clientIP: string = await getClientIP();
    const response = await axios.put<any>(url, JSON.stringify(crd), {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        Authorization: `Bearer ${accessToken}`,
        [`${HTTP_CLIENT_IP_HEADER}`]: clientIP,
      },
    });

    if (response.data) {
      const detail = response.data;
      return detail;
    }
  } catch (error: any) {
    return parseError(error);
  }

  return Promise.reject(GENERAL_ERROR);
}

export async function sendChangeMobileOTP(
  mobile: string,
  accessToken: string,
  locale?: string
): Promise<MobileLoginEntity> {
  try {
    const url = `${API_DOMAIN}/${API_VERSION}/sitemember/${locale || WEBSITE_DEFAULT_LOCALE}/members/changemobileotp`;
    const crd = { mobile, };

    const clientIP: string = await getClientIP();
    const response = await axios.post<any>(url, JSON.stringify(crd), {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        Authorization: `Bearer ${accessToken}`,
        [`${HTTP_CLIENT_IP_HEADER}`]: clientIP,
      },
    });
    if (response.data) {
      return response.data;
    }
  } catch (error: any) {
    return parseError(error);
  }

  return Promise.reject(GENERAL_ERROR);
}

export async function sendChangeMobile(
  country_id: number,
  uniqueId: string | undefined,
  verificationCode: string,
  accessToken: string,
  locale?: string
): Promise<MobileLoginEntity> {
  try {
    const url = `${API_DOMAIN}/${API_VERSION}/sitemember/${locale || WEBSITE_DEFAULT_LOCALE}/members/changemobile`;
    const crd = {
      country_id,
      validation_request: {
        unique_id: uniqueId,
        verification_code: verificationCode,
      },
    };
    const clientIP: string = await getClientIP();
    const response = await axios.put<any>(url, JSON.stringify(crd), {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        Authorization: `Bearer ${accessToken}`,
        [`${HTTP_CLIENT_IP_HEADER}`]: clientIP,
      },
    });

    if (response.data) {
      const result = response.data;
      return result as MobileLoginEntity;
    }

  } catch (error: any) {
    return parseError(error);
  }
  return Promise.reject(GENERAL_ERROR);
}

export async function postImpersonateLoginLogin(
  code: string,
  locale?: string
): Promise<any> {
  try {
    const url = `${API_DOMAIN}/${API_VERSION}/sitemember/${locale || WEBSITE_DEFAULT_LOCALE}/authentication/impersonatemobilelogin`;
    const crd = { code: code, };

    const clientIP: string = await getClientIP();
    const response = await axios.post<any>(url, JSON.stringify(crd), {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        [`${HTTP_CLIENT_IP_HEADER}`]: clientIP,
      },
    });

    if (response.data) {
      const detail = response.data;
      return detail;
    }
  } catch (error: any) {
    return parseError(error);
  }

  return Promise.reject(GENERAL_ERROR);
}

export async function postVerifyEmail(
  email: string,
  code: string,
  locale?: string
): Promise<boolean> {
  try {
    const url = `${API_DOMAIN}/${API_VERSION}/sitemember/${locale || WEBSITE_DEFAULT_LOCALE}/members/confirmemail`;
    const p = {
      email: `${email}`,
      code: `${code}`,
    };

    const clientIP: string = await getClientIP();
    const response = await axios.post<any>(url, JSON.stringify(p), {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        [`${HTTP_CLIENT_IP_HEADER}`]: clientIP,
      },
    });
    if (response) {
      return true;
    }
  } catch (error: any) {
    return parseError(error);
  }
  return false;
}

export async function postForgotPassword(
  email: string,
  captchaId: string,
  captchaValue: string,
  locale?: string
): Promise<boolean> {
  try {
    const url = `${API_DOMAIN}/${API_VERSION}/sitemember/${locale || WEBSITE_DEFAULT_LOCALE}/authentication/forgotpassword`;
    const data = {
      email: email,
      reset_password_url: '/member/reset-password',
      security_code: '',
      captcha: {
        id: captchaId,
        input: captchaValue,
      },
    };

    const clientIP: string = await getClientIP();
    const response = await axios.post<any>(url, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        [`${HTTP_CLIENT_IP_HEADER}`]: clientIP,
      },
    });

    if (response) {
      return true;
    }
  } catch (error: any) {
    return parseError(error);
  }
  return false;
}

export async function putMemberAvatar(
  file: FormData,
  accessToken: string,
  locale?: string
): Promise<any> {
  try {
    const url = `${API_DOMAIN}/${API_VERSION}/SiteMember/${locale || WEBSITE_DEFAULT_LOCALE}/members/avatar`;
    const clientIP: string = await getClientIP();
    const response = await axios.put<any>(url, file,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-api-key': API_KEY,
          Authorization: `Bearer ${accessToken}`,
          [`${HTTP_CLIENT_IP_HEADER}`]: clientIP,
        },
      });
    if (response.data) {
      const detail = response.data;
      return detail;
    }
  } catch (error: any) {
    return parseError(error);
  }
  return Promise.reject(GENERAL_ERROR);
}

export async function deleteMemberAvatar(
  accessToken: string,
  locale?: string
): Promise<any> {
  try {
    const url = `${API_DOMAIN}/${API_VERSION}/SiteMember/${locale || WEBSITE_DEFAULT_LOCALE}/members/avatar`;
    const response = await axios.delete<any>(url,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-api-key': API_KEY,
          Authorization: `Bearer ${accessToken}`,
        },
      });
    if (response.data) {
      const detail = response.data;
      return detail;
    }
  } catch (error: any) {
    return parseError(error);
  }
  return Promise.reject(GENERAL_ERROR);
}

export async function putProfileUpdate(
  first_name: string,
  last_name: string,
  email: string,
  accessToken: string,
  locale?: string
): Promise<ProfileDetailEntity> {
  try {
    const url = `${API_DOMAIN}/${API_VERSION}/sitemember/${locale || WEBSITE_DEFAULT_LOCALE}/members/editprofile`;
    const crd = {
      first_name,
      last_name,
      email,
    };

    const clientIP: string = await getClientIP();
    const response = await axios.put<any>(url, JSON.stringify(crd), {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        Authorization: `Bearer ${accessToken}`,
        [`${HTTP_CLIENT_IP_HEADER}`]: clientIP,
      },
    });

    if (response.data) {
      const detail = response.data;
      return detail;
    }
  } catch (error: any) {
    return parseError(error);
  }

  return Promise.reject(GENERAL_ERROR);
}

export async function postSendConfirmationEmail(
  email: string,
  captchaId: string,
  captchaValue: string,
  locale: string
): Promise<boolean | Error> {
  try {
    const url = `${API_DOMAIN}/${API_VERSION}/sitemember/${locale || WEBSITE_DEFAULT_LOCALE}/members/sendconfirmationemail`;
    const p = {
      email: `${email}`,
      email_confirmation_url: `${DOMAIN}${CONFIRM_EMAIL_URL}`,
      captcha: {
        id: captchaId,
        input: captchaValue,
      },
    };

    const clientIP: string = await getClientIP();
    const response = await axios.post<any>(url, JSON.stringify(p), {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        [`${HTTP_CLIENT_IP_HEADER}`]: clientIP,
      },
    });
    if (response) {
      return true;
    }
  } catch (error: any) {
    return parseError(error);
  }
  return false;
}

export async function postForgotPasswordEmail(
  email: string,
  captchaId: string,
  captchaValue: string,
  locale: string
): Promise<boolean | Error> {
  try {
    const url = `${API_DOMAIN}/${API_VERSION}/sitemember/${locale || WEBSITE_DEFAULT_LOCALE}/authentication/forgotpassword`;
    const p = {
      email: `${email}`,
      reset_password_url: `${DOMAIN}${RESET_PASSWORD_URL}`,
      captcha: {
        id: captchaId,
        input: captchaValue,
      },
    };

    const clientIP: string = await getClientIP();
    const response = await axios.post<any>(url, JSON.stringify(p), {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        [`${HTTP_CLIENT_IP_HEADER}`]: clientIP,
      },
    });
    if (response) {
      return true;
    }
  } catch (error: any) {
    return parseError(error);
  }
  return false;
}

export async function postResetPassword(
  email: string,
  password: string,
  code: string,
  locale: string
): Promise<boolean | Error> {
  try {
    const url = `${API_DOMAIN}/${API_VERSION}/sitemember/${locale || WEBSITE_DEFAULT_LOCALE}/authentication/resetpassword`;
    const p = {
      email: `${email}`,
      password: `${password}`,
      code: `${code}`,
    };

    const clientIP: string = await getClientIP();
    const response = await axios.post<any>(url, JSON.stringify(p), {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        [`${HTTP_CLIENT_IP_HEADER}`]: clientIP,
      },
    });
    if (response) {
      return true;
    }
  } catch (error: any) {
    return parseError(error);
  }
  return false;
}

export async function postChangePassword(
  currentPassword: string,
  newPassword: string,
  accessToken: string,
  locale: string
): Promise<boolean | Error> {
  try {
    const url = `${API_DOMAIN}/${API_VERSION}/sitemember/${locale || WEBSITE_DEFAULT_LOCALE}/authentication/changepassword`;
    const p = {
      current_password: `${currentPassword}`,
      new_password: `${newPassword}`,
    };

    const clientIP: string = await getClientIP();
    const response = await axios.post<any>(url, JSON.stringify(p), {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        [`${HTTP_CLIENT_IP_HEADER}`]: clientIP,
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response) {
      return true;
    }
  } catch (error: any) {
    return parseError(error);
  }
  return false;
}

export async function putProfilePartialUpdate(
  firstName: string,
  lastName: string,
  countryId: number,
  provinceId: number,
  cityId: number,
  postalCode: string,
  phone: string,
  address: string,
  legalType: LegalType,
  companyEconomicCode: string,
  companyNationalCode: string,
  companyRegistrationNumber: string,
  occupation: string,
  sendNewsletter: boolean,
  notificationMethod: NotificationMethodType[],
  birthdate: string,
  accessToken: string,
  locale: string
): Promise<ProfileDetailEntity> {
  try {
    const url = `${API_DOMAIN}/${API_VERSION}/sitemember/${locale || WEBSITE_DEFAULT_LOCALE}/members/editprofile`;
    const data = {
      first_name: firstName,
      last_name: lastName,
      country_id: countryId ? `${countryId}` : `${IRAN_COUNTRY_ID}`,
      province_id: provinceId ? `${provinceId}` : 'null',
      city_id: (provinceId && cityId) ? `${cityId}` : 'null',
      postal_code: postalCode || '',
      phone: phone || '',
      address: address || '',
      ...legalType !== LegalType.personal && {
        company_economic_code: companyEconomicCode,
        company_national_code: companyNationalCode,
        company_registration_number: companyRegistrationNumber,
        occupation: occupation,
      },
      send_newsletter: sendNewsletter,
      notification_method: notificationMethod || [],
      birthdate: birthdate,
    };
    const clientIP: string = await getClientIP();
    const response = await axios.put<any>(url, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        Authorization: `Bearer ${accessToken}`,
        [`${HTTP_CLIENT_IP_HEADER}`]: clientIP,
      },
    });

    if (response.data) {
      const detail = response.data;
      return detail;
    }
  } catch (error: any) {
    return parseError(error);
  }

  return Promise.reject(GENERAL_ERROR);
}

export async function putBirthdateUpdate(
  birthdate: string,
  profile: Profile,
  accessToken: string,
  locale: string
): Promise<ProfileDetailEntity> {

  return putProfilePartialUpdate(
    profile.first_name,
    profile.last_name,
    profile.country ? profile.country.id : IRAN_COUNTRY_ID,
    profile.province_id ? profile.province_id : 0,
    (profile.city_id && profile.province_id) ? profile.city_id : 0,
    profile.postal_code || '',
    profile.phone || '',
    profile.address || '',
    profile.legal_type,
    profile.company_economic_code,
    profile.company_national_code,
    profile.company_registration_number,
    profile.occupation,
    profile.send_newsletter,
    profile.notification_method ? profile.notification_method.map((item) => item.id) : [],
    birthdate,
    accessToken,
    locale
  );

}
