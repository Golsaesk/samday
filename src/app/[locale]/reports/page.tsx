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
    title: `${t('reports.reports_list')} - ${t('common.app_name')}`,
    description: t('reports.reports_list'),
  };
}

const getServerSideProps = async (locale: string, categoryIds: string, tags: string) => {
  let reportCategoryListEntity,
    reportListEntity: NewsListEntity | null = null,
    reportCategoryId = Number(process?.env?.CATEGORY_PARENT_REPORT).valueOf() || 0;

  try {
    reportCategoryListEntity = await serverFetch(getCategoryListUrl({
      offset: 0,
      limit: DEFAULT_LIMIT,
      keywords: '',
      sorting: [],
      subdomainId: 0,
      parentId: reportCategoryId,
      locale: locale || WEBSITE_DEFAULT_LOCALE,
      moduleId: NEWS_MODULE_ID,
      disableInWebservice: false,
    }), REVALIDATE_TIME_VERY_SHORT);
  } catch (error) {
  }

  let reportCategoryIdList = reportCategoryListEntity?.data
    ?.map((category: Category) => category.id)
    .join(',') || reportCategoryId.toString();

  try {
    reportListEntity = await serverFetch(getNewsListUrl({
      offset: 0,
      limit: DEFAULT_LIMIT,
      typeIds: "",
      outputIds: '',
      tags: tags,
      keywords: '',
      sorting: [],
      subdomainId: 0,
      locale,
      categoryIds: categoryIds || reportCategoryIdList,
    }), REVALIDATE_TIME_VERY_SHORT);
  } catch (error) {
  }
  if (reportListEntity && reportListEntity.data) {
    reportListEntity.data = reportListEntity.data.map((reportItem: any) => {
      const filteredCategories = reportItem.category_list.filter((category: any) =>
        reportCategoryIdList.split(',').includes(category.id.toString())
      );
      return {
        ...reportItem,
        category_list: filteredCategories,
      };
    });
  }

  return {
    reportCategoryList: reportCategoryListEntity ? reportCategoryListEntity.data as Category[] : null,
    reportListEntity: reportListEntity ? reportListEntity as NewsListEntity : null,
    reportCategoryIdList: reportCategoryIdList ? reportCategoryIdList : '',
  };
};

const ReportsPage = async ({
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
      reportCategoryList,
      reportListEntity,
      reportCategoryIdList,
    } = serverSideProps,
    breadCrumbLinks = [
      {
        title: `${t('reports.reports_list')}`,
        link: `/${locale}/reports`,
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
        paging={reportListEntity?.paging}

        items={reportListEntity?.data}
        categoryList={reportCategoryList}
        newsCategoryIdList ={reportCategoryIdList}

        defaultCategoryIds={categoryIds}
        defaultKeywords={''}
        defaultTags={tags}
      />
    </Layout>
  );

};

export default ReportsPage;