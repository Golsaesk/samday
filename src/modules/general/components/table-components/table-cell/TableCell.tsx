'use client';

import Link from 'next/link';
import { ReactNode, } from 'react';
import styles from './TableCell.module.scss';
import { useMediaQuery, } from '@mui/material';

export interface TableCellClassType {
  root?: string;
  label?: string;
  value?: string;
  container?: string;
}

export interface TableCellProps {
  ref?: any;
  link?: string;
  widthInPercent?: number;
  title?: string;
  label?: ReactNode;
  children?: ReactNode;
  displayHeader?: boolean;
  classes?: TableCellClassType;
  isFirst?: boolean;
  isLast?: boolean;
  variant?: 'middle' | 'tool';
  justify?: 'center' | 'flex-start' | 'flex-end' | 'space-between';
  flex: number;
}

export default function TableCell({
  ref,
  link,
  widthInPercent,
  label,
  justify,
  classes,
  children,
  displayHeader = false,
  variant,
  title,
  flex,
  isFirst,
  isLast,
}: TableCellProps) {
  const isSmallScreen = useMediaQuery('(max-width:1300px)', { noSsr: false, });

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        ...(!isSmallScreen && widthInPercent) && { width: `${widthInPercent}%`, },
        ...(flex) && { flex: `${flex}`, },
      }}
      className={`TableCell_root ${styles.root} ${classes?.root ?? ''} ${link ? styles.root__link : ''}`}
    >
      <div
        style={{ justifyContent: justify, }}
        className={`TableCell_container  ${classes?.container ?? ''}  ${styles.root__container}`}
      >
        {(isSmallScreen || displayHeader) && (
          <div className={`TableCell_label ${styles.root__container__label} ${classes?.label ?? ''} ${isLast ? 'lastCell' : ''} ${isFirst ? 'firstCell' : ''} variant_${variant || 'middle'}`}>
            {label}
          </div>
        )}
        <div className={`TableCell_value  ${classes?.value ?? ''}  ${styles.root__container__value}  ${isLast ? 'lastCell' : ''} ${isFirst ? 'firstCell' : ''} variant_${variant || 'middle'}`}>
          {link ? (
            <Link
              prefetch={false}
              href={link}
              {...title && { title: title, }}
            >
              {children}
            </Link>
          ) : (
            <>
              { children }
            </>
          )}
        </div>
      </div>
    </div>
  );
}