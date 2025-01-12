/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-css-tags */
'use client';

import { DOMAIN, } from '@/modules/general/libraries/constants';

export default function NotFound() {
  return (
    <div className='errorRoot'>
      <div className='errorContainer'>
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
          className='errorImage'
          src={`${DOMAIN}/images/general/404.svg`}
          alt={'صفحه‌ی موردنظر، حذف شده یا وجود ندارد!'}
        />
        <p className='message'>
          صفحه‌ی موردنظر، حذف شده یا وجود ندارد!
        </p>
        <a
          href='/'
          className='back'
        >
          بازگشت به صفحه اصلی دبیرخانه شورای اجرایی فناوری اطلاعات
        </a>
      </div>
    </div>
  );
}
