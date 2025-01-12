import { getTranslations, } from 'next-intl/server';
import Layout from '@/modules/layout/components/layout';
import { Box, } from '@/modules/box/libraries/box-types';
import { Law, } from '@/modules/law/libraries/law-types';
import { News, } from '@/modules/news/libraries/news-types';
import HomeAbout from '@/modules/home/components/home-about';
import { serverFetch, } from '@/modules/general/libraries/utils';
import { getLawListUrl, } from '@/modules/law/store/api/law-api';
import { getBoxDetailUrl, } from '@/modules/box/store/api/box-api';
import { getNewsListUrl, } from '@/modules/news/store/api/news-api';
import LawListSwiper from '@/modules/law/components/law-list-swiper';
import HomeLatestLaw from '@/modules/law/components/home-latest-law';
import HomeParallax from '@/modules/general/components/home-parallax';
import NewsListSwiper from '@/modules/news/components/news-list-swiper';
import { Category, } from '@/modules/category/libraries/category-types';
import { getMediaDetailUrl, } from '@/modules/media/store/api/media-api';
import HomeHeroSection from '@/modules/home/components/home-hero-section';
import { ORGANIZATION_MAIN_ID, } from '@/modules/law/libraries/constants';
import HomeSpecialNews from '@/modules/news/components/home-special-news';
import { getCategoryListUrl, } from '@/modules/category/store/api/category-api';
import { Media, ServerPageProps, } from '@/modules/general/libraries/general-types';
import {
  WEBSITE_DEFAULT_LOCALE, REVALIDATE_TIME_VERY_SHORT, LocaleType,
} from '@/modules/general/libraries/constants';

export async function generateMetadata({ params, }: ServerPageProps) {
  const t = await getTranslations({ locale: params.locale || WEBSITE_DEFAULT_LOCALE, });
  return {
    title: `${t('common.home_title')}`,
    description: t('common.home_description'),
  };
}

