import Link from 'next/link';
import { useLocale, } from 'next-intl';
import { useEffect, useState, } from 'react';
import { usePathname, } from 'next/navigation';
import styles from './HeaderMenuList.module.scss';
import getLayoutData from '@/modules/layout/libraries/utils';
import { LocaleType, } from '@/modules/general/libraries/constants';
import { Layout, MenuOrInfoItem, } from '@/modules/layout/libraries/layout-types';

const HeaderMenuList = () => {
  const
    locale = useLocale(),
    pathname = usePathname().substring(1),
    [data, setData,] = useState<Layout>();

  useEffect(() => {
    const response = getLayoutData(locale);
    setData(response);
  }, [locale,]);

  return (
    <>
      {data && data.menu && (
        <div className={styles.root}>
          {data.menu.data.slice(0, 5).map((menuItem: MenuOrInfoItem, index: number) => (
            <Link
              key={`menu-item-${index}`}
              href={menuItem.link}
              className={`${styles.root__item} ${(index === 0 && (!pathname || pathname === LocaleType.en)) ?
                styles.root__item__active :
                pathname.includes(menuItem.title) ?
                  styles.root__item__active :
                  ''
              }`}
            >
              {menuItem.value}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default HeaderMenuList;