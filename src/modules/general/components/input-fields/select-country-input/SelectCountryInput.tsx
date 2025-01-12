'use client';

import Image from 'next/image';
import Drawer from '@mui/material/Drawer';
import { useTranslations, } from 'next-intl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState, } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import styles from './SelectCountryInput.module.scss';
import InputAdornment from '@mui/material/InputAdornment';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SearchIcon from '@/modules/general/components/icons/search';
import { Country, } from '@/modules/general/libraries/country-types';
import { useDeviceType, } from '@/modules/general/libraries/device-type';
import { fetchCountryList, } from '@/modules/general/store/api/country-api';
import ButtonInput from '@/modules/general/components/input-fields/button-input';
import {
  WEBSITE_DEFAULT_LOCALE, IRAN_COUNTRY_ID, DOMAIN,
} from '@/modules/general/libraries/constants';

export default function SelectCountryInput(
  {
    defaultValue,
    onChange,
    locale = WEBSITE_DEFAULT_LOCALE,
    id,
  }: {
    defaultValue?: number;
    onChange: any;
    locale?: string;
    id?: string;
  }) {
  const
    t = useTranslations(),
    deviceType = useDeviceType(),
    [open, setOpen,] = useState<boolean>(false),
    [countryList, setCountryList,] = useState<Country[]>(),
    [drawerSelectedItem, setDrawerSelectedItem,] = useState<Country | null>(null),
    [drawerSearchResult, setDrawerSearchResult,] = useState<Country[] | null>(),
    [value, setValue,] = useState<Country | null>(null),

    // Function to handle opening the select
    handleOpen = () => {
      setOpen(true);
      setDrawerSearchResult(countryList);
    },

    // Function to handle closing the select and decide how to fill value
    handleClose = () => {
      setOpen(false);
    },

    // Function to handle selecting an item
    handleDrawerSelectItem = (item: Country) => {
      setDrawerSelectedItem(item);
    },

    handleDrawerSelectButton = () => {
      setValue(drawerSelectedItem);
      setOpen(false);
    },

    // Function to handle mobile search
    searchHandle = (keyword: string) => {
      if (value) {
        setDrawerSearchResult(countryList?.filter((item: Country) => item.title.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())));
      } else {
        setDrawerSearchResult(countryList);
      }
    },

    // Function to fetch countries
    initCountryList = async () => {
      const response = await fetchCountryList(
        {
          limit: 500,
          offset: 0,
          locale,
          sorting: [
            {
              ascending: true,
              expression: 'name',
            },
          ],
        }
      );

      if (response && response.data) {
        setCountryList(response.data);
        setDrawerSearchResult(response.data);
      }
    };

  useEffect(() => {
    initCountryList();
  }, []);

  useEffect(() => {
    onChange(value);
  }, [value,]);

  useEffect(() => {
    if (countryList) {
      if (defaultValue && !value) {
        const country = countryList.filter((item: Country) => item.id === defaultValue);
        if (country && country.length > 0) {
          setValue(country[0]);
        } else {
          setValue(countryList[0]);
        }
      } else {
        const country = countryList.filter((item: Country) => item.id === IRAN_COUNTRY_ID);
        if (country && country.length > 0) {
          setValue(country[0]);
        } else {
          setValue(countryList[0]);
        }
      }
    }
  }, [countryList,]);

  return (
    <>
      <Autocomplete
        open={deviceType.isMobile ? false : open}
        disablePortal
        onChange={(event, selected) => selected && setValue(selected)}
        options={countryList || []}
        getOptionLabel={(option: Country) => option ? option.title : '-'}
        value={value}
        onClose={handleClose}
        onOpen={handleOpen}
        noOptionsText={t('common.no_result_found')}
        {...id && { id: id, }}
        classes={{
          listbox: styles.root__listbox,
          noOptions: styles.root__noOption,
        }}
        renderOption={(props, option: Country) => (
          <li
            {...props}
            className={`${styles.root__item} ${locale === 'en' ? styles.root__item__ltr : ''}`}
            key={option.id}
          >
            <Image
              width={40}
              height={20}
              src={`${DOMAIN}/images/country-flag/${option?.iso_two || 'null'}.svg`}
              alt=""
            />
            {option.title}
          </li>
        )}
        isOptionEqualToValue={(option: Country, objectValue: Country) => {
          return (option.id === objectValue.id);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            onClick={handleOpen}
            label={t('common.country')}
            InputLabelProps={{ shrink: true, }}
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            }}
          />
        )}
      />
      {deviceType.isMobile && (
        <Drawer
          open={open}
          anchor={'bottom'}
          classes={{
            root: styles.root,
            paper: styles.root__drawer__paper,
          }}
        >
          <div className={styles.root__drawer__header}>
            <Typography
              variant={'h6'}
              className={styles.root__drawer__header__text}
            >
              {t('common.country')}
            </Typography>
            <div
              onClick={handleClose}
              className={styles.root__drawer__header__closeIcon}
            >
              <CloseRoundedIcon />
            </div>
          </div>
          <TextField
            variant={'outlined'}
            onChange={(e) => searchHandle(e.currentTarget.value)}
            className={styles.root__drawer__searchBox}
            InputProps={{
              dir: 'ltr',
              endAdornment: <InputAdornment position="end">
                <div className={styles.root__drawer__searchBox__searchIcon}>
                  <SearchIcon />
                </div>
              </InputAdornment>,
            }}
          />
          <div className={styles.root__drawer__content}>
            {(drawerSearchResult && drawerSearchResult.length > 0) ? (
              <>
                {
                  drawerSearchResult.map((item: Country, index: number) => {
                    return (
                      <div
                        key={`MobileSelectItem_${index}`}
                        onClick={() => handleDrawerSelectItem(item)}
                        className={`${styles.root__drawer__content__item
                        } ${drawerSelectedItem && item.id === drawerSelectedItem.id && styles.root__drawer__content__item__selected}`}
                      >
                        <Image
                          width={40}
                          height={24}
                          src={`${DOMAIN}/images/country-flag/${item?.iso_two || 'null'}.svg`}
                          alt=""
                        />
                        <Typography
                          variant={'body1'}
                        >
                          {item.title}
                        </Typography>
                      </div>
                    );
                  })
                }
              </>
            ) : (
              <>
                <Typography
                  variant={'body1'}
                  className={styles.root__drawer__content__noCountry}
                >
                  {t('common.no_country_found')}
                </Typography>
              </>
            )}
          </div>
          <div className={styles.root__drawer__buttons}>
            <ButtonInput
              fullWidth
              onClick={handleClose}
              variant={'outlined'}
            >
              {t('common.cancel')}
            </ButtonInput>
            <ButtonInput
              fullWidth
              variant={'contained'}
              onClick={handleDrawerSelectButton}
            >
              {t('common.select')}
            </ButtonInput>
          </div>
        </Drawer>
      )}
    </>
  );
}