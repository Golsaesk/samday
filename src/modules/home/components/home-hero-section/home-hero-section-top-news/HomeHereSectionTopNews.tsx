'use client';

import 'swiper/css';
import React from 'react';
import { Autoplay, } from 'swiper/modules';
import { SwiperSlide, } from 'swiper/react';
import Panel from '@/modules/general/components/panel';
import styles from './HomeHereSectionTopNews.module.scss';
import { News, } from '@modules/news/libraries/news-types';
import CustomSwiper from '@/modules/general/components/custom-swiper';
import HomeHereSectionTopNewsItem from './home-hero-section-top-news-item';

export default function HomeHereSectionTopNews({ items, }: {
  items: News[] | null | undefined;
}) {
  return (
    <>
      {items && items.length > 0 && (
        <Panel variant='general'>
          <CustomSwiper
            loop={true}
            speed={2000}
            autoplay={{ "pauseOnMouseEnter": true, }}
            modules={[Autoplay,]}
            spaceBetween={16}
            centeredSlides
            breakpoints={{
              0: {
                slidesPerView: 1,
                navigation: true,
              },
            }}
            slidesLength={items.length}
            classes={
              { root: styles.root__swiper, }
            }
            centerBottomNavigationButtons
          >
            {items.length > 0 && items.map((item: News) => (
              <SwiperSlide
                key={`slide_${item.id}`}
                className={styles.root__swiper__slide}
              >
                <HomeHereSectionTopNewsItem item={item} />
              </SwiperSlide>
            ))}
          </CustomSwiper>
        </Panel>
      )}
    </>
  );
}