import { serverFetch, } from './utils';
import { REVALIDATE_TIME_VERY_SHORT, } from './constants';
import { Law, } from '@/modules/law/libraries/law-types';
import { News, } from '@/modules/news/libraries/news-types';
import { getLawListUrl, } from '@/modules/law/store/api/law-api';
import { Submenu, } from '@/modules/layout/libraries/layout-types';
import { getNewsListUrl, } from '@/modules/news/store/api/news-api';
import { ORGANIZATION_MAIN_ID, } from '@/modules/law/libraries/constants';

export const getMenuProps = async (locale: string): Promise<Submenu> => {

  let
    lawListEntity,
    reportListEntity,
    newsListEntity;

  try {
    lawListEntity = await serverFetch(getLawListUrl({
      offset: 0,
      limit: 10,
      organizationId: ORGANIZATION_MAIN_ID,
      sorting: [],
      locale,
    }), REVALIDATE_TIME_VERY_SHORT);

  } catch (error) {
  }

  try {
    const newsTypeId =
    locale === 'fa' ?
      Number(process?.env?.TYPE_NORMAL_NEWS_FA).valueOf() || 0 :
      Number(process?.env?.TYPE_NORMAL_NEWS_EN).valueOf() || 0;

    newsListEntity = await serverFetch(getNewsListUrl({
      offset: 0,
      limit: 10,
      typeIds: `${newsTypeId}`,
      outputIds: '',
      categoryIds: '',
      keywords: '',
      sorting: [],
      subdomainId: 0,
      locale,
    }), REVALIDATE_TIME_VERY_SHORT);
  } catch {

  }

  try {
    const reportTypeId =
    locale === 'fa' ?
      Number(process?.env?.TYPE_REPORT_NEWS_FA).valueOf() || 0 :
      Number(process?.env?.TYPE_REPORT_NEWS_EN).valueOf() || 0;

    reportListEntity = await serverFetch(getNewsListUrl({
      offset: 0,
      limit: 10,
      outputIds: '',
      categoryIds: '',
      typeIds: `${reportTypeId}`,
      keywords: '',
      sorting: [],
      subdomainId: 0,
      locale,
    }), REVALIDATE_TIME_VERY_SHORT);
  } catch {

  }

  return {
    lawList: lawListEntity ? lawListEntity.data as Law[] : null,
    newsList: newsListEntity ? newsListEntity.data as News[] : null,
    reportList: reportListEntity ? reportListEntity.data as News[] : null,
  };
};