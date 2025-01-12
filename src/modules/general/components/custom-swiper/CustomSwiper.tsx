'use client';

import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import styles from './CustomSwiper.module.scss';
import { Swiper, SwiperRef, } from 'swiper/react';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { CustomSwiperPropsType, } from '@modules/general/libraries/general-types';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';

export default function CustomSwiper({
  children,
  classes,
  slidesLength,
  loop,
  fadeNavigationButtons,
  centerBottomNavigationButtons,
  ...rest
}: CustomSwiperPropsType) {
  const
    sliderRef = useRef<SwiperRef>(null),
    [isBeginning, setIsBeginning,] = useState(true),
    [isEnd, setIsEnd,] = useState(false),
    [displayNavigation, setDisplayNavigation,] = useState<boolean>(false),

    handlePrev = useCallback(() => {
      if (sliderRef.current) {
        sliderRef.current.swiper.slidePrev();
      }
    }, []),

    handleNext = useCallback(() => {
      if (sliderRef.current) {
        sliderRef.current.swiper.slideNext();
      }
    }, []);

  useEffect(() => {
    const swiper = sliderRef.current?.swiper;
    if (swiper) {
      swiper.on('slideChange', () => {
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
      });
    }
  }, [sliderRef,]);

  useEffect(() => {
    const swiper = sliderRef.current?.swiper;
    const handleResize = () => {
      if (swiper?.originalParams?.breakpoints) {
        setDisplayNavigation(Number(swiper?.originalParams?.breakpoints[swiper.currentBreakpoint].slidesPerView).valueOf() < slidesLength);
      } else {
        setDisplayNavigation(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`${styles.root} ${classes?.root ?? ''}`}>
      <Swiper
        {...rest}
        ref={sliderRef}
        className={`${styles.root__swiper} ${classes?.swiper ?? ''}`}
        {...loop && { loop: true, }}
        centeredSlides={false}
        centerInsufficientSlides={true}
      >
        {children}
      </Swiper>
      {displayNavigation && (
        <>
          <div
            onClick={handlePrev}
            className={`${styles.root__prev} ${
              (!loop && isBeginning) ? styles.root__disable : ''} ${classes?.prev ?? ''} ${
              fadeNavigationButtons ? styles.fadePrev : ''} ${
              (centerBottomNavigationButtons) ? styles.root__centerBottomNavigationPrev : ''}`}
          >
            <ArrowForwardIosRoundedIcon />
          </div>
          <div
            onClick={handleNext}
            className={`${styles.root__next} ${
              (!loop && isEnd) ? styles.root__disable : ''} ${classes?.next ?? ''} ${
              fadeNavigationButtons ? styles.fadeNext : ''} ${
              (centerBottomNavigationButtons) ? styles.root__centerBottomNavigationNext : ''}`}
          >
            <ArrowBackIosRoundedIcon />
          </div>
        </>
      )}
    </div>
  );
}
