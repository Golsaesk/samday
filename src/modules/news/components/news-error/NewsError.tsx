'use client';

import styles from './NewsError.module.scss';
import ErrorConnection from '@/modules/general/components/error-components/error-connection';

export default function NewsError({
  variant = 'general',
  className = '',
  noScroll = true,
  description,
  url,
  title,
  errorButtonTitle,
}: {
  variant?: 'card' | 'general';
  className?: string;
  noScroll?: boolean;
  description?: string;
  url?: string;
  title?: string;
  errorButtonTitle?: string;
}) {
  return (
    <ErrorConnection
      className={styles.root}
      noScroll={false}
      description={description}
      title= {title}
    />
  );
}
