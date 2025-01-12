import React from 'react';
import Link from 'next/link';
import { useTranslations, } from 'next-intl';
import styles from './Breadcrumbs.module.scss';
import Panel from '@/modules/general/components/panel';
import { BreadcrumbItem, } from '@/modules/general/libraries/general-types';

export default function Breadcrumbs({
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
    <div
      {...props}
      className={`${styles.root} ${className ?? ''}`}
    >
      {links && links.length > 0 && (
        <Panel
          variant='general'
          classes={{ root: styles.root__container, }}
        >
          {showHomeLink && (
            <>
              <Link
                href="/"
                className={styles.root__container__home}
                prefetch={false}
              >
                {t('common.breadcrumb_app_name')}
              </Link>
              <div className={styles.root__container__divider}>
                {`/`}
              </div>
            </>
          )}
          {links.map((item: BreadcrumbItem, index: number) => {
            return (
              <React.Fragment key={Math.random()}>
                <Link
                  href={item.link}
                  prefetch={false}
                  className={styles.root__container__link}
                >
                  {item.title}
                </Link>
                {index < links.length - 1 && (
                  <div className={styles.root__container__divider}>
                    {`/`}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </Panel>
      )}
    </div>
  );
}