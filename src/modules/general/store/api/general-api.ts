import axios from 'axios';
import {
  API_KEY, DOMAIN, GET_CLIENT_IP_ROUTE,
} from '@modules/general/libraries/constants';

export async function getClientIP() {
  let ipAddress = '';
  try {
    const response = await axios.get<any>(DOMAIN + GET_CLIENT_IP_ROUTE, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
    });
    if (response) {
      ipAddress = response.data.ip;
    }
  } catch {
  }
  return ipAddress;
}