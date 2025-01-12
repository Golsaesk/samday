"use client";

import { useLocale, } from 'use-intl';
import styles from './TopFooter.module.scss';
import TopFooterInfo from './top-footer-info';
import Panel from '@/modules/general/components/panel';
import TopFooterNewsletter from './top-footer-newsletter';
import { LocaleType, } from '@/modules/general/libraries/constants';

const TopFooter = () => {
  const
    locale = useLocale();

  return (
    <Panel
      variant='general'
      classes={{ root: styles.root, }}
    >
      {locale === LocaleType.fa && (
        <TopFooterNewsletter />
      )}
      <TopFooterInfo />
    </Panel>
  );
};

export default TopFooter;