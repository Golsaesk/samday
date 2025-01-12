'use client';

import { useLocale, } from 'next-intl';
import { Typography, } from '@mui/material';
import styles from './NewsListFilterChip.module.scss';
import CloseIcon from '@/modules/general/components/icons/close';
import { getNewsListUrl, } from '@/modules/news/libraries/utils';
import { getReportsListUrl, } from '@/modules/report/libraries/utils';
import { Category, } from '@/modules/category/libraries/category-types';
import { getNationalDatabaseListUrl, } from '@/modules/national-database/libraries/utils';
import {
  useRouter,
  useSearchParams,
  usePathname,
} from 'next/navigation';

const NewsListFilterChip = ({
  categoryList,
  className,
}: {
  categoryList: Category[] | null | undefined;
  className?: string;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const currentCategoryList = searchParams.get('category') || '';
  const currentTagList = searchParams.get('tags') || '';

  const routeMap: { [key: string]: (categories: string, tags: string, locale: string) => string } = {
    '/news': getNewsListUrl,
    '/reports': getReportsListUrl,
    '/national-database': getNationalDatabaseListUrl,
  };

  let strippedPathname = pathname;
  if (locale && pathname.startsWith(`/${locale}/`)) {
    strippedPathname = pathname.slice(`/${locale}`.length);
  }

  const currentRouteKey = Object.keys(routeMap).find((route) =>
    strippedPathname.startsWith(route)
  );

  const getCurrentListUrl = currentRouteKey
    ? routeMap[currentRouteKey]
    : getNewsListUrl;

  const filteredCategoryList = categoryList?.filter(category => currentCategoryList.includes(`${category.id}`)) || [];

  const handleDeleteCategory = (category: Category) => {
    let list: string[] = currentCategoryList ? currentCategoryList.split(',') : [];
    const index = list.indexOf(`${category.id}`);
    if (index !== -1) {
      list.splice(index, 1);
    }
    const newCategoryList = list.join(',');
    const url = getCurrentListUrl(newCategoryList, currentTagList, locale);
    router.push(url);
  };

  const handleDeleteTag = (tag: string) => {
    let list: string[] = currentTagList ? currentTagList.split(',') : [];
    const index = list.indexOf(tag);
    if (index !== -1) {
      list.splice(index, 1);
      const newTagList = list.join(',');
      const url = getCurrentListUrl(currentCategoryList, newTagList, locale);
      router.push(url);
    }
  };

  return (
    <div className={`${styles.root} ${className || ''}`}>
      {filteredCategoryList.map((category: Category) => (
        <div key={category.id} className={styles.root__chip}>
          <CloseIcon onclick={() => handleDeleteCategory(category)} />
          <Typography variant='tiny'>
            {category.title}
          </Typography>
        </div>
      ))}
      {currentTagList && currentTagList.split(',').map((tag: string) => (
        <div key={tag} className={styles.root__chip}>
          <CloseIcon onclick={() => handleDeleteTag(tag)} />
          <Typography variant='tiny'>
            {tag}
          </Typography>
        </div>
      ))}
    </div>
  );
};

export default NewsListFilterChip;
