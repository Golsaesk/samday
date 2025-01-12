'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Typography, } from '@mui/material';
import styles from './GeneralRelatedNews.module.scss';
import { useLocale, useTranslations, } from 'next-intl';
import { getNewsUrl, } from '@/modules/news/libraries/utils';
import { DOMAIN, } from '@/modules/general/libraries/constants';
import { dateFormat, } from '@/modules/general/libraries/utils';
import { News, RelatedNews, } from '@/modules/news/libraries/news-types';
import { FormatDateType, } from '@/modules/general/libraries/general-types';

const GeneralRelatedNews = ({
  items,
  className,
}: {
  items: News[] | RelatedNews[] | null | undefined;
  className?: string;
}) => {
  const
    t = useTranslations(),
    locale = useLocale();

  return (
    <>
      {items && items.length > 0 && (
        <div className={`${styles.root} ${className ? className : ''}`}>
          <Typography
            variant='h3'
            className={styles.root__title}
          >
            {t('news.related_news')}
          </Typography>
          <div className={styles.root__container}>
            {items.map((item: News | RelatedNews) => (
              <div
                key={item.id}
                className={styles.root__container__item}
              >
                <Link
                  href={getNewsUrl(item, locale)}
                  className={styles.root__container__item__image}
                >
                  <Image
                    src={item.media?.path || `${DOMAIN}/images/assets/no-image.svg`}
                    alt={item.title}
                    sizes='20vw'
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                    fill
                  />
                </Link>
                <div className={styles.root__container__item__content}>
                  <Link
                    href={getNewsUrl(item, locale)}
                    className={styles.root__container__item__content__title}
                  >
                    {item.title}
                  </Link>
                  <Typography
                    variant={'caption'}
                    component={'span'}
                  >
                    {dateFormat(item.publish_date, locale, FormatDateType.long) || '-'}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default GeneralRelatedNews;