"use client";

import { Typography, } from '@mui/material';
import { useTranslations, } from 'use-intl';
import styles from './HomeSpecialNews.module.scss';
import Panel from '@/modules/general/components/panel';
import { News, } from '@modules/news/libraries/news-types';
import HomeSpecialNewsItem from './home-special-news-item';
import { useDeviceType, } from '@/modules/general/libraries/device-type';

const HomeSpecialNews = ({ items, }: { items: News[] | null | undefined}) => {
  const
    t = useTranslations(),
    deviceType = useDeviceType(),

    getNewsList = () => {
      let newsList: News[] = [];
      if (items && items.length > 0) {
        if (deviceType.isTablet) {
          newsList = items.slice(0, 3);
        }
        else if (deviceType.isMobile) {
          newsList = items.slice(0, 2);
        }
        else {
          newsList = items;
        }
      }
      return newsList;
    };

  return (
    <>
      {items && items.length > 0 && (
        <div className={styles.root}>
          <Panel
            variant={'general'}
            classes={{ root: styles.root__container, }}
          >
            <Typography
              variant='h2'
              component='h2'
            >
              {t('common.special_news')}
            </Typography>
            <div className={styles.root__container__list}>
              {getNewsList().map((item: News, index: number) => (
                <HomeSpecialNewsItem
                  key={`special-news-${index}`}
                  className={styles.root__container__list__item}
                  item = {item}
                />
              ))}
            </div>
          </Panel>
        </div>
      )}
    </>
  );
};

export default HomeSpecialNews;