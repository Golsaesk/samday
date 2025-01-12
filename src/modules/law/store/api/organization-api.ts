import axios from 'axios';
import { parseError, } from '@/modules/general/libraries/utils';
import {
  API_KEY, API_DOMAIN, WEBSITE_DEFAULT_LOCALE,
  API_VERSION, GENERAL_ERROR, DEFAULT_LIMIT,
} from '@modules/general/libraries/constants';
import {
  OrganizationCriteria, OrganizationDetailEntity,
  OrganizationListEntity,
} from '@modules/law/libraries/organization-types';

export const getOrganizationListUrl = (criteria: OrganizationCriteria) => {
  let url = '';
  try {
    const {
      limit,
      offset,
      sorting,
      locale,
    } = criteria;
    url = `${API_DOMAIN}/${API_VERSION}/organization/${locale || WEBSITE_DEFAULT_LOCALE}/organizations?${
      `limit=${limit || DEFAULT_LIMIT}`
    }${(sorting && sorting.length)
      ? `&sort=${!sorting[0].ascending ? '-' : ''}${sorting[0].expression}`
      : ''
    }${`&offset=${offset || 0}`}`;
  } catch {}
  return url;
};

export async function fetchOrganizationList(criteria: OrganizationCriteria): Promise<OrganizationListEntity> {
  try {
    const response = await axios.get<any>(getOrganizationListUrl(criteria), {
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

export const getOrganizationDetailUrl = (id: number, locale: string = WEBSITE_DEFAULT_LOCALE) => {
  return `${API_DOMAIN}/${API_VERSION}/organization/${locale || WEBSITE_DEFAULT_LOCALE}/organizations/${id}`;
};

export async function fetchOrganizationDetail(id: number, locale: string): Promise<OrganizationDetailEntity> {
  try {
    const response = await axios.get<any>(getOrganizationDetailUrl(id, locale), {
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
