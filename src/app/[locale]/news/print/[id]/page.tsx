import { Metadata, } from 'next';
import { getTranslations, } from 'next-intl/server';
import { getNewsUrl, } from '@/modules/news/libraries/utils';
import NewsPrint from '@/modules/news/components/news-print';
import { serverFetch, } from '@/modules/general/libraries/utils';
import PrintLayout from '@/modules/layout/components/print-layout';
import { getNewsDetailUrl, } from '@modules/news/store/api/news-api';
import { ServerPageProps, } from '@/modules/general/libraries/general-types';
import { News, NewsDetailEntity, } from '@/modules/news/libraries/news-types';
import { REVALIDATE_TIME_VERY_SHORT, WEBSITE_DEFAULT_LOCALE, } from '@/modules/general/libraries/constants';

export async function generateMetadata(
  { params, }: ServerPageProps
): Promise<Metadata> {
  const
    t = await getTranslations({ locale: params.locale || WEBSITE_DEFAULT_LOCALE, }),
    newsDetailEntity: NewsDetailEntity =
    await serverFetch(getNewsDetailUrl(params.id, params.locale), REVALIDATE_TIME_VERY_SHORT);

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

const getServerSideProps = async (id: number, locale: string) => {
  try {
    const newsDetailEntity: NewsDetailEntity = await serverFetch(getNewsDetailUrl(id, locale), REVALIDATE_TIME_VERY_SHORT);
    return { newsDetail: newsDetailEntity ? newsDetailEntity.data as News : null, };
  } catch (error) {
  }
  return { newsDetail: null, };
};

const NewsPrintPage = async ({ params, }: ServerPageProps) => {
  const
    { locale, } = params,
    id: number = params.id || 0,
    serverSideProps = await getServerSideProps(id, locale),
    { newsDetail, } = serverSideProps;

  return (
    <PrintLayout>
      {(newsDetail && newsDetail.id) ? (
        <>
          <NewsPrint news={newsDetail} />
        </>
      ) : (
        <></>
      )}
    </PrintLayout>
  );

};

export default NewsPrintPage;
