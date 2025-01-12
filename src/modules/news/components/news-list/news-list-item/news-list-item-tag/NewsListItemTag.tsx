'use client';

import styles from './NewsListItemTag.module.scss';
import { Category, } from '@/modules/category/libraries/category-types';

export default function NewsListItemTag(
  { tagList, }:
  { tagList: Category[] })
{

  return (
    <>
      {tagList && (
        tagList.map((item: Category, index: number) => (
          <div key ={index} className={styles.root}>
            {item.title}
          </div>
        ))

      )}
    </>
  );
}
