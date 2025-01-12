export const CONFIRM_EMAIL_URL = '/member/verify-email';
export const RESET_PASSWORD_URL = '/member/reset-password';

export enum LoginType {
  mobile = 0,
  email = 1,
  updateProfile = 2
}

export enum LegalType {
  personal = 0,
  company = 1,
  governmental = 2
}

export enum NotificationMethodType {
  smsHostingOrder = 1,
  smsServiceStore = 2,
  smsTicket = 4,
  smsServerManagement = 8
}