'use client';

import { Typography, } from '@mui/material';
import styles from './LawListFilterChip.module.scss';
import CloseIcon from '@/modules/general/components/icons/close';
import { Category, } from '@/modules/category/libraries/category-types';

const LawListFilterChip = ({
  category,
  handleDelete,
}: {
  category: Category;
  handleDelete: any;
}) => {

  return (
    <>
      {category && (
        <div className={styles.root}>
          <CloseIcon onclick={handleDelete} />
          <Typography
            variant='tiny'
          >
            {category.title}
          </Typography>
        </div>
      )}
    </>
  );
};

export default LawListFilterChip;