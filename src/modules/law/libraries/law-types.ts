import {
  Meta, Error, Paging, Sorting, Media,
} from '@modules/general/libraries/general-types';
import { Organization, } from './organization-types';
import { Category, } from '@/modules/category/libraries/category-types';

export interface Law {
  id: number;
  title: string;
  body: string;
  description: string;
  keyword: string;
  number: string;
  issuer: string;
  file: string;
  subdomain_id: number;
  approval_date: string;
  effective_date?: string;
  notification_date?: string;
  brief_description: string;
  approval_year: number;
  validity_date?: string;
  issuing_date?: string;
  meeting_number: string;
  issuing_authority: string;
  issue_id?: number;
  issue_title?: string;
  lcid: number;
  category: Category;
  organization: Organization;
  media?: Media;
  attachment_list?: (LawAttachment)[] | null;
  object_name: string;
}

export interface LawCriteria {
  limit: number;
  offset: number;
  organizationId?: number;
  approvalYearFrom?: number;
  searchText?: string;
  approvalYearTo?: number;
  categoryIds?: string | null;
  sorting: Sorting[];
  locale: string;
}

export interface LawListEntity {
  data: Law[];
  paging: Paging;
  sorting: Sorting[];
  meta: Meta;
  status_code: string;
  object_type: string;
  time_taken: number;
  creation_date: string;
  url: string;
  message: string;
  error: Error | null;
  criteria: LawCriteria;
}

export interface LawDetailEntity {
  data: Law | null | undefined;
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

export interface LawAttachment {
  id: number;
  title: string;
  description: string;
  lcid: number;
  date: string;
  file_list?: (LawAttachmentFile)[] | null;
  object_name: string;
}
export interface LawAttachmentFile {
  id: number;
  title: string;
  description: string;
  lcid: number;
  path: string;
  object_name: string;
}

//------------------------------
export interface LawYearListEntity {
  status_code: number;
  object_type: string;
  time_taken: number;
  creation_date: string;
  url: string;
  message: string;
  error: any;
  data: LawYear[];
  paging: Paging;
  sorting: Sorting[];
  meta: Meta;
}

export interface LawYear {
  approval_year: number;
  count: number;
}

export interface LawYearCriteria {
  approvalYear?: number;
  count?: number;
  categoryIds?: string;
  sorting: Sorting[];
  locale: string;
}