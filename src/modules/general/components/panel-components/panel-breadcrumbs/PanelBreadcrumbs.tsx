'use client';

import React from 'react';
import Link from 'next/link';
import styles from './PanelBreadcrumbs.module.scss';
import { BreadcrumbItem, } from '@/modules/general/libraries/general-types';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import { useTranslations, } from 'next-intl';

export default function PanelBreadcrumbs({
  links,
  props,
  className,
  showHomeLink = true,
}: {
  props?: any;
  className?: string;
  links: BreadcrumbItem[] | null | undefined;
  showHomeLink?: boolean;
}) {
  const t = useTranslations();

  return (
    <>
      {links && links.length > 0 && (
        <div
          {...props}
          className={`${styles.root} ${className ?? ''}`}
        >
          {showHomeLink && (
            <>
              <Link
                href="/"
                className={styles.root__container__page}
                prefetch={false}
              >
                {t('common.breadcrumb_app_name')}
              </Link>
              <KeyboardArrowLeftRoundedIcon />
            </>
          )}
          {links.map((item: BreadcrumbItem, index: number) => {
            return (
              <React.Fragment key={Math.random()}>
                <Link
                  href={item.link}
                  prefetch={false}
                >
                  {item.title}
                </Link>
                {index < links.length - 1 && (
                  <KeyboardArrowLeftRoundedIcon />
                )}
              </React.Fragment>
            );
          })}
        </div>
      )}
    </>
  );
}