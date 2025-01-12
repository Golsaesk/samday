'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, } from 'react';
import styles from './NewsPrint.module.scss';
import { useLocale, useTranslations, } from 'next-intl';
import { News, } from '@modules/news/libraries/news-types';
import { renderHTML, } from '@/modules/general/libraries/utils';
import { dateFormat, } from '@/modules/general/libraries/utils';
import { FormatDateType, } from '@/modules/general/libraries/general-types';

const NewsPrint = ({ news, }: {
  news: News;
}) => {
  const
    t = useTranslations(),
    locale = useLocale();

  useEffect(() => {
    window.print();
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.root__header}>
        <div className={styles.root__header__image}>
          {news.media_alternate &&
            <Image
              src={`${news.media_alternate?.path || news.media?.path}`}
              title={news.media_alternate?.title || news.media?.title}
              alt={news.media_alternate?.title || news.media?.title || ''}
              width={200}
              height={200}
            />
          }
        </div>
        <div>

          {news?.up_title && (
            <div className={styles.root__header__upTitle}>
              {news.up_title}
            </div>
          )}
          <div className={styles.root__header__title}>
            {news?.title}
          </div>
          <div className={styles.root__header__lead}>
            {news?.lead}
          </div>
        </div>

      </div>
      <div className={styles.root__body}>
        {renderHTML(news?.body)}
      </div>

      <div className={styles.root__footer} >
        <div className={styles.root__footer__date} >
          {dateFormat(news?.publish_date, locale, FormatDateType.long) || '-'}
        </div>
        {news.source &&
          <div className={styles.root__footer__source}>
            {t('news.news_source')} :
            <Link href={news?.source} >
              {news?.source}
            </Link>
          </div>
        }
      </div>
    </div>
  );
};

export default NewsPrint;
