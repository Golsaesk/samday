"use client";

import Image from 'next/image';
import HeaderMenu from './header-menu';
import HeaderTools from './header-tools';
import styles from './Header.module.scss';
import Panel from '@/modules/general/components/panel';
import { Submenu, } from '@/modules/layout/libraries/layout-types';
import { useLocale, } from 'use-intl';
import { DOMAIN, LocaleType, } from '@/modules/general/libraries/constants';

const Header = ({ submenu, }: {submenu: Submenu | null | undefined}) => {
  const
    locale = useLocale();

  return (
    <div className={styles.root}>
      <Panel
        variant='general'
        classes={{ root: styles.root__container, }}
      >
        <div className={styles.root__container__wrapper}>
          <HeaderMenu submenu={submenu} />
          <Image
            src={`${locale === LocaleType.fa ? `${DOMAIN}/images/logo/logotype.svg` : `${DOMAIN}/images/logo/logotype-en.svg`}`}
            alt={''}
            width={202}
            height={16}
            className={styles.root__container__logo}
          />
          <HeaderTools />
        </div>
      </Panel>
    </div>
  );
};

export default Header;