import axios from 'axios';
import {
  API_KEY, API_DOMAIN, GENERAL_ERROR, WEBSITE_DEFAULT_LOCALE, API_VERSION, DEFAULT_LIMIT,
} from '@modules/general/libraries/constants';
import {
  ProvinceCriteria, ProvinceDetailEntity, ProvinceListEntity,
} from '@modules/general/libraries/province-types';
import { parseError, } from '@/modules/general/libraries/utils';

export async function fetchProvinceList(criteria: ProvinceCriteria): Promise<ProvinceListEntity> {
  try {
    const {
      limit,
      offset,
      countryId,
      sorting,
      locale,
    } = criteria;

    const url = `${API_DOMAIN}/${API_VERSION}/sitemember/${locale || WEBSITE_DEFAULT_LOCALE}/provinces?${`limit=${limit || DEFAULT_LIMIT}`
    }${(countryId && countryId > 0) ? `&country_id=${countryId}` : ''
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

export async function fetchProvinceDetail(id: number, locale: string = WEBSITE_DEFAULT_LOCALE): Promise<ProvinceDetailEntity> {
  try {
    const url = `${API_DOMAIN}/${API_VERSION}/sitemember/${locale || WEBSITE_DEFAULT_LOCALE}/provinces/${id}`;
    const response = await axios.get<any>(url, {
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