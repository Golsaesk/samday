'use client';

import React from 'react';
import { Typography, } from '@mui/material';
import { useTranslations, } from 'next-intl';
import styles from './LawDetailHeader.module.scss';
import { Law, } from '@modules/law/libraries/law-types';

const LawDetailHeader = ({ law, }: {law: Law | null | undefined}) => {
  const
    t = useTranslations();

  return (
    <div className={styles.root}>
      {law && (
        <>
          <div className={styles.root__issuer}>
            {law.issuer && (
              <Typography
                variant={'button2'}
                component={'div'}
                className={styles.root__issuer__item}
              >
                {t.rich('law.issuer', { value: () => <p className={styles.root__issuer__text}>{law.issuer}</p>, })}
              </Typography>
            )}
            {law.issuing_authority && (
              <Typography
                variant={'button2'}
                component={'div'}
                className={styles.root__issuer__item}
              >
                {t.rich('law.issuing_authority', { value: () => <p className={styles.root__issuer__text}>{law.issuing_authority}</p>, })}
              </Typography>
            )}
          </div>
          {law.issue_title && (
            <Typography
              variant={'subtitle2'}
              component={'p'}
              className={styles.root__subject}
            >
              {t.rich('law.subject', { value: () => <span>{law.issue_title}</span>, })}
            </Typography>
          )}
          <Typography
            variant='h1'
            className={styles.root__title}
          >
            {law.title}
          </Typography>
        </>
      )}
    </div>
  );
};

export default LawDetailHeader;
