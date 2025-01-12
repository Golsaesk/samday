"use client";

import 'swiper/css';
import React from 'react';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide, } from 'swiper/react';
import Panel from '@/modules/general/components/panel';
import { Autoplay, Navigation, } from 'swiper/modules';
import styles from './HomeHeroSectionSwiper.module.scss';
import { News, } from '@/modules/news/libraries/news-types';

const HomeHeroSectionSwiper = ({ items, }: {items: News[] | null}) => {

  return (
    <Panel
      variant='general'
      classes={{ root: styles.root, }}
    >
      <div className={styles.root__container}>
        {items && items.length > 0 && (
          <Swiper
            navigation={true}
            loop={true}
            speed={1000}
            autoplay={{ "pauseOnMouseEnter": true, }}
            modules={[Navigation, Autoplay,]}
            spaceBetween={10}
            className={styles.root__container__swiper}
          >
            {items.length > 0 && items.map((item: News) => (
              <SwiperSlide
                key={`slide_${item.id}`}
              >
                <div className={styles.root__container__swiper__slide}>
                  {item.title}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </Panel>
  );
};

export default HomeHeroSectionSwiper;
