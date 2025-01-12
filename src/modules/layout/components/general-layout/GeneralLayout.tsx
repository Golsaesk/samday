'use client';

import Header from './header';
import Footer from './footer';
import { useMenuContext, } from '@/app/menu-provider';
import { LayoutProps, } from '@modules/layout/libraries/layout-types';

const GeneralLayout = ({ children, }: LayoutProps) => {

  const submenu = useMenuContext();

  return (
    <>
      <Header submenu={submenu} />
      {children}
      <Footer />
    </>
  );
};

export default GeneralLayout;
