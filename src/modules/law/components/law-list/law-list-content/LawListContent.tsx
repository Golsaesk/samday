'use client';

import React from 'react';
import styles from './LawListContent.module.scss';
import LawListContentItem from './law-list-content-item';
import { Law, } from '@/modules/law/libraries/law-types';
import LawListContentHeader from './law-list-content-header';

const LawListContent = ({
  className,
  lawList,
}: {
  className: string;
  lawList: Law[][] | null | undefined;
}) => {

  return (
    <>
      {lawList && lawList.length > 0 && lawList[0].length > 0 && (
        <div className={`${styles.root} ${className ? className : "" }`}>
          {lawList.map((list: Law[], index: number) => (
            <React.Fragment key={`item-${index}`}>
              {list.length > 0 && (
                <div className={styles.root__container}>
                  <LawListContentHeader
                    year={list[0].approval_year}
                  />
                  <div className={styles.root__container__list}>
                    {list.map((item: Law) => (
                      <LawListContentItem
                        key={item.id}
                        item = {item}
                      />
                    ))}
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </>
  );
};

export default LawListContent;