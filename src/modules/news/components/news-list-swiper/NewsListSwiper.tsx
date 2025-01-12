'use client';

import 'swiper/css';
import React from 'react';
import { Typography, } from '@mui/material';
import { SwiperSlide, } from 'swiper/react';
import { useTranslations, } from 'next-intl';
import styles from './NewsListSwiper.module.scss';
import Panel from '@/modules/general/components/panel';
import { News, } from '@modules/news/libraries/news-types';
import CustomSwiper from '@/modules/general/components/custom-swiper';
import NewsListSwiperItem from '@/modules/news/components/news-list-swiper/news-list-swiper-item';

export default function NewsListSwiper({ items, }: {
  items: News[] | null | undefined;
}) {

  const t = useTranslations();

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
            {t('news.latest_news')}
          </Typography>
          <CustomSwiper
            loop
            centeredSlides={true}
            spaceBetween={16}
            fadeNavigationButtons
            breakpoints={{
              0: {
                slidesPerView: 5,
                navigation: true,
              },
            }}
            slidesLength={items.length + 1 }
            classes={
              { root: styles.root__swiper, }
            }
          >
            {items.length > 0 && items.map((item: News) => (
              <SwiperSlide
                key={`slide_${item.id}`}
                className={styles.root__swiper__slide}
              >
                <NewsListSwiperItem item={item} />
              </SwiperSlide>
            ))}
          </CustomSwiper>
        </Panel>
      )}
    </>
  );
}