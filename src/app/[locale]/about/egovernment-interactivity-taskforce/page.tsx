import { getTranslations, } from 'next-intl/server';
import Layout from '@/modules/layout/components/layout';
import { Box, } from '@/modules/box/libraries/box-types';
import { serverFetch, } from '@/modules/general/libraries/utils';
import { ColorType, } from '@/modules/layout/libraries/constants';
import Breadcrumbs from '@/modules/general/components/breadcrumbs';
import { getBoxDetailUrl, } from '@/modules/box/store/api/box-api';
import AboutHero from '@/modules/general/components/about/about-hero';
import { ServerPageProps, } from '@/modules/general/libraries/general-types';
import AboutTaskforce from '@/modules/general/components/about/about-taskforce';
import {
  DOMAIN, REVALIDATE_TIME_VERY_SHORT, WEBSITE_DEFAULT_LOCALE,
} from '@/modules/general/libraries/constants';

export async function generateMetadata({ params, }: ServerPageProps) {
  const t = await getTranslations({ locale: params.locale || WEBSITE_DEFAULT_LOCALE, });
  return {
    title: `${t('about_eGovernment_interactivity_taskforce.title')}`,
    description: t('about_eGovernment_interactivity_taskforce.page_description'),
  };
}
const getServerSideProps = async (locale: string) => {
  let
    aboutMemberBoxEntity,
    aboutDutyBoxEntity,
    aboutDocumentBoxEntity,
    aboutNotificationBoxEntity,
    aboutBasicDatabasesBoxEntity,
    aboutPerformanceGuaranteeBoxEntity,
    aboutNIECenterBoxEntity;

  try {
    const aboutBasicDatabases =
        locale === 'fa' ?
          Number(process?.env?.BOX_ABOUT_BASIC_DATABASE_FA).valueOf() || 0 :
          Number(process?.env?.BOX_ABOUT_BASIC_DATABASE_EN).valueOf() || 0;
    aboutBasicDatabasesBoxEntity = await serverFetch(getBoxDetailUrl(aboutBasicDatabases, locale), REVALIDATE_TIME_VERY_SHORT);
  } catch (error) {
    console.log("aboutBasicDatabasesBoxEntity error", error);
  }

  try {
    const aboutPerformanceGuarantee =
        locale === 'fa' ?
          Number(process?.env?.BOX_ABOUT_COUNCIL_PERFORMANCE_GUARANTEE_FA).valueOf() || 0 :
          Number(process?.env?.BOX_ABOUT_COUNCIL_PERFORMANCE_GUARANTEE_EN).valueOf() || 0;
    aboutPerformanceGuaranteeBoxEntity = await serverFetch(getBoxDetailUrl(aboutPerformanceGuarantee, locale), REVALIDATE_TIME_VERY_SHORT);
  } catch (error) {
    console.log("aboutPerformanceGuaranteeBoxEntity error", error);
  }

  try {
    const aboutNIECenter =
        locale === 'fa' ?
          Number(process?.env?.BOX_ABOUT_COUNCIL_NIE_CENTER_FA).valueOf() || 0 :
          Number(process?.env?.BOX_ABOUT_COUNCIL_NIE_CENTER_EN).valueOf() || 0;
    aboutNIECenterBoxEntity = await serverFetch(getBoxDetailUrl(aboutNIECenter, locale), REVALIDATE_TIME_VERY_SHORT);
  } catch (error) {
    console.log("aboutNIECenterBoxEntity error", error);
  }

  try {
    const aboutMemberBoxId =
    locale === 'fa' ?
      Number(process?.env?.BOX_ABOUT_MEMBER_FA).valueOf() || 0 :
      Number(process?.env?.BOX_ABOUT_MEMBER_EN).valueOf() || 0;

    aboutMemberBoxEntity = await serverFetch(getBoxDetailUrl(aboutMemberBoxId, locale), REVALIDATE_TIME_VERY_SHORT);

  } catch (error) {
    console.log("aboutMemberBoxEntity error", error);
  }

  try {
    const aboutDutyBoxId =
    locale === 'fa' ?
      Number(process?.env?.BOX_ABOUT_DUTY_FA).valueOf() || 0 :
      Number(process?.env?.BOX_ABOUT_DUTY_EN).valueOf() || 0;
    aboutDutyBoxEntity = await serverFetch(getBoxDetailUrl(aboutDutyBoxId, locale), REVALIDATE_TIME_VERY_SHORT);

  } catch (error) {
    console.log("aboutDutyBoxEntity error", error);
  }

  try {
    const aboutDocumentBoxId =
    locale === 'fa' ?
      Number(process?.env?.BOX_ABOUT_DOCUMENT_FA).valueOf() || 0 :
      Number(process?.env?.BOX_ABOUT_DOCUMENT_EN).valueOf() || 0;
    aboutDocumentBoxEntity = await serverFetch(getBoxDetailUrl(aboutDocumentBoxId, locale), REVALIDATE_TIME_VERY_SHORT);

  } catch (error) {
    console.log("aboutDocumentBoxEntity error", error);
  }

  try {
    const aboutNotificationBoxId =
    locale === 'fa' ?
      Number(process?.env?.BOX_ABOUT_NOTIFICATION_FA).valueOf() || 0 :
      Number(process?.env?.BOX_ABOUT_NOTIFICATION_EN).valueOf() || 0;
    aboutNotificationBoxEntity = await serverFetch(getBoxDetailUrl(aboutNotificationBoxId, locale), REVALIDATE_TIME_VERY_SHORT);

  } catch (error) {
    console.log("aboutNotificationBoxEntity error", error);
  }

  return {
    aboutMemberBox: aboutMemberBoxEntity ? aboutMemberBoxEntity.data as Box : null,
    aboutDutyBox: aboutDutyBoxEntity ? aboutDutyBoxEntity.data as Box : null,
    aboutDocumentBox: aboutDocumentBoxEntity ? aboutDocumentBoxEntity.data as Box : null,
    aboutNotificationBox: aboutNotificationBoxEntity ? aboutNotificationBoxEntity.data as Box : null,
    aboutBasicDatabasesBox: aboutBasicDatabasesBoxEntity ? aboutBasicDatabasesBoxEntity.data as Box : null,
    aboutPerformanceGuaranteeBox: aboutPerformanceGuaranteeBoxEntity ? aboutPerformanceGuaranteeBoxEntity.data as Box : null,
    aboutNIECenterBox: aboutNIECenterBoxEntity ? aboutNIECenterBoxEntity.data as Box : null,
  };

};

