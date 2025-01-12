import { MetadataRoute, } from 'next';
import { DOMAIN, } from '@/modules/general/libraries/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${DOMAIN}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${DOMAIN}/about`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];
}