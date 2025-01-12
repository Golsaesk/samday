import { getTranslations, } from 'next-intl/server';
import { notFound, redirect, } from 'next/navigation';
import { getLawUrl, } from '@/modules/law/libraries/utils';
import { serverFetch, } from '@/modules/general/libraries/utils';
import { getLawDetailUrl, } from '@/modules/law/store/api/law-api';
import { Law, LawDetailEntity, } from '@/modules/law/libraries/law-types';
import { ServerPageProps, } from '@/modules/general/libraries/general-types';
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
    const lawDetailEntity: LawDetailEntity = await serverFetch(getLawDetailUrl(id, locale), REVALIDATE_TIME_VERY_SHORT);
    return { lawDetail: lawDetailEntity ? lawDetailEntity.data as Law : null, };
  } catch (error) {
  }
  return { lawDetail: null, };
};

const LawDetailPage = async ({ params, }: ServerPageProps) => {
  const
    { locale, } = params,
    id: number = params.id || 0,
    serverSideProps = await getServerSideProps(id, locale),
    { lawDetail, } = serverSideProps;

  if (lawDetail && lawDetail.id) {
    const url = getLawUrl(lawDetail, locale);
    redirect(url);
  } else {
    notFound();
  }
};

export default LawDetailPage;
