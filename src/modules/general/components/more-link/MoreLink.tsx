import React from 'react';
import styles from './MoreLink.module.scss';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Link from 'next/link';

export default function MoreLink({
  title, url,
}: {
  title: string;
  url: string;
}) {

  return (
    <div className={styles.root}>
      <div className={styles.root__link}>
        <Link
          href={url}
          prefetch={false}
        >
          <span>{title}</span>
          <KeyboardArrowLeftIcon />
        </Link>
      </div>
    </div>
  );
}