import { Metadata, } from 'next';
import { redirect, } from 'next/navigation';
import { getTranslations, } from 'next-intl/server';
import NewsDetail from '@/modules/news/components/news-detail';
import { getNewsDetailUrl, } from '@modules/news/store/api/news-api';
import NewsListEmpty from '@/modules/news/components/news-list-empty';
import GeneralLayout from '@/modules/layout/components/general-layout';
import { ServerPageProps, } from '@/modules/general/libraries/general-types';
import { News, NewsDetailEntity, } from '@/modules/news/libraries/news-types';
import NewsStructuredData from '@/modules/news/components/news-structured-data';
import { serverFetch, trimUrlKeywords, } from '@/modules/general/libraries/utils';
import { getNationalDatabaseUrl, } from '@/modules/national-database/libraries/utils';
import {
  REVALIDATE_TIME_VERY_SHORT,
  WEBSITE_DEFAULT_LOCALE,
} from '@/modules/general/libraries/constants';

export async function generateMetadata(
  { params, }: ServerPageProps
): Promise<Metadata> {
  const
    t = await getTranslations({ locale: params.locale || WEBSITE_DEFAULT_LOCALE, }),
    nationalDatabaseDetailEntity: NewsDetailEntity =
    await serverFetch(getNewsDetailUrl(params.id, params.locale), REVALIDATE_TIME_VERY_SHORT);

  if (nationalDatabaseDetailEntity && nationalDatabaseDetailEntity.data) {
    const nationalDatabaseDetail = nationalDatabaseDetailEntity.data;
    return {
      title: `${nationalDatabaseDetail.seo.title || nationalDatabaseDetail?.title || ''} - ${t('common.app_name')}`,
      description: nationalDatabaseDetail.seo.description || nationalDatabaseDetail?.lead,
      openGraph: {
        title: nationalDatabaseDetail.seo.title || nationalDatabaseDetail?.title || '',
        description: nationalDatabaseDetail.seo.description || nationalDatabaseDetail?.lead,
        url: getNationalDatabaseUrl(nationalDatabaseDetail, params.locale),
        images: [nationalDatabaseDetail.media?.path || '',],
      },
    };
  }
  return {};
}

const getServerSideProps = async (id: number, keywords: string, locale: string) => {
  let needRedirect: boolean = false;

  try {
    const nationalDatabaseDetailEntity: NewsDetailEntity = await serverFetch(getNewsDetailUrl(id, locale), REVALIDATE_TIME_VERY_SHORT);
    if (nationalDatabaseDetailEntity && nationalDatabaseDetailEntity.data) {
      const news = nationalDatabaseDetailEntity.data;
      const newsKeywords = decodeURI(trimUrlKeywords(news.seo && news.seo.url_keywords ? news.seo.url_keywords : news.title));
      if (decodeURI(keywords) !== newsKeywords) {
        needRedirect = true;
      }
      return {
        nationalDatabaseDetail: nationalDatabaseDetailEntity ? nationalDatabaseDetailEntity.data as News : null, needRedirect,
      };
    }
  } catch (error) {
  }
  return {
    nationalDatabaseDetail: null, needRedirect,
  };
};

const NationalDatabaseDetailWithKeywordsPage = async ({ params, }: ServerPageProps) => {
  const
    { locale, } = params,
    id: number = params.id || 0,
    keywords: string = params.keywords || '',
    serverSideProps = await getServerSideProps(id, keywords, locale),
    {
      nationalDatabaseDetail, needRedirect,
    } = serverSideProps;

  if (needRedirect && nationalDatabaseDetail) {
    redirect(getNationalDatabaseUrl(nationalDatabaseDetail, locale));
  }

  return (
    <GeneralLayout>
      {(nationalDatabaseDetail && nationalDatabaseDetail.id && keywords) ? (
        <>
          <NewsDetail news={nationalDatabaseDetail} />
          <NewsStructuredData news={nationalDatabaseDetail} locale={locale} />
        </>
      ) : (
        <NewsListEmpty />
      )}
    </GeneralLayout>
  );

};

export default NationalDatabaseDetailWithKeywordsPage;
