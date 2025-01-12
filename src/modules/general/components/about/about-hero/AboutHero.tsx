"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useLocale, } from 'next-intl';
import styles from './AboutHero.module.scss';
import Panel from '@/modules/general/components/panel';
import { ColorType, } from '@/modules/layout/libraries/constants';
import ArrowDownIcon from '@modules/general/components/icons/arrow-down';

const AboutHero = ({
  color = ColorType.green,
  image,
  faTitle,
  enTitle,
}: {
  color: 'blue' | 'green';
  image: string;
  faTitle: string;
  enTitle: string;
}) => {
  const
    locale = useLocale();

  return (
    <div className={`${styles.root} ${color === ColorType.blue ? styles.root__blue : styles.root__green}`}>
      <Panel
        variant='general'
        classes={{ root: styles.root__container, }}
      >
        <div className={`${styles.root__container__wrapper} ${color === ColorType.blue ? styles.root__container__divider__blue : styles.root__container__divider__green}`}>
          <Image
            alt={''}
            width={color === ColorType.blue ? 329 : 373}
            height={color === ColorType.blue ? 44 : 27}
            className={`${styles.root__container__title} ${(color === ColorType.blue && locale === 'en') ? styles.root__container__title__blue : ''}`}
            src={locale === 'fa' ? faTitle : enTitle}
          />
          <Image
            alt={''}
            width={481}
            height={209}
            className={styles.root__container__logo}
            src={image}
            quality={100}
          />
          <div className={styles.root__container__bottom}>
            <Link
              href={color === ColorType.blue ? '#objective' : '#member'}
              className={`${styles.root__container__button} ${color === ColorType.blue ? styles.root__container__button__blue : styles.root__container__button__green}`}
            >
              <ArrowDownIcon />
            </Link>
          </div>
        </div>
      </Panel>
    </div>
  );
};

export default AboutHero;