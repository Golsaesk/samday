'use client';

import React from 'react';
import { useTranslations, } from 'next-intl';
import styles from './GeneralAction.module.scss';
import LinkIcon from '@/modules/general/components/icons/link';
import PrintIcon from '@/modules/general/components/icons/print';
import ButtonInput from '@/modules/general/components/input-fields/button-input';

const GeneralAction = ({
  downloadLink,
  handleCopy,
}: {
  downloadLink?: string;
  handleCopy: () => void;

}) => {
  const t = useTranslations();

  return (
    <div className={styles.root}>
      <ButtonInput
        variant="contained"
        href={downloadLink}
        target={downloadLink ? '_blank' : undefined}
        endIcon={<PrintIcon />}
        className={styles.root__button}
      >
        {t('law.download_label')}
      </ButtonInput>
      <ButtonInput
        variant='contained'
        onClick={handleCopy}
        endIcon={<LinkIcon />}
        className={`${styles.root__button} ${styles.root__green}`}
      >
        {t('law.copy_link')}
      </ButtonInput>
    </div>
  );
};

export default GeneralAction;