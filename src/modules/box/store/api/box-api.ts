import axios from 'axios';
import {
  API_KEY, API_DOMAIN, WEBSITE_DEFAULT_LOCALE,
  API_VERSION, GENERAL_ERROR, DEFAULT_LIMIT,
} from '@modules/general/libraries/constants';
import {
  BoxCriteria, BoxDetailEntity, BoxListEntity,
} from '@modules/box/libraries/box-types';
import { parseError, } from '@/modules/general/libraries/utils';

export const getBoxListUrl = (criteria: BoxCriteria) => {
  let url = '';
  try {
    const {
      limit,
      offset,
      pageId,
      sorting,
      searchKeywords,
      locale,
    } = criteria;

    url = `${API_DOMAIN}/${API_VERSION}/cms/${locale || WEBSITE_DEFAULT_LOCALE}/boxes?${
      `limit=${limit || DEFAULT_LIMIT}`
    }${(pageId) ? `&pageId=${pageId}` : ''
    }${(searchKeywords)
      ? (`&search_keywords=${searchKeywords}`
        + '&match_whole_word_for_search_keywords=true&search_mode=All'
      ) : ''
    }${(sorting && sorting.length)
      ? `&sort=${!sorting[0].ascending ? '-' : ''}${sorting[0].expression}`
      : ''
    }${`&offset=${offset || 0}`}`;
  } catch {}

  return url;
};

export async function fetchBoxList(criteria: BoxCriteria): Promise<BoxListEntity> {
  try {
    const response = await axios.get<any>(getBoxListUrl(criteria), {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
    });
    if (response.data) {
      const list = response.data;
      return list;
    }
  } catch (error: any) {
    return parseError(error);
  }
  return Promise.reject(GENERAL_ERROR);
}

export const getBoxDetailUrl = (id: number, locale: string = WEBSITE_DEFAULT_LOCALE) => {
  return `${API_DOMAIN}/${API_VERSION}/cms/${locale || WEBSITE_DEFAULT_LOCALE}/boxes/${id}`;
};

export async function fetchBoxDetail(id: number, locale: string = WEBSITE_DEFAULT_LOCALE): Promise<BoxDetailEntity> {
  try {
    const response = await axios.get<any>(getBoxDetailUrl(id, locale), {
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json',
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
