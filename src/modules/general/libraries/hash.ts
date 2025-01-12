import { baseXEncoder, } from './base-x';

function hash(obj: any) {
  try {
    const base58 = baseXEncoder('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz');
    return base58.encode(JSON.stringify(obj));
  } catch (error) {
  }
  return '';
}

export function toHex(str: string) {
  let result = '';
  if (str) {
    for (let i = 0; i < str.length; i += 1) {
      result += str.charCodeAt(i).toString(16);
    }
  }
  return result;
}

export default hash;
