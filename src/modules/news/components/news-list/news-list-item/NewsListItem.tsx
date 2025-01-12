'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale, } from 'next-intl';
import { usePathname, } from 'next/navigation';
import styles from './NewsListItem.module.scss';
import { News, } from '@modules/news/libraries/news-types';
import { getItemUrl, } from '@modules/news/libraries/utils';
import { dateFormat, } from '@/modules/general/libraries/utils';
import { DOMAIN, } from '@/modules/general/libraries/constants';
import { FormatDateType, } from '@/modules/general/libraries/general-types';
import NewsListItemTag from './news-list-item-tag';

export default function NewsListItem({ item, }: { item: News }) {
  const locale = useLocale(),
    pathname = usePathname();

  return (
    <>
      {item && (
        <div className={styles.root}>
          <div className={styles.root__container}>
            <div className={styles.root__container__info}>
              <div className={styles.root__container__info__image}>
                <Link href={getItemUrl(pathname, item, locale)} passHref prefetch={false}>
                  <Image
                    src={
                      item.media && item.media.path
                        ? item.media.path
                        : `${DOMAIN}/images/news/no-image.svg`
                    }
                    alt={item?.media?.title ?? ''}
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                    quality={100}
                    fill
                  />
                </Link>
              </div>

              <div className={styles.root__container__info__content}>
                {item.up_title && (
                  <div className={styles.root__container__info__up_title}>
                    {item.up_title}:
                  </div>
                )}
                <Link href={getItemUrl(pathname, item, locale)} passHref prefetch={false}>
                  <div className={styles.root__container__info__title}>
                    {item.title}
                  </div>
                </Link>
                <p className={styles.root__container__info__body}>
                  {item.lead || ''}
                </p>
                <div className={styles.root__container__info__row}>
                  <div className={styles.root__container__info__row__more}>
                    <p className={styles.root__container__info__row__more__date}>
                      {dateFormat(item.publish_date, locale, FormatDateType.long)}
                    </p>
                  </div>
                  {item.category_list &&
                  <div className={styles.root__container__info__row__more__tags}>
                    <NewsListItemTag tagList={item.category_list} />
                  </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
