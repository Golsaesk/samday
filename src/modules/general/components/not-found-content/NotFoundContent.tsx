"use client";

import Image from 'next/image';
import { Typography, } from '@mui/material';
import styles from './NotFoundContent.module.scss';
import Panel from '@/modules/general/components/panel';
import { useLocale, useTranslations, } from 'next-intl';
import { DOMAIN, LocaleType, } from '@/modules/general/libraries/constants';

const NotFoundContent = () => {
  const
    t = useTranslations(),
    locale = useLocale();

  return (
    <Panel
      variant='fullWidth'
      classes={{ root: styles.root, }}
    >
      <Image
        alt={''}
        width={483}
        height={56}
        className={styles.root__logo}
        src={`${locale === LocaleType.fa ? `${DOMAIN}/images/logo/main-logo.svg` : `${DOMAIN}/images/logo/logo-en.svg`}`}
      />
      <div className={styles.root__container}>
        <Image
          alt={''}
          width={808}
          height={369}
          className={styles.root__image}
          src={`${DOMAIN}/images/general/error404.svg`}
        />
        <Typography
          variant='h1'
        >
          {t('common.error_404_title')}
        </Typography>
        <Typography
          variant='h6'
        >
          {t('common.error_404_description1')}
        </Typography>
        <Typography
          variant='h6'
        >
          {t('common.error_404_description2')}
        </Typography>
      </div>
    </Panel>
  );
};

export default NotFoundContent;