import { NewsState, } from '@modules/news/libraries/news-types';

export const initNewsState: NewsState = {
  detail: {},
  list: {},
};
export const resetHelper = () => initNewsState;