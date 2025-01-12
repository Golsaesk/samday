import { LoginType, } from './constants';
import { Country, } from '@modules/general/libraries/country-types';
import { Meta, Error, } from '@modules/general/libraries/general-types';

export interface LoginEntity {
  status_code: string;
  object_type: string;
  time_taken: number;
  creation_date: string;
  url: string;
  message: string;
  error?: Error;
  data: Login;
  meta: Meta;
}
export interface Login {
  access_token: string;
  token_type: string;
  refresh_token: string;
  password_reset_token?: null;
  creation_date_utc: string;
  expires_in: number;
  object_name: string;
}

export interface MobileLoginEntity {
  status_code: number;
  object_type: string;
  time_taken: number;
  creation_date: string;
  url: string;
  message: string;
  error: Error;
  data: MobileLogin;
  meta: Meta;
}

export interface MobileLogin {
  member_exists: boolean;
  can_login: boolean;
  security_code: SecurityCode | null;
  object_name: string;
}

export interface SecurityCode {
  unique_id: string;
  creation_date: string;
  expiration_date: string;
  sent_date?: null;
  verify_try_number: number;
  verify_status: number;
  max_try_number: number;
  resend_interval: number;
  object_name: string;
}

export interface MemberState {
  step: number;
  mobileNumberStep: number;
  isNewMember: boolean;
  mobileNumber: string;
  firstName: string;
  lastName: string;
  captchaId: string;
  captchaValue: string;
  memberExists: boolean | null;
  canLogin: boolean | null;
  securityCode: SecurityCode | null;
  changeMobileNumberStep: number;
  changeMobileNumberUniqueId: string;
  changeMobileNumberMobile: string;
  changeMobileNumberCountry: Country;
  loginType: LoginType;
  country: Country;
}

export interface PutMobileNumberPayload {
  mobileNumber: string;
}

export interface PutMemberExistsPayload {
  memberExists: boolean;
}
export interface PutCanLoginPayload {
  canLogin: boolean;
}

export interface PutSecurityCodePayload {
  securityCode: SecurityCode | null;
}

export interface PutStepPayload {
  step: number;
}

export interface PutIsNewMemberPayload {
  isNewMember: boolean;
}

export interface PutLastNamePayload {
  lastName: string;
}

export interface PutFirstNamePayload {
  firstName: string;
}

export interface PutMobileNumberStepPayload {
  mobileNumberStep: number;
}

export interface PutLoginTypePayload {
  loginType: LoginType;
}

export interface PutLocalLoginTypePayload {

}

export interface PutCountryPayload {
  country: Country;
}

export interface PutChangeMobileNumberStepPayload {
  changeMobileNumberStep: number;
}
export interface PutChangeMobileNumberUniqueIdPayload {
  uniqueId: string;
}
export interface PutChangeMobileNumberMobilePayload {
  mobile: string;
}
export interface PutChangeMobileNumberCountryPayload {
  country: Country;
}
