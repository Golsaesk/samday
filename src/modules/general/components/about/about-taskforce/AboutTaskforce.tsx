'use client';

import { Typography, } from '@mui/material';
import AboutSection from '../about-section';
import { useTranslations, } from 'next-intl';
import { useEffect, useState, } from 'react';
import styles from './AboutTaskforce.module.scss';
import { Box, } from '@/modules/box/libraries/box-types';
import AboutMenu from '@modules/general/components/about/about-menu';
import AboutMenuTaskforceData from '@modules/general/components/about/about-menu/about-menu-taskforce-data';

const AboutTaskforce = ({
  memberBox,
  aboutDutyBox,
  aboutDocumentBox,
  aboutNotificationBox,
  aboutBasicDatabasesBox,
  aboutPerformanceGuaranteeBox,
  aboutNIECenterBox,
}: {
  memberBox: Box | null;
  aboutDutyBox: Box | null;
  aboutDocumentBox: Box | null;
  aboutNotificationBox: Box | null;
  aboutBasicDatabasesBox: Box | null;
  aboutPerformanceGuaranteeBox: Box | null;
  aboutNIECenterBox: Box | null;
}) => {

  const
    t = useTranslations(),
    [activeItem, setActiveItem,] = useState<string>(''),

    handleScrollToRoot = () => {
      window.scroll({
        behavior: 'smooth',
        top: 0,
      });
    };

  useEffect(() => {
    handleScrollToRoot();
    setActiveItem('member');
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.root__container}>
        <Typography
          variant='body1'
        >
          {t('about_eGovernment_interactivity_taskforce.about_description')}
        </Typography>
        <AboutMenu
          list={AboutMenuTaskforceData}
          activeItem={activeItem}
        />
        <AboutSection
          box={memberBox}
          setActiveItem={setActiveItem}
          id={'member'}
          next={'duty'}
          previous={'member'}
        />
        <AboutSection
          box={aboutDutyBox}
          setActiveItem={setActiveItem}
          id={'duty'}
          next={'document'}
          previous={'member'}
        />
        <AboutSection
          box={aboutDocumentBox}
          setActiveItem={setActiveItem}
          id={'document'}
          next={'notification'}
          previous={'duty'}
        />
        <AboutSection
          box={aboutNotificationBox}
          setActiveItem={setActiveItem}
          id={'notification'}
          next={'performance'}
          previous={'document'}
        />
        <AboutSection
          box={aboutPerformanceGuaranteeBox}
          setActiveItem={setActiveItem}
          id={'performance'}
          next={'NIE'}
          previous={'notification'}
        />
        <AboutSection
          box={aboutNIECenterBox}
          setActiveItem={setActiveItem}
          id={'nie'}
          next={'databases'}
          previous={'performance'}
        />
        <AboutSection
          box={aboutBasicDatabasesBox}
          setActiveItem={setActiveItem}
          id={'databases'}
          next={'databases'}
          previous={'nie'}
        />
      </div>
    </div>
  );
};

export default AboutTaskforce;