
import Link from 'next/link';
import { useEffect, useState, } from 'react';
import styles from './TopFooterInfo.module.scss';
import { useLocale, useTranslations, } from 'next-intl';
import TopFooterInfoColumn from './top-footer-info-column';
import getLayoutData from '@/modules/layout/libraries/utils';
import { Layout, MenuOrInfoItem, } from '@/modules/layout/libraries/layout-types';

const TopFooterInfo = () => {
  const
    t = useTranslations(),
    locale = useLocale(),
    [data, setData,] = useState<Layout>();

  useEffect(() => {
    const response = getLayoutData(locale);
    setData(response);
  }, [locale,]);

  return (
    <>
      <div className={styles.root__desktop}>
        <TopFooterInfoColumn
          title={t('common.communication')}
          data={data?.info.data}
          className={styles.root__desktop__item}
        />
        <TopFooterInfoColumn
          title={''}
          data={data?.menu.data.slice(0, 4)}
          className={`${styles.root__desktop__item} ${styles.root__desktop__TabletNoDisplay}`}
        />
        <TopFooterInfoColumn
          title={''}
          data={data?.menu.data.slice(4, 8)}
          className={styles.root__desktop__item}
        />
      </div>
      <div className={styles.root__mobile}>
        {data?.info.data.slice(1, 3).map((item: MenuOrInfoItem, index: number) => (
          <Link
            key={`footer-item-${index}`}
            href={item.link}
            className={styles.root__mobile__item}
          >
            {item.value}
          </Link>
        ))}
      </div>
    </>
  );
};

export default TopFooterInfo;