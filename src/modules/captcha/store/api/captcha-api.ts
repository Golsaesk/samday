import axios from 'axios';
import { PaletteMode, } from '@mui/material';
import { getClientIP, } from '@modules/general/store/api/general-api';
import { CaptchaDetailEntity, } from '@modules/captcha/libraries/captcha-types';
import {
  API_KEY, API_DOMAIN, GENERAL_ERROR,
  HTTP_CLIENT_IP_HEADER, WEBSITE_DEFAULT_LOCALE, API_VERSION,
} from '@modules/general/libraries/constants';
import { parseError, } from '@/modules/general/libraries/utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchCaptchaDetail(id: string, mode: PaletteMode): Promise<CaptchaDetailEntity> {
  try {
    const url = `${API_DOMAIN}/${API_VERSION}/general/${WEBSITE_DEFAULT_LOCALE}/captcha/${id}`;

    const captchaParams = {
      code_length: 4,
      image_template: 1,
      Image_Options: {
        width: 100,
        height: 50,
        font_wrap: 1,
        background_noise: 1,
        line_noise: 10,
        distortion_factor: 0,
        background_color_hex: mode === 'dark' ? '#222' : '#fff',
        font_color_hex: mode === 'dark' ? '#fff' : '#000',
        font_family_names: [
          'tahoma',
        ],
      },
      letter_drawing_case_mode: 1,
      is_case_sensitive: false,
    };
    const clientIP: string = await getClientIP();
    const response = await axios.post<any>(url, JSON.stringify(captchaParams), {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        [`${HTTP_CLIENT_IP_HEADER}`]: clientIP,
      },
    });
    if (response.data) {
      const result = response.data;
      return result;
    }
  } catch (error: any) {
    return parseError(error);
  }
  return Promise.reject(GENERAL_ERROR);
}
