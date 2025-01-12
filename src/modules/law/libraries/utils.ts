import { Law, } from './law-types';
import { trimUrlKeywords, } from '@/modules/general/libraries/utils';

export function getLawUrl(law: Law | null, locale: string) {
  if (law) {
    const keywords = trimUrlKeywords(law.title);
    return `/${locale}/law/${law.id}${keywords ? `/${encodeURI(keywords)}` : ''}`;
  }
  return '';
}