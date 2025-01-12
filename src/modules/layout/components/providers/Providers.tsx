'use client';

import { SnackbarProvider, } from 'notistack';
import MenuProvider from '@/app/menu-provider';
import { SessionProvider, } from 'next-auth/react';
import { AppProgressBar as ProgressBar, } from 'next-nprogress-bar';
import { LayoutProps, } from '@/modules/layout/libraries/layout-types';
import DefaultSnackbar from '@/modules/general/components/default-snackbar';

export default function Providers({
  children,
  submenu,
}: LayoutProps) {
  return (
    <>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        Components={{ default: DefaultSnackbar, }}
      >
        <SessionProvider>
          <MenuProvider submenu={submenu}>
            {children}
          </MenuProvider>
        </SessionProvider>
      </SnackbarProvider>
      <ProgressBar
        height="2px"
        color="#AF89FF"
        options={{ showSpinner: false, }}
        shallowRouting
      />
    </>
  );
}
