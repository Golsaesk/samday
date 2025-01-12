'use client';

import { RootState, } from '@/redux/store';
import styles from './NewsList.module.scss';
import NewsListItem from './news-list-item';
import NewsListFilter from './news-list-filter';
import hash from '@modules/general/libraries/hash';
import React, { useEffect, useState, } from 'react';
import Pager from '@/modules/general/components/pager';
import Panel from '@/modules/general/components/panel';
import { useLocale, useTranslations, } from 'next-intl';
import { useRouter, useSearchParams, } from 'next/navigation';
import NewsListItemSkeleton from './news-list-item-skeleton';
import NewsError from '@/modules/news/components/news-error';
import { useAppDispatch, useAppSelector, } from '@/redux/hooks';
import { Paging, } from '@modules/general/libraries/general-types';
import { fetchNewsListThunk, } from '@modules/news/store/news-slice';
import { Category, } from '@/modules/category/libraries/category-types';
import { News, NewsCriteria, } from '@modules/news/libraries/news-types';

const NewsList = ({
  items,
  showSearch = true,
  limit,
  offset = 0,
  paging,
  defaultCategoryIds,
  defaultKeywords = '',
  categoryList,
  defaultTags,
  typeIds,
  newsCategoryIdList,
}: {
  items: News[] | undefined | null;
  showSearch?: boolean;
  limit: number;
  offset: number;
  paging: Paging | null | undefined;
  defaultKeywords: string | null | undefined;
  defaultCategoryIds?: string;
  categoryList: Category[] | null | undefined;
  defaultTags?: string;
  typeIds?: string | null;
  newsCategoryIdList?: string;
}) => {
  const locale = useLocale();
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialPage = searchParams.get('page')
    ? Number(searchParams.get('page') as string)
    : 1;
  const [isFirstTime, setIsFirstTime,] = useState(true);
  const [selectedPage, setSelectedPage,] = useState<number>(initialPage);

  const criteria: NewsCriteria = {
    limit,
    offset: (selectedPage - 1) * limit,
    keywords: defaultKeywords || '',
    typeIds: typeIds || "",
    outputIds: '',
    categoryIds: defaultCategoryIds || newsCategoryIdList || "",
    sorting: [],
    subdomainId: 0,
    tags: defaultTags,
    locale: `${locale}`,
  };

  const list: News[] = useAppSelector<News[]>((state: RootState) => state.newsReducer.list[hash(criteria)]?.items) || items || [];
  const pending: boolean = useAppSelector((state: RootState) => state.newsReducer.list[hash(criteria)]?.pending) || false;
  const error: boolean = !!useAppSelector((state: RootState) => state.newsReducer.list[hash(criteria)]?.error) || false;
  const p: Paging = useAppSelector((state: RootState) => state.newsReducer.list[hash(criteria)]?.paging) || paging;

  const pageChange = (pageNumber: number) => {
    setIsFirstTime(false);
    setSelectedPage(pageNumber);
    const currentPath = window.location.pathname;
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set('page', pageNumber.toString());

    router.push(`${currentPath}?${currentParams.toString()}`, { scroll: false, });
  };

  const handleScrollToRoot = () => {
    window.scroll({
      behavior: 'smooth',
      top: 0,
    });
  };

  const filteredList = list.map((newsItem) => {
    const filteredCategories = newsItem.category_list?.filter(category =>
      newsCategoryIdList?.split(',').includes(category.id.toString())
    ) || [];
    return {
      ...newsItem,
      category_list: filteredCategories,
    };
  });

  useEffect(() => {
    handleScrollToRoot();
    if (!isFirstTime) {
      dispatch(fetchNewsListThunk({ criteria, }));
    }
  }, [selectedPage, criteria.limit, criteria.offset, criteria.categoryIds, criteria.tags,]);

  useEffect(() => {
    const page = searchParams.get('page');
    if (page) {
      const pageNumber = Number(page);
      if (!isNaN(pageNumber) && pageNumber !== selectedPage) {
        setSelectedPage(pageNumber);
        setIsFirstTime(false);
      }
    } else {
      if (selectedPage !== 1) {
        setSelectedPage(1);
        setIsFirstTime(false);
      }
    }
  }, [searchParams,]);

  return (
    <div className={styles.root}>
      <div className={styles.root__container}>
        <Panel
          variant={'general'}
          classes={{ root: styles.root, }}
        >
          <div className={styles.root__content}>
            <div className={styles.root__content__sidebar}>
              <NewsListFilter
                categoryList={categoryList}
                showSearch={showSearch}
              />
            </div>
            <div className={styles.root__content__news}>
              {error ? (
                <NewsError />
              ) : (
                <div className={styles.root__content__news__list}>
                  {pending ? (
                    [...Array(limit),].map((_, index) => (
                      <NewsListItemSkeleton key={index} />
                    ))
                  ) : (
                    filteredList && filteredList.length > 0 ? (
                      filteredList.map((item: News) => (
                        <NewsListItem key={item.id} item={item} />
                      ))
                    ) : (
                      <NewsError
                        title={t('news.no_news_found')}
                        description={t('news.no_news_found_hint')}
                      />
                    )
                  )}
                </div>
              )}
              {filteredList && filteredList.length > 0 && (
                <div className={styles.root__content__news__list__pagination}>
                  <Pager
                    paging={p}
                    onPageChange={pageChange}
                    itemName={t('news.news_item_name')}
                    className=''
                    currentPage={selectedPage}
                  />
                </div>
              )}
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
};

export default NewsList;
