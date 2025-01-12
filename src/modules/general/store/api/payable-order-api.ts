import axios from 'axios';
import {
  API_KEY, API_DOMAIN, GENERAL_ERROR,
  WEBSITE_DEFAULT_LOCALE, API_VERSION,
  DEFAULT_LIMIT,
  HTTP_CLIENT_IP_HEADER,
} from '@modules/general/libraries/constants';
import { getClientIP, } from '@modules/general/store/api/general-api';
import { PayableOrderCriteria, PayableOrderListEntity, } from '@modules/general/libraries/payable-order-type';
import { parseError, } from '@/modules/general/libraries/utils';

export const getHostOrderListUrl = (criteria: PayableOrderCriteria) => {
  let url = '';
  try {
    const {
      limit,
      offset,
      sorting,
      locale,
    } = criteria;

    url = `${API_DOMAIN}/${API_VERSION}/HostingOrder/${locale || WEBSITE_DEFAULT_LOCALE}/orders/payable?${`&limit=${limit || DEFAULT_LIMIT}`
    }${(sorting && sorting.length)
      ? `&sort=${!sorting[0].ascending ? '-' : ''}${sorting[0].expression}`
      : ''
    }${`&offset=${offset || 0}`}`;

  } catch { }
  return url;
};

export async function fetchPayableOrderList(criteria: PayableOrderCriteria, accessToken: string): Promise<PayableOrderListEntity> {
  try {
    const clientIP: string = await getClientIP();
    const response = await axios.get<any>(getHostOrderListUrl(criteria), {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        [`${HTTP_CLIENT_IP_HEADER}`]: clientIP,
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.data) {
      const list = response.data;
      return list;
    }
  } catch (error: any) {
    return parseError(error);
  }
  return Promise.reject(GENERAL_ERROR);
}
