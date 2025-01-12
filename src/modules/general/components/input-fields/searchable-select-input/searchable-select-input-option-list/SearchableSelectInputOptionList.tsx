import React from 'react';
import { useTranslations, } from 'next-intl';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SearchIcon from '@/modules/general/components/icons/search';
import styles from './SearchableSelectInputOptionList.module.scss';
import { useDeviceType, } from '@/modules/general/libraries/device-type';
import { SelectInputOptionType, } from '@/modules/general/libraries/general-types';
import {
  Collapse, CollapseProps, TextField,
} from '@mui/material';

export default function SearchableSelectInputOptionList({
  open,
  onChange,
  options,
  onClose,
  label,
  collapseProps,
  value,
  searchPlaceholder,
}: {
  open: boolean;
  onChange: any;
  options: SelectInputOptionType[];
  onClose?: any;
  label?: string;
  collapseProps?: CollapseProps;
  value?: any;
  searchPlaceholder?: string;
}
) {
  const
    t = useTranslations(),
    deviceType = useDeviceType(),

    handleSelect = (item: SelectInputOptionType) => {
      onChange(item);
    };

  return (
    <div className={`${styles.root}  ${open ? styles.root__open : ''}`}>
      <Collapse
        {...collapseProps}
        in={open}
        classes={{
          root: `${collapseProps?.classes?.root ?? ''} ${styles.root__collapse}`,
          wrapperInner: `${collapseProps?.classes?.wrapperInner ?? ''} ${styles.root__collapse__innerWrapper}`,
          ...collapseProps?.classes,
        }}
      >
        {deviceType.isMobile && (
          <div className={styles.root__collapse__header}>
            {label}
            <div
              onClick={onClose}
              className={styles.root__collapse__header__close}
            >
              <CloseRoundedIcon />
            </div>
          </div>
        )}
        <div className={styles.root__collapse__search}>
          <TextField
            fullWidth
            placeholder={searchPlaceholder ?? t('common.search_placeholder')}
            classes={{ root: styles.root__collapse__search__input, }}
            InputProps={{
              startAdornment:
              <div className={styles.root__collapse__search__icon}>
                <SearchIcon />
              </div>,
            }}
          />
        </div>
        <div className={styles.root__collapse__list}>
          {options.map((option: SelectInputOptionType) => {
            return (
              <div
                key={Math.random()}
                onClick={() => handleSelect(option)}
                style={{ direction: `${ option.dir || 'rtl'}`, }}
                className={`${styles.root__collapse__list__item} ${option.value === value ? styles.root__collapse__list__item__active : ''}`}
              >
                {option.label}
              </div>
            );
          })}
        </div>
      </Collapse>
    </div>
  );
}