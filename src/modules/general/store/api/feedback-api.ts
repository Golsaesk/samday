import axios from 'axios';
import { getClientIP, } from './general-api';
import {
  API_KEY, API_DOMAIN, GENERAL_ERROR,
  HTTP_CLIENT_IP_HEADER, WEBSITE_DEFAULT_LOCALE,
  API_VERSION,
} from '@modules/general/libraries/constants';
import { parseError, } from '@/modules/general/libraries/utils';

export async function postFeedback(
  title: string,
  name: string,
  email: string,
  phone: string,
  description: string,
  captchaId: string,
  captchaValue: string,
  locale?: string
): Promise<any> {
  try {
    const url = `${API_DOMAIN}/${API_VERSION}/general/${locale || WEBSITE_DEFAULT_LOCALE}/feedback`;
    const parameters = {
      title: title,
      sender_name: name,
      email: email,
      phone: phone,
      description,
      captcha: {
        id: captchaId,
        input: captchaValue,
      },
    };

    const clientIP: string = await getClientIP();
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
