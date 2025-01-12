'use client';

import React from 'react';
import { useTranslations, } from 'next-intl';
import Collapse from '@mui/material/Collapse';
import styles from './ErrorCollapse.module.scss';
import Typography from '@mui/material/Typography';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { ErrorCollapseProps, } from '@/modules/general/libraries/general-types';

export default function ErrorCollapse({
  errorList,
  classes,
  ...props
}: ErrorCollapseProps) {
  const t = useTranslations();

  return (
    <Collapse
      {...props}
      in={errorList && errorList.length > 0}
      classes={{ root: `${styles.root} ${classes?.root ?? ''}`, }}
    >
      <div className={`${styles.root__container} ${classes?.container ?? ''}`}>
        <Typography
          variant={'button2'}
          className={`${styles.root__container__title} ${classes?.title ?? ''}`}
        >
          <ErrorOutlineIcon />
          {t('common.error')}
        </Typography>
        {errorList && errorList.map((error: string) => {
          return (
            <React.Fragment key={Math.random()}>
              {error && (
                <Typography
                  variant={'caption'}
                  className={`${styles.root__container__error} ${classes?.error ?? ''}`}
                >
                  {error}
                </Typography>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </Collapse>

  );
}