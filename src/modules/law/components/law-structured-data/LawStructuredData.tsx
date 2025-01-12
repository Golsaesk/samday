import React from 'react';
import { useLocale, useTranslations, } from 'next-intl';
import { Law, } from '@modules/law/libraries/law-types';
import makeLawSchema from '@modules/law/libraries/law-schema';

export default function LawStructuredData({ law, }: {
  law: Law | null;
}) {
  const
    locale = useLocale(),
    t = useTranslations();

  return (
    <>
      {law && law.title && (
        <script
          key={`lawJSON-${law.id}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(makeLawSchema(law, t, locale)), }}
        />
      )}
    </>
  );
}