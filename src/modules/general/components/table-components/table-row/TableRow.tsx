'use client';

import styles from './TableRow.module.scss';

export default function TableRow({
  className = '',
  ref,
  children,
}: {
  ref?: any;
  className?: string;
  children: any;
}) {
  return (
    <div ref={ref} className={`${styles.root} ${className}`}>
      {children}
    </div>
  );
}