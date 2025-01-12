import { Metadata, } from 'next';
import { getTranslations, } from 'next-intl/server';
import Layout from '@/modules/layout/components/layout';
import { getLawUrl, } from '@/modules/law/libraries/utils';
import { News, } from '@/modules/news/libraries/news-types';
import LawDetail from '@/modules/law/components/law-detail';
import { serverFetch, } from '@/modules/general/libraries/utils';
import { ColorType, } from '@/modules/layout/libraries/constants';
import { getLawDetailUrl, } from '@modules/law/store/api/law-api';
import Breadcrumbs from '@/modules/general/components/breadcrumbs';
import { getNewsListUrl, } from '@/modules/news/store/api/news-api';
import { Law, LawDetailEntity, } from '@/modules/law/libraries/law-types';
import { ServerPageProps, } from '@/modules/general/libraries/general-types';
import LawStructuredData from '@/modules/law/components/law-structured-data';
import LogoHeader from '@/modules/layout/components/general-layout/header/logo-header';
import { REVALIDATE_TIME_VERY_SHORT, WEBSITE_DEFAULT_LOCALE, } from '@/modules/general/libraries/constants';

export async function generateMetadata(
  { params, }: ServerPageProps
): Promise<Metadata> {
  const
    { locale, } = params,
    t = await getTranslations({ locale: params.locale || WEBSITE_DEFAULT_LOCALE, }),
    lawDetailEntity: LawDetailEntity =
    await serverFetch(getLawDetailUrl(params.id, params.locale), REVALIDATE_TIME_VERY_SHORT);

  if (lawDetailEntity && lawDetailEntity.data) {
    const lawDetail = lawDetailEntity.data;
    return {
      title: `${lawDetail.title || ''} - ${t('common.app_name')}`,
      description: lawDetail.description || '',
      openGraph: {
        title: lawDetail.title || '',
        description: lawDetail.description,
        url: getLawUrl(lawDetail, locale),
        images: [lawDetail.media?.path || '',],
      },
    };
  }
  return {};
}

const getServerSideProps = async (id: number, locale: string) => {
  let
    lawDetailEntity,
    relatedNewsListEntity;

  try {
    lawDetailEntity = await serverFetch(getLawDetailUrl(id, locale), REVALIDATE_TIME_VERY_SHORT);

    if (lawDetailEntity && lawDetailEntity.data) {
      const LawNumber = lawDetailEntity.data.number;
      relatedNewsListEntity = await serverFetch(getNewsListUrl({
        offset: 0,
        limit: 4,
        typeIds: '',
        outputIds: '',
        categoryIds: '',
        keywords: '',
        sorting: [],
        tags: LawNumber,
        subdomainId: 0,
        locale,
      }), REVALIDATE_TIME_VERY_SHORT);
    }
  } catch (error) {
  }
  return {
    lawDetail: lawDetailEntity ? lawDetailEntity.data as Law : null,
    relatedNewsList: relatedNewsListEntity ? relatedNewsListEntity.data as News[] : null,
  };
};

const LawDetailWithKeywordsPage = async ({ params, }: ServerPageProps) => {
  const
    { locale, } = params,
    t = await getTranslations(),
    id: number = params.id || 0,
    keywords: string = params.keywords || '',
    serverSideProps = await getServerSideProps(id, locale),
    {
      lawDetail,
      relatedNewsList,
    } = serverSideProps,
    breadCrumbLinks = [
      {
        title: `${t('law.title')}`,
        link: `/${locale}/law`,
      },
    ];

  return (
    <Layout>
      <Breadcrumbs
        links={breadCrumbLinks}
        showHomeLink={true}
      />
      <LogoHeader
        color={ColorType.green}
      />
      {(lawDetail && lawDetail.id && keywords) ? (
        <>
          <LawDetail
            law={lawDetail}
            relatedNewsList = {relatedNewsList}
          />
          <LawStructuredData
            law={lawDetail}
          />
        </>
      ) : (
        <></>
      )}
    </Layout>
  );
};

export default LawDetailWithKeywordsPage;
