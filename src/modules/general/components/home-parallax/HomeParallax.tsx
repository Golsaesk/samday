'use client';

import Image from 'next/image';
import { Parallax, } from 'react-parallax';
import { useMediaQuery, } from '@mui/material';
import styles from './HomeParallax.module.scss';
import Panel from '@/modules/general/components/panel';
import { Box, } from '@/modules/box/libraries/box-types';
import { Media, } from '@/modules/general/libraries/general-types';
import { useDeviceType, } from '@/modules/general/libraries/device-type';
import HomeParallaxContent from './home-parallax-content/HomeParallaxContent';

export default function HomeParallax({
  box,
  image,
}: {
  box: Box | null;
  image: Media | null;
}) {
  const
    deviceType = useDeviceType(),
    isUnder750 = useMediaQuery('(max-width:750px)', { noSsr: false, }),

    getParallaxStrength = () => {
      let strength = 350;

      if (deviceType.isSmallScreen) {
        strength = 200;
      }
      if (deviceType.isTablet) {
        strength = 100;
      }
      if (isUnder750) {
        strength = 0;
      }
      if (deviceType.isMobile) {
        strength = 0;
      }
      return strength;
    };

  return (
    <>
      {box && image && image.path && (
        <>
          {!isUnder750 ? (
            <Parallax
              bgImage={image?.path}
              strength={getParallaxStrength()}
              contentClassName={styles.root__desktop}
              bgClassName={styles.background}
            >
              <div className={styles.root__desktop__container}>
                <div className={styles.root__desktop__container__box}>
                  <HomeParallaxContent box={box} />
                </div>
              </div>
            </Parallax>
          ) : (
            <div className={styles.root__mobile}>
              <Panel
                variant='general'
              >
                <div className={styles.root__mobile__wrapper}>
                  <div className={styles.root__mobile__wrapper__image}>
                    <Image
                      src={image.path}
                      alt={''}
                      style={{
                        objectFit: 'cover',
                        objectPosition: "center",
                      }}
                      fill
                    />
                  </div>
                  <HomeParallaxContent box={box} />
                </div>
              </Panel>
            </div>
          )}
        </>
      )}
    </>
  );
}
