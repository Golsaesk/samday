'use client';

import { useState, } from 'react';
import { useTranslations, } from 'next-intl';
import styles from './NewsListFilter.module.scss';
import { Input, useMediaQuery, } from '@mui/material';
import NewsListFilterChip from './news-list-filter-chip';
import NewsListFilterCategory from './news-list-filter-category';
import CustomDrawer from '@/modules/general/components/custom-drawer';
import { Category, } from '@/modules/category/libraries/category-types';
import FunnelIcon from '@/modules/general/components/icons/funnel-icon';
import CloseIcon from '@/modules/general/components/icons/close/CloseIcon';

const NewsListFilter = ({
  categoryList,
  className,
  showSearch,
}: {
  categoryList: Category[] | null | undefined;
  className?: string;
  showSearch?: boolean;

}) => {
  const
    t = useTranslations(),
    isUnder750 = useMediaQuery('(max-width:750px)'),
    [openDrawer, setOpenDrawer,] = useState<boolean>(false),
    handleDrawer = () => {
      setOpenDrawer(!openDrawer);
    };

  return (
    <div className={`${styles.root} ${className && className}`}>
      <div className={styles.root__filters__input}>
        <NewsListFilterChip
          categoryList = {categoryList}
        />
      </div>
      <div
        className={styles.root__filters__filter}
        onClick={handleDrawer}
      >
        <div className={styles.root__filters__filter__button}>
          <div className={styles.root__filters__filter__button__svg}>
            <FunnelIcon />
          </div>
          <p>{t('common.filter')}</p>
        </div>
      </div>
      {isUnder750 ? (
        <CustomDrawer
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
        >
          <div className ={styles.root__drawer__header}>
            <div className ={styles.root__drawer__header__close}
              onClick={handleDrawer}
            >
              <CloseIcon />
              <div></div>
            </div>
          </div>
          <div>
            <div>
              <NewsListFilterCategory
                categoryList = {categoryList}
              />
            </div>
            <div >
              <p>{t('news.content_topics')}</p>
              {showSearch && (
                <>
                  <div className={styles.root__input}>
                    <Input
                      placeholder={t('common.search')}
                      name={'searchKeywords'}
                    />
                    <CloseIcon />
                  </div>
                </>
              )}
              <div className={styles.root__topicsList}>
              </div>
            </div>
          </div>
        </CustomDrawer>
      ) : (
        <div>
          <div className={styles.root__filters__box}>
            <NewsListFilterCategory
              categoryList = {categoryList}
            />
          </div>
          <div className={styles.root__filters__box}>
            <p>{t('news.content_topics')}</p>
            {showSearch && (
              <>
                <div className={styles.root__input}>
                  <Input
                    placeholder={t('common.search')}
                    name={'searchKeywords'}
                  />
                  <CloseIcon />
                </div>
              </>
            )}
            <div className={styles.root__topicsList}>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsListFilter;