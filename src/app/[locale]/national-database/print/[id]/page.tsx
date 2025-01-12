import { Metadata, } from 'next';
import { getTranslations, } from 'next-intl/server';
import NewsPrint from '@/modules/news/components/news-print';
import { serverFetch, } from '@/modules/general/libraries/utils';
import PrintLayout from '@/modules/layout/components/print-layout';
import { getNewsDetailUrl, } from '@modules/news/store/api/news-api';
import { ServerPageProps, } from '@/modules/general/libraries/general-types';
import { News, NewsDetailEntity, } from '@/modules/news/libraries/news-types';
import { getNationalDatabaseUrl, } from '@/modules/national-database/libraries/utils';
import { REVALIDATE_TIME_VERY_SHORT, WEBSITE_DEFAULT_LOCALE, } from '@/modules/general/libraries/constants';

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

const getServerSideProps = async (id: number, locale: string) => {
  try {
    const nationalDatabaseDetailEntity: NewsDetailEntity = await serverFetch(getNewsDetailUrl(id, locale), REVALIDATE_TIME_VERY_SHORT);
    return { nationalDatabaseDetail: nationalDatabaseDetailEntity ? nationalDatabaseDetailEntity.data as News : null, };
  } catch (error) {
  }
  return { nationalDatabaseDetail: null, };
};

const NationalDatabaseDetailPrintPage = async ({ params, }: ServerPageProps) => {
  const
    { locale, } = params,
    id: number = params.id || 0,
    serverSideProps = await getServerSideProps(id, locale),
    { nationalDatabaseDetail, } = serverSideProps;

  return (
    <PrintLayout>
      {(nationalDatabaseDetail && nationalDatabaseDetail.id) ? (
        <>
          <NewsPrint news={nationalDatabaseDetail} />
        </>
      ) : (
        <></>
      )}
    </PrintLayout>
  );

};

export default NationalDatabaseDetailPrintPage;
