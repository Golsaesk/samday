
'use client';

import React from 'react';
import Radio from '@mui/material/Radio';
import styles from './ListSort.module.scss';
import { useTranslations, } from 'next-intl';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import { SortItem, Sorting, } from '@modules/general/libraries/general-types';

export default function ListSort({
  onSort,
  currentSort,
  sortItems,
}: {
  onSort: any;
  currentSort: Sorting | null | undefined;
  sortItems: SortItem[];
}) {
  const t = useTranslations('sorting');

  return (
    <div className={styles.root}>
      <Typography
        variant={'h6'}
        component={'p'}
        className={styles.root__title}
      >
        {t('sorting_based_on')}
      </Typography>
      <FormControl classes={{ root: styles.root__formGroup, }}>
        <RadioGroup
          defaultValue="female"
          name="radio-buttons-group"
        >
          {sortItems.map((item: SortItem) => {
            return (
              <FormControlLabel
                key={Math.random()}
                control={<Radio />}
                value={item.title}
                checked={item.expression === currentSort?.expression && item.ascending === currentSort?.ascending}
                onClick={
                  () => onSort(
                    {
                      expression: item.expression,
                      ascending: item.ascending,
                    } as Sorting
                  )}
                label={item.title}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    </div>
  );
}
