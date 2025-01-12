'use client';

import Link from 'next/link';
import { useState, } from 'react';
import { useTranslations, } from 'next-intl';
import { Input, Typography, } from '@mui/material';
import styles from './LawListFilterDate.module.scss';
import { LawYear, } from '@/modules/law/libraries/law-types';
import CloseIcon from '@/modules/general/components/icons/close';

const LawListFilterDate = ({
  yearList,
  className,
}: {
  yearList: LawYear[] | null | undefined;
  className?: string;
}) => {
  const
    t = useTranslations(),
    [searchKeyword, setSearchKeyword,] = useState<string>(''),
    handleChange = (event: any) => {
      setSearchKeyword(event.target.value);
    },
    filteredList = yearList?.filter((year) => year.approval_year.toString().includes(searchKeyword));

  return (
    <>
      {yearList && yearList.length > 0 && (
        <div className={`${styles.root} ${className ? className : "" }`}>
          <Typography
            variant='h5'
            className={styles.root__title}
          >
            {t('law.date_filter_label')}
          </Typography>
          <div className={styles.root__input}>
            <Input
              type='number'
              onChange={handleChange}
              value={searchKeyword}
              placeholder={t('common.search')}
            />
            {searchKeyword && (
              <CloseIcon onclick={() => setSearchKeyword('')} />
            )}
          </div>
          <div className={styles.root__list}>
            {filteredList && filteredList.map((year: LawYear, index: number) => (
              <Link
                key={`year-${index}`}
                href={`#${year.approval_year}`}
                className={styles.root__list__year}
              >
                {`${t('common.year')} ${year.approval_year}`}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default LawListFilterDate;