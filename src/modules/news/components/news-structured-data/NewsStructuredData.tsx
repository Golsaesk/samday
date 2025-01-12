import React from 'react';
import { useTranslations, } from 'next-intl';
import { News, } from '@modules/news/libraries/news-types';
import makeNewsSchema from '@modules/news/libraries/news-schema';

export default function NewsStructuredData({
  news, locale,
}: {
  news: News | null;
  locale: string;
}) {
  const t = useTranslations();

  return (
    <>
      {news && news.title && (
        <script
          key={`newsJSON-${news.id}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(makeNewsSchema(news, t, locale)), }}
        />
      )}
    </>
  );
}