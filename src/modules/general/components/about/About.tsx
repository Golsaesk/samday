'use client';

import Image from 'next/image';
import styles from './About.module.scss';
import { Typography, } from '@mui/material';
import Panel from '@/modules/general/components/panel';
import { Box, } from '@/modules/box/libraries/box-types';
import { renderHTML, } from '@/modules/general/libraries/utils';
import { Media, } from '@/modules/general/libraries/general-types';

const About = ({
  box,
  media,
}: {
  box: Box;
  media: Media;
}) => {

  return (
    <>
      {box && media && (
        <div className={styles.root}>
          <Panel
            variant='general'
            classes={{ root: styles.root__container, }}
          >
            <Typography
              variant='h1'
              className={styles.root__container__title}
            >
              {box.title}
            </Typography>
            <Image
              src={media.path || ''}
              className={styles.root__container__image}
              alt={box.title}
              width={1224}
              sizes="1400px"
              height={328}
              quality={100}
            />
            <div className={styles.root__container__content}>
              {renderHTML(box?.body || '')}
            </div>
          </Panel>
        </div>
      )}
    </>
  );
};

export default About;