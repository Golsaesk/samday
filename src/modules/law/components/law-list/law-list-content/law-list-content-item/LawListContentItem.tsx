'use client';

import { Typography, } from '@mui/material';
import styles from './LawListContentItem.module.scss';
import { useLocale, useTranslations, } from 'next-intl';
import { Law, } from '@/modules/law/libraries/law-types';
import { getLawUrl, } from '@/modules/law/libraries/utils';
import { ArrowRightIcon, } from '@mui/x-date-pickers/icons';
import { dateFormat, } from '@/modules/general/libraries/utils';
import { LawDetailTabType, } from '@/modules/law/libraries/constants';
import FillArrowIcon from '@/modules/general/components/icons/fill-arrow';
import { FormatDateType, } from '@/modules/general/libraries/general-types';
import ButtonInput from '@/modules/general/components/input-fields/button-input';

const LawListContentItem = ({
  className,
  item,
}: {
  className?: string;
  item: Law | null | undefined;
}) => {
  const
    t = useTranslations(),
    locale = useLocale();

  return (
    <>
      {item && (
        <div className={`${styles.root} ${className ? className : "" }`}>
          <div className={styles.root__year}>
            <Typography
              variant='button2'
              className={styles.root__year__text}
            >
              {dateFormat(item.approval_date, locale, FormatDateType.long) || '-'}
            </Typography>
            <FillArrowIcon />
          </div>
          <div className={styles.root__content}>
            <div
              title={item.title}
              className={styles.root__content__title}
            >
              {item.title}
            </div>
            <div className={styles.root__content__description}>
              {item.brief_description}
            </div>
            <div className={styles.root__content__buttons}>
              <ButtonInput
                variant='contained'
                href={`${getLawUrl(item, locale)}?t=${LawDetailTabType.context}`}
                endIcon = {<ArrowRightIcon />}
                className={styles.root__content__buttons__link}
              >
                {t('law.show_all')}
              </ButtonInput>
              <ButtonInput
                href={`${getLawUrl(item, locale)}?t=${LawDetailTabType.mapping}`}
                variant='contained'
                endIcon = {<ArrowRightIcon />}
                className={styles.root__content__buttons__link}
              >
                {t('law.show_more')}
              </ButtonInput>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LawListContentItem;