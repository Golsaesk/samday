'use client';

import React, { useState, } from 'react';
import { useSnackbar, } from 'notistack';
import styles from './LawDetail.module.scss';
import { useTranslations, } from 'next-intl';
import LawDetailInfo from './law-detail-info';
import LawDetailHeader from './law-detail-header';
import { useSearchParams, } from 'next/navigation';
import LawListAttachment from './law-list-attachment';
import { Law, } from '@modules/law/libraries/law-types';
import { News, } from '@/modules/news/libraries/news-types';
import Panel from '@/modules/general/components/panel/Panel';
import { renderHTML, } from '@/modules/general/libraries/utils';
import { DOMAIN, } from '@/modules/general/libraries/constants';
import { LawDetailTabType, } from '@/modules/law/libraries/constants';
import GeneralAction from '@/modules/general/components/general-action';
import GeneralRelatedNews from '@/modules/news/components/general-related-news';
import {
  Fade, Tab, Tabs,
} from '@mui/material';

const LawDetail = ({
  law,
  relatedNewsList,
}: {
  law: Law | null | undefined;
  relatedNewsList: News[] | null | undefined;
}) => {
  const
    t = useTranslations(),
    searchParams = useSearchParams(),
    tab = Number(searchParams.get('t')),
    { enqueueSnackbar, } = useSnackbar(),
    [activeTab, setActiveTab,] = useState((tab && (tab === 0 || tab === 1)) ? tab : LawDetailTabType.context),

    handleChange = (event: React.SyntheticEvent, tab: number) => {
      setActiveTab(tab);
    },

    handleCopy = () => {
      if (law) {
        navigator.clipboard.writeText(`${DOMAIN}/law/${law.id}`);
        enqueueSnackbar(t('law.copy_notification'), { variant: 'success', });
      }
    };

  return (
    <div className={styles.root}>
      {law && (
        <Panel
          variant='general'
          classes={{ root: styles.root__panel, }}
        >
          <LawDetailHeader
            law={law}
          />
          <Tabs
            value={activeTab}
            onChange={handleChange}
            className={styles.root__panel__tabs}
          >
            <Tab
              label={t('law.show_all')}
              className={styles.root__panel__tabs__item}
            />
            <Tab
              label={t('law.show_more')}
              className={styles.root__panel__tabs__item}
            />
          </Tabs>
          <div className={styles.root__panel__container}>
            <div className={styles.root__panel__container__content}>
              <Fade
                in={activeTab === LawDetailTabType.context}
              >
                <div hidden={activeTab === LawDetailTabType.mapping}>
                  <LawDetailInfo
                    law={law}
                  />
                  <div className={`${styles.root__panel__container__content__body} ${styles.root__panel__container__content__body__context}`}>
                    {renderHTML(law.body)}
                  </div>
                </div>
              </Fade>
              <Fade
                in={activeTab === LawDetailTabType.mapping}
              >
                <div
                  hidden= {activeTab === LawDetailTabType.context}
                  className={`${styles.root__panel__container__content__body} ${styles.root__panel__container__content__body__mapping}`}
                >
                  {renderHTML(law.body)}
                </div>
              </Fade>
              <LawListAttachment
                attachmentList={law.attachment_list}
                lawId={law.id}
              />
              <GeneralAction
                downloadLink={law.file}
                handleCopy={handleCopy}
              />
            </div>
            {relatedNewsList && relatedNewsList.length > 0 && (
              <div className={styles.root__panel__container__sidebar}>
                <GeneralRelatedNews
                  items={relatedNewsList}
                />
              </div>
            )}
          </div>
        </Panel>
      )}
    </div>
  );
};

export default LawDetail;