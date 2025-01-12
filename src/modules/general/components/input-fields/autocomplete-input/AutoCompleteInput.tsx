'use client';

import React from 'react';
import { Typography, } from '@mui/material';
import { useTranslations, } from 'next-intl';
import TextField from '@mui/material/TextField';
import styles from './AutoCompleteInput.module.scss';
import Autocomplete from '@mui/material/Autocomplete';

export type AutoCompleteInputChange = {
  (event: any, values: any): void;
};

export type GetOptionLabel = {
  (option: any): void;
};

export default function AutoCompleteInput({
  options,
  id,
  label,
  getOptionLabel,
  onChange,
  value,
  fullWidth,
  tabIndex,
  isOptionEqualToValue,
}: {
  label: string;
  id?: string;
  options: any;
  onChange: AutoCompleteInputChange;
  getOptionLabel: GetOptionLabel;
  value?: any;
  fullWidth?: boolean;
  tabIndex?: number;
  isOptionEqualToValue?: any;
}) {
  const t = useTranslations();

  return (
    <label>
      <Autocomplete
        {...fullWidth && { fullWidth: fullWidth, }}
        {...value && { value, }}
        {...id && { id, }}
        {...options && { options: options, }}
        {...getOptionLabel && { getOptionLabel: getOptionLabel, }}
        {...onChange && { onChange: onChange, }}
        noOptionsText={
          <Typography>
            {t('common.search_not_found')}
          </Typography>
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            {...(tabIndex && tabIndex > 0) && { inputProps: { tabIndex: tabIndex, }, } }
          />
        )}
        {...isOptionEqualToValue && { isOptionEqualToValue: isOptionEqualToValue, }}

        classes={{
          root: styles.root__autocomplete,
          inputRoot: styles.root__autocomplete__inputRoot,
          input: styles.root__autocomplete__input,
          inputFocused: styles.root__autocomplete__inputFocused,
          clearIndicator: styles.root__autocomplete__clearIndicator,
          popper: styles.root__autocomplete__popper,
          listbox: styles.root__autocomplete__listbox,
          noOptions: styles.root__autocomplete__noOptions,
          endAdornment: styles.root__autocomplete__endAdornment,
        }}
      />
    </label>
  );
}
