'use client';

import React from 'react';
import styles from './PanelBody.module.scss';
import { getVariantStyle, } from '@/modules/general/libraries/utils';
import { PanelVariant, } from '@/modules/general/libraries/constants';

export default function PanelBody({
  children,
  className,
  variant,
  props,
  fullWidth,
}: {
  children: any;
  className?: string;
  variant: PanelVariant;
  props?: any;
  fullWidth?: boolean;
}) {
  return (
    <div
      {...props}
      className={`${styles.root} ${className || ''} ${getVariantStyle(styles, variant)}`}
    >
      <div className={`${styles.root__container}`}>
        {children}
      </div>
    </div>
  );
}