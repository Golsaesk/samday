"use client";

import Image from 'next/image';
import { useLocale, } from 'use-intl';
import styles from './LogoHeader.module.scss';
import Panel from '@/modules/general/components/panel';
import { ColorType, } from '@/modules/layout/libraries/constants';
import { DOMAIN, LocaleType, } from '@/modules/general/libraries/constants';

const LogoHeader = ({ color = ColorType.green, }: {color: 'blue' | 'green'}) => {
  const
    locale = useLocale();

  return (
    <div className={`${styles.root} ${color === ColorType.blue ? styles.root__blue : styles.root__green}`}>
      <Panel
        variant='general'
        classes={{ root: styles.root__container, }}
      >
        <div className={`${styles.root__container__wrapper} ${color === ColorType.blue ? styles.root__container__divider__blue : styles.root__container__divider__green}`}>
          <Image
            alt={''}
            width={locale === LocaleType.fa ? 543 : 791}
            height={63}
            className={styles.root__container__logo}
            src={`${locale === LocaleType.fa ? `${DOMAIN}/images/logo/main-logo.svg` : `${DOMAIN}/images/logo/logo-en.svg`}`}
          />
        </div>
      </Panel>
    </div>
  );
};

export default LogoHeader;