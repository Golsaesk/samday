import {
  API_DOMAIN, API_VERSION, WEBSITE_DEFAULT_LOCALE,
} from '@/modules/general/libraries/constants';

export const getMediaDetailUrl = (id: number, locale: string = WEBSITE_DEFAULT_LOCALE) => {
  return `${API_DOMAIN}/${API_VERSION}/media/${locale || WEBSITE_DEFAULT_LOCALE}/media/${id}`;
};