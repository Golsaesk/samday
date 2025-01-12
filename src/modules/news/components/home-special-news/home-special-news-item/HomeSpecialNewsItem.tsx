
import Link from 'next/link';
import Image from 'next/image';
import { Typography, } from '@mui/material';
import styles from './HomeSpecialNewsItem.module.scss';
import { useLocale, useTranslations, } from 'next-intl';
import { News, } from '@/modules/news/libraries/news-types';
import { ArrowRightIcon, } from '@mui/x-date-pickers/icons';
import { getNewsUrl, } from '@/modules/news/libraries/utils';
import { dateFormat, } from '@/modules/general/libraries/utils';
import { FormatDateType, } from '@/modules/general/libraries/general-types';
import ButtonInput from '@/modules/general/components/input-fields/button-input';

const HomeSpecialNewsItem = ({
  className,
  item,
}: {
  className: string;
  item: News;
}) => {
  const
    locale = useLocale(),
    t = useTranslations();

  return (
    <>
      {item && (
        <div className={`${styles.root} ${className ? className : ''}`}>
          <Image
            src={item.media.path || ''}
            alt={''}
            width={220}
            height={200}
            className={styles.root__image}
          />
          <div className={styles.root__content}>
            <Link
              href={getNewsUrl(item, locale)}
              className={styles.root__content__title}
              title={item.title}
            >
              {item.title}
            </Link>
            <Typography
              variant='body1'
              component='p'
            >
              {item.lead}
            </Typography>
            <div className={styles.root__content__row}>
              <ButtonInput
                href={getNewsUrl(item, locale)}
                variant='contained'
                onClick={undefined}
                endIcon = {<ArrowRightIcon />}
                className={styles.root__content__row__button}
              >
                {t('news.more')}
              </ButtonInput>
              <div className={styles.root__content__row__date}>
                {dateFormat(item.publish_date, locale, FormatDateType.long)}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeSpecialNewsItem;