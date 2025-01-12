import { createSlice, } from '@reduxjs/toolkit';
import {
  initMemberState, loadLocalLoginTypeHelper, putCanLoginHelper, putChangeMobileNumberCountryHelper,
  putChangeMobileNumberMobileHelper, putChangeMobileNumberStepHelper, putChangeMobileNumberUniqueIdHelper,
  putCountryHelper, putFirstNameHelper,
  putIsNewMemberHelper, putLastNameHelper, putLoginTypeHelper, putMemberExistsHelper, putMobileNumberHelper,
  putMobileNumberStepHelper, putSecurityCodeHelper, putStepHelper, resetHelper,
} from './member-helper';

export const memberSlice = createSlice({
  name: 'member',
  initialState: initMemberState,
  reducers: {
    reset: resetHelper,
    putStep: putStepHelper,
    putCountry: putCountryHelper,
    putCanLogin: putCanLoginHelper,
    putLastName: putLastNameHelper,
    putLoginType: putLoginTypeHelper,
    putFirstName: putFirstNameHelper,
    putIsNewMember: putIsNewMemberHelper,
    putMobileNumber: putMobileNumberHelper,
    putMemberExists: putMemberExistsHelper,
    putSecurityCode: putSecurityCodeHelper,
    loadLocalLoginType: loadLocalLoginTypeHelper,
    putMobileNumberStep: putMobileNumberStepHelper,
    putChangeMobileNumberStep: putChangeMobileNumberStepHelper,
    putChangeMobileNumberUniqueId: putChangeMobileNumberUniqueIdHelper,
    putChangeMobileNumberMobile: putChangeMobileNumberMobileHelper,
    putChangeMobileNumberCountry: putChangeMobileNumberCountryHelper,
  },
});

export const {
  reset,
  putStep,
  putCountry,
  putCanLogin,
  putLastName,
  putLoginType,
  putFirstName,
  putIsNewMember,
  putMobileNumber,
  putMemberExists,
  putSecurityCode,
  loadLocalLoginType,
  putMobileNumberStep,
  putChangeMobileNumberStep,
  putChangeMobileNumberUniqueId,
  putChangeMobileNumberMobile,
  putChangeMobileNumberCountry,
} = memberSlice.actions;

export default memberSlice.reducer;
