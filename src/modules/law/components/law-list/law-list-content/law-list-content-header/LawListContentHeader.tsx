'use client';

import { useTranslations, } from 'next-intl';
import styles from './LawListContentHeader.module.scss';

const LawListContentHeader = ({
  className,
  year,
}: {
  className?: string;
  year: number;
}) => {
  const
    t = useTranslations();

  return (
    <div
      id = {`${year}`}
      className={`${styles.root} ${className ? className : "" }`}
    >
      {`${t('common.year')} ${year}`}
    </div>
  );
};

export default LawListContentHeader;