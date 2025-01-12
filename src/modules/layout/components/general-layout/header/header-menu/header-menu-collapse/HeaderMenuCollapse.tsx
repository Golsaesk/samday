'use client';

import { useState, } from 'react';
import styles from './HeaderMenuCollapse.module.scss';
import MenuIcon from '@/modules/general/components/icons/menu';
import HeaderMenuCollapseList from './header-menu-collapse-list';
import { Submenu, } from '@/modules/layout/libraries/layout-types';
import HeaderMenuCollapseFooter from './header-menu-collapse-footer';
import {
  ClickAwayListener, Collapse, Drawer, useMediaQuery,
} from '@mui/material';

const HeaderMenuCollapse = ({ submenu, }: {submenu: Submenu | null | undefined}) => {
  const
    isSmallScreen = useMediaQuery('(max-width:750px)', { noSsr: false, }),
    [open, setOpen, ] = useState<boolean>(false),

    children = (
      <div className={styles.root__collapse__wrapper}>
        <HeaderMenuCollapseList
          open ={open}
          isSmallScreen = {isSmallScreen}
          submenu={submenu}
          className={styles.root__collapse__wrapper__list}
        />
        <HeaderMenuCollapseFooter />
      </div>
    ),

    handleCollapseToggle = () => {
      setOpen(prev => !prev);
    };

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div className={styles.root}>
        <div
          className={styles.root__icon}
          onClick={handleCollapseToggle}
        >
          <MenuIcon />
        </div>
        {!isSmallScreen ? (
          <Collapse
            in={open}
            orientation={'vertical'}
            classes={{
              root: styles.root__collapse,
              wrapperInner: styles.root__collapse__wrapper__inner,
            }}
          >
            {children}
          </Collapse>
        ) : (
          <Drawer
            open={open}
            anchor={'left'}
            onClose={() => setOpen(false)}
            hideBackdrop
            transitionDuration={500}
            classes={{
              paper: styles.root__drawer__paper,
              root: styles.root__drawer,
            }}
          >
            {children}
          </Drawer>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default HeaderMenuCollapse;