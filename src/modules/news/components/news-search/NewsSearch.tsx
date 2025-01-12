'use client';

import { useTranslations, } from 'next-intl';
import styles from './NewsSearch.module.scss';
import React, { useEffect, useState, } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputBase, } from '@mui/material';

type NewsSearchKeywordsChange = {
  (keywords: string): void;
};

export default function NewsSearch({ onKeywordsChange, }: {
  onKeywordsChange: NewsSearchKeywordsChange;
}
) {
  const
    [keywords, setKeywords, ] = useState(''),
    [clicked, setClicked, ] = useState(false),
    t = useTranslations(),

    changeHandler = (event: any) => {
      setKeywords(event.target.value);
    },

    keyPress = (event: any) => {
      if (event.keyCode === 13) {
        setClicked(true);
      }
    };

  useEffect(() => {
    setClicked(false);
    onKeywordsChange(keywords);
  }, [ clicked, ]);

  return (
    <>
      <div className={styles.root}>
        <div className={styles.root__box}>
          <div className={styles.root__wrapper}>
            <InputBase
              className={styles.root__box__input}
              placeholder={t('news.search')}
              inputProps={{ 'aria-label': t('news.search'), }}
              onChange={changeHandler}
              onKeyDown={keyPress}
            />
          </div>
          <IconButton
            type="submit"
            className={styles.root__box__icon}
            aria-label={t('news.search')}
            onClick={() => {
              onKeywordsChange(keywords);
            }}
          >
            <SearchIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
}
