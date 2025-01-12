'use client';

import Drawer from '@mui/material/Drawer';
import { useTranslations, } from 'next-intl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState, } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import styles from './SelectProvinceInput.module.scss';
import InputAdornment from '@mui/material/InputAdornment';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SearchIcon from '@/modules/general/components/icons/search';
import { useDeviceType, } from '@/modules/general/libraries/device-type';
import { fetchProvinceList, } from '@/modules/general/store/api/province-api';
import ButtonInput from '@/modules/general/components/input-fields/button-input';
import { Province, ProvinceCriteria, } from '@/modules/general/libraries/province-types';
import {
  WEBSITE_DEFAULT_LOCALE, IRAN_COUNTRY_ID, TEHRAN_PROVINCE_ID,
} from '@/modules/general/libraries/constants';

export default function SelectProvinceInput(
  {
    defaultValue,
    onChange,
    locale = WEBSITE_DEFAULT_LOCALE,
    id,
    countryId,
    tabIndex,
  }: {
    defaultValue?: number;
    onChange: any;
    locale?: string;
    id?: string;
    countryId: number | null;
    tabIndex?: number;
  }) {
  const
    t = useTranslations(),
    deviceType = useDeviceType(),
    [open, setOpen,] = useState<boolean>(false),
    [provinceList, setProvinceList,] = useState<Province[]>(),
    [drawerSelectedItem, setDrawerSelectedItem,] = useState<Province | null>(null),
    [drawerSearchResult, setDrawerSearchResult,] = useState<Province[] | null>(),
    [value, setValue,] = useState<Province | null>(null),

    // Function to handle opening the select
    handleOpen = () => {
      setOpen(true);
      setDrawerSearchResult(provinceList);
    },

    // Function to handle closing the select and decide how to fill value
    handleClose = () => {
      setOpen(false);
    },

    // Function to handle selecting an item
    handleDrawerSelectItem = (item: Province) => {
      setDrawerSelectedItem(item);
    },

    handleDrawerSelectButton = () => {
      setValue(drawerSelectedItem);
      setOpen(false);
    },

    // Function to handle mobile search
    searchHandle = (keyword: string) => {
      if (value) {
        setDrawerSearchResult(provinceList?.filter((item: Province) => item.title.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())));
      } else {
        setDrawerSearchResult(provinceList);
      }
    },

    // Function to fetch countries
    initProvinceList = async () => {
      const response = await fetchProvinceList(
        {
          limit: 500,
          offset: 0,
          countryId: countryId || IRAN_COUNTRY_ID,
          locale: locale,
          sorting: [
            {
              ascending: true,
              expression: 'title',
            },
          ],
        } as ProvinceCriteria
      );

      if (response && response.data) {
        setProvinceList(response.data);
        setDrawerSearchResult(response.data);
      }
    };

  useEffect(() => {
    onChange(value);
  }, [value,]);

  useEffect(() => {
    if (countryId) {
      initProvinceList();
    }
  }, [countryId,]);

  useEffect(() => {
    if (provinceList) {
      if (defaultValue && !value) {
        const province = provinceList.filter((item: Province) => item.id === defaultValue);
        if (province && province.length > 0) {
          setValue(province[0]);
        } else {
          setValue(provinceList[0]);
        }
      } else {
        const province = provinceList.filter((item: Province) => item.id === TEHRAN_PROVINCE_ID);
        if (province && province.length > 0) {
          setValue(province[0]);
        } else {
          setValue(provinceList[0]);
        }
      }
    }
  }, [provinceList,]);

  return (
    <>
      <Autocomplete
        open={deviceType.isMobile ? false : open}
        disablePortal
        onChange={(event, selected) => selected && setValue(selected)}
        options={provinceList || []}
        getOptionLabel={(option: Province) => option ? option.title : '-'}
        value={value}
        onClose={handleClose}
        onOpen={handleOpen}
        noOptionsText={t('common.no_result_found')}
        {...id && { id: id, }}
        classes={{
          listbox: styles.root__listbox,
          noOptions: styles.root__noOption,
        }}
        renderOption={(props, option: Province) => (
          <li
            {...props}
            className={`${styles.root__item} ${locale === 'en' ? styles.root__item__ltr : ''}`}
            key={option.id}
          >
            {option.title}
          </li>
        )}
        isOptionEqualToValue={(option: Province, objectValue: Province) => {
          return (option.id === objectValue.id);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            onClick={handleOpen}
            label={t('common.province')}
            InputLabelProps={{ shrink: true, }}
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
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
              {t('common.province')}
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
                  drawerSearchResult.map((item: Province, index: number) => {
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
                  className={styles.root__drawer__content__noProvince}
                >
                  {t('common.no_province_found')}
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