import Layout from '@/modules/layout/components/layout';
import Contact from '@/modules/contact/components/contact';
import { ColorType, } from '@/modules/layout/libraries/constants';
import Breadcrumbs from '@/modules/general/components/breadcrumbs';
import { ServerPageProps, } from '@/modules/general/libraries/general-types';
import { getTranslations, unstable_setRequestLocale, } from 'next-intl/server';
import { WEBSITE_DEFAULT_LOCALE, } from '@/modules/general/libraries/constants';
import LogoHeader from '@/modules/layout/components/general-layout/header/logo-header';

export async function generateMetadata({ params, }: ServerPageProps) {
  const t = await getTranslations({ locale: params.locale || WEBSITE_DEFAULT_LOCALE, });

  return {
    title: `${t('contact_us.page_title')} - ${t('common.app_name')}`,
    description: t('contact_us.page_description'),
  };
}

const ContactPage = async ({ params, }: ServerPageProps) => {

  unstable_setRequestLocale(params.locale);
  const
    t = await getTranslations(),
    breadCrumbLinks = [
      {
        title: `${t('contact_us.contact_breadcrumb')}`,
        link: '/contact',
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
      <Contact />
    </Layout>
  );
};

export default ContactPage;