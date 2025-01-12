'use client';

import { useTranslations, } from 'next-intl';
import styles from './LawListFilterCategory.module.scss';
import { Category, } from '@/modules/category/libraries/category-types';
import {
  Checkbox, FormControlLabel, FormGroup, Typography,
} from '@mui/material';

const LawListFilterCategory = ({
  categoryList,
  setActiveCategoryList,
  activeCategoryList,
  checkedList,
  setCheckedList,
  className,
}: {
  categoryList: Category[] | null | undefined;
  setActiveCategoryList: any;
  activeCategoryList: Category[];
  checkedList: number[];
  setCheckedList: any;
  className?: string;
}) => {
  const
    t = useTranslations(),
    handleCheckChange = (category: Category, event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked && !checkedList.some((item) => item === category.id)) {
        setCheckedList([...checkedList, category.id,]);
        setActiveCategoryList([...activeCategoryList, category,]);
      } else {
        setCheckedList(checkedList.filter(item => item !== category.id));
        setActiveCategoryList(activeCategoryList.filter(item => item.id !== category.id));
      }
    };

  return (
    <>
      {categoryList && categoryList.length > 0 && (
        <div className={`${styles.root} ${className ? className : "" }`}>
          <Typography
            variant='h5'
            className={styles.root__title}
          >
            {t('law.category_title')}
          </Typography>
          <FormGroup className={styles.root__checkbox}>
            {categoryList.map((category: Category) => (
              <FormControlLabel
                key={category.id}
                control={
                  <Checkbox
                    onChange={(event) => handleCheckChange(category, event)}
                    checked = {checkedList.some((item) => item === category.id)}
                  />
                }
                label={category.title}
                classes={{ label: styles.root__checkbox__label, }}
              />
            ))}
          </FormGroup>
        </div>
      )}
    </>
  );
};

export default LawListFilterCategory;