import axios from 'axios';
import { getClientIP, } from './general-api';
import { parseError, } from '@/modules/general/libraries/utils';
import {
  API_KEY, API_DOMAIN, GENERAL_ERROR,
  HTTP_CLIENT_IP_HEADER, WEBSITE_DEFAULT_LOCALE,
  API_VERSION,
} from '@modules/general/libraries/constants';

export async function postNewsletter(
  email: string,
  captchaId: string,
  captchaValue: string,
  locale?: string
): Promise<any> {
  try {
    const url = `${API_DOMAIN}/${API_VERSION}/newsletter/${locale || WEBSITE_DEFAULT_LOCALE}/newsletters/subscribe`;
    const clientIP: string = await getClientIP();
    const parameters = {
      email: email,
      ip: clientIP,
      captcha: {
        id: captchaId,
        input: captchaValue,
      },
    };
    const response = await axios.post<any>(url, JSON.stringify(parameters), {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        [`${HTTP_CLIENT_IP_HEADER}`]: clientIP,
      },
    });

    if (response) {
      const detail = response.data;
      return detail;
    }

  } catch (error: any) {
    return parseError(error);
  }
  return Promise.reject(GENERAL_ERROR);
}