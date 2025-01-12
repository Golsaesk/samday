import {
  Meta, Paging, Sorting,
} from '@/modules/general/libraries/general-types';

export interface ReviewListEntity {
  status_code: number;
  object_type: string;
  time_taken: number;
  creation_date: string;
  url: string;
  message: string;
  error: any;
  data: ReviewType[];
  paging: Paging;
  sorting: Sorting[];
  meta: Meta;
  parent_id?: any;
  has_reply?: boolean;
}

export interface ReviewType {
  id: number;
  name: string;
  email: string;
  ip: string;
  description: string;
  rate: number;
  like: number;
  dislike: number;
  publish_date: string;
  creation_date?: string;
  parent_id?: any;
  has_reply?: boolean;
  object_name: string;
}

export interface ReviewDetailEntity {
  status_code: number;
  object_type: string;
  time_taken: number;
  creation_date: string;
  url: string;
  message: string;
  error: Error | null;
  data: ReviewType | null | undefined;
  meta: Meta;
}
