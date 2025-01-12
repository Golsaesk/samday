'use client';

import styles from './AboutBox.module.scss';
import { Typography, } from '@mui/material';

const AboutBox = ({
  title,
  children,
}: {
  title: string;
  children: any;
}) => {

  return (
    <>
      {title && children && (
        <div className={styles.root}>
          <Typography
            variant='h4'
            className={styles.root__title}
          >
            {title}
          </Typography>
          <div className={styles.root__box}>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default AboutBox;