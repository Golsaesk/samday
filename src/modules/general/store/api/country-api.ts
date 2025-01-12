import axios from 'axios';
import {
  API_KEY, API_DOMAIN, GENERAL_ERROR, WEBSITE_DEFAULT_LOCALE, API_VERSION, DEFAULT_LIMIT,
} from '@modules/general/libraries/constants';
import { CountryCriteria, CountryListEntity, } from '@modules/general/libraries/country-types';
import { parseError, } from '@/modules/general/libraries/utils';

export async function fetchCountryList(criteria: CountryCriteria): Promise<CountryListEntity> {
  try {
    const {
      limit,
      offset,
      sorting,
      keywords,
      locale,
    } = criteria;

    const url = `${API_DOMAIN}/${API_VERSION}/sitemember/${locale || WEBSITE_DEFAULT_LOCALE}/countries?${
      `limit=${limit || DEFAULT_LIMIT}`
    }${(keywords)
      ? (`&title=${encodeURI(keywords)}`) : ''
    }${(sorting && sorting.length)
      ? `&sort=${!sorting[0].ascending ? '-' : ''}${sorting[0].expression}`
      : ''
    }${`&offset=${offset || 0}`}`;

    const response = await axios.get<any>(url, {
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

export async function fetchCountryListEn(criteria: CountryCriteria): Promise<CountryListEntity> {
  try {
    const {
      limit,
      offset,
      sorting,
      keywords,
    } = criteria;

    const url = `${API_DOMAIN}/${API_VERSION}/sitemember/en/countries?${
      `limit=${limit || DEFAULT_LIMIT}`
    }${(keywords)
      ? (`&title=${encodeURI(keywords)}`) : ''
    }${(sorting && sorting.length)
      ? `&sort=${!sorting[0].ascending ? '-' : ''}${sorting[0].expression}`
      : ''
    }${`&offset=${offset || 0}`}`;

    const response = await axios.get<any>(url, {
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
