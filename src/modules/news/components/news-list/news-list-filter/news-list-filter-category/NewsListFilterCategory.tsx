'use client';

import { useLocale, useTranslations, } from 'next-intl';
import styles from './NewsListFilterCategory.module.scss';
import { getNewsListUrl, } from '@/modules/news/libraries/utils';
import { getReportsListUrl, } from '@/modules/report/libraries/utils';
import { Category, } from '@/modules/category/libraries/category-types';
import {
  useSearchParams, usePathname, useRouter,
} from 'next/navigation';
import { getNationalDatabaseListUrl, } from '@/modules/national-database/libraries/utils';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material';

const NewsListFilterCategory = ({
  categoryList,
  className,
}: {
  categoryList: Category[] | null | undefined;
  className?: string;
}) => {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  let strippedPathname = pathname;
  if (locale && pathname.startsWith(`/${locale}/`)) {
    strippedPathname = pathname.slice(`/${locale}`.length);
  }

  const currentCategoryList = searchParams.get('category') || '';
  const currentTagList = searchParams.get('tags') || '';

  const routeMap: { [key: string]: (categories: string, tags: string, locale: string) => string } = {
    '/news': getNewsListUrl,
    '/reports': getReportsListUrl,
    '/national-database': getNationalDatabaseListUrl,
  };

  const currentRouteKey = Object.keys(routeMap).find((route) =>
    strippedPathname.startsWith(route)
  );

  const getCurrentListUrl = currentRouteKey
    ? routeMap[currentRouteKey]
    : getNewsListUrl;

  const isChecked = (category: Category) => {
    const list: string[] = currentCategoryList.split(',').filter(Boolean);
    return list.includes(String(category.id));
  };

  const handleCheckChange = (
    category: Category,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const list: string[] = currentCategoryList.split(',').filter(Boolean);
    const categoryIdStr = String(category.id);
    const index = list.indexOf(categoryIdStr);

    if (index > -1) {
      list.splice(index, 1);
    } else {
      list.push(categoryIdStr);
    }

    const newCategoryList = list.join(',');
    const url = getCurrentListUrl(newCategoryList, currentTagList, locale);

    router.push(url);
  };

  return (
    <>
      {categoryList && categoryList.length > 0 && (
        <div className={`${styles.root} ${className || ''}`}>
          <Typography variant="h5" className={styles.root__title}>
            {t('news.main_topic')}
          </Typography>
          <FormGroup className={styles.root__checkbox}>
            {categoryList.map((category: Category) => (
              <FormControlLabel
                key={category.id}
                control={
                  <Checkbox
                    onChange={(event) => handleCheckChange(category, event)}
                    checked={isChecked(category)}
                  />
                }
                label={category.title}
                classes={{ label: styles.root__checkbox__label, }}
              />
            ))}
          </FormGroup>
        </div>
      )}
    </>
  );
};

export default NewsListFilterCategory;
