'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations, } from 'next-intl';
import { News, } from '@modules/news/libraries/news-types';
import { getNewsUrl, } from '@modules/news/libraries/utils';
import { ArrowRightIcon, } from '@mui/x-date-pickers/icons';
import styles from './HomeHereSectionTopNewsItem.module.scss';
import { NO_IMAGE_PATH, } from '@/modules/news/libraries/constants';
import ButtonInput from '@/modules/general/components/input-fields/button-input';

const HomeHereSectionTopNewsItem = ({ item, }: {
  item: News;
}) => {
  const
    locale = useLocale(),

    t = useTranslations();

  return (
    <>
      {item &&
        <div className={styles.root}>
          <div className={styles.root__inner}>
            &nbsp;
            <Image
              src={(item && item.media && item.media.path) ? item.media.path : NO_IMAGE_PATH}
              alt={''}
              className={styles.root__inner__image}
              style={{
                objectFit: 'cover',
                objectPosition: "left",
              }}
              fill
              priority
            />
            <div className={styles.root__inner__box}>
              <div className={styles.root__inner__box__content}>
                <div className={styles.root__inner__box__content__title}>
                  <Link
                    href={getNewsUrl(item, locale)}
                    title={item.title}
                    prefetch={false}
                  >
                    {item.title}
                  </Link>
                </div>
                <div className={styles.root__inner__box__content__description}>
                  {item.lead}
                </div>
                <ButtonInput
                  variant='contained'
                  title={item.title}
                  href={getNewsUrl(item, locale)}
                  endIcon = {<ArrowRightIcon />}
                  className={styles.root__inner__box__content__button}
                >
                  {t('common.article_more')}
                </ButtonInput>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default HomeHereSectionTopNewsItem;
