import axios from 'axios';
import {
  API_KEY, API_DOMAIN, WEBSITE_DEFAULT_LOCALE, API_VERSION,
  GENERAL_ERROR, DEFAULT_LIMIT,
} from '@modules/general/libraries/constants';
import {
  CategoryCriteria, CategoryDetailEntity, CategoryListEntity,
} from '@modules/category/libraries/category-types';
import { parseError, } from '@/modules/general/libraries/utils';

export const getCategoryListUrl = (criteria: CategoryCriteria) => {
  let url = '';
  try {
    const {
      limit,
      offset,
      moduleId,
      parentId,
      sorting,
      keywords,
      subdomainId,
      locale,
    } = criteria;

    url = `${API_DOMAIN}/${API_VERSION}/category/${locale || WEBSITE_DEFAULT_LOCALE}/categories?${limit ? `limit=${limit || DEFAULT_LIMIT}` : ''
    }${moduleId ? `&module_id=${moduleId || ''}` : ''
    }${parentId ? `&parent_id=${parentId || ''}` : ''
    }${subdomainId ? `&subdomain_id=${subdomainId || ''}` : ''
    }${(sorting && sorting.length)
      ? `&sort=${!sorting[0].ascending ? '-' : ''}${sorting[0].expression}`
      : ''
    }${(keywords)
      ? (`&search_keywords=${keywords}`
          + '&match_whole_word_for_search_keywords=true&search_mode=All'
      ) : ''
    }${`&offset=${offset || 0}`}`;
  } catch { }
  return url;
};

export async function fetchCategoryList(criteria: CategoryCriteria): Promise<CategoryListEntity> {
  try {
    const url = getCategoryListUrl(criteria);
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

export const getCategoryDetailUrl = (id: number, locale: string = WEBSITE_DEFAULT_LOCALE) => {
  return `${API_DOMAIN}/${API_VERSION}/category/${locale || WEBSITE_DEFAULT_LOCALE}/categories/${id}`;
};

export async function fetchCategoryDetail(id: number, locale: string = WEBSITE_DEFAULT_LOCALE): Promise<CategoryDetailEntity> {
  try {
    const url = getCategoryDetailUrl(id, locale);
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
