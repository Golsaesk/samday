"use client";

import Image from 'next/image';
import { Typography, } from '@mui/material';
import styles from './HomeLatestLaw.module.scss';
import Panel from '@/modules/general/components/panel';
import HomeLatestLawTabs from './home-latest-law-tabs';
import { useLocale, useTranslations, } from 'next-intl';
import { Law, } from '@/modules/law/libraries/law-types';
import { ArrowRightIcon, } from '@mui/x-date-pickers/icons';
import { Media, } from '@/modules/general/libraries/general-types';
import { Category, } from '@/modules/category/libraries/category-types';
import ButtonInput from '@/modules/general/components/input-fields/button-input';

const HomeLatestLaw = ({
  media,
  categoryList,
  eGovernmentLawList,
  cyberSpaceLawList,
}: {
  media: Media | null | undefined;
  categoryList: Category[] | null | undefined;
  eGovernmentLawList: Law[] | null | undefined;
  cyberSpaceLawList: Law[] | null | undefined;
}) => {
  const
    t = useTranslations(),
    locale = useLocale();

  return (
    <div className={styles.root}>
      {categoryList && categoryList.length > 0 && (
        <Panel
          variant={'general'}
          fullMobileWidth
          classes={{ root: styles.root__container, }}
        >
          <Typography
            variant='h5'
            className={styles.root__container__mobileTitle}
          >
            {t('law.home_latest_law_title')}
          </Typography>
          <div className={styles.root__container__content}>
            <Typography
              variant='h3'
              className={styles.root__container__content__title}
            >
              {t('law.home_latest_law_title')}
            </Typography>
            <HomeLatestLawTabs
              categoryList={categoryList}
              eGovernmentLawList = {eGovernmentLawList}
              cyberSpaceLawList = {cyberSpaceLawList}
            />
            <ButtonInput
              variant='contained'
              href={`/${locale}/law`}
              endIcon = {<ArrowRightIcon />}
              className={styles.root__container__content__button}
            >
              {t('law.show_all_laws')}
            </ButtonInput>
          </div>
          <div className={styles.root__container__image}>
            <Image
              src={media?.path || ''}
              alt={''}
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              fill
            />
          </div>
        </Panel>
      )}
    </div>
  );
};

export default HomeLatestLaw;