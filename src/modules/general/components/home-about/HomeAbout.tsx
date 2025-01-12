"use client";
import React from 'react';
import Image from 'next/image';
import styles from './HomeAbout.module.scss';
import Panel from '@/modules/general/components/panel';
import { useLocale, useTranslations, } from 'next-intl';
import { Box, } from '@/modules/box/libraries/box-types';
import { ArrowRightIcon, } from '@mui/x-date-pickers/icons';
import { renderHTML, } from '@/modules/general/libraries/utils';
import { Media, } from '@/modules/general/libraries/general-types';
import { NO_IMAGE_PATH, } from '@/modules/news/libraries/constants';
import ButtonInput from '@/modules/general/components/input-fields/button-input';

export default function HomeAbout({
  box,
  image,
}: {
  box: Box | null;
  image: Media | null;
}) {
  const
    t = useTranslations(),
    locale = useLocale();

  return (
    <>
      {box && image && (
        <Panel
          variant='general'
        >
          <div className={styles.root__container}>
            <Image
              src={(image && image.path) ? image.path : NO_IMAGE_PATH}
              alt={''}
              className={styles.root__container__image}
              style={{
                objectFit: 'cover',
                objectPosition: "center",
              }}
              fill
            />
            <div className={styles.root__container__box}>
              <div className={styles.root__container__box__title} >
                {box.title}
              </div>
              <div className={styles.root__container__box__description} >
                {renderHTML(box.body)}
              </div>
              <ButtonInput
                href={`/${locale}/about`}
                variant='contained'
                endIcon = {<ArrowRightIcon />}
                className={styles.root__container__box__button}
              >
                {t('common.article_more')}
              </ButtonInput>
            </div>
          </div>
        </Panel>
      )}
    </>
  );
}
