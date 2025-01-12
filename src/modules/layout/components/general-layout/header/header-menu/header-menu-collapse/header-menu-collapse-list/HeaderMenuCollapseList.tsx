import Link from 'next/link';
import { useLocale, } from 'next-intl';
import { useEffect, useState, } from 'react';
import { usePathname, } from 'next/navigation';
import Panel from '@/modules/general/components/panel';
import { Law, } from '@/modules/law/libraries/law-types';
import styles from './HeaderMenuCollapseList.module.scss';
import { getLawUrl, } from '@/modules/law/libraries/utils';
import { News, } from '@/modules/news/libraries/news-types';
import { getNewsUrl, } from '@/modules/news/libraries/utils';
import getLayoutData from '@/modules/layout/libraries/utils';
import { MenuType, } from '@/modules/layout/libraries/constants';
import HeaderToolsLanguage from '@/modules/layout/components/general-layout/header/header-tools/header-tools-language';
import {
  Layout, MenuOrInfoItem, Submenu,
} from '@/modules/layout/libraries/layout-types';

const HeaderMenuCollapseList = ({
  open,
  isSmallScreen,
  submenu,
  className,
}: {
  open: boolean;
  submenu: Submenu | null | undefined;
  isSmallScreen: boolean;
  className?: string;
}) => {
  const
    locale = useLocale(),
    pathname = usePathname().substring(1),
    [selectedMenu, setSelectedMenu,] = useState<string | undefined>(undefined),
    [subMenuList, setSubMenuList,] = useState<News[] | Law[] | null | undefined>([]),
    [isNews, setIsNews,] = useState<boolean>(false),
    [data, setData,] = useState<Layout>(),

    getSubmenuList = async () => {
      switch (selectedMenu) {
        case MenuType.news:
          setSubMenuList(submenu?.newsList);
          setIsNews(true);
          break;
        case MenuType.law:
          setSubMenuList(submenu?.lawList);
          setIsNews(false);
          break;
        case MenuType.report:
          setSubMenuList(submenu?.reportList);
          setIsNews(true);
          break;
        default:
          setSubMenuList([]);
          break;
      }
    },

    handleMouseEnter = (name: string) => {
      setSelectedMenu(name);
    };

  useEffect(() => {
    if (!open) {
      setSubMenuList([]);
      setSelectedMenu(undefined);
    }
  }, [open,]);

  useEffect(() => {
    if (selectedMenu) {
      getSubmenuList();
    }
  }, [selectedMenu,]);

  useEffect(() => {
    const response = getLayoutData(locale);
    setData(response);
  }, [locale,]);

  return (
    <Panel
      variant='general'
      classes={{ root: `${styles.root} ${className ? className : "" }`, }}
    >
      {isSmallScreen && (
        <div className={styles.root__language}>
          <HeaderToolsLanguage />
        </div>
      )}
      {data && data.menu && (
        <div className={styles.root__menu}>
          {data.menu.data.map((menu: MenuOrInfoItem, index: number) => (
            <Link
              key={`collapse-menu-item-${index}`}
              href={(menu.hasSubmenu && !isSmallScreen) ? '' : menu.link}
              className={`${styles.root__menu__item} ${
                menu.title === selectedMenu ? styles.root__menu__item__selected : ''} ${
                pathname.includes(menu.title) ? styles.root__menu__item__active : ''}`
              }
              onMouseEnter={() => handleMouseEnter(menu.title)}
            >
              {menu.value}
            </Link>
          ))}
        </div>
      )}
      {subMenuList && subMenuList.length > 0 && (
        <div className={`${styles.root__menu} ${styles.root__subMenu}`}>
          {subMenuList.map((item: News | Law, index: number) => (
            <Link
              key={`collapse-submenu-item-${index}`}
              href={isNews ? getNewsUrl(item as News, locale) : getLawUrl(item as Law, locale)}
              className={`${styles.root__subMenu__item}`}
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </Panel>
  );
};

export default HeaderMenuCollapseList;