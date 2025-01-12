'use client';

import Image from 'next/image';
import styles from './AboutSectionMember.module.scss';
import { Media, } from '@/modules/general/libraries/general-types';
import Link from 'next/link';
import { useTranslations, } from 'next-intl';

interface AboutSectionMemberProps {
  media: Media;
  greenLabel?: boolean;
  className?: string;
  isSecretaryMembers?: boolean;
}

const AboutSectionMember = ({
  media,
  greenLabel,
  className,
  isSecretaryMembers,
}: AboutSectionMemberProps) => {
  const
    t = useTranslations(),
    descriptionClass = isSecretaryMembers
      ? `${styles.root__subtitle} ${greenLabel ? styles.root__subtitle__green : ''}`
      : `${styles.root__label} ${greenLabel ? styles.root__label__green : ''}`;
  if (!media) return null;

  return (
    <div className={`${styles.root} ${className || ''}`}>
      <div className={styles.root__image}>
        <Image
          src={media.path || ''}
          alt={media.title || ''}
          height={media.height}
          width={media.width}
          quality={100}
        />
      </div>
      {isSecretaryMembers ? (
        <>
          <div className={styles.root__title}>
            {media.title}
          </div>
          <div className={styles.root__subTitle}>
            {media.description}
          </div>
          {media.link && (
            <Link
              href={media.link}
              referrerPolicy='no-referrer'
              className={styles.root__link}
            >
              {t('common.link')}
            </Link>
          )}
        </>
      ) : (
        <>
          {media.description && (
            <div className={descriptionClass}>
              {media.description}
            </div>
          )}
          <div className={styles.root__title}>
            {media.title}
          </div>
          {media.link && (
            <Link
              href={media.link}
              referrerPolicy='no-referrer'
              className={styles.root__link}
            >
              {t('common.link')}
            </Link>
          )}
        </>
      )}
    </div>
  );
};

export default AboutSectionMember;
