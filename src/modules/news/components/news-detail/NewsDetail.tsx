'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSnackbar, } from 'notistack';
import styles from './NewsDetail.module.scss';
import { usePathname, } from 'next/navigation';
import NewsDetailSidebar from './news-detail-sidebar';
import { useLocale, useTranslations, } from 'next-intl';
import { CalendarIcon, } from '@mui/x-date-pickers/icons';
import { News, } from '@modules/news/libraries/news-types';
import Panel from '@/modules/general/components/panel/Panel';
import NewsError from '@/modules/news/components/news-error';
import { DOMAIN, } from '@/modules/general/libraries/constants';
import { ColorType, } from '@/modules/layout/libraries/constants';
import Breadcrumbs from '@/modules/general/components/breadcrumbs';
import GeneralAction from '@/modules/general/components/general-action';
import { renderHTML, dateFormat, } from '@/modules/general/libraries/utils';
import { FormatDateType, } from '@/modules/general/libraries/general-types';
import GeneralRelatedNews from '@/modules/news/components/general-related-news';
import LogoHeader from '@/modules/layout/components/general-layout/header/logo-header';
import {
  getBreadcrumbLinks,
  getItemPrintUrl,
  getItemUrl,
  getPageType,
} from '@/modules/news/libraries/utils';

const NewsDetail = ({ news, }: { news: News | null | undefined }) => {
  const
    t = useTranslations(),
    { enqueueSnackbar, } = useSnackbar(),
    locale = useLocale(),
    pathname = usePathname(),

    {
      isNewsPage, isReportsPage, isNationalDatabasePage,
    } = getPageType(pathname),

    breadCrumbLinks = getBreadcrumbLinks(
      isNewsPage,
      isReportsPage,
      isNationalDatabasePage,
      news ?? null,
      locale,
      t
    ),

    handleCopy = ({ news, }: { news: News }) => {
      if (news) {
        const itemUrl = getItemUrl(pathname, news, locale);
        navigator.clipboard.writeText(`${DOMAIN}${itemUrl}`);
        enqueueSnackbar(t('law.copy_notification'), { variant: 'success', });
      }
    };

  return (
    <div className={styles.root}>
      <Breadcrumbs links={breadCrumbLinks} showHomeLink={true} />
      <LogoHeader color={ColorType.blue} />
      <Panel variant={'general'}>
        {news ? (
          <>
            <div className={styles.root__header}>
              <div className={styles.root__header__row}>
                <div className={styles.root__header__row__tag}>
                  {t('news.news_detail_app_name')}
                </div>
              </div>
              {news?.up_title && (
                <div className={styles.root__header__upTitle}>
                  {news?.up_title} :
                </div>
              )}
              <div className={styles.root__header__title}>
                {news?.title}
              </div>
            </div>
            <div className={styles.root__container}>
              <div className={styles.root__container__content}>
                {news.media && news.media.path && (
                  <div className={styles.root__container__content__image}>
                    <Image
                      src={news.media?.path}
                      title={news.media?.title}
                      alt={news.media?.title || ''}
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                      }}
                      quality={100}
                      fill
                    />
                    <div className={styles.root__container__content__image__date}>
                      <CalendarIcon />
                      {dateFormat(news.publish_date, locale, FormatDateType.long) || '-'}
                    </div>
                  </div>
                )}
                <div className={styles.root__container__content__lead}>
                  <p>{news.lead}</p>
                </div>
                <div className={styles.root__container__content__body}>
                  {renderHTML(news.body)}
                </div>
                <div className={styles.root__container__content__footer}>
                  <div className={styles.root__container__content__footer__source}>
                    {news?.source && (
                      <>
                        {t('news.news_source')} :
                        <Link href={news.source}>
                          {news.source}
                        </Link>
                      </>
                    )}
                  </div>
                  <GeneralAction
                    downloadLink={getItemPrintUrl(pathname, news, locale)}
                    handleCopy={() => handleCopy({ news, })}
                  />
                </div>
              </div>
              {news?.tag_list && (
                <div className={styles.root__container__sidebar}>
                  <GeneralRelatedNews items={news?.related_news_list} />
                  <NewsDetailSidebar
                    tags={news?.tag_list}
                    base={isNewsPage ? `news` : isReportsPage ? `reports` : `national-database`}
                  />
                </div>
              )}
            </div>
          </>
        ) : (
          <NewsError />
        )}
      </Panel>
    </div>
  );
};

export default NewsDetail;
