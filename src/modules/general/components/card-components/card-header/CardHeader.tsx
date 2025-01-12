'use client';

import React from 'react';
import { ReactNode, } from 'react';
import { Typography, } from '@mui/material';
import styles from './CardHeader.module.scss';

export default function CardHeader({
  icon,
  props,
  title,
  hasBorder,
  className,
  classNameTitle,
  controlTool,
  variant = 'h6',
  color = 'primary',
  styleType = 'none',
  fullWidth,
}: {
  props?: any;
  title: ReactNode;
  icon?: ReactNode;
  className?: string;
  classNameTitle?: string;
  fullWidth?: boolean;
  hasBorder?: boolean;
  controlTool?: ReactNode;
  color?: 'primary' | 'secondary';
  variant?: 'h6' | 'h4' | 'subtitle1' | 'h5' | 'overline' | 'h3';
  styleType?: 'underlined' | 'singleLine' | 'tripleLine' | 'none';
}) {
  return (
    <div
      {...props}
      className={`${styles.root} ${className ?? ''} variant_${styleType} ${hasBorder ? styles.root__hasBorder : ''} `}
    >
      <Typography
        variant={variant}
        component={'p'}
        className={`${styles.root__title} ${classNameTitle ?? ''} color_${color} variant_${styleType} ${fullWidth ? styles.root__title__fullWidth : ''}`}
      >
        {icon}
        {title}
      </Typography>
      {controlTool}
    </div>
  );
}