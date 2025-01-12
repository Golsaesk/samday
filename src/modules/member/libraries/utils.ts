import { LoginType, } from './constants';

export const getDefaultLoginType = (): LoginType => {
  try {
    const temp = process.env.LOGIN_TYPES || 'MOBILE';
    const values = temp.split(',');
    return values[0].toUpperCase() === 'MOBILE' ? LoginType.mobile : LoginType.email;
  } catch {

  }
  return LoginType.mobile;
};

export const getLoginTypes = (): LoginType[] => {
  let result: LoginType[] = [];
  try {
    const temp = process.env.LOGIN_TYPES || 'MOBILE';
    const values = temp.split(',');
    values.forEach((t: string) => {
      result.push(t.toUpperCase() === 'MOBILE' ? LoginType.mobile : LoginType.email);
    });
  } catch {
  }
  return result;
};

export const isLoginTypeEnable = (loginType: LoginType): boolean => {
  const loginTypes = getLoginTypes();
  return loginTypes.includes(loginType);
};
