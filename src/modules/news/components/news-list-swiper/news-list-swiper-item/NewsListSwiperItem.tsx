'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useState, } from 'react';
import styles from './NewsListSwiperItem.module.scss';
import { useLocale, useTranslations, } from 'next-intl';
import { News, } from '@modules/news/libraries/news-types';
import { ArrowRightIcon, } from '@mui/x-date-pickers/icons';
import { getNewsUrl, } from '@/modules/news/libraries/utils';
import { NO_IMAGE_PATH, } from '@/modules/news/libraries/constants';
import ArrowDownIcon from '@/modules/general/components/icons/arrow-down';
import ButtonInput from '@/modules/general/components/input-fields/button-input';

const NewsListSwiperItem = ({ item, }: { item: News }) => {

  const
    locale = useLocale(),
    t = useTranslations(),
    [toggled, setToggled,] = useState<boolean>(false),

    handleToggle = () => {
      setToggled(prevState => !prevState);
    };

  return (
    <>
      {item &&
        <div className={styles.root}>
          <div className={styles.root__content}>
            <Image
              src={(item.media && item.media.path) ?
                item.media.path :
                NO_IMAGE_PATH}
              alt={''}
              className={`${styles.root__content__image} ${toggled ?
                styles.root__content__image__toggled :
                ''}`}
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              fill
            />
            <div className={styles.root__content__wrapper}>
              <div className={`${styles.root__content__title} ${toggled ?
                styles.root__content__title__toggled :
                ''}`}
              >
                <Link
                  href={getNewsUrl(item, locale)}
                  title={item.title}
                  prefetch={false}
                  hidden= {toggled}
                >
                  {item.title}
                </Link>
              </div>
            </div>
            <div className={styles.root__content__detail}>
              <Link
                href={getNewsUrl(item, locale)}
                title={item.title}
                prefetch={false}
                className={styles.root__content__detail__title}
              >
                {item.title}
              </Link>
              <div
                className={styles.root__content__detail__lead}
              >
                {item.lead}
              </div>
              <div className={styles.root__content__detail__footer}>
                <ButtonInput
                  variant='contained'
                  href={getNewsUrl(item, locale)}
                  title={item.title}
                  endIcon = {<ArrowRightIcon />}
                  className={styles.root__content__detail__footer__button}
                >
                  {t('common.article_more')}
                </ButtonInput>
              </div>
            </div>
          </div>
          <div
            className={`${styles.root__arrow} ${toggled ?
              styles.root__arrow__toggled :
              ''}`}
            onClick={handleToggle}
          >
            <ArrowDownIcon />
          </div>
        </div>
      }
    </>
  );
};

export default NewsListSwiperItem;
