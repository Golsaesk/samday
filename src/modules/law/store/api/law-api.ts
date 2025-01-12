import axios from 'axios';
import { parseError, } from '@/modules/general/libraries/utils';
import {
  API_KEY, API_DOMAIN, WEBSITE_DEFAULT_LOCALE,
  API_VERSION, GENERAL_ERROR, DEFAULT_LIMIT,
} from '@modules/general/libraries/constants';
import {
  LawCriteria, LawDetailEntity,
  LawListEntity,
  LawYearCriteria,
  LawYearListEntity,
} from '@modules/law/libraries/law-types';

export const getLawListUrl = (criteria: LawCriteria) => {
  let url = '';
  try {
    const {
      limit,
      offset,
      sorting,
      searchText,
      organizationId,
      approvalYearFrom,
      approvalYearTo,
      categoryIds,
      locale,
    } = criteria;
    url = `${API_DOMAIN}/${API_VERSION}/law/${locale || WEBSITE_DEFAULT_LOCALE}/laws?${
      `limit=${limit || DEFAULT_LIMIT}`
    }${(categoryIds) ? `&category_ids=${categoryIds}` : ''
    }${(organizationId) ? `&organization_id=${organizationId}` : ''
    }${(searchText)
      ? (`&search_text=${searchText}&search_mode=All`
      ) : ''
    }${(sorting && sorting.length)
      ? `&sort=${!sorting[0].ascending ? '-' : ''}${sorting[0].expression}`
      : ''
    }${`&offset=${offset || 0}${(approvalYearFrom) ? `&approvalYearFrom=${approvalYearFrom}` : ''
    }${(approvalYearTo) ? `&approvalYearTo=${approvalYearTo}` : ''
    }`}`;
  } catch {}

  return url;
};

export async function fetchLawList(criteria: LawCriteria): Promise<LawListEntity> {
  try {
    const response = await axios.get<any>(getLawListUrl(criteria), {
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

export const getLawDetailUrl = (id: number, locale: string = WEBSITE_DEFAULT_LOCALE) => {
  return `${API_DOMAIN}/${API_VERSION}/law/${locale || WEBSITE_DEFAULT_LOCALE}/laws/${id}`;
};

export async function fetchLawDetail(id: number, locale: string): Promise<LawDetailEntity> {
  try {
    const response = await axios.get<any>(getLawDetailUrl(id, locale), {
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
//-------------------------------------------------
export const getLawYearListUrl = (criteria: LawYearCriteria) => {
  let url = '';
  try {
    const {
      approvalYear,
      count,
      categoryIds,
      sorting,
      locale,
    } = criteria;
    url = `${API_DOMAIN}/${API_VERSION}/law/${locale || WEBSITE_DEFAULT_LOCALE}/laws/groupbyapprovalyear?${
      (approvalYear) ? `&approval_year=${approvalYear}` : ''
    }${(count) ? `&count=${count}` : ''
    }${(categoryIds) ? `&categoryIds=${categoryIds}` : ''
    }${(sorting && sorting.length)
      ? `&sort=${!sorting[0].ascending ? '-' : ''}${sorting[0].expression}`
      : ''
    }`;
  } catch {}
  return url;
};

export async function fetchLawYearList(criteria: LawYearCriteria): Promise<LawYearListEntity> {
  try {
    const response = await axios.get<any>(getLawYearListUrl(criteria), {
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