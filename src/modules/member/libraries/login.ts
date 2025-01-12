import axios from 'axios';
import { addMinutes, } from '@/modules/general/libraries/date';
import { getClientIP, } from '@/modules/general/store/api/general-api';
import { CONFIRM_EMAIL_URL, } from '@/modules/member/libraries/constants';
import { AdvancedUser, } from '@/modules/general/libraries/general-types';
import { ProfileDetailEntity, } from '@/modules/member/libraries/profile-types';
import {
  ACCESS_TOKEN_VALIDITY_SERVER_IN_MINUTES,
  API_DOMAIN, API_KEY, API_VERSION, DOMAIN,
  HTTP_CLIENT_IP_HEADER, IRAN_COUNTRY_ID,
  LOGIN_INFO_VERBOSE, TEHRAN_CITY_ID, TEHRAN_PROVINCE_ID,
  WEBSITE_DEFAULT_LOCALE,
} from '@modules/general/libraries/constants';

export const refreshAccessToken = async (token: any) => {
  try {
    const url = `${API_DOMAIN}/${API_VERSION}/sitemember/${WEBSITE_DEFAULT_LOCALE}/authentication/refreshtoken`;
    const p = { refresh_token: `${token.refreshToken}`, };
    if (LOGIN_INFO_VERBOSE) {
      console.log('\x1b[33m%s\x1b[0m', '   Old Refresh Token: ', token.refreshToken);
    }

    const response = await axios.post<any>(url, JSON.stringify(p), {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
    });

    if (response && response.data) {
      const expireDate = addMinutes(new Date(), ACCESS_TOKEN_VALIDITY_SERVER_IN_MINUTES).toUTCString();
      const newToken = {
        ...token,
        accessToken: response.data.data.access_token,
        accessTokenExpires: addMinutes(new Date(), ACCESS_TOKEN_VALIDITY_SERVER_IN_MINUTES).toUTCString(),
        refreshToken: response.data.data.refresh_token,
        error: '',
        expires: expireDate,
      };
      if (LOGIN_INFO_VERBOSE) {
        console.log('\x1b[33m%s\x1b[0m', '   Refresh Token: ', newToken.refreshToken);
        console.log('\x1b[33m%s\x1b[0m', '   Access Token: ', response.data.data.access_token);
      }
      newToken.user.expires = expireDate;
      return newToken;
    }
  } catch (error: any) {
    console.log('\x1b[33m%s\x1b[0m', '   Refresh Token Failed!', error.message);
  }

  return {
    user: { expires: '', },
    ...token,
    error: 'RefreshAccessTokenError',
    expires: '',
  };
};

export const loginWithUsername = async (credentials: any) => {
  // Get user profile url
  const profileUrl = `${API_DOMAIN}/${API_VERSION}/sitemember/${WEBSITE_DEFAULT_LOCALE}/members/current`;

  let crd = {};
  let loginUrl = '';
  const isNewUser = credentials.isNewUser === '1';
  let loginResponse: any;

  if (credentials.code) {
    loginUrl = `${API_DOMAIN}/${API_VERSION}/sitemember/${WEBSITE_DEFAULT_LOCALE}/authentication/impersonatemobilelogin`;
    crd = { code: credentials.code, };
  } else {
    if (isNewUser) {
      loginUrl = `${API_DOMAIN}/${API_VERSION}/sitemember/${WEBSITE_DEFAULT_LOCALE}/members/signup`;
      crd = {
        first_name: credentials.firstName,
        last_name: credentials.lastName,
        username: credentials.username,
        password: credentials.password,
        mobile: credentials.mobile,
        email: credentials.email,
        email_confirmation_url: `${DOMAIN}${CONFIRM_EMAIL_URL}`,
        country_id: credentials.countryId ? parseInt(credentials.countryId) : IRAN_COUNTRY_ID,
        city_id: credentials.cityId ? parseInt(credentials.cityId) : TEHRAN_CITY_ID,
        province_id: credentials.provinceId ? parseInt(credentials.provinceId) : TEHRAN_PROVINCE_ID,
        address: credentials.address || '',
        gender: credentials.gender,
        legal_type: credentials.legalType,
        organization: credentials.organization || '',
        company_economic_code: credentials.companyEconomicCode || '',
        company_national_code: credentials.companyNationalCode || '',
        company_registration_number: credentials.companyRegistrationNumber || '',
        occupation: credentials.occupation || '',

        ...credentials.captchaId && {
          captcha: {
            id: credentials.captchaId,
            input: credentials.captchaValue,
          },
        },
      };
    } else {
      loginUrl = `${API_DOMAIN}/${API_VERSION}/sitemember/${WEBSITE_DEFAULT_LOCALE}/authentication/login`;
      crd = {
        username: credentials.username,
        password: credentials.password,
        ...credentials.captchaId && {
          captcha: {
            id: credentials.captchaId,
            input: credentials.captchaValue,
          },
        },
      };
    }
  }
  const clientIP: string = await getClientIP();
  try {
    loginResponse = await axios.post<any>(loginUrl, JSON.stringify(crd), {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        [`${HTTP_CLIENT_IP_HEADER}`]: credentials.clientIP || clientIP,
      },
    });

    if (
      loginResponse &&
        (loginResponse.statusText === 'OK' || loginResponse.statusText === 'Created') &&
        loginResponse.data &&
        loginResponse.data.data
    ) {
      // Extract access and refresh token
      const accessToken = isNewUser ?
        (loginResponse.data.data.identity_token?.access_token || '') :
        loginResponse.data.data.access_token;

      const refreshToken = isNewUser ?
        (loginResponse.data.data.identity_token?.refresh_token || '') :
        loginResponse.data.data.refresh_token;

      // Send get profile request
      if (accessToken) {
        const memberResponse = await axios.get<ProfileDetailEntity>(profileUrl, {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
            Authorization: `Bearer ${accessToken}`,
          },
        });

        // Check if there is any response
        if (memberResponse && memberResponse.data) {
          const memberData = memberResponse.data.data;
          if (memberData) {
            if (LOGIN_INFO_VERBOSE) {
              console.log('Access Token:', accessToken);
              console.log('Refresh Token:', refreshToken);
            }
            // Set user information from profile data
            const user: AdvancedUser = {
              id: Number(memberData.id).toString(),
              name: memberData.full_name,
              firstName: memberData.first_name,
              lastName: memberData.last_name,
              email: memberData.email,
              mobile: memberData.mobile,
              image: memberData.avatar_url ? memberData.avatar_url : '',
              accessToken,
              refreshToken,
              expires: addMinutes(new Date(), ACCESS_TOKEN_VALIDITY_SERVER_IN_MINUTES).toUTCString(),
            };
            return user;
          }
        }
      } else if (isNewUser) {
        // accessToken & refreshToken in empty after signup
        // until the user verifies his/her email
        // I set the expire to invalid date, because of user
        // is not valid yet.
        const { member, } = loginResponse.data.data;
        const user: AdvancedUser = {
          id: Number(member.id).toString(),
          name: member.full_name,
          firstName: member.first_name,
          lastName: member.last_name,
          email: member.email,
          mobile: member.mobile,
          image: member.avatar_url ? member.avatar_url : '',
          accessToken: '',
          refreshToken: '',
          expires: addMinutes(new Date(), -1).toUTCString(),
        };
        return user;
      }
    }

  } catch (e: any) {
    return Promise.reject(e.response?.data?.error?.error_message || 'Login Error!');
  }

  return null;
};

