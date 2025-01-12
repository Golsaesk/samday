import Image from 'next/image';
import { ReactNode, } from 'react';
import { Typography, } from '@mui/material';
import styles from './TableEmptyState.module.scss';

export default function TableEmptyState({
  imageSrc,
  imageWidth,
  imageHeight,
  title,
  button,
  boxHeight,
}: {
  imageSrc: string;
  imageWidth?: number;
  imageHeight?: number;
  title: string;
  button?: ReactNode;
  boxHeight?: number;
}) {

  return (
    <div
      className={styles.root}
      style={{
        minHeight: boxHeight ?? 'auto',
        flexDirection: !button ? 'column' : 'unset',
      }}
    >
      <Image
        alt=''
        src={imageSrc}
        width={imageWidth ?? 220}
        height={imageHeight ?? 180}
      />
      <div className={styles.root__content}>
        <Typography variant={'button1'}>
          {title}
        </Typography>
        {button}
      </div>
    </div>
  );
}