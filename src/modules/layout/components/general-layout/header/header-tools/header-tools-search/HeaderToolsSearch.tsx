'use client';

import Link from 'next/link';
import { useLocale, } from 'next-intl';
import { useTranslations, } from 'use-intl';
import { useEffect, useState, } from 'react';
import styles from './HeaderToolsSearch.module.scss';
import { getLawUrl, } from '@/modules/law/libraries/utils';
import { getNewsUrl, } from '@/modules/news/libraries/utils';
import { fetchLawList, } from '@/modules/law/store/api/law-api';
import CloseIcon from '@/modules/general/components/icons/close';
import { LawListEntity, } from '@/modules/law/libraries/law-types';
import { fetchNewsList, } from '@/modules/news/store/api/news-api';
import { NewsListEntity, } from '@/modules/news/libraries/news-types';
import { useDeviceType, } from '@/modules/general/libraries/device-type';
import MenuSearchIcon from '@/modules/general/components/icons/menu-search';
import {
  ClickAwayListener,
  Drawer,
  Input,
  useMediaQuery,
} from '@mui/material';

const HeaderToolsSearch = ({ className = '', }: {
  className?: string;
}) => {
  const
    t = useTranslations(),
    locale = useLocale(),
    deviceType = useDeviceType(),
    isMobileScreen = useMediaQuery('(max-width:750px)', { noSsr: false, }),
    [open, setOpen,] = useState<boolean>(false),
    [searchKeywords, setSearchKeywords,] = useState<string>(''),
    [searchResults, setSearchResults,] = useState<{ newsList: NewsListEntity | null; lawList: LawListEntity | null}>({
      newsList: null, lawList: null,
    });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeywords(event.target.value);
  };

  const handleClear = () => {
    setSearchKeywords('');
  };

  const handleClose = () => {
      setOpen(false);
      setSearchKeywords('');
    },

    handleToggle = () => {
      setOpen(!open);
    } ;

  const handleSearch = async () => {
    const delayDebounceFn = setTimeout(async () => {
      let lawListEntity: LawListEntity | null = null,
        newsListEntity: NewsListEntity | null = null;

      if (searchKeywords.length >= 1) {
        try {
          newsListEntity = await fetchNewsList({
            limit: 10,
            offset: 0,
            typeIds: '',
            outputIds: '',
            categoryIds: '',
            keywords: searchKeywords,
            sorting: [],
            subdomainId: 0,
            locale,
          });
        } catch (error) {
          console.error('Error fetching news list:', error);
        }
        try {
          lawListEntity = await fetchLawList({
            limit: 10,
            offset: 0,
            categoryIds: '',
            sorting: [],
            locale,
            searchText: searchKeywords,
          });
        } catch (error) {
          console.error('Error fetching laws list:', error);
        }

        setSearchResults({
          newsList: newsListEntity,
          lawList: lawListEntity,
        });
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  };

  useEffect(() => {
    setOpen(deviceType.isScreen ? true : false);
    setSearchKeywords('');
  }, [deviceType.isScreen,]);

  useEffect(() => {
    if (searchKeywords === '') {
      setSearchResults({
        newsList: null, lawList: null,
      });
    } else {
      handleSearch();
    }
  }, [searchKeywords,]);

  const highlightKeywords = (text: string, keywords: string) => {
    const parts = text.split(new RegExp(`(${keywords})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === keywords.toLowerCase() ? <strong key={index}>{part}</strong> : part
    );
  };

  return (
    <ClickAwayListener onClickAway={() => deviceType.isTablet ? handleClose() : undefined}>
      <div className={`${styles.root} ${className}`}>
        <div className={styles.root__search}>
          <div className={`${styles.root__container} ${open ? styles.root__container__open : ''}`}>
            <div className={`${styles.root__input} ${open ? styles.root__input__open : ''}`}>
              <Input
                placeholder={t('common.search')}
                classes={{ root: styles.root__input__root, }}
                name={'searchKeywords'}
                onChange={handleInputChange}
                value={searchKeywords}
              />
            </div>
            <div
              onClick={searchKeywords.length > 0 ? handleClear : deviceType.isMobileOrTablet ? handleToggle : undefined}
              className={`${styles.root__icon}`}
            >
              {searchKeywords.length >= 1 ? <CloseIcon /> : <MenuSearchIcon />}
            </div>
          </div>
          {searchKeywords !== '' && (
            <>
              {((searchResults?.newsList?.data?.length ?? 0) > 0 ||
                (searchResults?.lawList?.data?.length ?? 0) > 0) && (
                <div className={`${styles.root__wrapper} ${open ? styles.root__wrapper__open : styles.root__wrapper__close}`}>
                  <div className={styles.root__wrapper__collapse}>
                    <div className={styles.root__wrapper__collapse__result} >
                      {searchResults?.newsList?.data?.map((news) => (
                        <div className={styles.root__wrapper__collapse__result__item} key={news.id}>
                          <Link href={getNewsUrl(news, locale)} passHref prefetch={false} key={news.id}>
                            {highlightKeywords(news.title, searchKeywords)}
                          </Link>
                        </div>
                      ))}
                      {searchResults?.lawList?.data?.map((law) => (
                        <div className={styles.root__wrapper__collapse__result__item} key={law.id}>
                          <Link href={getLawUrl(law, locale)} passHref prefetch={false} key={law.id}>
                            {highlightKeywords(law.title, searchKeywords)}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        {isMobileScreen && (
          <Drawer
            open={open}
            anchor='right'
            onClose={() => handleClose()}
            hideBackdrop
            transitionDuration={500}
            classes={{
              paper: styles.root__drawer__paper,
              root: styles.root__drawer,
            }}
          >
            <div className={styles.root__drawer__paper__search}>
              <div className={styles.root__drawer__paper__search__input}>
                <Input
                  placeholder={t('common.search')}
                  classes={{ root: styles.root__input__root, }}
                  name={'searchKeywords'}
                  onChange={handleInputChange}
                  value={searchKeywords}
                />
                <MenuSearchIcon />
              </div>
              <div
                className={styles.root__drawer__paper__search__close}
                onClick={handleClose}
              >
                <CloseIcon />
              </div>
            </div>
            {((searchResults?.newsList?.data?.length ?? 0) > 0 ||
              (searchResults?.lawList?.data?.length ?? 0) > 0) && (
              <div className={styles.root__drawer__paper}>
                <div className={styles.root__wrapper__collapse__result} >
                  {searchResults?.newsList?.data?.map((news) => (
                    <div className={styles.root__wrapper__collapse__result__item} key={news.id}>
                      <Link href={getNewsUrl(news, locale)} passHref prefetch={false}>
                        {highlightKeywords(news.title, searchKeywords)}
                      </Link>
                    </div>
                  ))}
                  {searchResults?.lawList?.data?.map((law) => (
                    <div className={styles.root__wrapper__collapse__result__item} key={law.id}>
                      <Link href={getLawUrl(law, locale)} passHref prefetch={false}>
                        {highlightKeywords(law.title, searchKeywords)}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Drawer>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default HeaderToolsSearch;
