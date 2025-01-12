import { getTranslations, } from 'next-intl/server';
import { notFound, redirect, } from 'next/navigation';
import { serverFetch, } from '@/modules/general/libraries/utils';
import { getNewsDetailUrl, } from '@modules/news/store/api/news-api';
import { ServerPageProps, } from '@/modules/general/libraries/general-types';
import { News, NewsDetailEntity, } from '@/modules/news/libraries/news-types';
import { getNationalDatabaseUrl, } from '@/modules/national-database/libraries/utils';
import {
  WEBSITE_DEFAULT_LOCALE,
  REVALIDATE_TIME_VERY_SHORT,
} from '@/modules/general/libraries/constants';

export async function generateMetadata({ params, }: ServerPageProps) {
  const t = await getTranslations({ locale: params.locale || WEBSITE_DEFAULT_LOCALE, });
  return {
    title: `${t('national-database.title')} - ${t('common.app_name')}`,
    description: t('national-database.title'),
  };
}

const getServerSideProps = async (id: number, locale: string) => {

  try {
    const nationalDatabaseDetailEntity: NewsDetailEntity = await serverFetch(getNewsDetailUrl(id, locale), REVALIDATE_TIME_VERY_SHORT);
    return { nationalDatabaseDetail: nationalDatabaseDetailEntity ? nationalDatabaseDetailEntity.data as News : null, };
  } catch (error) {
  }
  return { reportDetail: null, };

};

const NationalDatabaseDetailPage = async ({ params, }: ServerPageProps) => {
  const

    { locale, } = params,
    id: number = params.id || 0,
    serverSideProps = await getServerSideProps(id, locale),
    { nationalDatabaseDetail, } = serverSideProps;

  if (nationalDatabaseDetail && nationalDatabaseDetail.id) {
    const url = getNationalDatabaseUrl(nationalDatabaseDetail, locale);
    redirect(url);
  } else {
    notFound();
  }
};

export default NationalDatabaseDetailPage;
