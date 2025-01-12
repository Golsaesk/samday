'use client';

import React from 'react';
import Image from 'next/image';
import FeedbackBox from './feedback-box';
import styles from './Feedback.module.scss';
import { Typography, } from '@mui/material';
import { useTranslations, } from 'next-intl';
import Panel from '@/modules/general/components/panel';
import { DOMAIN, } from '@modules/general/libraries/constants';
import Breadcrumbs from '@/modules/general/components/breadcrumbs';
import Card from '@/modules/general/components/card-components/card';
import CardContent from '@/modules/general/components/card-components/card-content';

export default function Feedback() {
  const
    t = useTranslations(),

    breadCrumbLinks = [
      {
        title: `${t('contact_us.title')}`,
        link: `/contact`,
      },
      {
        title: `${t('common.feedback')}`,
        link: `/contact/feedback`,
      },];

  return (
    <>
      <Breadcrumbs links={breadCrumbLinks} />
      <Panel
        variant={'general'}
        title={t('common.feedback')}
      >
        <Card className={styles.root}>
          <CardContent className={styles.root__content}>
            <div className={styles.root__content__form}>
              <Typography
                className={styles.root__content__form__title}
              >
                {t('common.feedback_hint')}
              </Typography>
              <FeedbackBox />
            </div>
            <div className={styles.root__content__image}>
              <Image
                src={`${DOMAIN}/images/feedback/feedback.svg`}
                width={300}
                height={300}
                alt={t('common.feedback')}
              />
            </div>
          </CardContent>
        </Card>

      </Panel>

    </>
  );
}
