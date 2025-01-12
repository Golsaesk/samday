'use client';

import styles from './DialogTitle.module.scss';
import Typography from '@mui/material/Typography';
import DialogClose from '@modules/general/components/dialog-close';

export default function DialogTitle({
  onClose,
  title,
  className = '',
}: {
  onClose?: any;
  title: string;
  className?: string;
}) {
  return (
    <div
      className={`${styles.root} ${className}`}
    >
      <Typography
        variant={'h5'}
        component={'p'}
      >
        {title}
      </Typography>
      {onClose && (
        <DialogClose onClick={onClose} />
      )}
    </div>
  );
}