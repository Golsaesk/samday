'use client';

import styles from './LawError.module.scss';
import ErrorConnection from '@/modules/general/components/error-components/error-connection';

export default function LawError() {
  return (
    <ErrorConnection
      className={styles.root}
      noScroll={false}
    />
  );
}
