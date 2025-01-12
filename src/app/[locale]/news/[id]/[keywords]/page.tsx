import { Metadata, } from 'next';
import { getTranslations, } from 'next-intl/server';
import { getNewsUrl, } from '@/modules/news/libraries/utils';
import NewsDetail from '@/modules/news/components/news-detail';
import { getNewsDetailUrl, } from '@modules/news/store/api/news-api';
import NewsListEmpty from '@/modules/news/components/news-list-empty';
import GeneralLayout from '@/modules/layout/components/general-layout';
import { ServerPageProps, } from '@/modules/general/libraries/general-types';
import { News, NewsDetailEntity, } from '@/modules/news/libraries/news-types';
import NewsStructuredData from '@/modules/news/components/news-structured-data';
import { serverFetch, trimUrlKeywords, } from '@/modules/general/libraries/utils';
import { REVALIDATE_TIME_VERY_SHORT, WEBSITE_DEFAULT_LOCALE, } from '@/modules/general/libraries/constants';
import { redirect, } from 'next/navigation';

export async function generateMetadata(
  { params, }: ServerPageProps
): Promise<Metadata> {
  const
    t = await getTranslations({ locale: params.locale || WEBSITE_DEFAULT_LOCALE, }),
    newsDetailEntity: NewsDetailEntity
      = await serverFetch(getNewsDetailUrl(params.id, params.locale), REVALIDATE_TIME_VERY_SHORT);

  if (newsDetailEntity && newsDetailEntity.data) {
    const newsDetail = newsDetailEntity.data;
    return {
      title: `${newsDetail.seo.title || newsDetail?.title || ''} - ${t('common.app_name')}`,
      description: newsDetail.seo.description || newsDetail?.lead,
      openGraph: {
        title: newsDetail.seo.title || newsDetail?.title || '',
        description: newsDetail.seo.description || newsDetail?.lead,
        url: getNewsUrl(newsDetail, params.locale),
        images: [newsDetail.media?.path || '',],
      },
    };
  }
  return {};
}

const getServerSideProps = async (id: number, keywords: string, locale: string) => {
  let needRedirect: boolean = false;
  try {
    const newsDetailEntity: NewsDetailEntity = await serverFetch(getNewsDetailUrl(id, locale), REVALIDATE_TIME_VERY_SHORT);
    if (newsDetailEntity && newsDetailEntity.data) {
      const news = newsDetailEntity.data;
      const newsKeywords = decodeURI(trimUrlKeywords(news.seo && news.seo.url_keywords ? news.seo.url_keywords : news.title));
      if (decodeURI(keywords) !== newsKeywords) {
        needRedirect = true;
      }
      return {
        newsDetail: newsDetailEntity ? newsDetailEntity.data as News : null,
        needRedirect,
      };
    }
  } catch (error) {
    console.error('Error fetching news detail:', error);
  }
  return {
    newsDetail: null,
    needRedirect,
  };
};

const NewsDetailWithKeywordsPage = async ({ params, }: ServerPageProps) => {
  const
    { locale, } = params,
    id: number = params.id || 0,
    keywords: string = params.keywords || '',
    serverSideProps = await getServerSideProps(id, keywords, locale),
    {
      newsDetail,
      needRedirect,
    } = serverSideProps;

  if (needRedirect && newsDetail) {
    redirect(getNewsUrl(newsDetail, locale));
  }

  return (
    <GeneralLayout>
      {(newsDetail && newsDetail.id && keywords)
        ? (
          <>
            <NewsDetail news={newsDetail} />
            <NewsStructuredData news={newsDetail} locale={locale} />
          </>
        )
        : (
          <NewsListEmpty />
        )}
    </GeneralLayout>
  );
};

export default NewsDetailWithKeywordsPage;
