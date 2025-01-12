'use client';

import { useEffect, useState, } from 'react';
import styles from './LawListFilter.module.scss';
import LawListFilterDate from './law-list-filter-date';
import LawListFilterChip from './law-list-filter-chip';
import { useLocale, useTranslations, } from 'next-intl';
import { Typography, useMediaQuery, } from '@mui/material';
import { LawYear, } from '@/modules/law/libraries/law-types';
import { useRouter, useSearchParams, } from 'next/navigation';
import LawListFilterCategory from './law-list-filter-category';
import FilterIcon from '@/modules/general/components/icons/filter';
import CustomDrawer from '@/modules/general/components/custom-drawer';
import { Category, } from '@/modules/category/libraries/category-types';

const LawListFilter = ({
  categoryList,
  yearList,
  className,
}: {
  categoryList: Category[] | null | undefined;
  yearList: LawYear[] | null | undefined;
  className?: string;
}) => {
  const
    t = useTranslations(),
    locale = useLocale(),
    router = useRouter(),
    searchParam = useSearchParams(),
    activeCategoryIdList = searchParam.get('category')?.split(',').map((item) => +item),
    isUnder750 = useMediaQuery('(max-width:750px)'),
    [openDrawer, setOpenDrawer,] = useState<boolean>(false),
    [checkedList, setCheckedList,] = useState<number[]>(activeCategoryIdList ? activeCategoryIdList : []),
    getActiveCategoryList = () => {
      const list: Category[] = [];
      if (categoryList && activeCategoryIdList && activeCategoryIdList.length > 0) {
        for (const item of activeCategoryIdList) {
          const category = categoryList.find((category) => category.id === item);
          if (category)
            list.push(category);
        }
      }
      return list;
    },
    [activeCategoryList, setActiveCategoryList,] = useState<Category[]>(getActiveCategoryList()),

    handleDelete = (category: Category) => {
      setActiveCategoryList(activeCategoryList.filter((item) => item.id !== category.id));
      setCheckedList(checkedList.filter((item) => item !== category.id));
    };

  useEffect(() => {
    let url = `/${locale}/law`;
    if (checkedList && checkedList.length > 0) {
      url = `/${locale}/law?category=${checkedList.join(',')}`;
    }
    router.push(url);
  }, [checkedList,]);

  return (
    <div className={`${styles.root} ${className ? className : "" }`}>
      {!isUnder750 ? (
        <div className={styles.root__desktop}>
          {categoryList && categoryList.length > 0 && (
            <div className={styles.root__desktop__container}>
              <LawListFilterCategory
                categoryList = {categoryList}
                setActiveCategoryList = {setActiveCategoryList}
                activeCategoryList = {activeCategoryList}
                checkedList = {checkedList}
                setCheckedList = {setCheckedList}
              />
            </div>
          )}
          {yearList && yearList.length > 0 && (
            <div className={styles.root__desktop__container}>
              <LawListFilterDate
                yearList={yearList}
              />
            </div>
          )}
        </div>
      ) : (
        <div className={styles.root__mobile}>
          <div className={styles.root__mobile__filter}>
            <div className={styles.root__mobile__filter__container}>
              <div className={styles.root__mobile__filter__container__content}>
                {activeCategoryList && activeCategoryList.length > 0 && activeCategoryList.map((category: Category) => (
                  <LawListFilterChip
                    key={category.id}
                    category={category}
                    handleDelete = {() => handleDelete(category)}
                  />
                ))}
              </div>
              <div
                onClick={() => setOpenDrawer(true)}
                className={styles.root__mobile__filter__container__button}
              >
                <FilterIcon />
                <Typography
                  variant='body2'
                  component={'p'}
                >
                  {t('common.filter')}
                </Typography>
              </div>
            </div>
          </div>
          <CustomDrawer
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
          >
            <div className={styles.root__mobile__drawer}>
              <LawListFilterCategory
                categoryList = {categoryList}
                setActiveCategoryList = {setActiveCategoryList}
                activeCategoryList = {activeCategoryList}
                checkedList = {checkedList}
                setCheckedList = {setCheckedList}
              />
              <LawListFilterDate
                yearList={yearList}
              />
            </div>
          </CustomDrawer>
        </div>
      )}
    </div>
  );
};

export default LawListFilter;