import { trimUrlKeywords, } from '@modules/general/libraries/utils';
import { News, RelatedNews, } from '@modules/news/libraries/news-types';

export function getNationalDatabaseUrl(information: News | RelatedNews | null, locale: string) {
  if (information) {
    const keywords = trimUrlKeywords(information.seo && information.seo.url_keywords ? information.seo.url_keywords : information.title);
    return `/${locale}/national-database/${information.id}${keywords ? `/${encodeURI(keywords)}` : ''}`;
  }
  return '';
}

export function getNationalDatabasePrintUrl(information: News | RelatedNews | null, locale: string) {
  if (information) {
    return `/${locale}/national-database/print/${information.id}/`;
  }
  return '';
}

export function getNationalDatabaseListUrl(categoryIds: string, tags: string, locale: string) {
  let params: string[] = [];
  if (categoryIds) {
    params.push('category=' + categoryIds);
  }
  if (tags) {
    params.push('tags=' + tags);
  }

  return `/${locale}/national-database` + (params.length > 0 ? '?' + params.join('&') : '');
}
