'use client';

import React from 'react';
import Image from 'next/image';
import { Typography, } from '@mui/material';
import { useTranslations, } from 'next-intl';
import styles from './UnderConstruction.module.scss';
import { DOMAIN, } from '@modules/general/libraries/constants';

function UnderConstruction() {
  const t = useTranslations('common');
  return (
    <div className={styles.root}>
      <div className={styles.root__container}>
        <Image
          className={styles.root__container__image}
          src={`${DOMAIN}/images/assets/uc.svg`}
          alt={t('under_construction')}
          width={400}
          height={400}
          priority
        />
        <Typography
          variant='h5'
          className={styles.root__container__message}
        >
          {t('under_construction')}
        </Typography>
      </div>
    </div>
  );
}

export default UnderConstruction;
