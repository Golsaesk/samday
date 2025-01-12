import { CaptchaState, } from '@/modules/captcha/libraries/captcha-types';

export const initCaptchaState: CaptchaState = { detail: {}, };
export const resetHelper = () => initCaptchaState;