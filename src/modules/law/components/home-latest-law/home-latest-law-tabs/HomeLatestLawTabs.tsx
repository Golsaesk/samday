"use client";

import Link from 'next/link';
import { useState, } from 'react';
import { useLocale, } from 'next-intl';
import { useTranslations, } from 'use-intl';
import styles from './HomeLatestLawTabs.module.scss';
import { Law, } from '@/modules/law/libraries/law-types';
import { getLawUrl, } from '@/modules/law/libraries/utils';
import { Category, } from '@/modules/category/libraries/category-types';
import {
  Tab, Tabs, Typography,
} from '@mui/material';

const HomeLatestLawTabs = ({
  categoryList,
  eGovernmentLawList,
  cyberSpaceLawList,
}: {
  categoryList: Category[] | null | undefined;
  eGovernmentLawList: Law[] | null | undefined;
  cyberSpaceLawList: Law[] | null | undefined;
}) => {
  const
    locale = useLocale(),
    t = useTranslations(),
    [activeTab, setActiveTab,] = useState(0),
    [lawList, setLawList,] = useState<Law[] | null>(eGovernmentLawList ? eGovernmentLawList : []),
    handleChange = (event: React.SyntheticEvent, tab: number) => {
      setActiveTab(tab);
      if (tab === 0 && eGovernmentLawList) {
        setLawList(eGovernmentLawList);
      }
      if (tab === 1 && cyberSpaceLawList) {
        setLawList(cyberSpaceLawList);
      }
    };

  return (
    <div className={styles.root}>
      {categoryList && categoryList.length > 0 && (
        <Tabs
          value={activeTab}
          onChange={handleChange}
          className={styles.root__container}
        >
          {categoryList.map((category: Category) => (
            <Tab
              key={category.id}
              label={category.title}
              className={styles.root__container__tab}
            />
          ))}
        </Tabs>
      )}
      <div className={styles.root__list}>
        {lawList && lawList.length > 0 ? lawList.map((law: Law) => (
          <Link
            key={law.id}
            href={getLawUrl(law, locale)}
            title={law.title}
            className={styles.root__list__item}
          >
            {law.title}
          </Link>
        )) : (
          <Typography
            variant='body2'
          >
            {t('law.empty_list')}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default HomeLatestLawTabs;