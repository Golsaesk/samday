'use client';

import React from 'react';
import { Typography, } from '@mui/material';
import styles from './LawDetailInfoItem.module.scss';

const LawDetailInfoItem = ({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) => {

  return (
    <div className={`${styles.root} ${className ? className : ''}`}>
      <Typography
        variant='tiny'
        className={styles.root__label}
      >
        {label}
      </Typography>
      <Typography
        variant='tiny'
        className={styles.root__value}
      >
        {value}
      </Typography>
    </div>
  );
};

export default LawDetailInfoItem;
