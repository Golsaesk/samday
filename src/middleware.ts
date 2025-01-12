import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['fa', 'en',],
  defaultLocale: 'fa',
  localePrefix: 'as-needed',
  localeDetection: false,
});

export const config = { matcher: ['/((?!api|fonts|styles|static|images|_next|_vercel|favicon.ico|robots.txt|sitemap.xml).*)',], };