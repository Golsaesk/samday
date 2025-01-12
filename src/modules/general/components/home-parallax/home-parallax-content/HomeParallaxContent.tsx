'use client';

import styles from './HomeParallaxContent.module.scss';
import { useLocale, useTranslations, } from 'next-intl';
import { Box, } from '@/modules/box/libraries/box-types';
import { ArrowRightIcon, } from '@mui/x-date-pickers/icons';
import { renderHTML, } from '@/modules/general/libraries/utils';
import ButtonInput from '@/modules/general/components/input-fields/button-input';

export default function HomeParallaxContent({ box, }: {
  box: Box | null;
}) {
  const
    t = useTranslations(),
    locale = useLocale();

  return (
    <>
      {box && (
        <div className={styles.root}>
          <div className={styles.root__title} >
            {box?.title || ''}
          </div>
          <div className={styles.root__description} >
            {renderHTML(box?.body || '')}
          </div>
          <ButtonInput
            variant='contained'
            href={`/${locale}/about/executive-council-of-information-technology`}
            endIcon = {<ArrowRightIcon />}
            className={styles.root__button}
          >
            {t('common.article_more')}
          </ButtonInput>
        </div>
      )}
    </>
  );
}