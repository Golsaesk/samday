'use client';

import React from 'react';
import styles from './LawDetailInfo.module.scss';
import LawDetailInfoItem from './law-detail-info-item';
import { useLocale, useTranslations, } from 'next-intl';
import { Law, } from '@modules/law/libraries/law-types';
import { dateFormat, } from '@/modules/general/libraries/utils';
import { FormatDateType, } from '@/modules/general/libraries/general-types';

const LawDetailInfo = ({ law, }: {law: Law | null | undefined}) => {
  const
    t = useTranslations(),
    locale = useLocale();

  return (
    <>
      {law && (
        <div className={styles.root}>
          {law.meeting_number && (
            <LawDetailInfoItem
              label={t('law.meeting_number')}
              value={law.meeting_number}
              className={styles.root__item}
            />
          )}
          {law.number && (
            <LawDetailInfoItem
              label={t('law.number')}
              value={law.number}
              className={styles.root__item}
            />
          )}
          {law.issuing_date && (
            <LawDetailInfoItem
              label={t('law.issuing_date')}
              value={dateFormat(law.issuing_date, locale, FormatDateType.long) || '-'}
              className={styles.root__item}
            />
          )}
          {law.approval_date && (
            <LawDetailInfoItem
              label={t('law.approval_date')}
              value={dateFormat(law.approval_date, locale, FormatDateType.long) || '-'}
              className={styles.root__item}
            />
          )}
          {law.effective_date && (
            <LawDetailInfoItem
              label={t('law.effective_date')}
              value={dateFormat(law.effective_date, locale, FormatDateType.long) || '-'}
              className={styles.root__item}
            />
          )}
          {law.notification_date && (
            <LawDetailInfoItem
              label={t('law.notification_date')}
              value={dateFormat(law.notification_date, locale, FormatDateType.long) || '-'}
              className={styles.root__item}
            />
          )}
          {law.validity_date && (
            <LawDetailInfoItem
              label={t('law.validity_date')}
              value={dateFormat(law.validity_date, locale, FormatDateType.long) || '-'}
              className={styles.root__item}
            />
          )}
        </div>
      )}
    </>
  );
};

export default LawDetailInfo;
