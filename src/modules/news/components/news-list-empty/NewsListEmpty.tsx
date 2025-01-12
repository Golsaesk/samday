'use client';

import React from 'react';
import Image from 'next/image';
import { Typography, } from '@mui/material';
import { useTranslations, } from 'next-intl';
import styles from './NewsListEmpty.module.scss';
import { DOMAIN, } from '@/modules/general/libraries/constants';

function NewsListEmpty() {
  const t = useTranslations();

  return (
    <div className={styles.root}>
      <Image
        src={`${DOMAIN}/images/news/no-image.svg`}
        alt={t('news.no_news_found')}
        width={352}
        height={260}
      />
      <Typography
        className={styles.root__empty}
      >
        {t('news.no_news_found')}
      </Typography>
      <Typography
        className={styles.root__empty__info}
      >
        {t('news.no_news_found_hint')}
      </Typography>
    </div>
  );
}

export default NewsListEmpty;
