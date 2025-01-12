import { trimUrlKeywords, } from '@modules/general/libraries/utils';
import { News, RelatedNews, } from '@modules/news/libraries/news-types';

export function getReportUrl(report: News | RelatedNews | null, locale: string) {
  if (report) {
    const keywords = trimUrlKeywords(report.seo && report.seo.url_keywords ? report.seo.url_keywords : report.title);
    return `/${locale}/reports/${report.id}${keywords ? `/${encodeURI(keywords)}` : ''}`;
  }
  return '';
}

export function getReportPrintUrl(report: News | RelatedNews | null, locale: string) {
  if (report) {
    return `/${locale}/reports/print/${report.id}/`;
  }
  return '';
}

export function getReportsListUrl(categoryIds: string, tags: string, locale: string) {
  let params: string[] = [];
  if (categoryIds) {
    params.push('category=' + categoryIds);
  }
  if (tags) {
    params.push('tags=' + tags);
  }

  return `/${locale}/reports` + (params.length > 0 ? '?' + params.join('&') : '');
}
