import { CityState, } from '@modules/general/libraries/city-types';

export const initCityState: CityState = {
  detail: {},
  list: {},
};
export const resetHelper = () => initCityState;