'use client';

import { useLocale, } from 'next-intl';
import { Typography, } from '@mui/material';
import { useEffect, useState, } from 'react';
import styles from './ContactInfo.module.scss';
import getLayoutData from '@/modules/layout/libraries/utils';
import { Layout, } from '@/modules/layout/libraries/layout-types';

const ContactInfo = ({ className, }: {className: string}) => {
  const
    locale = useLocale(),
    [data, setData,] = useState<Layout>();

  useEffect(() => {
    const response = getLayoutData(locale);
    setData(response);
  }, [locale,]);

  return (
    <div className={`${styles.root} ${className ? className : ''}`}>
      {data && data.info && data.info.data.map((item: any, index: number) => (
        <div
          key={`item-${index}`}
          className={styles.root__item}
        >
          <Typography variant='h4'>
            {item.title}
          </Typography>
          <Typography variant='h6'>
            {item.value}
          </Typography>
        </div>
      ))}
    </div>
  );
};

export default ContactInfo;