export const loginWithMobile = async (credentials: any) => {

  // Get user profile url
  const profileUrl = `${API_DOMAIN}/${API_VERSION}/sitemember/${WEBSITE_DEFAULT_LOCALE}/members/current`;

  // Login with mobile will work in 3 mode.
  // 1- Signin mode
  // 2- Signup mode
  // 3- Impersonate login
  // if isNewUser sent in credentials there is a different url
  // and different parameters

  let crd = {};
  let loginUrl = '';
  const isNewUser = credentials.isNewUser === '1';
  let loginResponse;

  if (credentials.code) {
    loginUrl = `${API_DOMAIN}/${API_VERSION}/sitemember/${WEBSITE_DEFAULT_LOCALE}/authentication/impersonatemobilelogin`;
    crd = { code: credentials.code, };
  } else {

    if (isNewUser) {
      // In new user mode, firstname and lastname must be sent
      // via verification code
      loginUrl = `${API_DOMAIN}/${API_VERSION}/sitemember/${WEBSITE_DEFAULT_LOCALE}/members/mobilesignup`;
      crd = {
        country_id: credentials.countryId ? parseInt(credentials.countryId) : IRAN_COUNTRY_ID,
        first_name: credentials.firstName,
        last_name: credentials.lastName,
        validation_request: {
          unique_id: credentials.username,
          verification_code: credentials.password,
        },
      };
    } else {
      // In signin mode, only uniqueId and verification code
      // is necessary
      loginUrl = `${API_DOMAIN}/${API_VERSION}/sitemember/${WEBSITE_DEFAULT_LOCALE}/authentication/mobilelogin`;
      crd = {
        unique_id: credentials.username,
        verification_code: credentials.password,
      };
    }
  }

  //Detecting Client IP
  const clientIP: string = await getClientIP();

  // Send credentials to endpoint
  try {
    loginResponse = await axios.post<any>(loginUrl, JSON.stringify(crd), {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        [`${HTTP_CLIENT_IP_HEADER}`]: credentials.clientIP || clientIP,
      },
    });
    if (
      loginResponse &&
        (loginResponse.statusText === 'OK' || loginResponse.statusText === 'Created') &&
        loginResponse.data &&
        loginResponse.data.data
    ) {
      // Extract access and refresh token
      const accessToken = isNewUser ?
        loginResponse.data.data.login_response.identity_token.access_token :
        loginResponse.data.data.identity_token.access_token;

      const refreshToken = isNewUser ?
        loginResponse.data.data.login_response.identity_token.refresh_token :
        loginResponse.data.data.identity_token.refresh_token;

      // Send get profile request
      const memberResponse = await axios.get<ProfileDetailEntity>(profileUrl, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Check if there is any response
      if (memberResponse && memberResponse.data) {
        const memberData = memberResponse.data.data;
        if (memberData) {
          if (LOGIN_INFO_VERBOSE) {
            console.log('Access Token:', accessToken);
            console.log('Refresh Token:', refreshToken);
          }
          // Set user information from profile data
          const user: AdvancedUser = {
            id: Number(memberData.id).toString(),
            name: memberData.full_name,
            firstName: memberData.first_name,
            lastName: memberData.last_name,
            email: memberData.email,
            mobile: memberData.mobile,
            image: memberData.avatar_url ? memberData.avatar_url : '',
            accessToken,
            refreshToken,
            expires: addMinutes(new Date(), ACCESS_TOKEN_VALIDITY_SERVER_IN_MINUTES).toUTCString(),
          };
          return user;
        }
      }
    }
  } catch (e: any) {
    return Promise.reject(e.response?.data?.error?.error_message || 'Login Error!');
  }

  // Check if there is any response
  return null;
};