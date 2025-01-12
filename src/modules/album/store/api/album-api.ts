import axios from 'axios';
import {
  API_KEY, API_DOMAIN, WEBSITE_DEFAULT_LOCALE, API_VERSION,
  GENERAL_ERROR, DEFAULT_LIMIT,
} from '@modules/general/libraries/constants';
import {
  AlbumCriteria, AlbumDetailEntity, AlbumListEntity,
} from '@modules/album/libraries/album-types';
import { parseError, } from '@/modules/general/libraries/utils';

export const getAlbumListUrl = (criteria: AlbumCriteria) => {
  let url = '';
  try {
    const {
      limit,
      offset,
      categoryId,
      sorting,
      locale,
    } = criteria;

    url = `${API_DOMAIN}/${API_VERSION}/album/${locale || WEBSITE_DEFAULT_LOCALE}/albums?${`limit=${limit || DEFAULT_LIMIT}`
    }${(categoryId) ? `&category_id=${categoryId}` : ''
    }${(sorting && sorting.length)
      ? `&sort=${!sorting[0].ascending ? '-' : ''}${sorting[0].expression}`
      : ''
    }${`&offset=${offset || 0}`}`;
  } catch {}

  return url;
};

export async function fetchAlbumList(criteria: AlbumCriteria): Promise<AlbumListEntity> {
  try {
    const response = await axios.get<any>(getAlbumListUrl(criteria), {
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

export const getAlbumDetailUrl = (id: number, locale: string = WEBSITE_DEFAULT_LOCALE) => {
  return `${API_DOMAIN}/${API_VERSION}/album/${locale || WEBSITE_DEFAULT_LOCALE}/albums/${id}`;
};

export async function fetchAlbumDetail(id: number, locale: string = WEBSITE_DEFAULT_LOCALE): Promise<AlbumDetailEntity> {
  try {
    const response = await axios.get<any>(getAlbumDetailUrl(id, locale), {
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
