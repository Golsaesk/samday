import { ProvinceState, } from '@modules/general/libraries/province-types';

export const initProvinceState: ProvinceState = {
  detail: {},
  list: {},
};
export const resetHelper = () => initProvinceState;