/* eslint-disable @next/next/no-img-element */
'use client'; // Error components must be Client Components

import '@styles/css/error.css';
import { useEffect, } from 'react';
import { useLocale, } from 'use-intl';
import { DOMAIN, LocaleType, } from '@/modules/general/libraries/constants';

export default function Error({
  error, reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const
    locale = useLocale();
  useEffect(() => {
    // Log the error to an error reporting service
  }, [error, ]);

  return (
    <div className='root'>
      <div className='logo'>
        <img
          src={`${locale === LocaleType.fa ? `${DOMAIN}/images/logo/main-logo.svg` : `${DOMAIN}/images/logo/logo-en.svg`}`}
          alt={''}
        />
      </div>
      <img
        className='image'
        src={`${DOMAIN}/images/general/error500.svg`}
        alt = {`${locale === LocaleType.fa ? `مشکلی در سرور وجود دارد.` : 'Internal Server Error'}`}
      />
      <h1 className='message'>
        {`${locale === LocaleType.fa ? `مشکلی در سرور وجود دارد.` : 'Internal Server Error'}`}
      </h1>
      <h6 className='description'>
        {`${locale === LocaleType.fa ? `به نظر میرسد سرور با یک خطای داخلی یا پیکربندی نادرست مواجه شده است.` :
          `The web server doesn't support the HTTP protocol version requested by the client's browser`}`}
      </h6>
      <h6 className='description'>
        {`${locale === LocaleType.fa ? `لطفا دقایقی بعد دوباره امتحان کنید.` : 'Please try again after a few minutes.'}`}
      </h6>
      <button
        className='button'
        onClick={
          () => reset()
        }
      >
        {`${locale === LocaleType.fa ? `بازخوانی صفحه` : 'Refresh'}`}
      </button>
    </div>
  );
}