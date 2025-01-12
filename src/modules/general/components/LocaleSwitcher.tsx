import { useLocale, useTranslations, } from 'next-intl';
import Link from 'next/link';

export default function LocaleSwitcher() {
  const
    t = useTranslations(),
    locale = useLocale(),
    otherLocale = locale === 'fa' ? 'en' : 'fa';

  return (
    <Link
      prefetch={false}
      href="/"
      {...(locale !== 'fa' && { locale: otherLocale, })}
    >
      {t('common.switch_locale', { locale: otherLocale, })}
    </Link>
  );
}
