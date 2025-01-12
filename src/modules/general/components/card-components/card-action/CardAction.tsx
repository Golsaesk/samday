'use client';

import styles from './CardAction.module.scss';

export default function CardAction({
  className,
  children,
  props,
}: {
  className?: string;
  children: any;
  props?: any;
}) {
  return (
    <div
      {...props}
      className={`${styles.root} ${className ?? ''}`}
    >
      {children}
    </div>
  );
}