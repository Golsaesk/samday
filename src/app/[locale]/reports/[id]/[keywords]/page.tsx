import { Metadata, } from 'next';
import { redirect, } from 'next/navigation';
import { getTranslations, } from 'next-intl/server';
import { getNewsUrl, } from '@/modules/news/libraries/utils';
import NewsDetail from '@/modules/news/components/news-detail';
import { getReportUrl, } from '@/modules/report/libraries/utils';
import { getNewsDetailUrl, } from '@modules/news/store/api/news-api';
import NewsListEmpty from '@/modules/news/components/news-list-empty';
import GeneralLayout from '@/modules/layout/components/general-layout';
import { ServerPageProps, } from '@/modules/general/libraries/general-types';
import { News, NewsDetailEntity, } from '@/modules/news/libraries/news-types';
import NewsStructuredData from '@/modules/news/components/news-structured-data';
import { serverFetch, trimUrlKeywords, } from '@/modules/general/libraries/utils';
import { REVALIDATE_TIME_VERY_SHORT, WEBSITE_DEFAULT_LOCALE, } from '@/modules/general/libraries/constants';

export async function generateMetadata(
  { params, }: ServerPageProps
): Promise<Metadata> {
  const
    t = await getTranslations({ locale: params.locale || WEBSITE_DEFAULT_LOCALE, }),
    reportDetailEntity: NewsDetailEntity =
    await serverFetch(getNewsDetailUrl(params.id, params.locale), REVALIDATE_TIME_VERY_SHORT);

  if (reportDetailEntity && reportDetailEntity.data) {
    const reportDetail = reportDetailEntity.data;
    return {
      title: `${reportDetail.seo.title || reportDetail?.title || ''} - ${t('common.app_name')}`,
      description: reportDetail.seo.description || reportDetail?.lead,
      openGraph: {
        title: reportDetail.seo.title || reportDetail?.title || '',
        description: reportDetail.seo.description || reportDetail?.lead,
        url: getNewsUrl(reportDetail, params.locale),
        images: [reportDetail.media?.path || '',],
      },
    };
  }
  return {};
}

const getServerSideProps = async (id: number, keywords: string, locale: string) => {
  let needRedirect: boolean = false;

  try {
    const reportDetailEntity: NewsDetailEntity = await serverFetch(getNewsDetailUrl(id, locale), REVALIDATE_TIME_VERY_SHORT);
    if (reportDetailEntity && reportDetailEntity.data) {
      const news = reportDetailEntity.data;
      const newsKeywords = decodeURI(trimUrlKeywords(news.seo && news.seo.url_keywords ? news.seo.url_keywords : news.title));
      if (decodeURI(keywords) !== newsKeywords) {
        needRedirect = true;
      }
      return {
        reportDetail: reportDetailEntity ? reportDetailEntity.data as News : null, needRedirect,
      };
    }
  } catch (error) {
  }
  return {
    reportDetail: null, needRedirect,
  };
};

const ReportDetailWithKeywordsPage = async ({ params, }: ServerPageProps) => {
  const
    { locale, } = params,
    id: number = params.id || 0,
    keywords: string = params.keywords || '',
    serverSideProps = await getServerSideProps(id, keywords, locale),
    {
      reportDetail, needRedirect,
    } = serverSideProps;

  if (needRedirect && reportDetail) {
    redirect(getReportUrl(reportDetail, locale));
  }

  return (
    <GeneralLayout>
      {(reportDetail && reportDetail.id && keywords) ? (
        <>
          <NewsDetail news={reportDetail} />
          <NewsStructuredData news={reportDetail} locale={locale} />
        </>
      ) : (
        <NewsListEmpty />
      )}
    </GeneralLayout>
  );

};

export default ReportDetailWithKeywordsPage;
