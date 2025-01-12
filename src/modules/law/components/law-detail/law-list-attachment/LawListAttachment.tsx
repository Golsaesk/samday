'use client';

import Link from 'next/link';
import React, { useState, } from 'react';
import { useTranslations, } from 'next-intl';
import styles from './LawListAttachment.module.scss';
import DownloadIcon from '@/modules/general/components/icons/download';
import ArrowDownIcon from '@/modules/general/components/icons/arrow-down';
import { LawAttachment, LawAttachmentFile, } from '@modules/law/libraries/law-types';
import {
  Accordion, AccordionDetails, AccordionSummary, Typography,
} from '@mui/material';

const LawListAttachment = ({
  attachmentList,
  lawId,
}: {
  attachmentList: LawAttachment[] | null | undefined;
  lawId: number;
}) => {
  const
    t = useTranslations(),
    [expanded, setExpanded,] = useState<number | false>(false),
    handleChange =
      (id: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? id : false);
      };

  return (
    <>
      {attachmentList && attachmentList.length > 0 && (
        <div className={styles.root}>
          <Typography
            variant='h4'
            className={styles.root__title}
          >
            {t('law.attachment_title')}
          </Typography>
          {attachmentList.map((attachment: LawAttachment) => (
            <Accordion
              key={attachment.id}
              expanded={expanded === attachment.id}
              onChange={handleChange(attachment.id)}
              className={styles.root__accordion}
              disableGutters
            >
              <AccordionSummary
                expandIcon={<ArrowDownIcon />}
                className={styles.root__accordion__summary}
              >
                <Typography
                  variant='subtitle1'
                  className={styles.root__accordion__title}
                >
                  {attachment.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={styles.root__accordion__detail}>
                {attachment.file_list && attachment.file_list.map((file: LawAttachmentFile, index: number) => (
                  <Link
                    key={file.id}
                    // href={`/api/download/${lawId}/${attachment.id - 1}/${index}`}
                    href={file.path}
                    target='_blank'
                    className={styles.root__accordion__detail__item}
                  >
                    <DownloadIcon />
                    <Typography
                      variant='body1'
                      component={'p'}
                    >
                      {file.title}
                    </Typography>
                  </Link>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      )}
    </>
  );
};

export default LawListAttachment;
