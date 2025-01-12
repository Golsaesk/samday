
import React from 'react';
import Link from 'next/link';
import { Typography, } from '@mui/material';
import styles from './TopFooterInfoColumn.module.scss';
import { MenuOrInfoItem, } from '@/modules/layout/libraries/layout-types';

const TopFooterInfoColumn = ({
  title,
  data,
  className,
}: {
  title: string;
  data: MenuOrInfoItem[] | null | undefined;
  className?: string;
}) => {

  return (
    <div className={`${styles.root} ${className ? className : ''}`}>
      <Typography
        variant='h5'
        className={styles.root__title}
      >
        {title}
      </Typography>
      {data && data.map((item: MenuOrInfoItem, index: number) => (
        <React.Fragment key={`footer-item-${index}`}>
          {item.link ? (
            <Link
              href={item.link}
              className={styles.root__link}
            >
              {item.value}
            </Link>
          ) : (
            <Typography
              variant='subtitle2'
              className={styles.root__item}
            >
              {item.value}
            </Typography>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default TopFooterInfoColumn;