'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Typography, } from '@mui/material';
import styles from './LawDetailRelated.module.scss';
import { useLocale, useTranslations, } from 'next-intl';
import { Law, } from '@modules/law/libraries/law-types';
import { getLawUrl, } from '@/modules/law/libraries/utils';
import { DOMAIN, } from '@/modules/general/libraries/constants';
import { dateFormat, } from '@/modules/general/libraries/utils';
import { FormatDateType, } from '@/modules/general/libraries/general-types';

const LawDetailRelated = ({ relatedLawList, }: {relatedLawList: Law[] | null | undefined }) => {
  const
    t = useTranslations(),
    locale = useLocale();

  return (
    <>
      {relatedLawList && relatedLawList.length > 0 && (
        <div className={styles.root}>
          <Typography
            variant='h3'
            className={styles.root__title}
          >
            {t('law.related_news')}
          </Typography>
          <div className={styles.root__container}>
            {relatedLawList.map((law) => (
              <div
                key={law.id}
                className={styles.root__container__item}
              >
                <div className={styles.root__container__item__image}>
                  <Image
                    src={law.media?.path || `${DOMAIN}/images/assets/no-image.svg`}
                    alt={law.title}
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                    fill
                  />
                </div>
                <div className={styles.root__container__item__content}>
                  <Link
                    href={getLawUrl(law, locale)}
                    className={styles.root__container__item__content__title}
                  >
                    {law.title}
                  </Link>
                  <Typography
                    variant={'caption'}
                    component={'span'}
                  >
                    {dateFormat(law.approval_date, locale, FormatDateType.long) || '-'}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default LawDetailRelated;
