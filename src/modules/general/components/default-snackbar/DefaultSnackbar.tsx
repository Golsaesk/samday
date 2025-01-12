'use client';
import React, { forwardRef, } from "react";
import styles from './DefaultSnackbar.module.scss';

const DefaultSnackbar = forwardRef((props: any, ref: any) =>
  (
    <div
      {...props}
      ref={ref}
    >
      <div
        className={styles.root}
      >
        {props.message}
      </div>
    </div>
  )
);

DefaultSnackbar.displayName = 'DefaultSnackbar' ;

export default DefaultSnackbar;