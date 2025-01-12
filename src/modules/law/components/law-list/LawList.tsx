'use client';

import styles from './LawList.module.scss';
import LawListFilter from './law-list-filter';
import LawListContent from './law-list-content';
import Panel from '@/modules/general/components/panel';
import { Law, LawYear, } from '@/modules/law/libraries/law-types';
import { Category, } from '@/modules/category/libraries/category-types';

const LawList = ({
  categoryList,
  yearList,
  lawList,
}: {
  categoryList: Category[] | null | undefined;
  yearList: LawYear[] | null | undefined;
  lawList: Law[][] | null | undefined;
}) => {

  return (
    <div className={styles.root}>
      <Panel
        variant={'general'}
        classes={{ root: styles.root__panel, }}
      >
        <LawListFilter
          className = {styles.root__panel__filter}
          categoryList = {categoryList}
          yearList={yearList}
        />
        <LawListContent
          className = {styles.root__panel__content}
          lawList ={lawList}
        />
      </Panel>
    </div>
  );
};

export default LawList;