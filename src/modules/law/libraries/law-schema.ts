import { Law, } from './law-types';
import { getLawUrl, } from './utils';
import { DOMAIN, } from '@modules/general/libraries/constants';

export default function makeLawSchema(
  law: Law,
  t: any,
  locale: string
) {
  try {
    if (law && law.title) {
      return {
        '@context': 'https://schema.org/',
        '@type': 'Legislation',
        name: law.title,
        'author': {
          'name': t('common.app_name'),
          'url': DOMAIN,
          '@context': 'http://schema.org',
          '@type': 'Organization',
        },
        'publisher': {
          'logo': {
            'url': `${DOMAIN}/images/logo/logo.svg`,
            '@context': 'http://schema.org',
            '@type': 'ImageObject',
          },
          'name': t('common.app_name'),
          'url': DOMAIN,
          '@context': 'http://schema.org',
          '@type': 'Organization',
        },
        dateCreated: `${law.approval_date}`,
        dateModified: `${law.approval_date}`,
        datePublished: `${law.approval_date}`,
        keywords: law.title || '',
        headline: '',
        thumbnailUrl: law.media?.path || '',
        description: law.description,
        image: {
          'height': {
            'value': 600.0,
            '@context': 'http://schema.org',
            '@type': 'QuantitativeValue',
          },
          'width': {
            'value': 600.0,
            '@context': 'http://schema.org',
            '@type': 'QuantitativeValue',
          },
          'url': law.media?.path || '',
          '@context': 'http://schema.org',
          '@type': 'ImageObject',
        },
        articleBody: law.body,
        url: getLawUrl(law, locale),
      };
    }
  } catch (error) {
  }
  return {};
}
