'use client';

import React from 'react';
import { useTranslations, } from 'next-intl';
import { Drawer, Typography, } from '@mui/material';
import styles from './DrawerMobileLayout.module.scss';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Country, } from '@/modules/general/libraries/country-types';
import ButtonInput from '@/modules/general/components/input-fields/button-input';
import { SelectInputOptionType, } from '@/modules/general/libraries/general-types';

export default function DrawerMobileLayout({
  label,
  open,
  handleClose,
  options,
  onSelect,
  selectedItem,
}: {
  label: string;
  open: boolean;
  handleClose: any;
  options: SelectInputOptionType[];
  onSelect: any;
  selectedItem: Country;
}) {
  const t = useTranslations();
  return (
    <Drawer
      open={open}
      anchor={'bottom'}
      classes={{
        root: styles.root,
        paper: styles.root__paper,
      }}
    >
      <div className={styles.root__header}>
        <Typography
          variant={'h6'}
          className={styles.root__header__text}
        >
          {label}
        </Typography>
        <div
          onClick={() => handleClose(true)}
          className={styles.root__header__closeIcon}
        >
          <CloseRoundedIcon />
        </div>
      </div>
      <div className={styles.root__content}>
        {options && options.length > 0 && options.map((item: SelectInputOptionType, index: number) => {
          return (
            <div
              key={`MobileSelectItem_${index}`}
              onClick={() => onSelect(item)}
              className={`${styles.root__content__item} 
            ${selectedItem && item.value === selectedItem.id && styles.root__content__item__selected}`}
            >
              <Typography
                variant={'body1'}
                className={`${styles.root__content__item__text} ${item.dir === 'ltr' && styles.root__content__item__text__ltr}`}
              >
                {item.label}
              </Typography>
            </div>
          );
        })}
      </div>
      <div className={styles.root__buttons}>
        <ButtonInput
          fullWidth
          onClick={() => handleClose(true)}
          variant={'outlined'}
        >
          {t('common.cancel')}
        </ButtonInput>
        <ButtonInput
          fullWidth
          variant={'contained'}
          onClick={() => handleClose(false)}
        >
          {t('common.select')}
        </ButtonInput>
      </div>
    </Drawer>
  );
}
