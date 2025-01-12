import { getReportPrintUrl, getReportUrl, } from '@/modules/report/libraries/utils';
import { trimUrlKeywords, } from '@modules/general/libraries/utils';
import { News, RelatedNews, } from '@modules/news/libraries/news-types';
import { getNationalDatabasePrintUrl, getNationalDatabaseUrl, } from '@/modules/national-database/libraries/utils';

export function getNewsUrl(news: News | RelatedNews | null, locale: string) {
  if (news) {
    const keywords = trimUrlKeywords(news.seo && news.seo.url_keywords ? news.seo.url_keywords : news.title);
    return `/${locale}/news/${news.id}${keywords ? `/${encodeURI(keywords)}` : ''}`;
  }
  return '';
}

export function getNewsPrintUrl(news: News | RelatedNews | null, locale: string) {
  if (news) {
    return `/${locale}/news/print/${news.id}/`;
  }
  return '';
}

export function getNewsListUrl(categoryIds: string, tags: string, locale: string) {
  let params: string[] = [];
  if (categoryIds) {
    params.push('category=' + categoryIds);
  }
  if (tags) {
    params.push('tags=' + tags);
  }

  return `/${locale}/news` + (params.length > 0 ? '?' + params.join('&') : '');
}

export function getItemUrl(pathname: string, item: News, locale: string): string {
  if (pathname.startsWith('/news')) {
    return getNewsUrl(item, locale);
  } else if (pathname.startsWith('/reports')) {
    return getReportUrl(item, locale);
  } else if (pathname.startsWith('/national-database')) {
    return getNationalDatabaseUrl(item, locale);
  }
  return '#';
}

export function getItemPrintUrl(pathname: string, item: News, locale: string): string {
  if (pathname.startsWith('/news')) {
    return getNewsPrintUrl(item, locale);
  } else if (pathname.startsWith('/reports')) {
    return getReportPrintUrl(item, locale);
  } else if (pathname.startsWith('/national-database')) {
    return getNationalDatabasePrintUrl(item, locale);
  }
  return '#';
}

export function getBreadcrumbLinks(
  isNewsPage: boolean,
  isReportsPage: boolean,
  isNationalDatabasePage: boolean,
  news: News | null,
  locale: string,
  t: any
) {
  if (!news) return [];

  if (isNewsPage) {
    return [{
      title: t('news.newslist'),
      link: `/${locale}/news`,
    },];
  }

  if (isReportsPage) {
    return [{
      title: t('reports.reports_list'),
      link: `/${locale}/reports`,
    },];
  }

  if (isNationalDatabasePage) {
    return [{
      title: t('national-database.list'),
      link: `/${locale}/national-database`,
    },];
  }

  return [];
}

export function getPageType(pathname: string) {
  return {
    isNewsPage: pathname.includes("/news"),
    isReportsPage: pathname.includes("/reports"),
    isNationalDatabasePage: pathname.includes("/national-database"),
  };
}
