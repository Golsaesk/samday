'use client';

import { useState, } from 'react';
import { useTranslations, } from 'next-intl';
import Typography from '@mui/material/Typography';
import styles from './FileUploadPreview.module.scss';
import PdfIcon from '@modules/general/components/icons/pdf';
import TrashIcon from '@modules/general/components/icons/trash';
import ImageIcon from '@modules/general/components/icons/image';
import ImageViewer from '@modules/general/components/image-viewer';
import { FileInputAcceptType, } from '@modules/general/libraries/general-types';

const iconDetection = (type: string) => {
  switch (type) {
    case FileInputAcceptType.pdf:
      return <PdfIcon />;
    default:
      return <ImageIcon />;
  }
};

export default function FileUploadPreview({
  fileName,
  onDelete,
  mimeType,
  fileSrc,
}: {
  fileName: string;
  onDelete?: any;
  mimeType: string;
  fileSrc: string;
}) {
  const
    t = useTranslations(),
    [openImageViewer, setOpenImageViewer,] = useState<boolean>(false),

    handleImageViewerStatus = (status: boolean) => {
      setOpenImageViewer(status);
    };

  return (
    <>
      <div className={styles.root}>
        {onDelete && (
          <div
            onClick={onDelete}
            className={styles.root__delete}
          >
            <TrashIcon />
          </div>
        )}
        <div className={`${styles.root__detail} ${onDelete ? styles.root__detail__hasDelete : ''}`}>
          <div className={`${styles.root__detail__info} ${onDelete ? styles.root__detail__info__hasDelete : ''}`}>
            <Typography
              dir={'ltr'}
              variant={'body2'}
              className={'en'}
              component={'span'}
            >
              {fileName}
            </Typography>
            <Typography
              variant={'button2'}
              color={'primary'}
              onClick={() => {
                if (mimeType === FileInputAcceptType.pdf) {
                  let pdfWindow = window.open('');
                  pdfWindow?.document.write(
                    `<iframe width='100%' height='100%' src=${encodeURI(fileSrc)}></iframe>`
                  );
                } else {
                  handleImageViewerStatus(true);
                }
              }}
              className={`${styles.root__detail__info__link} 
                    ${onDelete ? styles.root__detail__info__link__hasDelete : ''}`}
            >
              {t('common.see_more')}
            </Typography>
          </div>
          {iconDetection(mimeType)}
        </div>
      </div>
      {mimeType !== FileInputAcceptType.pdf && (
        <ImageViewer
          open={openImageViewer}
          onClose={() => handleImageViewerStatus(false)}
          imageSrc={fileSrc}
          width={100}
          height={100}
        />
      )}
    </>
  );
}
