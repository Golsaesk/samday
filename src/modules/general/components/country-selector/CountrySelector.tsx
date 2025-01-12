'use client';

import Image from 'next/image';
import { useTranslations, } from 'next-intl';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import CloseIcon from '@mui/icons-material/Close';
import styles from './CountrySelector.module.scss';
import React, { useEffect, useState, } from 'react';
import { Country, } from '@modules/general/libraries/country-types';
import { fetchCountryList, } from '@modules/general/store/api/country-api';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import {
  DOMAIN, IRAN_COUNTRY_CALLING_CODE, IRAN_COUNTRY_ID,
} from '@modules/general/libraries/constants';
import {
  Popover, TextField, Typography,
} from '@mui/material';

export type CountrySelectorChange = {
  (country: Country): void;
};

export default function CountrySelector({
  onChange,
  defaultCountryCallingCode = IRAN_COUNTRY_CALLING_CODE,
  countryList,
  tabIndex = -1,
  readOnly,
  id,
}: {
  onChange: CountrySelectorChange;
  defaultCountryCallingCode: number;
  countryList: Country[];
  tabIndex?: number;
  readOnly?: boolean;
  id: string;
}
) {
  const
    [anchorEl, setAnchorEl, ] = React.useState<EventTarget & HTMLDivElement | null>(null),
    open = Boolean(anchorEl),
    t = useTranslations(),
    popOverId = open ? 'simple-popover' : undefined,
    [selectedCountry, setSelectedCountry, ] = useState<Country | null>(null),
    [menuItems, setMenuItems, ] = useState<Country[]>([] as Country[]),
    [searchValue, setSearchValue, ] = useState<string>(''),

    searchHandle = (searchString: string) => {
      setSearchValue(searchString);

    },

    clearSearch = () => {
      setSearchValue('');
    },

    initCountryList = async () => {
      if (!countryList || countryList.length === 0) {
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

        if (response && response.data && response.data.length > 0 ) {
          setMenuItems(response.data);
          if (defaultCountryCallingCode) {
            setSelectedCountry(
              response.data.filter((item: Country) => item.calling_code === defaultCountryCallingCode)[0]
            );
          } else {
            setSelectedCountry(response.data.filter((item: Country) => item.id === IRAN_COUNTRY_ID)[0]);
          }
        }
      } else {
        setMenuItems(countryList);
        if (defaultCountryCallingCode) {
          setSelectedCountry(
            countryList.filter((item: Country) => item.calling_code === defaultCountryCallingCode)[0]
          );
        } else {
          setSelectedCountry(countryList.filter((item: Country) => item.id === IRAN_COUNTRY_ID)[0]);
        }
      }

    },

    handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setAnchorEl(event.currentTarget);
    },

    handleClose = () => {
      setAnchorEl(null);
      clearSearch();
    },

    countrySelectHandler = (country: Country) => {
      setSelectedCountry(country);
      onChange(country);
      handleClose();
      clearSearch();
    };

  useEffect(() => {
    initCountryList();
  }, []);

  useEffect(() => {
    if (searchValue) {
      let newList = countryList.filter((country: Country) => country.title.toLowerCase().includes(searchValue.toLowerCase()));
      setMenuItems(newList);
    } else {
      setMenuItems(countryList);
    }
  }, [searchValue, ]);

  return (
    <>
      <div
        tabIndex={tabIndex}
        {...!readOnly && { onClick: (e) => handleClick(e), }}
        className={`${styles.root} ${readOnly ? styles.root__readOnly : ''}`}
      >
        <Image
          alt={''}
          width={25}
          height={30}
          className={styles.root__image}
          src={`${DOMAIN}/images/country-flag/${selectedCountry?.iso_two || 'null'}.svg`}
        />
        <Typography className={styles.root__code}>
          {`+${selectedCountry ? selectedCountry.calling_code : IRAN_COUNTRY_CALLING_CODE}` }
        </Typography>
        {!readOnly && (
          <div className={`${styles.root__arrow} ${open ? styles.root__arrow__open : ''}`}>
            <KeyboardArrowDownRoundedIcon />
          </div>
        )}
      </div>
      <Popover
        id={popOverId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        classes={{
          root: styles.popover,
          paper: styles.popover__paper,
        }}
      >
        <>
          <TextField
            className={styles.popover__search}
            onChange={(e) => searchHandle(e.target.value)}
            value={searchValue}
            placeholder={`${t('common.search')}...`}
            inputProps={{ autocomplete: "country", }}
            id={`searchCountry${id}`}
            {...searchValue && {
              InputProps: {
                endAdornment:
                <>
                  <div
                    onClick={clearSearch}
                    className={styles.popover__search__clearIcon}
                  >
                    <CloseIcon />
                  </div>
                </>,
                autoComplete: 'country',
              },
            }}
            autoComplete='country'
          />
          {menuItems && menuItems.length > 0 ? (
            <MenuList classes={{ root: styles.popover__menu, }}>
              { menuItems.map((item: Country, index: number) =>
                (
                  <MenuItem
                    key={index}
                    onClick={() => countrySelectHandler(item)}
                    classes={{ root: styles.popover__menu__menuItem, }}
                  >
                    <Image
                      alt={''}
                      width={25}
                      height={30}
                      className={styles.popover__menu__menuItem__image}
                      src={`${DOMAIN}/images/country-flag/${item?.iso_two}.svg`}
                    />
                    {`(+${item.calling_code}) ${item.title}`}
                  </MenuItem>
                )
              )}
            </MenuList>
          ) : (
            <Typography className={styles.popover__search__noResult}>
              {t('common.country_selector_search_no_result')}
            </Typography>
          )}
        </>
      </Popover>
    </>
  );
}