'use client';

import Link from 'next/link';
import { Typography, } from '@mui/material';
import styles from './AboutMenu.module.scss';
import { useLocale, useTranslations, } from 'next-intl';
import { LocaleType, } from '@/modules/general/libraries/constants';
import { AboutUsType, } from '@/modules/general/libraries/general-types';

const AboutMenu = ({
  list,
  activeItem,
  isCouncil = false,
}: {
  list: any;
  activeItem: string;
  isCouncil?: boolean;
}) => {
  const
    t = useTranslations(),
    locale = useLocale();

  return (
    <div className={`${styles.root} ${(locale === LocaleType.en && isCouncil) ? styles.root__blue : ''} ${activeItem === "meeting" ? styles.root__blue__scroll : ""}`}>
      {list && list.map((item: AboutUsType, index: number) => (
        <Link
          key={`item-${index}`}
          href={item.link}
          className={styles.root__item}
          data-title={t(item.title)}
        >
          <div
            className={`${styles.root__item__icon} ${activeItem === item.link.substring(1) ? styles.root__item__icon__active : ''}`}
          >
            {item.icon}
          </div>
          <Typography
            variant='button2'
            className={`${styles.root__item__title} ${activeItem === item.link.substring(1) ? styles.root__item__title__active : ''}`}
          >
            {t(item.title)}
          </Typography>
        </Link>
      ))}
    </div>
  );
};

export default AboutMenu;