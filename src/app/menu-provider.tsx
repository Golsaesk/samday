
import React from 'react';
import { useContext, } from 'react';
import { Submenu, } from '@/modules/layout/libraries/layout-types';

export const MenuContext = React.createContext<Submenu>({});

export function useMenuContext() {
  return useContext(MenuContext);
}

export default function MenuProvider({
  children, submenu,
}: any) {
  return (
    <>
      <MenuContext.Provider value={submenu}>
        {children}
      </MenuContext.Provider>
    </>
  );
}