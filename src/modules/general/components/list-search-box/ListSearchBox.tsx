import { InputBase, } from '@mui/material';
import { useTranslations, } from 'next-intl';
import React, { useRef, useState, } from 'react';
import styles from './ListSearchBox.module.scss';
import SearchIcon from '@mui/icons-material/Search';

export default function ListSearchBox({
  onSearch,
  searchContext,
  placeHolder = '',
  className = '',
  id,
}: {
  onSearch: (searchKeyword: string) => void;
  searchContext: string | null | undefined;
  placeHolder?: string;
  className?: string;
  id: string;
}) {
  const
    inputRef = useRef(null),
    t = useTranslations(),
    [inputValue, setInputValue, ] = useState<string>(''),

    keyPress = (event: any) => {
      if (event.keyCode === 13 && event.target.value) {
        onSearch(event.target.value);
      }
    },

    handleBlur = (event: any) => {
      if (event.target.value) {
        onSearch(event.target.value);
      }
    },

    searchClickHandler = () => {
      onSearch(inputValue);
    };

  return (
    <div className={`${styles.root} ${className}`}>
      <div
        className={styles.root__icon}
        title={t('common.search')}
        onClick={searchClickHandler}
      >
        <SearchIcon />
      </div>
      <InputBase
        ref={inputRef}
        defaultValue={searchContext}
        onBlur={(e) => handleBlur(e)}
        className={styles.root__input}
        placeholder={placeHolder}
        inputProps={{ 'aria-label': placeHolder, }}
        onKeyDown={keyPress}
        onChange={(e) => setInputValue(e.target.value)}
        id={id}
      />
    </div>
  );
}
