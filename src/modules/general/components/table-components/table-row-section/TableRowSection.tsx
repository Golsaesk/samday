'use client';

import styles from './TableRowSection.module.scss';

export default function TableRowSection({
  className = '',
  ref,
  children,
  variant = 'general',
}: {
  ref?: any;
  className?: string;
  children: any;
  variant?: 'general' | 'tools';
}) {

  return (
    <div ref={ref} className={`${styles.root} ${className} variant_${variant}`}>
      {children}
    </div>
  );
}