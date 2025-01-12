import styles from './HeaderMenu.module.scss';
import HeaderMenuList from './header-menu-list';
import HeaderMenuCollapse from './header-menu-collapse';
import { Submenu, } from '@/modules/layout/libraries/layout-types';

const HeaderMenu = ({ submenu, }: {submenu: Submenu | null | undefined}) => {

  return (
    <div className={styles.root}>
      <HeaderMenuCollapse submenu={submenu} />
      <HeaderMenuList />
    </div>
  );
};

export default HeaderMenu;