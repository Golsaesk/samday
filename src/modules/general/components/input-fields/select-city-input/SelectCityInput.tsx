'use client';

import Drawer from '@mui/material/Drawer';
import { useTranslations, } from 'next-intl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import styles from './SelectCityInput.module.scss';
import React, { useEffect, useState, } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SearchIcon from '@/modules/general/components/icons/search';
import { fetchCityList, } from '@/modules/general/store/api/city-api';
import { useDeviceType, } from '@/modules/general/libraries/device-type';
import { City, CityCriteria, } from '@/modules/general/libraries/city-types';
import ButtonInput from '@/modules/general/components/input-fields/button-input';
import {
  WEBSITE_DEFAULT_LOCALE, TEHRAN_CITY_ID, TEHRAN_PROVINCE_ID,
} from '@/modules/general/libraries/constants';

export default function SelectCityInput(
  {
    defaultValue,
    onChange,
    locale = WEBSITE_DEFAULT_LOCALE,
    id,
    provinceId,
    tabIndex,
  }: {
    defaultValue?: number;
    onChange: any;
    locale?: string;
    id?: string;
    provinceId: number | null;
    tabIndex?: number;
  }) {
  const
    t = useTranslations(),
    deviceType = useDeviceType(),
    [open, setOpen,] = useState<boolean>(false),
    [cityList, setCityList,] = useState<City[]>(),
    [drawerSelectedItem, setDrawerSelectedItem,] = useState<City | null>(null),
    [drawerSearchResult, setDrawerSearchResult,] = useState<City[] | null>(),
    [value, setValue,] = useState<City | null>(null),

    // Function to handle opening the select
    handleOpen = () => {
      setOpen(true);
      setDrawerSearchResult(cityList);
    },

    // Function to handle closing the select and decide how to fill value
    handleClose = () => {
      setOpen(false);
    },

    // Function to handle selecting an item
    handleDrawerSelectItem = (item: City) => {
      setDrawerSelectedItem(item);
    },

    handleDrawerSelectButton = () => {
      setValue(drawerSelectedItem);
      setOpen(false);
    },

    // Function to handle mobile search
    searchHandle = (keyword: string) => {
      if (value) {
        setDrawerSearchResult(cityList?.filter((item: City) => item.title.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())));
      } else {
        setDrawerSearchResult(cityList);
      }
    },

    // Function to fetch countries
    initCityList = async () => {
      const response = await fetchCityList(
        {
          limit: 200,
          offset: 0,
          provinceId: provinceId || TEHRAN_PROVINCE_ID,
          locale: locale,
          sorting: [{
            expression: 'title',
            ascending: true,
          },
          ],
        } as CityCriteria
      );

      if (response && response.data) {
        setCityList(response.data);
        setDrawerSearchResult(response.data);
      }
    };

  useEffect(() => {
    onChange(value);
  }, [value,]);

  useEffect(() => {
    if (provinceId) {
      initCityList();
    }
  }, [provinceId,]);

  useEffect(() => {
    if (cityList) {
      if (defaultValue && !value) {
        const city = cityList.filter((item: City) => item.id === defaultValue);
        if (city && city.length > 0) {
          setValue(city[0]);
        } else {
          setValue(cityList[0]);
        }
      } else {
        const city = cityList.filter((item: City) => item.id === TEHRAN_CITY_ID);
        if (city && city.length > 0) {
          setValue(city[0]);
        } else {
          setValue(cityList[0]);
        }
      }
    }
  }, [cityList,]);

  return (
    <>
      <Autocomplete
        open={deviceType.isMobile ? false : open}
        disablePortal
        onChange={(event, selected) => selected && setValue(selected)}
        options={cityList || []}
        getOptionLabel={(option: City) => option ? option.title : '-'}
        value={value}
        onClose={handleClose}
        onOpen={handleOpen}
        noOptionsText={t('common.no_result_found')}
        {...id && { id: id, }}
        classes={{
          listbox: styles.root__listbox,
          noOptions: styles.root__noOption,
        }}
        renderOption={(props, option: City) => (
          <li
            {...props}
            className={`${styles.root__item} ${locale === 'en' ? styles.root__item__ltr : ''}`}
            key={option.id}
          >
            {option.title}
          </li>
        )}
        isOptionEqualToValue={(option: City, objectValue: City) => {
          return (option.id === objectValue.id);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            onClick={handleOpen}
            label={t('common.city')}
            InputLabelProps={{ shrink: true, }}
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password',
              ...tabIndex && { tabIndex: tabIndex, },
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
              {t('common.city')}
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
                  drawerSearchResult.map((item: City, index: number) => {
                    return (
                      <div
                        key={`MobileSelectItem_${index}`}
                        onClick={() => handleDrawerSelectItem(item)}
                        className={`${styles.root__drawer__content__item
                        } ${drawerSelectedItem && item.id === drawerSelectedItem.id && styles.root__drawer__content__item__selected}`}
                      >
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
                  className={styles.root__drawer__content__noCity}
                >
                  {t('common.no_city_found')}
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