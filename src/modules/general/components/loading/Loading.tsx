import React from 'react';
import styles from './Loading.module.scss';

export default function Loading({
  width = 60,
  height = 60,
}: {
  width?: number | string;
  height?: number | string;
}) {

  return (
    <div
      className={styles.root}
    >
      <div
        style={{
          width: width,
          height: height,
        }}
      >
        <div className="dot-pulse"></div>
      </div>
    </div>
  );
}
