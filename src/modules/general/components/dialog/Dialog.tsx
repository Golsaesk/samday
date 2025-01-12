'use client';

import { ReactNode, } from 'react';
import styles from './Dialog.module.scss';
import { Dialog as MuiDialog, } from '@mui/material';
import { useDeviceType, } from '@modules/general/libraries/device-type';
import { TransitionDialogLeft, TransitionDialogUp, } from '@/modules/general/components/transition-dialog/TransitionDialog';

interface DialogClassType {
  root?: string;
  paper?: string;
}

export default function Dialog({
  open,
  onClose,
  children,
  props,
  classes,
  direction = 'up',
  breakpoint,
}: {
  open: boolean;
  onClose: any;
  children: ReactNode;
  props?: any;
  classes?: DialogClassType;
  direction?: 'up' | 'left';
  breakpoint?: boolean;
}) {
  const deviceType = useDeviceType();
  return (
    <MuiDialog
      fullScreen={breakpoint ?? deviceType.isMobile}
      open={open}
      onClose={onClose}
      keepMounted
      classes={{
        root: `${styles.root} ${classes?.root}`,
        paper: `${styles.root__paper} ${classes?.paper}`,
      }}
      {...(breakpoint ?? deviceType.isMobile) && { TransitionComponent: direction === 'up' ? TransitionDialogUp : TransitionDialogLeft, }}
      {...props}
    >
      {children}
    </MuiDialog>
  );
}