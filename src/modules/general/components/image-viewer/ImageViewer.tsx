'use client';

import Image from 'next/image';
import styles from './ImageViewer.module.scss';
import Dialog from '@modules/general/components/dialog/Dialog';
import CloseIcon from '@/modules/general/components/icons/close';

export type TabChange = {
  (value: number): void;
};

export default function ImageViewer({
  open,
  onClose,
  imageSrc,
  width,
  height,
}: {
  open: boolean;
  onClose: any;
  imageSrc?: string;
  width?: number;
  height?: number;
}) {

  return (
    <>
      {imageSrc && (
        <Dialog
          open={open}
          onClose={onClose}
          classes={{
            root: styles.root,
            paper: styles.root__paper,
          }}
        >
          <div
            onClick={onClose}
            className={styles.root__paper__close}
          >
            <CloseIcon />
          </div>
          <Image
            src={imageSrc}
            width={width}
            height={height}
            alt={''}
          />
        </Dialog>
      )}
    </>
  );
}