/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-css-tags */
'use client';

import { useEffect, } from 'react';
import { DOMAIN, } from '@/modules/general/libraries/constants';

export default function GlobalError({
  error, reset,
}: {
  error: Error;
  reset: () => void;
}) {

  useEffect(() => {
    // Log the error to an error reporting service
  }, [error,]);

  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="stylesheet" type="text/css" href="/styles/css/error.css" />
        <title>درخواست شما با خطا مواجه شد! - دبیرخانه شورای اجرایی فناوری اطلاعات</title>
      </head>
      <body>
        <div className='root'>
          <div className='container'>
            <a
              href='/'
              className='logo'
            >
              <img
                src={`${DOMAIN}/images/logo/logo.svg`}
                width={140}
                height={48}
                alt={'دبیرخانه شورای اجرایی فناوری اطلاعات'}
              />
            </a>
            <img
              className='image'
              src={`${DOMAIN}/images/general/500.svg`}
              alt={'مشکلی در سرور وجود دارد.'}
            />
            <p className='message'>
              {`مشکلی در سرور وجود دارد.`}
            </p>
            <button
              className='button'
              onClick={
                () => reset()
              }
            >
              بازخوانی صفحه
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}