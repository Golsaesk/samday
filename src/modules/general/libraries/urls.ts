
export const DASHBOARD_PAGE = '/dashboard/home';
export const HOME_PAGE = '/';
export const PROFILE_PAGE = '/dashboard/member/profile-edit';
export const RECIPIENT_LIST_PAGE = '/dashboard/recipient/recipient-list';
export const ANNOUNCEMENT_LIST_PAGE = '/dashboard/announcement-list';
export const REVIEW_LIST_PAGE = '/dashboard/review/review-list';
export const MEMBER_CONFIRM_EMAIL = '/member/confirm-your-email';
export const TERM_OF_USE = '/term-of-use';
export const SIGN_IN_PAGE = '/member/signin';
export const SIGN_IN_WITH_EMAIL_PAGE = '/member/signin-with-email';
export const SIGN_OUT_PAGE = '/member/signout';
export const SIGN_UP_PAGE = '/member/signup';
export const HOST_WINDOWS = '/host/windows';
export const HOST_LINUX = '/host/linux';
export const HOST_WORDPRESS = '/host/wordpress';
export const HOST_VIP = '/host/vip';
export const HOST_DOWNLOAD = '/host/download';
export const SSL_ORDER = '/host/ssl/form';
export const RESEND_CONFIRM_EMAIL_PAGE = '/member/send-verification-email';

export const DASHBOARD_HOME = '/dashboard/home';

export const DASHBOARD_SSL_LIST = '/dashboard/ssl/list';
export const DASHBOARD_SSL_DETAIL = '/dashboard/ssl/detail';
export const DASHBOARD_SSL_PROFORMA = '/dashboard/invoice/proforma/ssl';

export const DASHBOARD_CREDIT_LIST = '/dashboard/credit/list';
export const DASHBOARD_CREDIT_DETAIL = '/dashboard/credit/detail';
export const DASHBOARD_CREDIT_INCREASE = '/dashboard/credit/increase';
export const DASHBOARD_CREDIT_INCREASE_OFFLINE = '/dashboard/credit/increase/offline';
export const DASHBOARD_CREDIT_PAYMENT = '/dashboard/credit/payment/pay';
export const DASHBOARD_CREDIT_FINALIZE = '/dashboard/credit/payment/finalize';

export const DASHBOARD_TICKET_LIST = '/dashboard/ticket/list';
export const DASHBOARD_TICKET_DETAIL = '/dashboard/ticket/detail';
export const DASHBOARD_TICKET_NEW = '/dashboard/ticket/new';

export const DASHBOARD_INVOICE_LIST = '/dashboard/invoice/list';
export const DASHBOARD_INVOICE_DETAIL = '/dashboard/invoice/detail';

export const DASHBOARD_HOST_LIST = '/dashboard/host/list';
export const DASHBOARD_HOST_DETAIL = '/dashboard/host/detail';
export const DASHBOARD_HOST_UPGRADE_DETAIL = '/dashboard/host/upgrade/detail';
export const DASHBOARD_HOST_UPGRADE = '/dashboard/host/upgrade';
export const DASHBOARD_HOST_PASSWORD_REQUEST = '/dashboard/host/password-request';
export const DASHBOARD_HOST_REPORT = '/dashboard/host/report';
export const DASHBOARD_HOST_PROFORMA = '/dashboard/invoice/proforma/host';

export const DASHBOARD_DOMAIN_LIST = '/dashboard/domain/list';
export const DASHBOARD_DOMAIN_DETAIL = '/dashboard/domain/detail';
export const DASHBOARD_DOMAIN_PASSWORD_REQUEST = '/dashboard/domain/password-request';
export const DASHBOARD_DOMAIN_PROFORMA = '/dashboard/invoice/proforma/domain';

export const DASHBOARD_PLESK_LIST = '/dashboard/plesk/list';
export const DASHBOARD_PLESK_DETAIL = '/dashboard/plesk/detail';
export const DASHBOARD_PLESK_PROFORMA = '/dashboard/invoice/proforma/plesk';
export const DASHBOARD_PLESK_PASSWORD_REQUEST = '/dashboard/plesk/password-request';

export const DASHBOARD_VM_LIST = '/dashboard/vm/list';
export const DASHBOARD_VM_DETAIL = '/dashboard/vm/detail';
export const DASHBOARD_VM_PROFORMA = '/dashboard/invoice/proforma/vm';

export const DASHBOARD_SERVICESTORE_DETAIL = '/dashboard/servicestore/detail';

export const getModuleDetailUrl = (module: string, id: number) => {
  let url = '';
  if (module && id) {
    url = `/dashboard/${module}/detail/${id}`;
  }
  return url;
};

export const getModuleListUrl = (module: string) => {
  let url = '';
  if (module) {
    url = `/dashboard/${module}/list`;
  }
  return url;
};
