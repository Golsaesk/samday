'use client';

import React from 'react';
import styles from './TextInput.module.scss';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import {
  CircularProgress, TextField,
  TextFieldProps, Typography,
} from '@mui/material';

type TextFieldInputProps = TextFieldProps & {
  loading?: boolean;
  helper?: string;
  showErrorIcon?: boolean;
  locale?: string;
  focus?: boolean;
};

export default function TextInput({
  loading,
  helper,
  helperText,
  showErrorIcon,
  locale,
  focus,
  ...props
}: TextFieldInputProps) {

  return (
    <>
      <FormControl
        className={`${styles.root} ${props.classes?.root}`}
        error={props.error}
      >
        <TextField
          {...props}
          aria-describedby="component-helper-text"
          classes={{ root: `${styles.root__input} ${locale === 'en' ? 'en' : ''}`, }}
          {...loading && {
            InputProps: {
              endAdornment: props.dir !== 'ltr' && <CircularProgress classes={{ root: styles.root__loading, }} />,
              startAdornment: props.dir === 'ltr' && <CircularProgress classes={{ root: `${styles.root__loading} ${styles.root__margin}`, }} />,
            },
          }
          }
          inputRef={(input) => {
            if (focus) {
              input && input.focus();
            }
          }}
        />
        {(helper || helperText) ? (
          <FormHelperText
            className={styles.root__helperText}
          >
            {helper && (
              <Typography component="span" className={styles.root__rule}>
                {helper}
              </Typography>
            )}
            {helperText && (
              <Typography component="span" className={styles.root__error}>
                {showErrorIcon && (<WarningRoundedIcon />)}
                {helperText}
              </Typography>
            )}
          </FormHelperText>
        ) : (
          <></>
        )}
      </FormControl>
    </>
  );
}
