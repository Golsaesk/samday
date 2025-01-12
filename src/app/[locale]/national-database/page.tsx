import Layout from '@/modules/layout/components/layout';
import NewsList from '@/modules/news/components/news-list';
import { serverFetch, } from '@/modules/general/libraries/utils';
import { ColorType, } from '@/modules/layout/libraries/constants';
import Breadcrumbs from '@/modules/general/components/breadcrumbs';
import { NEWS_MODULE_ID, } from '@/modules/news/libraries/constants';
import { getNewsListUrl, } from '@/modules/news/store/api/news-api';
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
    title: `${t('national-database.title')} - ${t('common.app_name')}`,
    description: t('national-database.title'),
  };
}

const getServerSideProps = async (locale: string, categoryIds: string, tags: string) => {
  let nationalDatabaseCategoryListEntity,
    nationalDatabaseListEntity: NewsListEntity | null = null,
    nationalDatabaseCategoryId = Number(process?.env?.CATEGORY_PARENT_INFORMATION) || 0;

  try {
    nationalDatabaseCategoryListEntity = await serverFetch(getCategoryListUrl({
      offset: 0,
      limit: DEFAULT_LIMIT,
      keywords: '',
      sorting: [],
      subdomainId: 0,
      parentId: nationalDatabaseCategoryId,
      locale: locale || WEBSITE_DEFAULT_LOCALE,
      moduleId: NEWS_MODULE_ID,
      disableInWebservice: false,
    }), REVALIDATE_TIME_VERY_SHORT);
  } catch (error) {
  }

  const nationalDatabaseCategoryIdList = nationalDatabaseCategoryListEntity?.data
    ?.map((category: Category) => category.id)
    .join(',') || nationalDatabaseCategoryId.toString();

  try {
    nationalDatabaseListEntity = await serverFetch(getNewsListUrl({
      offset: 0,
      limit: DEFAULT_LIMIT,
      typeIds: "",
      outputIds: '',
      tags: tags,
      keywords: '',
      sorting: [],
      subdomainId: 0,
      locale,
      categoryIds: categoryIds || nationalDatabaseCategoryIdList,
    }), REVALIDATE_TIME_VERY_SHORT);
  } catch (error) {
  }

  if (nationalDatabaseListEntity && nationalDatabaseListEntity.data) {
    nationalDatabaseListEntity.data = nationalDatabaseListEntity.data.map((nationalDatabaseItem: any) => {
      const filteredCategories = nationalDatabaseItem.category_list.filter((category: any) =>
        nationalDatabaseCategoryIdList.split(',').includes(category.id.toString())
      );
      return {
        ...nationalDatabaseItem,
        category_list: filteredCategories,
      };
    });
  }

  return {
    nationalDatabaseCategoryList: nationalDatabaseCategoryListEntity ? nationalDatabaseCategoryListEntity.data as Category[] : null,
    nationalDatabaseListEntity: nationalDatabaseListEntity ? nationalDatabaseListEntity as NewsListEntity : null,
    nationalDatabaseCategoryIdList: nationalDatabaseCategoryIdList ? nationalDatabaseCategoryIdList : '',

  };
};

const NationalDatabasePage = async ({
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
      nationalDatabaseCategoryList,
      nationalDatabaseListEntity,
      nationalDatabaseCategoryIdList,
    } = serverSideProps,
    breadCrumbLinks = [
      {
        title: `${t('national-database.title')}`,
        link: `/${locale}/national-database`,
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
        paging={nationalDatabaseListEntity?.paging}

        items={nationalDatabaseListEntity?.data}
        categoryList={nationalDatabaseCategoryList}
        newsCategoryIdList ={nationalDatabaseCategoryIdList}

        defaultCategoryIds={categoryIds}
        defaultKeywords={''}
        defaultTags={tags}
      />
    </Layout>
  );

};

export default NationalDatabasePage;