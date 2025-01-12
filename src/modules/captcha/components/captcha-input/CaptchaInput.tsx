/* eslint-disable @next/next/no-img-element */
'use client';

import { RootState, } from '@/redux/store';
import styles from './CaptchaInput.module.scss';
import React, { useEffect, useState, } from 'react';
import { useAppDispatch, useAppSelector, } from '@/redux/hooks';
import ReloadIcon from '@/modules/general/components/icons/reload';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { fixNumbers, newGuid, } from '@modules/general/libraries/utils';
import TextInput from '@/modules/general/components/input-fields/text-input';
import { fetchCaptchaDetailThunk, } from '@modules/captcha/store/captcha-slice';
import { CaptchaStateDetailItem, } from '@modules/captcha/libraries/captcha-types';
import {
  FormControl, FormHelperText, PaletteMode, Typography,
} from '@mui/material';

const CaptchaInput = ({
  captchaId,
  onCaptchaChange,
  onChange,
  error,
  helperText,
  textInputId,
  label = '',
  placeholder = '',
  tabIndex = 0,
  mode,
  className,
  helper,
  showErrorIcon = false,
  inputRef,
  maxLength = 4,
}: {
  captchaId: string;
  onCaptchaChange: any;
  onChange?: any;
  error?: boolean;
  helperText?: string | null | undefined;
  textInputId?: string;
  height?: number;
  label?: string;
  placeholder?: string;
  tabIndex?: number;
  mode: PaletteMode;
  className?: string;
  helper?: string;
  showErrorIcon?: boolean;
  value?: string;
  inputRef?: React.Ref<any>;
  maxLength?: number;
}) => {

  const
    dispatch = useAppDispatch(),
    [currentCaptchaId, setCurrentCaptchaId, ] = useState<string>(captchaId),
    captchaDetail: CaptchaStateDetailItem = useAppSelector((state: RootState) => state.captchaReducer.detail[currentCaptchaId]),
    id = textInputId ? textInputId : `captcha-${captchaId}`,
    [currentCaptchaValue, setCurrentCaptchaValue, ] = useState<string>(''),

    resetCaptcha = () => {
      setCurrentCaptchaId(newGuid());
    },

    handleCaptchaChange = (event: any) => {
      const numbers = fixNumbers(event.target.value);
      setCurrentCaptchaValue(numbers);
      if (onCaptchaChange) {
        onCaptchaChange(currentCaptchaId, numbers);
      }
      if (onChange) {
        onChange(numbers);
      }
    };

  useEffect(() => {
    if (currentCaptchaId) {
      dispatch(fetchCaptchaDetailThunk({
        id: currentCaptchaId,
        mode,
      }));
    }
  }, [currentCaptchaId, ]);

  useEffect(() => {
    if (captchaId !== currentCaptchaId) {
      setCurrentCaptchaId(captchaId);
      setCurrentCaptchaValue('');
    }
  }, [captchaId, ]);

  return (
    <>
      {captchaId && (
        <>
          <FormControl
            className={`${styles.root} ${className ? className : ''}`}
            error={error}
          >
            <TextInput
              label={label}
              id={id}
              type='text'
              placeholder={placeholder}
              onChange={handleCaptchaChange}
              value={currentCaptchaValue}
              autoComplete={'new-password'}
              inputMode='numeric'
              error={error}
              className={`${styles.root__input} ${className ? className : ''} `}
              inputProps={{
                ...(tabIndex && tabIndex > 0) && { tabIndex: tabIndex, },
                inputMode: 'numeric',
                dir: 'ltr',
                maxLength: maxLength,
              }}
              variant="standard"
              InputProps={{
                endAdornment: <div className={styles.root__input__endAdornment}>
                  <div className={styles.root__input__captcha}>
                    {captchaDetail && captchaDetail.item && (
                      <img
                        src={`data:image/jpeg;base64,${captchaDetail.item.base64_image}`}
                        alt="captcha"
                        className={styles.root__input__captcha__image}
                      />
                    )}
                  </div>
                  <div
                    className={styles.root__input__captcha__reset}
                    onClick={resetCaptcha}
                  >
                    <ReloadIcon />
                  </div>
                </div>,
                inputMode: 'numeric',
                disableUnderline: true,
              }}
              {...inputRef && { inputRef: inputRef, } }
            />
            {(helper || helperText) ? (
              <FormHelperText
                id="component-helper-text"
                className={styles.root__helperText}
              >
                {helper && (
                  <Typography component="span" className={styles.root__rule}>
                    {helper}
                  </Typography>
                )}
                {helperText && (
                  <Typography component="span" className={styles.root__error}>
                    { showErrorIcon && (<WarningRoundedIcon />)}
                    {helperText}
                  </Typography>
                )}
              </FormHelperText>
            ) : (
              <></>
            )}
          </FormControl>
        </>
      )}
    </>
  );
};

export default CaptchaInput;