const EGovernmentInteractivityTaskforcePage = async ({ params, }: ServerPageProps) => {
  const
    { locale, } = params,
    t = await getTranslations(),
    serverSideProps = await getServerSideProps(locale),
    {
      aboutMemberBox,
      aboutDutyBox,
      aboutDocumentBox,
      aboutNotificationBox,
      aboutBasicDatabasesBox,
      aboutPerformanceGuaranteeBox,
      aboutNIECenterBox,
    } = serverSideProps,
    breadCrumbLinks = [
      {
        title: `${t('about_eGovernment_interactivity_taskforce.title')}`,
        link: `/${locale}/about/egovernment-interactivity-taskforce`,
      },
    ];

  return (
    <>
      <Layout>
        <Breadcrumbs
          links={breadCrumbLinks}
          showHomeLink={true}
        />
        <AboutHero
          color={ColorType.green}
          image= {`/images/logo/about-green.png`}
          faTitle={`${DOMAIN}/images/logo/egovernment-taskforce.svg`}
          enTitle={`${DOMAIN}/images/logo/egovernment-taskforce-en.svg`}
        />
        <AboutTaskforce
          memberBox = {aboutMemberBox}
          aboutDutyBox = {aboutDutyBox}
          aboutDocumentBox = {aboutDocumentBox}
          aboutNotificationBox = {aboutNotificationBox}
          aboutBasicDatabasesBox = {aboutBasicDatabasesBox}
          aboutPerformanceGuaranteeBox = {aboutPerformanceGuaranteeBox}
          aboutNIECenterBox = {aboutNIECenterBox}
        />
      </Layout>
    </>
  );
};

export default EGovernmentInteractivityTaskforcePage;