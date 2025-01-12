import { getTranslations, } from 'next-intl/server';
import { notFound, redirect, } from 'next/navigation';
import { getNewsUrl, } from '@modules/news/libraries/utils';
import { serverFetch, } from '@/modules/general/libraries/utils';
import { getNewsDetailUrl, } from '@modules/news/store/api/news-api';
import { ServerPageProps, } from '@/modules/general/libraries/general-types';
import { News, NewsDetailEntity, } from '@/modules/news/libraries/news-types';
import { WEBSITE_DEFAULT_LOCALE, REVALIDATE_TIME_VERY_SHORT, } from '@/modules/general/libraries/constants';

export async function generateMetadata({ params, }: ServerPageProps) {
  const t = await getTranslations({ locale: params.locale || WEBSITE_DEFAULT_LOCALE, });

  return {
    title: `${t('news.news_detail')} - ${t('common.app_name')}`,
    description: t('news.news_detail'),
  };
}

const getServerSideProps = async (id: number, locale: string) => {
  try {
    const newsDetailEntity: NewsDetailEntity = await serverFetch(getNewsDetailUrl(id, locale), REVALIDATE_TIME_VERY_SHORT);
    return { newsDetail: newsDetailEntity ? newsDetailEntity.data as News : null, };
  } catch (error) {
  }
  return { newsDetail: null, };
};

const NewsDetailPage = async ({ params, }: ServerPageProps) => {
  const
    { locale, } = params,
    id: number = params.id || 0,
    serverSideProps = await getServerSideProps(id, locale),
    { newsDetail, } = serverSideProps;

  if (newsDetail && newsDetail.id) {
    const url = getNewsUrl(newsDetail, locale);
    redirect(url);
  } else {
    notFound();
  }
};

export default NewsDetailPage;