const getServerSideProps = async (locale: string) => {
  let
    lawListEntity,
    aboutBoxEntity,
    aboutMediaEntity,
    specialNewsListEntity,
    parallaxBoxEntity,
    parallaxMediaEntity,
    latestLawMediaEntity,
    lawCategoryListEntity,
    eGovernmentLawListEntity,
    cyberSpaceLawListEntity,
    topNewsListEntity,
    normalNewsListEntity;

  try {
    const aboutBoxId =
    locale === 'fa' ?
      Number(process?.env?.BOX_HOME_ABOUT_FA).valueOf() || 0 :
      Number(process?.env?.BOX_HOME_ABOUT_EN).valueOf() || 0;
    aboutBoxEntity = await serverFetch(getBoxDetailUrl(aboutBoxId, locale), REVALIDATE_TIME_VERY_SHORT);

  } catch (error) {
  }

  try {
    const aboutMediaId = Number(process?.env?.IMAGE_HOME_ABOUT).valueOf() || 0;
    aboutMediaEntity = await serverFetch(getMediaDetailUrl(aboutMediaId, locale), REVALIDATE_TIME_VERY_SHORT);

  } catch (error) {
  }

  try {
    const parallaxBoxId =
    locale === 'fa' ?
      Number(process?.env?.BOX_HOME_PARALLAX_FA).valueOf() || 0 :
      Number(process?.env?.BOX_HOME_PARALLAX_EN).valueOf() || 0;
    parallaxBoxEntity = await serverFetch(getBoxDetailUrl(parallaxBoxId, locale), REVALIDATE_TIME_VERY_SHORT);

  } catch (error) {
  }

  try {
    const parallaxMediaId =
    locale === 'fa' ?
      Number(process?.env?.IMAGE_HOME_PARALLAX_FA).valueOf() || 0 :
      Number(process?.env?.IMAGE_HOME_PARALLAX_EN).valueOf() || 0;
    parallaxMediaEntity = await serverFetch(getMediaDetailUrl(parallaxMediaId, locale), REVALIDATE_TIME_VERY_SHORT);

  } catch (error) {
  }

  try {
    lawListEntity = await serverFetch(getLawListUrl({
      offset: 0,
      limit: 10,
      organizationId: ORGANIZATION_MAIN_ID,
      sorting: [],
      locale,
    }), REVALIDATE_TIME_VERY_SHORT);

  } catch (error) {
  }

  try {
    const specialNewsTypeId =
    locale === 'fa' ?
      Number(process?.env?.TYPE_SPECIAL_NEWS_FA).valueOf() || 0 :
      Number(process?.env?.TYPE_SPECIAL_NEWS_EN).valueOf() || 0;

    specialNewsListEntity = await serverFetch(getNewsListUrl({
      offset: 0,
      limit: 4,
      typeIds: `${specialNewsTypeId}`,
      outputIds: '',
      categoryIds: '',
      keywords: '',
      sorting: [],
      subdomainId: 0,
      locale,
    }), REVALIDATE_TIME_VERY_SHORT);
  } catch {

  }

  try {
    const outputNewsId = Number(process?.env?.OUTPUT_NEWS).valueOf() || 0;

    topNewsListEntity = await serverFetch(getNewsListUrl({
      offset: 0,
      limit: 3,
      typeIds: '',
      outputIds: `${outputNewsId}`,
      categoryIds: '',
      keywords: '',
      sorting: [],
      subdomainId: 0,
      locale,
    }), REVALIDATE_TIME_VERY_SHORT);
  } catch {

  }

  try {
    const normalNewsTypeId =
    locale === 'fa' ?
      Number(process?.env?.TYPE_NORMAL_NEWS_FA).valueOf() || 0 :
      Number(process?.env?.TYPE_NORMAL_NEWS_EN).valueOf() || 0;

    normalNewsListEntity = await serverFetch(getNewsListUrl({
      offset: 0,
      limit: 10,
      typeIds: `${normalNewsTypeId}`,
      outputIds: '',
      categoryIds: '',
      keywords: '',
      sorting: [],
      subdomainId: 0,
      locale,
    }), REVALIDATE_TIME_VERY_SHORT);
  } catch {

  }

  try {
    const latestLawMediaId = Number(process?.env?.LATEST_LAW_MEDIA_ID).valueOf() || 0;
    latestLawMediaEntity = await serverFetch(getMediaDetailUrl(latestLawMediaId, locale), REVALIDATE_TIME_VERY_SHORT);

  } catch (error) {
  }

  try {
    const lawCategoryId = Number(process?.env?.CATEGORY_PARENT_LAW).valueOf() || 0;
    lawCategoryListEntity = await serverFetch(getCategoryListUrl({
      offset: 0,
      limit: 2,
      parentId: lawCategoryId,
      keywords: '',
      sorting: [],
      subdomainId: 0,
      locale: locale || WEBSITE_DEFAULT_LOCALE,
      moduleId: 10,
      disableInWebservice: false,
    }), REVALIDATE_TIME_VERY_SHORT);
  } catch (error) {
  }

  try {
    const eGovernmentLawCategoryId = process?.env?.CATEGORY_EGOVERNMENT_LAW;
    eGovernmentLawListEntity = await serverFetch(getLawListUrl({
      offset: 0,
      limit: 3,
      organizationId: ORGANIZATION_MAIN_ID,
      categoryIds: eGovernmentLawCategoryId,
      sorting: [],
      locale,
    }), REVALIDATE_TIME_VERY_SHORT);

  } catch (error) {
  }

  try {
    const cyberSpaceLawCategoryId = process?.env?.CATEGORY_CYBERSPACE_LAW;
    cyberSpaceLawListEntity = await serverFetch(getLawListUrl({
      offset: 0,
      limit: 3,
      organizationId: ORGANIZATION_MAIN_ID,
      categoryIds: cyberSpaceLawCategoryId,
      sorting: [],
      locale,
    }), REVALIDATE_TIME_VERY_SHORT);

  } catch (error) {
  }

  return {
    aboutBox: aboutBoxEntity ? aboutBoxEntity.data as Box : null,
    aboutMedia: aboutMediaEntity ? aboutMediaEntity.data as Media : null,
    lawList: lawListEntity ? lawListEntity.data as Law[] : null,
    specialNewsList: specialNewsListEntity ? specialNewsListEntity.data as News[] : null,
    latestLawMedia: latestLawMediaEntity ? latestLawMediaEntity.data as Media : null,
    lawCategoryList: lawCategoryListEntity ? lawCategoryListEntity.data as Category[] : null,
    eGovernmentLawList: eGovernmentLawListEntity ? eGovernmentLawListEntity.data as Law[] : null,
    cyberSpaceLawList: cyberSpaceLawListEntity ? cyberSpaceLawListEntity.data as Law[] : null,
    topNewsList: topNewsListEntity ? topNewsListEntity.data as News[] : null,
    parallaxBox: parallaxBoxEntity ? parallaxBoxEntity.data as Box : null,
    parallaxMedia: parallaxMediaEntity ? parallaxMediaEntity.data as Media : null,
    normalNewsList: normalNewsListEntity ? normalNewsListEntity.data as News[] : null,
  };

};

const HomePage = async ({ params, }: ServerPageProps) => {
  const
    { locale, } = params,
    serverSideProps = await getServerSideProps(locale),
    {
      aboutBox,
      aboutMedia,
      specialNewsList,
      topNewsList,
      parallaxBox,
      lawList,
      parallaxMedia,
      normalNewsList,
      latestLawMedia,
      lawCategoryList,
      eGovernmentLawList,
      cyberSpaceLawList,
    } = serverSideProps;

  return (
    <Layout>
      <HomeHeroSection
        items={topNewsList}
      />

      <NewsListSwiper
        items={normalNewsList}
      />

      <HomeParallax
        box={parallaxBox}
        image={parallaxMedia}
      />

      <HomeAbout
        box={aboutBox}
        image={aboutMedia}
      />

      <HomeSpecialNews
        items={specialNewsList}
      />

      {locale === LocaleType.fa && (
        <LawListSwiper
          items={lawList}
        />
      )}

      {locale === LocaleType.fa && (
        <HomeLatestLaw
          media = {latestLawMedia}
          categoryList = {lawCategoryList}
          eGovernmentLawList = {eGovernmentLawList}
          cyberSpaceLawList = {cyberSpaceLawList}
        />
      )}

    </Layout>
  );
};

export default HomePage;