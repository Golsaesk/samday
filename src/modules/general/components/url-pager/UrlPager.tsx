'use client';

import styles from './UrlPager.module.scss';
import { useTranslations, } from 'next-intl';
import { ListItem, List, } from '@mui/material';
import React, { useEffect, useState, } from 'react';
import usePagination from '@mui/material/usePagination';
import { Paging, } from '@modules/general/libraries/general-types';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { formatNumber, smoothScroll, } from '@modules/general/libraries/utils';

const UrlPager = ({
  itemName,
  paging,
  onPageChange,
  className,
  scrollToTop,
}: {
  itemName?: string;
  paging: Paging | null | undefined;
  onPageChange: any;
  className?: string;
  scrollToTop?: boolean;
}) => {
  const
    [pageCount, setPageCount,] = useState<number>(paging ? Math.ceil(paging.total / paging.limit) : 0),
    [currentPage, setCurrentPage,] = useState<number>(paging ? Math.ceil(paging.offset / paging.limit) : 0),
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

    // pagination configs
    { items, } = usePagination({
      siblingCount: 0,
      boundaryCount: 2,
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
  }, [paging,]);

  return (
    <>
      {paging && (
        <div className={`${styles.root} ${className}`}>
          {items.length > 1 && (
            <>
              <div className={styles.root__empty}>
                &nbsp;
              </div>
              <div className={styles.root__paging}>
                <List className={styles.root__paging}>
                  {items.map(({
                    page, type, selected, onClick,
                  }, index) => {
                    let children = null;
                    if (type === 'start-ellipsis' || type === 'end-ellipsis') {
                      children = '…';
                    } else if (type === 'page') {
                      children = (
                        <div
                          onClick={(e) => { onClick(e); }}
                          className={`${styles.root__paging__listItem__button} ${selected && styles.root__paging__listItem__selected}`}
                        >
                          {page}
                        </div>
                      );
                    } else {
                      children = (
                        <div
                          onClick={(e) => { onClick(e); }}
                          className={`${styles.root__paging__listItem__button} ${type === 'next' ? styles.root__paging__listItem__next : styles.root__paging__listItem__previous}`}
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
                        className={styles.root__paging__listItem}
                      >
                        {children}
                      </ListItem>
                    );
                  })}
                </List>
              </div>
            </>
          )}
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
      )}
    </>
  );
};

export default UrlPager;
