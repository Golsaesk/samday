import React from 'react';
import styles from './PaymentLoading.module.scss';

export default function PaymentLoading({ className = '', }: {
  className?: string;
}) {

  return (
    <svg className={`${styles.root} ${className}`} width="176" height="132" viewBox="0 0 176 132" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect className={styles.root__rect} x="3" y="18.4971" width="156.22" height="91.5004" rx="16" transform="rotate(16.4531 25.9157 0)" fill="var(--color-credit-loading-minus-1)" />
      <rect className={styles.root__rect} x="10.3634" y="27.42398" width="39.9006" height="17.8537" rx="8" transform="rotate(16.4531 31.2791 8.92688)" fill="var(--color-credit-loading-minus-2)" />
      <rect x="19.5266" y="38.4971" width="156.22" height="91.5004" rx="16" fill="var(--color-credit-loading-main)" />
      <rect className={styles.root__wave} x="19.5266" y="53.0032" width="156.22" height="17.8537" fill="var(--color-credit-loading-plus-1)" />
      <circle className={styles.root__circle__1} cx="146.178" cy="108.238" r="13.3903" fill="var(--color-credit-loading-minus-1)" />
      <circle className={styles.root__circle__2} cx="124.766" cy="108.238" r="13.3903" fill="var(--color-credit-loading-plus-1)" />
    </svg>
  );
}
