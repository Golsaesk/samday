'use client';

import { ReactNode, } from 'react';
import styles from './ErrorLayout.module.scss';

export default function ErrorLayout({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`${styles.root} ${className}`}>
      {children}
    </div>
  );
}