'use client';

import 'swiper/css';
import React from 'react';
import { SwiperSlide, } from 'swiper/react';
import { Typography, } from '@mui/material';
import { useTranslations, } from 'next-intl';
import styles from './LawListSwiper.module.scss';
import Panel from '@/modules/general/components/panel';
import { Law, } from '@modules/law/libraries/law-types';
import CustomSwiper from '@/modules/general/components/custom-swiper';
import LawListSwiperItem from '@/modules/law/components/law-list-swiper/law-list-swiper-item';

export default function LawListSwiper({ items, }: {
  items: Law[] | null | undefined;
}) {
  const
    t = useTranslations();

  return (
    <>
      {items && items.length > 0 && (
        <Panel
          variant='general'
          classes={{ root: styles.root, }}
        >
          <Typography
            variant='h2'
            className={styles.root__title}
          >
            {t('law.latest_law')}
          </Typography>
          <CustomSwiper
            loop={true}
            centeredSlides={true}
            spaceBetween={16}
            fadeNavigationButtons
            breakpoints={{
              0: {
                slidesPerView: 1.2,
                navigation: true,
              },
              400: {
                slidesPerView: 1.5,
                navigation: true,
              },
              550: {
                slidesPerView: 2,
                navigation: true,
              },
              700: {
                slidesPerView: 2.7,
                navigation: true,
              },
              900: {
                slidesPerView: 3.5,
                navigation: true,
              },
              1176: {
                slidesPerView: 4.5,
                navigation: true,
              },
            }}
            slidesLength={items.length}
            classes={
              { root: styles.root__swiper, }
            }
          >
            {items.length > 0 && items.map((item: Law) => (
              <SwiperSlide
                key={`slide_${item.id}`}
                className={styles.root__swiper__slide}
              >
                <LawListSwiperItem item={item} />
              </SwiperSlide>
            ))}
          </CustomSwiper>
        </Panel>
      )}
    </>
  );
}