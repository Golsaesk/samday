'use client';

import TextField from '@mui/material/TextField';
import React, { useEffect, useState, } from 'react';
import styles from './SearchableSelectInput.module.scss';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { useDeviceType, } from '@/modules/general/libraries/device-type';
import SelectInputOptionList from './searchable-select-input-option-list';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { SelectInputOptionType, SelectInputProps, } from '@/modules/general/libraries/general-types';

export default function SearchableSelectInput({
  value,
  options,
  classes,
  defaultValue,
  collapseProps,
  fullAdornment,
  onSelectChange,
  adornmentText,
  searchPlaceholder,
  ...props
}: SelectInputProps) {
  const
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
      setInputValue(item.label);
      handleOpenChange(false);
      if (onSelectChange) {
        onSelectChange(item.value);
      }
    };

  useEffect(() => {
    if (options) {
      if (defaultValue) {
        setInputValue(`${options.filter(item => item.value === defaultValue)[0].label || ''}`);
      }
    }
  }, []);

  useEffect(() => {
    if (options) {
      if (value) {
        setInputValue(options.filter(item => JSON.stringify(item.value) === JSON.stringify(value))[0]?.label);
      }
    }
  }, [value,]);

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
    <>
      {options && options.length > 0 && (
        <ClickAwayListener onClickAway={() => handleOpenChange(false)}>
          <div className={`${styles.root} ${classes?.root ?? ''}`}>
            <TextField
              fullWidth
              {...props}
              value={inputValue}
              onClick={handleOpenToggle}
              classes={{
                root: `${styles.root__input} ${props.dir === 'ltr' ? styles.root__input__ltr : ''} ${classes?.textfield?.root ?? ''}`,
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
            <div className={`${
              styles.root__input__adornment} ${
              props.dir === 'ltr' ? styles.root__input__adornment__ltr : ''} ${
              !adornmentText ? styles.root__input__adornment__noBorder : '' } ${
              fullAdornment ? styles.root__input__adornment__full : ''
            }`}
            >
              {adornmentText}
              <div className={`${
                styles.root__input__adornment__arrow} ${
                !adornmentText ? styles.root__input__adornment__arrow__noMargin : '' } ${
                props.dir === 'ltr' ? styles.root__input__adornment__arrow__ltr : ''} ${
                open ? styles.root__input__adornment__arrow__up : ''
              }`}
              >
                <KeyboardArrowDownRoundedIcon />
              </div>
            </div>,
              }}
            />
            <SelectInputOptionList
              open={open}
              value={value}
              options={options}
              collapseProps={collapseProps}
              onChange={handleSelectChange}
              label={`${props?.label}` || ''}
              onClose={() => handleOpenChange(false)}
              searchPlaceholder={searchPlaceholder}
            />
          </div>
        </ClickAwayListener>
      )}
    </>
  );
}
