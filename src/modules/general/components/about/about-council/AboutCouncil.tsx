'use client';

import { Typography, } from '@mui/material';
import { useTranslations, } from 'next-intl';
import { useEffect, useState, } from 'react';
import styles from './AboutCouncil.module.scss';
import { Box, } from '@/modules/box/libraries/box-types';
import AboutMenu from '@modules/general/components/about/about-menu';
import AboutSection from '@modules/general/components/about/about-section';
import AboutMenuCouncilData from '@modules/general/components/about/about-menu/about-menu-council-data';

const AboutCouncil = ({
  aboutObjectiveBox,
  memberBox,
  aboutDutyBox,
  aboutEnforcementBox,
  aboutSecretaryBox,
  aboutMeetingBox,
  aboutSecretaryMembersBox,
}: {
  aboutObjectiveBox: Box | null;
  memberBox: Box | null;
  aboutDutyBox: Box | null;
  aboutEnforcementBox: Box | null;
  aboutSecretaryBox: Box | null;
  aboutMeetingBox: Box | null;
  aboutSecretaryMembersBox: Box | null;
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
    setActiveItem('objective');
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.root__container}>
        <Typography
          variant='body1'
          className={styles.root__description}
        >
          {t('about-executive-council.about_description')}
        </Typography>
        <AboutMenu
          list={AboutMenuCouncilData}
          activeItem={activeItem}
          isCouncil
        />
        <AboutSection
          box={aboutObjectiveBox}
          setActiveItem={setActiveItem}
          id={'objective'}
          next={'duty'}
          previous={'objective'}
        />
        <AboutSection
          box={aboutDutyBox}
          setActiveItem={setActiveItem}
          id={'duty'}
          next={'member'}
          previous={'objective'}
        />
        <AboutSection
          box={memberBox}
          setActiveItem={setActiveItem}
          id={'member'}
          next={'enforcement'}
          previous={'duty'}
          isCouncil
        />
        <AboutSection
          box={aboutEnforcementBox}
          setActiveItem={setActiveItem}
          id={'enforcement'}
          next={'secretary'}
          previous={'member'}
        />
        <AboutSection
          box={aboutSecretaryBox}
          setActiveItem={setActiveItem}
          id={'secretary'}
          next={'meeting'}
          previous={'enforcement'}
        />
        <AboutSection
          box={aboutMeetingBox}
          setActiveItem={setActiveItem}
          id={'meeting'}
          next={'secretaryMembers'}
          previous={'secretary'}
        />
        <AboutSection
          box={aboutSecretaryMembersBox}
          setActiveItem={setActiveItem}
          id={'secretaryMembers'}
          next={'secretaryMembers'}
          previous={'meeting'}
          isSecretaryMembers
        />
      </div>
    </div>
  );
};

export default AboutCouncil;