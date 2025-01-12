'use client';

import styles from './DialogContent.module.scss';

export default function DialogContent({
  children,
  className = '',
}: {
  children: any;
  className?: string;
}) {
  return (
    <div
      className={`${styles.root} ${className}`}
    >
      {children}
    </div>
  );
}