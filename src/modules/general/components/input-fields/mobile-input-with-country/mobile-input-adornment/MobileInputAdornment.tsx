import React from 'react';
import Image from 'next/image';
import styles from './MobileInputAdornment.module.scss';
import InputAdornment from '@mui/material/InputAdornment';
import { Country, } from '@/modules/general/libraries/country-types';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { DOMAIN, IRAN_COUNTRY_CALLING_CODE, } from '@modules/general/libraries/constants';

export default function MobileInputAdornment({
  disabled,
  country,
  onClick,
}: {
  disabled?: boolean;
  country?: Country | null | undefined;
  onClick: any;
}) {
  return (
    <InputAdornment
      position='start'
      component='div'
      disableTypography
      className={`${styles.root} ${!disabled ? styles.root__active : ''}`}
      {...!disabled && { onClick: onClick, }}
    >
      <div
        className={styles.root__image}
      >
        <Image
          alt={country?.iso_two || ''}
          fill
          style={{ objectFit: 'contain', }}
          src={country?.calling_code ? `${DOMAIN}/images/country-flag/${country?.iso_two || 'null'}.svg` : `${DOMAIN}/images/country-flag/IR.svg`}
        />
      </div>
      {!disabled && (
        <div className={`${styles.root__arrow} ${disabled ? styles.root__arrow__open : ''}`}>
          <KeyboardArrowDownRoundedIcon />
        </div>
      )}
      <div className={styles.root__code}>
        {`+${country?.calling_code ? country?.calling_code : IRAN_COUNTRY_CALLING_CODE}` }
      </div>
    </InputAdornment>
  );
}
