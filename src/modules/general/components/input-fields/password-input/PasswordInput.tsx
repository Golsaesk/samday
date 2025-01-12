'use client';

import React, { useState, } from 'react';
import styles from './PasswordInput.module.scss';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import PasswordStrengthMeter from './password-strength-meter';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { PasswordScore, checkPasswordScore, } from '@/modules/general/libraries/password-helper';
import {
  OutlinedInput, OutlinedInputProps, Typography,
} from '@mui/material';

type TextFieldInputProps = OutlinedInputProps & {
  onPasswordChange: any;
  helper?: string;
  helperText?: string;
  showStrengthMeter?: boolean;
};

export default function PasswordInput({
  onPasswordChange,
  error,
  id,
  label,
  helper,
  helperText,
  value,
  showStrengthMeter,
  className,
  ...props
}: TextFieldInputProps) {

  const
    [isSelected, setIsSelected, ] = useState(false),
    [showPassword, setShowPassword, ] = useState<boolean>(false),
    [currentScore, setCurrentScore, ] = useState<PasswordScore>(checkPasswordScore('')),

    handleChange = (event: any) => {
      const password = event.target.value;
      setCurrentScore(checkPasswordScore(password));
      onPasswordChange(password);
    },

    handleClickShowPassword = () => {
      setShowPassword(
        !showPassword
      );
    },

    handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };

  return (
    <>
      <FormControl
        variant="outlined"
        className={styles.root}
        error={error}
        id={`control_${id}`}
      >
        <InputLabel
          htmlFor={id}
          id={`label_${id}`}
        >
          {label}
        </InputLabel>
        <OutlinedInput
          {...props}
          suppressHydrationWarning
          id={id}
          type={showPassword ? 'text' : 'password'}
          onChange={handleChange}
          className={`${className || ''} ${styles.root__input}`}
          {...isSelected && {
            startAdornment: <InputAdornment position="start">
              <IconButton
                disableRipple
                className={styles.root__input__icon}
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="start"
              >
                {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
              </IconButton>
            </InputAdornment>,
          } }
          onFocus={() => setIsSelected(true)}
          onBlur={() => setIsSelected(false)}
          {...label && { label: label, } }
        />
        {(value && showStrengthMeter ) ? <PasswordStrengthMeter score={currentScore} /> : <></>}
        {(helper || helperText) ?
          (
            <FormHelperText
              id="component-helper-text"
              className={styles.root__helperText}
            >
              {helperText && (
                <Typography
                  component="span"
                  className={styles.root__error}
                >
                  {helperText}
                </Typography>
              )}
              {helper && (
                <Typography
                  component="span"
                  className={styles.root__rule}
                >
                  {helper}
                </Typography>
              )}
            </FormHelperText>
          ) :
          (
            <></>
          )}
      </FormControl>
    </>
  );
}