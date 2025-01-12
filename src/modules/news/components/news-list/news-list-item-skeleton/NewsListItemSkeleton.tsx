'use client';

import { Skeleton, } from '@mui/material';
import styles from './NewsListItemSkeleton.module.scss';

export default function NewsListItemSkeleton() {

  return (
    <div className={styles.root}>
      <Skeleton
        animation="wave"
        variant={'rounded'}
        width={183}
        height={164}
      />
      <div className={styles.root__content}>
        <div className={styles.root__content__title}>
          <Skeleton
            animation="wave"
            variant="text"
            width={288}
            height={32}
          />
        </div>
        <div className={styles.root__content__paragraph}>
          <Skeleton
            animation="wave"
          />
          <Skeleton
            animation="wave"
          />
          <Skeleton
            animation="wave"
          />
          <div className={styles.root__content__footer}>
            <Skeleton
              animation="wave"
              variant="text"
              width={175}
              height={36}
            />
            <Skeleton
              animation="wave"
              variant="text"
              width={175}
              height={36}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
