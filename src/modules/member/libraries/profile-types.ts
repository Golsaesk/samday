import { LegalType, NotificationMethodType, } from './constants';
import { Country, } from '@modules/general/libraries/country-types';
import { Meta, Error, } from '@modules/general/libraries/general-types';

export interface ProfileDetailEntity {
  data: Profile | null | undefined;
  meta: Meta;
  status_code: string;
  object_type: string;
  time_taken: number;
  creation_date: string;
  url: string;
  message: string;
  error: Error | null;
  id: number;

}
export interface Profile {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  fax: string;
  address: string;
  use_in_forum: boolean;
  use_in_weblog: boolean;
  gender: string;
  birthdate?: string;
  postal_code: string;
  is_active: boolean;
  last_login: string;
  organization: string;
  occupation: string;
  registration_date: string;
  send_newsletter: boolean;
  education_field: string;
  education_degree: string;
  home_page: string;
  weblog: string;
  email_verified: boolean;
  category_id: number;
  subdomain_id: number;
  expiration_date: string;
  mobile: string;
  ssn: string;
  personnel_code: string;
  business_phone: string;
  business_fax: string;
  unique_id: string;
  last_update: string;
  father_name: string;
  birth_certificate_number: string;
  certificate_place: string;
  legal_type: LegalType;
  company_economic_code: string;
  company_national_code: string;
  company_registration_number: string;
  mobile_verification_status: string;
  mobile_verification_date: string;
  mobile_verification_ip: number;
  last_change_password: string;
  type: MemberType;
  avatar_url: string;
  full_name: string;
  country: Country;
  gender_title: string;
  education_degree_title: string;
  signature: string;
  interests: string;
  legal_type_title: string;
  notification_method?: NotificationMethod[];
  province_id: number;
  city_id: number;
  incomplete_profile: boolean;
  editable_mobile: boolean;
  object_name: string;
}
export interface NotificationMethod {
  id: NotificationMethodType;
  title: string;
}

export interface MemberType {
  values?: (string)[] | null;
}