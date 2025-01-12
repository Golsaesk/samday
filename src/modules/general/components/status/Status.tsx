'use client';

import React from 'react';
import styles from './Status.module.scss';

export default function Status({
  statusColor,
  statusTitle,
  fullWidth = false,
  className = '',
}: {
  statusColor: 'green' | 'blue' | 'red' | 'gray';
  statusTitle: string | number | null | undefined;
  fullWidth?: boolean;
  className?: string;
}) {

  return (
    <div className={`${styles.root} status_${statusColor} ${fullWidth ? styles.root__fullWidth : ''} ${className}`}>
      <>
        {statusTitle || ''}
      </>
    </div>
  );
}
