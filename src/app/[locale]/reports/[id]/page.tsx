import { getTranslations, } from 'next-intl/server';
import { notFound, redirect, } from 'next/navigation';
import { getReportUrl, } from '@/modules/report/libraries/utils';
import { serverFetch, } from '@/modules/general/libraries/utils';
import { getNewsDetailUrl, } from '@modules/news/store/api/news-api';
import { ServerPageProps, } from '@/modules/general/libraries/general-types';
import { News, NewsDetailEntity, } from '@/modules/news/libraries/news-types';
import { WEBSITE_DEFAULT_LOCALE, REVALIDATE_TIME_VERY_SHORT, } from '@/modules/general/libraries/constants';

export async function generateMetadata({ params, }: ServerPageProps) {
  const t = await getTranslations({ locale: params.locale || WEBSITE_DEFAULT_LOCALE, });

  return {
    title: `${t('reports.reports_list')} - ${t('common.app_name')}`,
    description: t('reports.reports_list'),
  };
}

const getServerSideProps = async (id: number, locale: string) => {

  try {
    const reportDetailEntity: NewsDetailEntity = await serverFetch(getNewsDetailUrl(id, locale), REVALIDATE_TIME_VERY_SHORT);
    return { reportDetail: reportDetailEntity ? reportDetailEntity.data as News : null, };
  } catch (error) {
  }
  return { reportDetail: null, };

};

const ReportDetailPage = async ({ params, }: ServerPageProps) => {
  const

    { locale, } = params,
    id: number = params.id || 0,
    serverSideProps = await getServerSideProps(id, locale),
    { reportDetail, } = serverSideProps;

  if (reportDetail && reportDetail.id) {
    const url = getReportUrl(reportDetail, locale);
    redirect(url);
  } else {
    notFound();
  }
};

export default ReportDetailPage;
