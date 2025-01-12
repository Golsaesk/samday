import {
  MemberState,
  PutMobileNumberPayload,
  PutMemberExistsPayload,
  PutCanLoginPayload,
  PutSecurityCodePayload,
  PutStepPayload,
  PutIsNewMemberPayload,
  PutLastNamePayload,
  PutFirstNamePayload,
  PutMobileNumberStepPayload,
  PutLoginTypePayload,
  PutCountryPayload,
  PutChangeMobileNumberStepPayload,
  PutChangeMobileNumberUniqueIdPayload,
  PutChangeMobileNumberMobilePayload,
  PutChangeMobileNumberCountryPayload,
} from '@modules/member/libraries/login-types';
import { LoginType, } from '@modules/member/libraries/constants';
import { getDefaultLoginType, getLoginTypes, } from '@modules/member/libraries/utils';
import { Country, } from '@modules/general/libraries/country-types';
import { PayloadAction, } from '@reduxjs/toolkit';

export const initMemberState: MemberState = {
  step: 1,
  mobileNumberStep: 1,
  isNewMember: false,
  mobileNumber: '',
  firstName: '',
  lastName: '',
  captchaId: '',
  captchaValue: '',
  memberExists: null,
  canLogin: null,
  securityCode: null,
  loginType: getDefaultLoginType(),
  country: {} as Country,
  changeMobileNumberStep: 1,
  changeMobileNumberUniqueId: '',
  changeMobileNumberMobile: '',
  changeMobileNumberCountry: {} as Country,
};

const saveLoginType = (loginType: LoginType) => {
  localStorage.setItem('loginType', `${loginType}`);
};

export const loadLocalLoginTypeHelper = (state: MemberState) => {
  let loginType = getDefaultLoginType();

  try {
    const localLoginType = `${localStorage.getItem('loginType')}`;

    if (localLoginType !== '') {
      if (getLoginTypes().includes(parseInt(localLoginType) as LoginType)) {
        loginType = parseInt(localLoginType) as LoginType;
      }
    }
  } catch {
  }
  state.loginType = loginType;
};

export const putMobileNumberHelper = (state: MemberState, action: PayloadAction<PutMobileNumberPayload>) => {
  state.mobileNumber = action.payload.mobileNumber;
};

export const putLoginTypeHelper = (state: MemberState, action: PayloadAction<PutLoginTypePayload>) => {
  try {
    saveLoginType(action.payload.loginType);
  } catch {

  }
  state.loginType = action.payload.loginType;
};

export const putCanLoginHelper = (state: MemberState, action: PayloadAction<PutCanLoginPayload>) => {
  state.canLogin = action.payload.canLogin;
};

export const putMemberExistsHelper = (state: MemberState, action: PayloadAction<PutMemberExistsPayload>) => {
  state.memberExists = action.payload.memberExists;
};

export const putSecurityCodeHelper = (state: MemberState, action: PayloadAction<PutSecurityCodePayload>) => {
  state.securityCode = action.payload.securityCode;
};

export const putStepHelper = (state: MemberState, action: PayloadAction<PutStepPayload>) => {
  state.step = action.payload.step;
};

export const putIsNewMemberHelper = (state: MemberState, action: PayloadAction<PutIsNewMemberPayload>) => {
  state.isNewMember = action.payload.isNewMember;
};

export const putFirstNameHelper = (state: MemberState, action: PayloadAction<PutFirstNamePayload>) => {
  state.firstName = action.payload.firstName;
};

export const putLastNameHelper = (state: MemberState, action: PayloadAction<PutLastNamePayload>) => {
  state.lastName = action.payload.lastName;
};

export const putMobileNumberStepHelper = (state: MemberState, action: PayloadAction<PutMobileNumberStepPayload>) => {
  state.mobileNumberStep = action.payload.mobileNumberStep;
};

export const putCountryHelper = (state: MemberState, action: PayloadAction<PutCountryPayload>) => {
  state.country = action.payload.country;
};

export const putChangeMobileNumberStepHelper = (state: MemberState, action: PayloadAction<PutChangeMobileNumberStepPayload>) => {
  state.changeMobileNumberStep = action.payload.changeMobileNumberStep;
};

export const putChangeMobileNumberUniqueIdHelper = (state: MemberState, action: PayloadAction<PutChangeMobileNumberUniqueIdPayload>) => {
  state.changeMobileNumberUniqueId = action.payload.uniqueId;
};
export const putChangeMobileNumberMobileHelper = (state: MemberState, action: PayloadAction<PutChangeMobileNumberMobilePayload>) => {
  state.changeMobileNumberMobile = action.payload.mobile;
};
export const putChangeMobileNumberCountryHelper = (state: MemberState, action: PayloadAction<PutChangeMobileNumberCountryPayload>) => {
  state.changeMobileNumberCountry = action.payload.country;
};

export const resetHelper = () => initMemberState;