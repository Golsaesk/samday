'use client';

import { Collapse, } from '@mui/material';
import styles from './CardContent.module.scss';

export default function CardContent({
  className,
  children,
  props,
  fullScreen,
  expandable,
}: {
  className?: string;
  children: any;
  props?: any;
  fullScreen?: boolean;
  expandable?: boolean;
}) {
  return (
    <>
      {expandable ? (
        <Collapse
          {...props}
          classes={{ root: `${styles.root} ${className ?? ''} ${fullScreen ? styles.root__fullScreen : ''} ${!props.in && styles.root__collapsed}`, }}
        >
          {children}
        </Collapse>
      ) : (
        <div
          {...props}
          className={`${styles.root} ${className ?? ''} ${fullScreen ? styles.root__fullScreen : ''}`}
        >
          {children}
        </div>
      )}
    </>

  );
}