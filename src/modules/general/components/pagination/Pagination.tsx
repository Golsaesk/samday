'use client';

import { useTranslations, } from 'next-intl';
import styles from './Pagination.module.scss';
import React, { useEffect, useState, } from 'react';
import usePagination from '@mui/material/usePagination';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { OptionType, Paging, } from '@modules/general/libraries/general-types';
import { formatNumber, smoothScroll, } from '@modules/general/libraries/utils';
import ButtonInput from '@modules/general/components/input-fields/button-input';
import {
  ListItem, List, Typography, InputBase, NativeSelect,
} from '@mui/material';

const Pagination = ({
  itemName,
  paging,
  onPageChange,
  className,
  scrollToTop,
  setListLimit,
  listLimit,
  pageSizeList,
}: {
  itemName?: string;
  setListLimit: any;
  paging: Paging | null | undefined;
  pageSizeList: OptionType[];
  onPageChange: any;
  listLimit: number;
  className?: string;
  scrollToTop?: boolean;
}) => {
  const
    [pageCount, setPageCount, ] = useState<number>(paging ? Math.ceil(paging.total / paging.limit) : 0),
    [currentPage, setCurrentPage, ] = useState<number>(paging ? Math.ceil(paging.offset / paging.limit) : 0),
    [gotoPageNumber, setGotoPageNumber, ] = useState<number>(0),
    t = useTranslations('paging'),

    handleChange = (event: any, value: number) => {
      const newPageNumber = value - 1;
      if (currentPage !== newPageNumber) {
        setCurrentPage(newPageNumber);
        onPageChange(newPageNumber);
      }
      if (scrollToTop) {
        smoothScroll(event, 'back-to-top-anchor');
      }
    },
    handleGotoPageChange = (e: any) => {
      try {
        const pageNumber = e.target?.value || '';
        const page = Number(pageNumber);
        if (page <= pageCount && page >= 1) {
          setGotoPageNumber(page);
        }
      } catch {}
    },

    handleGotoPageClick = (e: any) => {
      if (gotoPageNumber <= pageCount && gotoPageNumber >= 1) {
        handleChange(e, gotoPageNumber);
      }
    },
    handleGotoKeyDown = (e: any) => {
      if (e.keyCode === 13) {
        handleGotoPageClick(e);
      }
    },

    handlePageSizeChange = (e: any) => {
      try {
        const pageSize = e.target?.value || '';
        setListLimit(pageSize);
        setCurrentPage(0);
      } catch {}

    },

    // pagination configs
    { items, } = usePagination({
      siblingCount: 0,
      boundaryCount: 1,
      count: pageCount,
      page: (currentPage + 1),
      onChange: ((event, value) => handleChange(event, value)),
      hideNextButton: (currentPage === pageCount - 1),
      hidePrevButton: (currentPage === 0),
    });

  useEffect(() => {
    if (paging) {
      setPageCount(Math.ceil(paging.total / paging.limit));
      setCurrentPage(Math.ceil(paging.offset / paging.limit));
    }
  }, [paging, ]);

  return (
    <>
      {paging && (
        <div className={`${styles.root} ${className}`}>
          {items.length > 1 && (
            <>
              <div className={styles.root__pageSize}>
                <div className={styles.root__pageSize__wrapper}>
                  <Typography
                    variant='tiny'
                    component={'span'}
                  >
                    {t('page_size')}
                  </Typography>
                  <NativeSelect
                    classes={{
                      root: styles.root__pageSize__wrapper__select,
                      select: styles.root__pageSize__wrapper__select__input,
                      icon: styles.root__pageSize__wrapper__select__icon,
                    }}
                    IconComponent={KeyboardArrowDownIcon}
                    variant='standard'
                    value={listLimit}
                    onChange={handlePageSizeChange}
                  >
                    {pageSizeList.map((item: OptionType, index: number) => (
                      <option
                        key={`select-option-${index}`}
                        value={item.value}
                      >
                        {item.label}
                      </option>
                    ))}
                  </NativeSelect>
                </div>
              </div>
              <div className={styles.root__pagination}>
                <List className={styles.root__pagination__paging}>
                  {items.map(({
                    page, type, selected, onClick,
                  }, index) => {
                    let children = null;
                    if (type === 'start-ellipsis' || type === 'end-ellipsis') {
                      children = '…';
                    } else if (type === 'page') {
                      children = (
                        <div
                          onClick = { (e) => { onClick(e);} }
                          className={`${styles.root__pagination__paging__listItem__button} ${
                            selected && styles.root__pagination__paging__listItem__selected}`}
                        >
                          {page}
                        </div>
                      );
                    } else {
                      children = (
                        <div
                          onClick = { (e) => { onClick(e);} }
                          className={styles.root__pagination__paging__listItem__link}
                        >
                          {type === 'next' ?
                            <>
                              {t('next_page')}
                              <ArrowBackIosNewIcon />
                            </> :
                            <>
                              <ArrowForwardIosIcon />
                              {t('previous_page')}
                            </>
                          }
                        </div>
                      );
                    }
                    return (
                      <ListItem
                        key={index}
                        className={styles.root__pagination__paging__listItem}
                      >
                        {children}
                      </ListItem>
                    );
                  })}
                </List>
                <div className={`${styles.root__current} ${items.length <= 1 ? styles.center : ''}`}>
                  <span className={styles.root__current__title}>
                    {`${t('showing')}`}
                  </span>
                  <span className={styles.root__current__items_count}>
                    {`${formatNumber(paging.offset + 1)}-${formatNumber(paging.offset + paging.returned)}`}
                  </span>
                  <span className={styles.root__current__separator} >
                    {`${t('of')}`}
                  </span>
                  <span className={styles.root__current__total}>
                    {`${formatNumber(paging.total)}`}
                  </span>
                  <span className={styles.root__current__item_name}>
                    {itemName}
                  </span>
                </div>
              </div>
              <div className={styles.root__goto}>
                <div className={styles.root__goto__wrapper}>
                  <Typography
                    variant='tiny'
                    className={styles.root__goto__wrapper__title}
                  >
                    {t('to_page')}
                  </Typography>
                  <InputBase
                    id="pageNumber"
                    type="number"
                    onChange={handleGotoPageChange}
                    onKeyDown={handleGotoKeyDown}
                    inputProps={{
                      inputMode: 'numeric',
                      maxLength: 3,
                    }}
                    className={styles.root__goto__wrapper__page}
                  />
                  <ButtonInput
                    className={styles.root__goto__wrapper__button}
                    onClick={handleGotoPageClick}
                    variant={'contained'}
                  >
                    {t('goto')}
                  </ButtonInput>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Pagination;
