'use client';

import styles from './CustomInput.module.scss';
import {
  FormHelperText, Input, Typography,
} from '@mui/material';

const CustomInput = ({
  label,
  placeholder,
  multiline = false,
  dir = 'rtl',
  value,
  onChange,
  helperText,
  autoFocus = false,
  className,
}: {
  label?: string;
  placeholder?: string;
  value: string;
  helperText?: string;
  multiline?: boolean;
  autoFocus?: boolean;
  dir?: 'ltr' | 'rtl';
  className?: string;
  onChange: any;
}) => {

  return (
    <div className={`${styles.root} ${className ? className : ''}`}>
      {label && (
        <Typography
          variant='subtitle1'
          className={styles.root__label}
        >
          {label}
        </Typography>
      )}
      <div className={styles.root__input}>
        <Input
          onChange={onChange}
          value={value}
          placeholder={placeholder && placeholder}
          name={label}
          multiline ={multiline}
          minRows={multiline ? 15 : 1}
          inputProps={{ dir: dir, }}
          autoComplete='name'
          autoFocus = {autoFocus}
        />
      </div>
      {(helperText) ? (
        <FormHelperText>
          <Typography
            component="span"
            className={styles.root__error}
          >
            {helperText}
          </Typography>
        </FormHelperText>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CustomInput;