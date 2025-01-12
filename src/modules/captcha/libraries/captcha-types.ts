import { Meta, Error, } from '@modules/general/libraries/general-types';
import { PaletteMode, } from '@mui/material';

export interface Captcha {
  id: string;
  base64_image: string;
  sound?: null;
}

export interface CaptchaDetailEntity {
  data: Captcha | null | undefined;
  meta: Meta;
  status_code: string;
  object_type: string;
  time_taken: number;
  creation_date: string;
  url: string;
  message: string;
  error: Error | null;
  id: string;
}

export interface GetCaptchaDetailAction {
  type: string;
  payload: GetCaptchaDetailPayload;
}

export interface GetCaptchaDetailPayload {
  id: string;
  mode: PaletteMode;
}

export interface PutCaptchaDetailPayload {
  captchaDetail: CaptchaDetailEntity;
  id: string;
}
export interface PutCaptchaDetailAction {
  type: string;
  payload: PutCaptchaDetailPayload;
}

export interface CaptchaStateDetailItem {
  item: Captcha | null | undefined;
  id: string;
  pending: boolean;
  error: Error | null;
}

export interface CaptchaStateDetail {
  [id: string]: CaptchaStateDetailItem;
}

export interface PendingCaptchaDetailPayload {
  pending: boolean;
  id: string;
}

export interface PendingCaptchaDetailAction {
  type: string;
  payload: PendingCaptchaDetailPayload;
}

export interface ErrorCaptchaDetailPayload {
  error: Error | null;
  id: string;
}

export interface ErrorCaptchaDetailAction {
  type: string;
  payload: ErrorCaptchaDetailPayload;
}

export interface CaptchaState {
  detail: CaptchaStateDetail;
}
