import axios from 'axios';
import {
  API_KEY, API_DOMAIN, GENERAL_ERROR, WEBSITE_DEFAULT_LOCALE,
  API_VERSION, DEFAULT_LIMIT,
} from '@modules/general/libraries/constants';
import {
  CategoryCriteria, CategoryDetailEntity, CategoryListEntity,
} from '@modules/category/libraries/category-types';
import { parseError, } from '@/modules/general/libraries/utils';

export const getCategoryListUrl = (criteria: CategoryCriteria, locale?: string) => {
  let url = '';
  try {
    const {
      limit,
      offset,
      moduleId,
      parentId,
      disableInWebservice,
      sorting,
      keywords,
      subdomainId,
    } = criteria;

    url = `${API_DOMAIN}/${API_VERSION}/category/${locale || WEBSITE_DEFAULT_LOCALE}/categories?${limit ? `limit=${limit || DEFAULT_LIMIT}` : ''
    }${moduleId ? `&module_id=${moduleId || ''}` : ''
    }${parentId ? `&parent_id=${parentId || ''}` : ''
    }${subdomainId ? `&subdomain_id=${subdomainId || ''}` : ''
    }${disableInWebservice ? `&disable_in_webservice=true'}` : ''
    }${(sorting && sorting.length)
      ? `&sort=${!sorting[0].ascending ? '-' : ''}${sorting[0].expression}`
      : ''
    }${(keywords)
      ? (`&search_keywords=${keywords}`
          + '&match_whole_word_for_search_keywords=true&search_mode=All'
      ) : ''
    }${`&offset=${offset || 0}`}`;
  } catch {}
  return url;
};

export async function fetchCategoryList(criteria: CategoryCriteria): Promise<CategoryListEntity> {
  try {
    const response = await axios.get<any>(getCategoryListUrl(criteria), {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      timeout: 10000,
    });

    if (response.data) {
      return response.data;
    }
  } catch (error: any) {
    return parseError(error);
  }

  return Promise.reject(GENERAL_ERROR);
}

export const getCategoryDetailUrl = (id: number, locale: string = WEBSITE_DEFAULT_LOCALE) => {
  return `${API_DOMAIN}/${API_VERSION}/category/${locale || WEBSITE_DEFAULT_LOCALE}/categories/${id}`;
};

export async function fetchCategoryDetail(id: number, locale: string): Promise<CategoryDetailEntity> {
  try {
    const response = await axios.get<any>(getCategoryDetailUrl(id, locale), {
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
