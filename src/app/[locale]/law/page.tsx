import { getTranslations, } from 'next-intl/server';
import Layout from '@/modules/layout/components/layout';
import LawList from '@/modules/law/components/law-list';
import { serverFetch, } from '@/modules/general/libraries/utils';
import { ColorType, } from '@/modules/layout/libraries/constants';
import { Law, LawYear, } from '@/modules/law/libraries/law-types';
import Breadcrumbs from '@/modules/general/components/breadcrumbs';
import { Category, } from '@/modules/category/libraries/category-types';
import { ORGANIZATION_MAIN_ID, } from '@/modules/law/libraries/constants';
import { ServerPageProps, } from '@/modules/general/libraries/general-types';
import { getCategoryListUrl, } from '@/modules/category/store/api/category-api';
import { getLawListUrl, getLawYearListUrl, } from '@/modules/law/store/api/law-api';
import LogoHeader from '@/modules/layout/components/general-layout/header/logo-header';
import { WEBSITE_DEFAULT_LOCALE, REVALIDATE_TIME_VERY_SHORT, } from '@/modules/general/libraries/constants';

export async function generateMetadata({ params, }: ServerPageProps) {
  const t = await getTranslations({ locale: params.locale || WEBSITE_DEFAULT_LOCALE, });

  return {
    title: `${t('law.page_title')} - ${t('common.app_name')}`,
    description: t('law.page_description'),
  };
}

const getServerSideProps = async (locale: string, categoryIds: string) => {
  let
    lawCategoryListEntity,
    lawYearListEntity,
    lawList: Law[][] = [];

  try {
    const lawCategoryId = Number(process?.env?.CATEGORY_PARENT_LAW).valueOf() || 0;
    if (lawCategoryId) {
      lawCategoryListEntity = await serverFetch(getCategoryListUrl({
        offset: 0,
        limit: 100,
        parentId: lawCategoryId,
        keywords: '',
        sorting: [],
        subdomainId: 0,
        locale: locale || WEBSITE_DEFAULT_LOCALE,
        moduleId: 10,
        disableInWebservice: false,
      }), REVALIDATE_TIME_VERY_SHORT);
    }
  } catch (error) {
  }

  try {
    lawYearListEntity = await serverFetch(getLawYearListUrl({
      sorting: [],
      categoryIds: categoryIds,
      locale: locale || WEBSITE_DEFAULT_LOCALE,
    }), REVALIDATE_TIME_VERY_SHORT);

    if (lawYearListEntity && lawYearListEntity.data && lawYearListEntity.data.length > 0) {
      const list = [];
      for (const item of lawYearListEntity.data) {
        list.push(serverFetch(getLawListUrl({
          offset: 0,
          limit: 200,
          approvalYearFrom: item.approval_year,
          approvalYearTo: item.approval_year,
          organizationId: ORGANIZATION_MAIN_ID,
          categoryIds: categoryIds,
          sorting: [{
            expression: 'approval_date', ascending: false,
          },],
          locale,
        }), REVALIDATE_TIME_VERY_SHORT));
      }
      const resultList = await Promise.all(list);
      if (resultList) {
        lawList = resultList.map((item: any) => item.data);
      }
    }
  } catch (error) {
  }

  return {
    lawCategoryList: lawCategoryListEntity ? lawCategoryListEntity.data as Category[] : null,
    lawYearList: lawYearListEntity ? lawYearListEntity.data as LawYear[] : null,
    lawList: lawList ? lawList as Law[][] : null,
  };

};

const LawPage = async ({
  params,
  searchParams,
}: ServerPageProps) => {
  const
    t = await getTranslations(),
    { locale, } = params,
    categoryIds: string = searchParams.category || '',
    serverSideProps = await getServerSideProps(locale, categoryIds),
    {
      lawCategoryList,
      lawYearList,
      lawList,
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
      <LawList
        categoryList={lawCategoryList}
        yearList={lawYearList}
        lawList={lawList}
      />
    </Layout>
  );
};

export default LawPage;