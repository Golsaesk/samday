import Layout from '@/modules/layout/components/layout';
import NewsList from '@/modules/news/components/news-list';
import { serverFetch, } from '@/modules/general/libraries/utils';
import { ColorType, } from '@/modules/layout/libraries/constants';
import Breadcrumbs from '@/modules/general/components/breadcrumbs';
import { getNewsListUrl, } from '@/modules/news/store/api/news-api';
import { NEWS_MODULE_ID, } from '@/modules/news/libraries/constants';
import { NewsListEntity, } from '@/modules/news/libraries/news-types';
import { Category, } from '@/modules/category/libraries/category-types';
import { ServerPageProps, } from '@/modules/general/libraries/general-types';
import { getTranslations, unstable_setRequestLocale, } from 'next-intl/server';
import { getCategoryListUrl, } from '@/modules/category/store/api/category-api';
import LogoHeader from '@/modules/layout/components/general-layout/header/logo-header';
import {
  WEBSITE_DEFAULT_LOCALE,
  REVALIDATE_TIME_VERY_SHORT,
  DEFAULT_LIMIT,
} from '@/modules/general/libraries/constants';

export async function generateMetadata({ params, }: ServerPageProps) {
  const t = await getTranslations({ locale: params.locale || WEBSITE_DEFAULT_LOCALE, });
  return {
    title: `${t('news.newslist')} - ${t('common.app_name')}`,
    description: t('news.newslist'),
  };
}

const getServerSideProps = async (locale: string, categoryIds: string, tags: string) => {
  let
    newsCategoryListEntity,
    newsListEntity: NewsListEntity | null = null,
    newsRootCategoryId = Number(process?.env?.CATEGORY_PARENT_NEWS).valueOf() || 0;

  try {
    newsCategoryListEntity = await serverFetch(getCategoryListUrl({
      offset: 0,
      limit: DEFAULT_LIMIT,
      keywords: '',
      sorting: [],
      subdomainId: 0,
      parentId: newsRootCategoryId,
      locale: locale || WEBSITE_DEFAULT_LOCALE,
      moduleId: NEWS_MODULE_ID,
      disableInWebservice: false,
    }), REVALIDATE_TIME_VERY_SHORT);
  } catch (error) {
  }

  let newsCategoryIdList = newsCategoryListEntity?.data
    ?.map((category: Category) => category.id)
    .join(',') || newsRootCategoryId.toString();

  try {
    newsListEntity = await serverFetch(getNewsListUrl({
      offset: 0,
      limit: DEFAULT_LIMIT,
      typeIds: "",
      outputIds: '',
      tags: tags,
      keywords: '',
      sorting: [],
      subdomainId: 0,
      locale,
      categoryIds: categoryIds || newsCategoryIdList,
    }), REVALIDATE_TIME_VERY_SHORT);
  } catch (error) {
  }
  if (newsListEntity && newsListEntity.data) {
    newsListEntity.data = newsListEntity.data.map((newsItem: any) => {
      const filteredCategories = newsItem.category_list.filter((category: any) =>
        newsCategoryIdList.split(',').includes(category.id.toString())
      );
      return {
        ...newsItem,
        category_list: filteredCategories,
      };
    });
  }

  return {
    newsCategoryList: newsCategoryListEntity ? newsCategoryListEntity.data as Category[] : null,
    newsListEntity: newsListEntity ? newsListEntity as NewsListEntity : null,
    newsCategoryIdList: newsCategoryIdList ? newsCategoryIdList : '',
  };
};

const NewsPage = async ({
  params,
  searchParams,
}: ServerPageProps) => {
  unstable_setRequestLocale(params.locale);

  const
    t = await getTranslations(),
    { locale, } = params,
    categoryIds: string = searchParams.category || '',
    tags: string = searchParams.tags || '',
    serverSideProps = await getServerSideProps(locale, categoryIds, tags),
    {
      newsCategoryList,
      newsListEntity,
      newsCategoryIdList,
    } = serverSideProps,
    breadCrumbLinks = [
      {
        title: `${t('news.newslist')}`,
        link: `/${locale}/news`,
      },
    ];

  return (
    <Layout>
      <Breadcrumbs
        links={breadCrumbLinks}
        showHomeLink={true}
      />
      <LogoHeader
        color={ColorType.blue}
      />
      <NewsList
        offset={0}
        limit={DEFAULT_LIMIT}
        paging={newsListEntity?.paging}

        items={newsListEntity?.data}
        categoryList={newsCategoryList}
        newsCategoryIdList={newsCategoryIdList}

        defaultCategoryIds={categoryIds}
        defaultKeywords={''}
        defaultTags={tags}
      />
    </Layout>
  );
};

export default NewsPage;