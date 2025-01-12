'use client';

import Link from 'next/link';
import styles from './Logo.module.scss';
import { useTranslations, } from 'next-intl';
import { useDeviceType, } from '@modules/general/libraries/device-type';
import LogoIcon from '@modules/general/components/icons/logo';

export default function Logo({
  width = 149,
  mobileWidth,
  tabletWidth,
  height = 45,
  mobileHeight,
  tabletHeight,
  href,
  tabIndex,
}: {
  width?: number;
  mobileWidth?: number;
  tabletWidth?: number;
  height?: number;
  mobileHeight?: number;
  tabletHeight?: number;
  href?: string;
  tabIndex?: number;
}) {
  const
    deviceType = useDeviceType(),
    t = useTranslations('common'),

    getWidth = () => {
      let result = width;
      if (deviceType.isMobile) {
        if (mobileWidth) {
          result = mobileWidth;
        }
      } else if (deviceType.isTablet) {
        if (tabletWidth) {
          result = tabletWidth;
        }
      }
      return result;
    },

    getHeight = () => {
      let result = height;
      if (deviceType.isMobile) {
        if (mobileHeight) {
          result = mobileHeight;
        }
      } else if (deviceType.isTablet) {
        if (tabletHeight) {
          result = tabletHeight;
        }
      }
      return result;
    };

  return (
    <Link
      href={href || '/'}
      prefetch={false}
      target="_self"
      rel="noreferrer"
      className={styles.root}
      title={t('app_name')}
      {...tabIndex && { tabIndex: tabIndex, } }
    >
      <LogoIcon
        width={getWidth()}
        height={getHeight()}
      />
    </Link>
  );
}
