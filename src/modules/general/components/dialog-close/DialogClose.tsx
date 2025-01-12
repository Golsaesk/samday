'use client';

import styles from './DialogClose.module.scss';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export default function DialogClose({ onClick, }: {
  onClick: any;
}) {
  return (
    <div
      className={styles.root}
      onClick={onClick}
    >
      <CloseRoundedIcon />
    </div>
  );
}