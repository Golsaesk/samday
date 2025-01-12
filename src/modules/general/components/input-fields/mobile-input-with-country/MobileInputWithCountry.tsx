'use client';

import styles from './MobileInputWithCountry.module.scss';
import MobileInputAdornment from './mobile-input-adornment';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import MobileInputCountryList from './mobile-input-country-list';
import { Country, } from '@modules/general/libraries/country-types';
import TextField, { TextFieldProps, } from '@mui/material/TextField';
import { fetchCountryList, } from '@modules/general/store/api/country-api';
import { IRAN_COUNTRY_CALLING_CODE, IRAN_COUNTRY_ID, } from '@modules/general/libraries/constants';
import {
  fixNumbers, hasInvalidChar, mobileFormatter,
} from '@modules/general/libraries/utils';
import React, {
  useRef, KeyboardEvent, useState, useEffect,
} from 'react';

export type MobileInputWithCountryChange = {
  (country: Country, mobile: string): void;
};

export type MobileInputWithCountryProps = TextFieldProps & {
  onInputChange: MobileInputWithCountryChange;
  disableCountrySelection?: boolean;
  defaultCountryCallingCode: number;
  tabIndex?: number;
  className?: string;
  shrink?: boolean;
  id: string;
};

export default function MobileInputWithCountry({
  tabIndex,
  shrink = true,
  onInputChange,
  className = '',
  disableCountrySelection = true,
  defaultCountryCallingCode = IRAN_COUNTRY_CALLING_CODE,
  id,
  ...props
}: MobileInputWithCountryProps) {
  const
    [mobile, setMobile,] = useState<string>(''),
    element = useRef<HTMLInputElement | null>(null),
    [countryList, setCountryList,] = useState<Country[]>([] as Country[]),
    [selectedCountry, setSelectedCountry,] = useState<Country>({} as Country),
    [openList, setOpenList,] = useState<boolean>(false),

    handleListOpenStatus = (status: boolean) => {
      setOpenList(status);
    },

    handleMobileInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (
        event.target &&
        element &&
        element.current &&
        !event.altKey &&
        !event.ctrlKey
      ) {
        if (hasInvalidChar(event.key)) {
          event.preventDefault();
          if (element.current) {
            const textfieldList = element.current.querySelectorAll('input[type=text]');
            if (textfieldList && textfieldList.length > 0) {
              let textfield = textfieldList[0] as HTMLInputElement;
              if (textfield) {
                const t = event.target as HTMLInputElement;
                const currentValue = `${t.value}`;
                const selectionEnd = t.selectionEnd || 0;
                const newValue = `${currentValue.substring(0, selectionEnd)}${event.key}${currentValue.substring(selectionEnd)}`;
                textfield.value = fixNumbers(newValue);
                textfield.setSelectionRange(newValue.length, newValue.length);
                setMobile(mobileFormatter(event.currentTarget.value));
                onInputChange(selectedCountry, event.currentTarget.value);
              }
            }
          }
        }
      }
    },

    countryChange = (country: Country) => {
      onInputChange(country, mobile);
      setSelectedCountry(country);
      handleListOpenStatus(false);
    },

    initCountryList = async () => {
      try {
        const response = await fetchCountryList(
          {
            limit: 500,
            offset: 0,
            locale: 'en',
            sorting: [
              {
                ascending: true,
                expression: 'name',
              },
            ],
          }
        );

        if (response && response.data && response.data.length > 0) {
          setCountryList(response.data);
          if (defaultCountryCallingCode) {
            setSelectedCountry(
              response.data.filter((item: Country) => item.calling_code === defaultCountryCallingCode)[0]
            );
          } else {
            setSelectedCountry(response.data.filter((item: Country) => item.id === IRAN_COUNTRY_ID)[0]);
          }
        }
      } catch (e: any) {
      }
    };

  useEffect(() => {
    initCountryList();
  }, []);

  return (
    <ClickAwayListener onClickAway={() => handleListOpenStatus(false)}>
      <div className={`${styles.root} ${className}`}>
        <TextField
          {...props}
          id={id}
          fullWidth
          value={mobile}
          ref={element}
          className={styles.root__input}
          onKeyDown={handleMobileInputKeyDown}
          {...shrink && { InputLabelProps: { shrink: shrink, }, }}

          inputProps={{
            ...(tabIndex && tabIndex > 0) && { tabIndex: tabIndex, },
            onClick: () => handleListOpenStatus(false),
          }}
          onChange={(e) => {
            setMobile(mobileFormatter(e.target.value));
            onInputChange(selectedCountry, e.target.value);
          }}
          InputProps={{
            inputMode: 'numeric',
            endAdornment:
          <MobileInputAdornment
            country={selectedCountry}
            disabled={!disableCountrySelection}
            onClick={() => handleListOpenStatus(true)}
          />,
          }}
        />
        <MobileInputCountryList
          open={openList}
          onChange={countryChange}
          countryList={countryList}
          onClose={() => handleListOpenStatus(false)}
          id={`MobileInputCountryList${id}`}
        />
      </div>
    </ClickAwayListener>
  );
}
