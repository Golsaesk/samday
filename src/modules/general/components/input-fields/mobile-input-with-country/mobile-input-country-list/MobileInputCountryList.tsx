'use client';

import Image from 'next/image';
import { useTranslations, } from 'next-intl';
import React, { useEffect, useState, } from 'react';
import styles from './MobileInputCountryList.module.scss';
import { DOMAIN, } from '@/modules/general/libraries/constants';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { Country, } from '@modules/general/libraries/country-types';
import { useDeviceType, } from '@/modules/general/libraries/device-type';
import {
  Collapse, TextField, Typography,
} from '@mui/material';

export type CountrySelectorChange = {
  (country: Country): void;
};

export default function MobileInputCountryList({
  open,
  onChange,
  countryList,
  onClose,
  id,
}: {
  open: boolean;
  onChange: CountrySelectorChange;
  countryList: Country[];
  onClose: any;
  id: string;
}
) {
  const
    t = useTranslations(),
    deviceType = useDeviceType(),
    [menuItems, setMenuItems, ] = useState<Country[]>(),
    [searchValue, setSearchValue, ] = useState<string>(''),

    searchHandle = (searchString: string) => {
      setSearchValue(searchString);

    },

    countrySelectHandler = (country: Country) => {
      onChange(country);
    };

  useEffect(() => {
    if (searchValue) {
      let newList = countryList.filter((country: Country) => country.title.toLowerCase().includes(searchValue.toLowerCase()));
      setMenuItems(newList);
    } else {
      setMenuItems(countryList);
    }
  }, [searchValue, ]);

  useEffect(() => {
    setMenuItems(countryList);
  }, [countryList, ]);

  useEffect(() => {
    if (!open) {
      setSearchValue('');
    }
  }, [open, ]);

  return (
    <div className={`${styles.root}  ${open ? styles.root__open : ''}`}>
      <Collapse
        in={open}
        classes={{
          root: styles.root__collapse,
          wrapperInner: styles.root__collapse__innerWrapper,
        }}
      >
        {deviceType.isMobile && (
          <div className={styles.root__collapse__header}>
            {t('common.country_list_search_title')}
            <div
              onClick={onClose}
              className={styles.root__collapse__header__close}
            >
              <CloseRoundedIcon />
            </div>
          </div>
        )}
        <div className={styles.root__collapse__search}>
          <TextField
            fullWidth
            value={searchValue}
            onChange={(e) => searchHandle(e.target.value)}
            placeholder={t('common.search_in_countries')}
            id={`mobileCountrySearch${id}`}
            autoComplete='country'
            InputProps={{
              classes: { root: styles.root__collapse__search__input, },
              endAdornment:
                <div className={styles.root__collapse__search__adornment}>
                  {searchValue && (
                    <div
                      onClick={() => searchHandle('')}
                      className={styles.root__collapse__search__adornment__clear}
                    >
                      <CloseRoundedIcon />
                    </div>
                  )}
                  <div className={styles.root__collapse__search__adornment__icon}>
                    <SearchRoundedIcon />
                  </div>
                </div>,
            }}
          />
        </div>
        <div className={styles.root__collapse__list}>
          {menuItems && menuItems.length > 0 ? (
            <>
              {menuItems.map((country: Country) => {
                return (
                  <div
                    key={Math.random()}
                    onClick={() => countrySelectHandler(country)}
                    className={styles.root__collapse__list__item}
                  >
                    <Image
                      alt={''}
                      width={25}
                      height={15}
                      className={styles.root__image}
                      src={`${DOMAIN}/images/country-flag/${country?.iso_two || 'null'}.svg`}
                    />
                    {`(+${country.calling_code}) ${country.title}`}
                  </div>
                );
              })}
            </>
          ) : (
            <Typography
              variant={'body2'}
              className={styles.root__collapse__list__notFound}
            >
              {t('common.search_not_found')}
            </Typography>
          )}
        </div>
      </Collapse>
    </div>
  );
}