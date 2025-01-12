'use server';

import { cookies, } from 'next/headers';
import { THEME_COOKIE_NAME, } from '@/modules/general/libraries/constants';

export async function setThemeCookie(formData: FormData) {
  if (formData && formData.get('mode')) {
    try {
      const mode = `${formData.get('mode')}`;
      const year = 365 * 24 * 60 * 60 * 1000;
      if (cookies()) {
        cookies().set(
          THEME_COOKIE_NAME,
          mode, {
            maxAge: year,
            secure: true,
            httpOnly: true,
          });
      }
    }
    catch {

    }
  }
}