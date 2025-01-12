import axios from 'axios';
import { parseError, } from '@/modules/general/libraries/utils';
import {
  API_KEY, API_DOMAIN, WEBSITE_DEFAULT_LOCALE,
  API_VERSION, GENERAL_ERROR, DEFAULT_LIMIT,
} from '@modules/general/libraries/constants';
import {
  NewsCriteria, NewsDetailEntity, NewsListEntity,
} from '@modules/news/libraries/news-types';

export const getNewsListUrl = (criteria: NewsCriteria) => {
  let url = '';
  try {
    const {
      limit,
      offset,
      categoryIds,
      typeIds,
      outputIds,
      subdomainId,
      keywords,
      tags,
      sorting,
      locale,
    } = criteria;
    url = `${API_DOMAIN}/${API_VERSION}/news/${locale || WEBSITE_DEFAULT_LOCALE}/news?${
      `limit=${limit || DEFAULT_LIMIT}`
    }${(categoryIds) ? `&category_ids=${categoryIds}` : ''
    }${(typeIds) ? `&type_ids=${typeIds}` : ''
    }${(outputIds) ? `&output_ids=${outputIds}` : ''
    }${(tags) ? `&tags=${encodeURI(tags)}` : ''
    }${`&subdomain_Id=${subdomainId}`
    }${(keywords)
      ? (`&search_keywords=${keywords}&search_mode=All`
      ) : ''
    }${(sorting && sorting.length)
      ? `&sort=${!sorting[0].ascending ? '-' : ''}${sorting[0].expression}`
      : ''
    }${`&offset=${offset || 0}`}`;
  } catch {}
  return url;
};

export async function fetchNewsList(criteria: NewsCriteria): Promise<NewsListEntity> {
  try {
    const response = await axios.get<any>(getNewsListUrl(criteria), {
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

export const getNewsDetailUrl = (id: number, locale: string = WEBSITE_DEFAULT_LOCALE) => {
  const url = `${API_DOMAIN}/${API_VERSION}/news/${locale || WEBSITE_DEFAULT_LOCALE}/news/${id}`;
  return url;
};

export async function fetchNewsDetail(id: number, locale: string): Promise<NewsDetailEntity> {
  try {
    const response = await axios.get<any>(getNewsDetailUrl(id, locale), {
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
