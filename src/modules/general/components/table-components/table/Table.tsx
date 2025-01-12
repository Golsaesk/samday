'use client';

import styles from './Table.module.scss';
import { TableClassType, } from '@modules/general/libraries/general-types';

export default function Table({
  classes,
  ref,
  children,
}: {
  ref?: any;
  classes?: TableClassType;
  children: any;
}) {
  return (
    <div ref={ref} className={`${styles.root} ${classes?.root ?? ''}`}>
      {children}
    </div>
  );
}