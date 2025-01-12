'use client';

import { ReactNode, } from 'react';
import { Typography, } from '@mui/material';
import styles from './PanelHeader.module.scss';
import { PanelVariant, } from '@/modules/general/libraries/constants';
import { getVariantStyle, } from '@/modules/general/libraries/utils';

export default function PanelHeader({
  className,
  variant,
  props,
  children,
}: {
  className?: string;
  variant: PanelVariant;
  props?: any;
  children: ReactNode;
}) {

  return (
    <Typography
      className={`${styles.root} ${className ?? ''} ${getVariantStyle(styles, variant)}`}
      variant={'h3'}
      component={'h1'}
      {...props}
    >
      {children}
    </Typography>
  );
}