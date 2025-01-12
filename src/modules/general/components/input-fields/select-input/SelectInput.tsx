'use client';

import { useTranslations, } from 'next-intl';
import styles from './SelectInput.module.scss';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState, } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import SelectInputOptionList from './select-input-option-list';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { useDeviceType, } from '@/modules/general/libraries/device-type';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { SelectInputOptionType, SelectInputProps, } from '@/modules/general/libraries/general-types';

export default function SelectInput({
  value,
  options,
  classes,
  defaultValue,
  collapseProps,
  onSelectChange,
  noBorder,
  searchable,
  alignToParent,
  dir,
  popupLabel,
  loading,
  defaultValueClickable,
  openCollapse: openCollapse = true,
  ...props
}: SelectInputProps) {
  const
    t = useTranslations(),
    deviceType = useDeviceType(),
    [open, setOpen,] = useState<boolean>(false),
    [inputValue, setInputValue,] = useState<string>(''),

    handleOpenToggle = () => {
      setOpen(prev => !prev);
    },

    handleOpenChange = (status: boolean) => {
      setOpen(status);
    },

    handleSelectChange = (item: SelectInputOptionType) => {
      if (item) {
        setInputValue(item.label || '');
        handleOpenChange(false);
        if (onSelectChange) {
          onSelectChange(item.value);
        }
      }
    };

  useEffect(() => {
    if (options) {
      if (defaultValue) {
        const found = options.find((item: SelectInputOptionType) => `${JSON.stringify(item.value)}` === `${JSON.stringify(defaultValue)}` || item.value === defaultValue);
        if (found) {
          setInputValue(found.label || '');
        } else {
          setInputValue('');
        }
      } else {
        setInputValue(options[0]?.label || '');
      }
    }
  }, []);

  useEffect(() => {
    if (options && options.length > 0) {
      if (value) {
        const found = options.find((item: SelectInputOptionType) => `${JSON.stringify(item.value)}` === `${JSON.stringify(value)}` || item.value === value);
        if (found) {
          setInputValue(found.label || '');
        } else {
          setInputValue('');
        }
      }
    }
  }, [value, options,]);

  useEffect(() => {
    if (deviceType.isMobile) {
      if (open) {
        document.body.classList.add('noScroll');
      } else {
        document.body.classList.remove('noScroll');
      }
    }
  }, [open,]);

  return (
    <ClickAwayListener onClickAway={() => handleOpenChange(false)}>
      <div
        {...dir && { dir: dir, }}
        className={`${styles.root} ${props.className || ''} ${classes?.root ?? ''} ${!alignToParent ? styles.relative : ''}`}
      >
        <TextField
          fullWidth
          {...props}
          value={inputValue || ''}
          {...dir && { dir: dir, }}
          {...noBorder && { variant: 'standard', }}
          {...!loading && { onClick: handleOpenToggle, }}
          classes={{
            root: `${styles.root__input} ${!openCollapse ? styles.root__input__disable : ""} ${classes?.textfield?.root ?? ''} ${noBorder ? styles.noBorder : ''}`,
            ...classes?.textfield,
          }}
          InputLabelProps={{
            shrink: true,
            ...props?.InputLabelProps,
          }}
          InputProps={{
            readOnly: true,
            ...props?.InputProps,
            endAdornment:
                  <>
                    {loading ? (
                      <CircularProgress classes={{ root: styles.root__input__adornment__loading, }} />
                    ) : (
                      <div
                        className={`${styles.root__input__adornment__arrow} ${
                          (open && openCollapse) ? styles.root__input__adornment__arrow__up : ''} ${
                          dir && dir === "ltr" ? styles.root__input__adornment__arrow__ltr : ''}`}
                      >
                        <KeyboardArrowDownRoundedIcon />
                      </div>
                    )}
                  </>,
          }}
        />
        {!loading && options && options.length > 0 && (
          <SelectInputOptionList
            open={open && openCollapse}
            value={value}
            options={options}
            collapseProps={collapseProps}
            onChange={handleSelectChange}
            label={`${popupLabel || props?.label || ''}`}
            onClose={() => handleOpenChange(false)}
            searchable={searchable}
            searchPlaceholder={t('common.search')}
            {...dir && { dir: dir, }}
            className = {classes?.list ?? ''}
            defaultValueClickable={defaultValueClickable}
          />
        )}
      </div>
    </ClickAwayListener>
  );
}
