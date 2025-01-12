import { News, } from './news-types';
import { getNewsUrl, } from './utils';
import { DOMAIN, } from '@modules/general/libraries/constants';

export default function makeNewsSchema(
  news: News,
  t: any,
  locale: string
) {
  try {
    if (news && news.title) {
      return {
        '@context': 'https://schema.org/',
        '@type': 'Article',
        name: news.title,
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
        dateCreated: `${news.publish_date}`,
        dateModified: `${news.publish_date}`,
        datePublished: `${news.publish_date}`,
        keywords: news.seo.keywords || '',
        headline: '',
        thumbnailUrl: news.media.path || '',
        description: news.lead,
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
          'url': news.media.path || '',
          '@context': 'http://schema.org',
          '@type': 'ImageObject',
        },
        articleBody: news.body,
        url: getNewsUrl(news, locale),
      };
    }
  } catch (error) {
  }
  return {};
}
