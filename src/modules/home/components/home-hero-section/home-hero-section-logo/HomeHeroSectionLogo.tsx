"use client";

import Image from 'next/image';
import { useLocale, } from 'use-intl';
import styles from './HomeHeroSectionLogo.module.scss';
import { DOMAIN, LocaleType, } from '@/modules/general/libraries/constants';

const HomeHeroSectionLogo = () => {
  const
    locale = useLocale();

  return (
    <div className={styles.root}>
      <Image
        src={`${locale === LocaleType.fa ? `${DOMAIN}/images/logo/main-logo.svg` : `${DOMAIN}/images/logo/logo-en.svg`}`}
        alt={''}
        width={543}
        height={63}
        className={styles.root__logo}
      />
    </div>
  );
};

export default HomeHeroSectionLogo;