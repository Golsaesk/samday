import { IntlErrorCode, } from 'next-intl';
import { getRequestConfig, } from 'next-intl/server';

const locales = ['fa', 'en',];

export default getRequestConfig(
  async ({ locale, }) => {
    let currentLocale = locale;
    try {
      if (!locales.includes(locale as any)) {
        currentLocale = 'fa';
      }

      return (
        {
          timeZone: 'Asia/Tehran',
          messages: (await import(`../messages/${currentLocale}.json`)).default,
          onError() {
          },
          getMessageFallback({
            namespace, key, error,
          }) {
            const path = [namespace, key,].filter((part) => part != null).join('.');
            let result: string = '';

            if (error.code === IntlErrorCode.MISSING_MESSAGE) {
              result = `${path}is not yet translated`;
            } else {
              result = `Dear developer, please fix this message: ${path}`;
            }
            return result;
          },
        }
      );
    } catch {
    }
    return {};
  }
);
