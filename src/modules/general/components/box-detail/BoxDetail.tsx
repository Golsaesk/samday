import React from 'react';
import styles from './BoxDetail.module.scss';
import Panel from '@/modules/general/components/panel';
import { Box, } from '@/modules/box/libraries/box-types';
import { renderHTML, } from '@/modules/general/libraries/utils';

export default function BoxDetail({ box, }: {
  box: Box | null | undefined;
}) {
  return (
    <>
      {box && (
        <Panel
          title={box.title}
          variant={'general'}
          classes={{ root: styles.root, }}
        >
          <div className={styles.root__description}>
            {renderHTML(box?.body || '')}
          </div>
        </Panel>
      )}
    </>
  );
}
