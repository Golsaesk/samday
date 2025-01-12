import React from 'react';
import { ReactElement, } from 'react';
import { cookies, } from 'next/headers';
import '@styles/css/general-css-style.css';
import '@styles/scss/general-scss-style.scss';
import ThemeRegistry from '@/theme/theme-registry';
import { NextIntlClientProvider, } from 'next-intl';
import { ReduxProvider, } from '@/redux/redux-provider';
import Providers from '@/modules/layout/components/providers';
import { getMenuProps, } from '@/modules/general/libraries/menu';
import { Submenu, } from '@/modules/layout/libraries/layout-types';
import { ServerPageProps, } from '@/modules/general/libraries/general-types';
import { getTranslations, unstable_setRequestLocale, } from 'next-intl/server';
import {
  WEBSITE_DEFAULT_LOCALE, DEFAULT_THEME, THEME_COOKIE_NAME,
} from '@/modules/general/libraries/constants';

export async function generateMetadata({ params, }: ServerPageProps) {
  try {
    const t = await getTranslations({ locale: params.locale || WEBSITE_DEFAULT_LOCALE, });
    return { title: t('common.app_name'), };
  } catch {

  }
  return { title: 'Radcom', };
}

export default async function LocaleLayout(
  {
    children, params,
  }: {
    children: ReactElement;
    params: any;
  }) {
  const { locale, } = params;

  unstable_setRequestLocale(locale);

  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
  }

  let defaultThemeValue: 'light' | 'dark' | 'system' = DEFAULT_THEME;
  try {
    const cookieStore = cookies();
    if (cookieStore) {
      const themeCookie = cookieStore.get(THEME_COOKIE_NAME);
      if (themeCookie && themeCookie.value) {
        defaultThemeValue = (themeCookie.value.toLocaleLowerCase() === 'dark') ? 'dark' : 'light';
      }
    }
  } catch {
  }

  let submenu: Submenu = {};
  try {
    submenu = await getMenuProps(locale);
  } catch {

  }

  return (
    <html
      lang={locale}
      dir={locale === 'fa' ? 'rtl' : 'ltr'}
      data-mui-color-scheme={defaultThemeValue}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1,maximum-scale=5, width=device-width" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="fontiran.com:license" content="LF3TA" />
        <meta name="fontiran.com:license" content="UECNB" />
        <meta name="fontiran.com:license" content="PN88C" />
        <meta name="robots" content="index, follow" />
        <link rel="apple-touch-icon" sizes="57x57" href="/images/favicons/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/images/favicons/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/images/favicons/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/images/favicons/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/images/favicons/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/images/favicons/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/images/favicons/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/images/favicons/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/favicons/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/images/favicons/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/images/favicons/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicons/favicon-16x16.png" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/images/favicons/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-title" content="samdai" />
        <meta name="google-site-verification" content="" />
        <meta name="generator" content={'MANA'} />
        <link rel="preload" href="/fonts/iransansx-vf.woff" as="font" type="font/woff" crossOrigin='anonymous' />
        <link rel="preload" href="/fonts/iransansx-regular.woff" as="font" type="font/woff" crossOrigin='anonymous' />
        <link rel="preload" href="/fonts/iransansx-bold.woff" as="font" type="font/woff" crossOrigin='anonymous' />
      </head>
      <body>
        <ThemeRegistry defaultThemeValue={defaultThemeValue}>
          <ReduxProvider>
            <NextIntlClientProvider
              locale={locale}
              messages={messages}
            >
              <Providers submenu={submenu}>
                {children}
              </Providers>
            </NextIntlClientProvider>
          </ReduxProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
