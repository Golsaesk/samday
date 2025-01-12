'use client';

import { ReactNode, } from 'react';
import styles from './Panel.module.scss';
import { PanelVariant, } from '@/modules/general/libraries/constants';
import { getVariantStyle, } from '@/modules/general/libraries/utils';

export default function Panel({
  className,
  variant,
  children,
}: {
  className?: string;
  variant: PanelVariant;
  children: ReactNode;
}) {
  return (
    <div className={`${styles.root} ${className ?? ''} ${getVariantStyle(styles, variant)}`}>
      {children}
    </div>
  );
}