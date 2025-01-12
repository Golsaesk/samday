
import Image from 'next/image';
import { useLocale, } from 'next-intl';
import { Typography, } from '@mui/material';
import { useEffect, useState, } from 'react';
import Panel from '@/modules/general/components/panel';
import styles from './HeaderMenuCollapseFooter.module.scss';
import getLayoutData from '@/modules/layout/libraries/utils';
import { DOMAIN, LocaleType, } from '@/modules/general/libraries/constants';
import { Layout, MenuOrInfoItem, } from '@/modules/layout/libraries/layout-types';
import GeneralCopyright from '@/modules/layout/components/general-layout/general/general-copyright';
import GeneralSocialMedia from '@/modules/layout/components/general-layout/general/general-social-media';

const HeaderMenuCollapseFooter = () => {
  const
    locale = useLocale(),
    [data, setData,] = useState<Layout>();

  useEffect(() => {
    const response = getLayoutData(locale);
    setData(response);
  }, [locale,]);

  return (
    <Panel
      variant='general'
      classes={{ root: styles.root, }}
    >
      <div className={styles.root__top}>
        <Image
          src={`/images/logo/logo-blue.svg`}
          alt={''}
          width={48}
          height={44}
        />
        {data && data.info && (
          <div className={styles.root__top__content}>
            {data.info.data.slice(1, 3).map((item: MenuOrInfoItem, index: number) => (
              <Typography
                key={`info-${index}`}
                variant='body2'
                component={'p'}
              >
                {item.value}
              </Typography>
            ))}
          </div>
        )}
      </div>
      <div className={styles.root__bottom}>
        <Image
          src={`${locale === LocaleType.fa ? `${DOMAIN}/images/logo/logotype.svg` : `${DOMAIN}/images/logo/logotype-en.svg`}`}
          alt={''}
          width={303}
          height={24}
          className={styles.root__bottom__logo}
        />
        <GeneralCopyright
          className = {styles.root__bottom__copyright}
        />
        <GeneralSocialMedia />
      </div>
    </Panel>
  );
};

export default HeaderMenuCollapseFooter;