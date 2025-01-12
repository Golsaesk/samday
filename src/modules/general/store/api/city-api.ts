import axios from 'axios';
import { parseError, } from '@/modules/general/libraries/utils';
import {
  API_KEY, API_DOMAIN, GENERAL_ERROR,
  WEBSITE_DEFAULT_LOCALE, API_VERSION, DEFAULT_LIMIT,
} from '@modules/general/libraries/constants';
import {
  CityCriteria, CityDetailEntity, CityListEntity,
} from '@modules/general/libraries/city-types';

export async function fetchCityList(criteria: CityCriteria): Promise<CityListEntity> {
  try {
    const {
      limit,
      offset,
      provinceId,
      sorting,
      locale,
    } = criteria;

    const url = `${API_DOMAIN}/${API_VERSION}/sitemember/${locale || WEBSITE_DEFAULT_LOCALE}/cities?rankings=1,2${`&limit=${limit || DEFAULT_LIMIT}`
    }${(provinceId && provinceId > 0) ? `&province_id=${provinceId}` : ''
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

export async function fetchCityDetail(id: number, locale: string = WEBSITE_DEFAULT_LOCALE): Promise<CityDetailEntity> {
  try {
    const url = `${API_DOMAIN}/${API_VERSION}/sitemember/${locale || WEBSITE_DEFAULT_LOCALE}/cities/${id}`;
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