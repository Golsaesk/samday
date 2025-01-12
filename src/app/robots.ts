import { MetadataRoute, } from 'next';
import { DOMAIN, } from '@/modules/general/libraries/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/dashboard/',
    },
    sitemap: `${DOMAIN}/sitemap.xml`,
  };
}