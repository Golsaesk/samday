'use client';

import React from 'react';
import Link from 'next/link';
import { Typography, } from '@mui/material';
import styles from './LawListSwiperItem.module.scss';
import { Law, } from '@modules/law/libraries/law-types';
import { useLocale, useTranslations, } from 'next-intl';
import { getLawUrl, } from '@modules/law/libraries/utils';
import { ArrowRightIcon, } from '@mui/x-date-pickers/icons';
import { dateFormat, } from '@/modules/general/libraries/utils';
import { FormatDateType, } from '@/modules/general/libraries/general-types';
import ButtonInput from '@/modules/general/components/input-fields/button-input';

const LawListSwiperItem = ({ item, }: {
  item: Law;
}) => {
  const
    locale = useLocale(),
    t = useTranslations();

  return (
    <>
      {item &&
        <div className={styles.root}>
          <div className={styles.root__inner}>
            <div className={styles.root__inner__issuer}>
              <Typography
                variant='body2'
                className={styles.root__inner__issuer__text}
              >
                {item.issuer}
              </Typography>
            </div>
            <div className={styles.root__inner__title}>
              <Link
                href={getLawUrl(item, locale)}
                title={item.title}
                prefetch={false}
              >
                {item.title}
              </Link>
            </div>
            <div className={styles.root__inner__content}>
              {item.title}
            </div>
            <div className={styles.root__inner__footer}>
              <ButtonInput
                variant='contained'
                href={getLawUrl(item, locale)}
                title={item.title}
                endIcon = {<ArrowRightIcon />}
                className={styles.root__inner__footer__button}
              >
                {t('law.show_detail')}
              </ButtonInput>
              <div className={styles.root__inner__footer__date}>
                {dateFormat(item.approval_date, locale, FormatDateType.long)}
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default LawListSwiperItem;
