import React from 'react';
import styles from './TextFieldInput.module.scss';
import { TextField, TextFieldProps, } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

type TextFieldInputProps = TextFieldProps & {
  loading?: boolean;
};

export default function TextFieldInput({
  loading,
  ...props
}: TextFieldInputProps) {

  return (
    <TextField
      {...props}
      {...loading && { disabled: true, }}
      classes={{ root: `${props?.classes?.root} ${props.dir === 'ltr' ? styles.root__ltr : ''}`, }}
      {...loading && {
        InputProps: {
          ...props.InputProps,
          endAdornment: props.dir !== 'ltr' && <CircularProgress classes={{ root: styles.root__loading, }} />,
          startAdornment: props.dir === 'ltr' && <CircularProgress classes={{ root: `${styles.root__loading} ${styles.root__margin}`, }} />,
        },
      }
      }
    />
  );
}
