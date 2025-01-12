'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations, } from 'next-intl';
import styles from './SiteBreadcrumbs.module.scss';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { BreadcrumbItem, } from '@modules/general/libraries/general-types';

export default function SiteBreadcrumbs({
  links,
  showHomeLink,
}: {
  links: BreadcrumbItem[] | null | undefined;
  showHomeLink: boolean;
}) {
  const
    t = useTranslations();

  return (
    <>
      {links && links.length > 0 && (
        <div className={styles.root}>
          <Breadcrumbs
            classes={{ separator: styles.root__separator, }}
            className={styles.root__container}
            separator={<NavigateBeforeIcon fontSize="small" />}
          >
            {showHomeLink && (
              <Link
                href="/"
                className={styles.root__container__page}
                prefetch={false}
              >
                {t('common.breadcrumb_app_name')}
              </Link>
            )}
            {links && links.map((item, index) => (
              <Link
                key={`breadcrumb${index}`}
                color="inherit"
                href={`${item.link}`}
                className={styles.root__container__page}
                prefetch={false}
              >
                {item.title}
              </Link>
            ))}
          </Breadcrumbs>
        </div>
      )}
    </>
  );
}
