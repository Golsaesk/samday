import { getTranslations, } from 'next-intl/server';
import Layout from '@/modules/layout/components/layout';
import { Box, } from '@/modules/box/libraries/box-types';
import { serverFetch, } from '@/modules/general/libraries/utils';
import { ColorType, } from '@/modules/layout/libraries/constants';
import { getBoxDetailUrl, } from '@/modules/box/store/api/box-api';
import Breadcrumbs from '@/modules/general/components/breadcrumbs';
import AboutHero from '@/modules/general/components/about/about-hero';
import AboutCouncil from '@/modules/general/components/about/about-council';
import { ServerPageProps, } from '@/modules/general/libraries/general-types';
import {
  DOMAIN, REVALIDATE_TIME_VERY_SHORT, WEBSITE_DEFAULT_LOCALE,
} from '@/modules/general/libraries/constants';

export async function generateMetadata({ params, }: ServerPageProps) {
  const t = await getTranslations({ locale: params.locale || WEBSITE_DEFAULT_LOCALE, });
  return {
    title: `${t('about-executive-council.title')}`,
    description: t('about-executive-council.page_description'),
  };
}

const getServerSideProps = async (locale: string) => {
  let
    aboutObjectiveBoxEntity,
    aboutMemberBoxEntity,
    aboutDutyBoxEntity,
    aboutEnforcementBoxEntity,
    aboutSecretaryBoxEntity,
    aboutMeetingBoxEntity,
    aboutSecretaryMembersBoxEntity;

  try {
    const aboutObjectiveBoxId =
      locale === 'fa' ?
        Number(process?.env?.BOX_ABOUT_COUNCIL_OBJECTIVE_FA).valueOf() || 0 :
        Number(process?.env?.BOX_ABOUT_COUNCIL_OBJECTIVE_EN).valueOf() || 0;
    aboutObjectiveBoxEntity = await serverFetch(getBoxDetailUrl(aboutObjectiveBoxId, locale), REVALIDATE_TIME_VERY_SHORT);

  } catch (error) {
  }

  try {
    const aboutDutyBoxId =
      locale === 'fa' ?
        Number(process?.env?.BOX_ABOUT_COUNCIL_DUTY_FA).valueOf() || 0 :
        Number(process?.env?.BOX_ABOUT_COUNCIL_DUTY_EN).valueOf() || 0;
    aboutDutyBoxEntity = await serverFetch(getBoxDetailUrl(aboutDutyBoxId, locale), REVALIDATE_TIME_VERY_SHORT);

  } catch (error) {
  }

  try {
    const aboutMemberBoxId =
      locale === 'fa' ?
        Number(process?.env?.BOX_ABOUT_COUNCIL_MEMBER_FA).valueOf() || 0 :
        Number(process?.env?.BOX_ABOUT_COUNCIL_MEMBER_EN).valueOf() || 0;
    aboutMemberBoxEntity = await serverFetch(getBoxDetailUrl(aboutMemberBoxId, locale), REVALIDATE_TIME_VERY_SHORT);

  } catch (error) {
  }

  try {
    const aboutEnforcementBoxId =
      locale === 'fa' ?
        Number(process?.env?.BOX_ABOUT_COUNCIL_ENFORCEMENT_FA).valueOf() || 0 :
        Number(process?.env?.BOX_ABOUT_COUNCIL_ENFORCEMENT_EN).valueOf() || 0;
    aboutEnforcementBoxEntity = await serverFetch(getBoxDetailUrl(aboutEnforcementBoxId, locale), REVALIDATE_TIME_VERY_SHORT);

  } catch (error) {
  }

  try {
    const aboutSecretaryBoxId =
      locale === 'fa' ?
        Number(process?.env?.BOX_ABOUT_COUNCIL_SECRETARY_FA).valueOf() || 0 :
        Number(process?.env?.BOX_ABOUT_COUNCIL_SECRETARY_EN).valueOf() || 0;
    aboutSecretaryBoxEntity = await serverFetch(getBoxDetailUrl(aboutSecretaryBoxId, locale), REVALIDATE_TIME_VERY_SHORT);

  } catch (error) {
  }

  try {
    const aboutMeetingBoxId =
      locale === 'fa' ?
        Number(process?.env?.BOX_ABOUT_COUNCIL_MEETING_FA).valueOf() || 0 :
        Number(process?.env?.BOX_ABOUT_COUNCIL_MEETING_EN).valueOf() || 0;
    aboutMeetingBoxEntity = await serverFetch(getBoxDetailUrl(aboutMeetingBoxId, locale), REVALIDATE_TIME_VERY_SHORT);

  } catch (error) {
  }

  try {
    const aboutSecretaryMembersBoxId =
      locale === 'fa' ?
        Number(process?.env?.BOX_ABOUT_COUNCIL_SECRETARY_MEMBERS_FA).valueOf() || 0 :
        Number(process?.env?.BOX_ABOUT_COUNCIL_SECRETARY_MEMBERS_EN).valueOf() || 0;
    aboutSecretaryMembersBoxEntity = await serverFetch(getBoxDetailUrl(aboutSecretaryMembersBoxId, locale), REVALIDATE_TIME_VERY_SHORT);
  } catch (error) {
  }

  return {
    aboutObjectiveBox: aboutObjectiveBoxEntity ? aboutObjectiveBoxEntity.data as Box : null,
    aboutDutyBox: aboutDutyBoxEntity ? aboutDutyBoxEntity.data as Box : null,
    aboutMemberBox: aboutMemberBoxEntity ? aboutMemberBoxEntity.data as Box : null,
    aboutEnforcementBox: aboutEnforcementBoxEntity ? aboutEnforcementBoxEntity.data as Box : null,
    aboutSecretaryBox: aboutSecretaryBoxEntity ? aboutSecretaryBoxEntity.data as Box : null,
    aboutMeetingBox: aboutMeetingBoxEntity ? aboutMeetingBoxEntity.data as Box : null,
    aboutSecretaryMembersBox: aboutSecretaryMembersBoxEntity ? aboutSecretaryMembersBoxEntity.data as Box : null,
  };

};

const ExecutiveCouncilOfInformationTechnologyPage = async ({ params, }: ServerPageProps) => {
  const
    { locale, } = params,
    serverSideProps = await getServerSideProps(locale),
    {
      aboutObjectiveBox,
      aboutDutyBox,
      aboutMemberBox,
      aboutEnforcementBox,
      aboutSecretaryBox,
      aboutMeetingBox,
      aboutSecretaryMembersBox,
    } = serverSideProps,
    t = await getTranslations(),
    breadCrumbLinks = [
      {
        title: `${t('about-executive-council.title')}`,
        link: `/${locale}/about/executive-council-of-information-technology`,
      },
    ];

  return (
    <Layout>
      <Breadcrumbs
        links={breadCrumbLinks}
        showHomeLink={true}
      />
      <AboutHero
        color={ColorType.blue}
        image={`/images/logo/about-blue.png`}
        faTitle={`${DOMAIN}/images/logo/logotype.svg`}
        enTitle={`${DOMAIN}/images/logo/logotype-en.svg`}
      />
      <AboutCouncil
        aboutObjectiveBox={aboutObjectiveBox}
        aboutDutyBox={aboutDutyBox}
        memberBox={aboutMemberBox}
        aboutEnforcementBox={aboutEnforcementBox}
        aboutSecretaryBox={aboutSecretaryBox}
        aboutMeetingBox={aboutMeetingBox}
        aboutSecretaryMembersBox={aboutSecretaryMembersBox}
      />
    </Layout>
  );
};

export default ExecutiveCouncilOfInformationTechnologyPage;