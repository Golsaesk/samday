import {
  Media, Seo,
  Meta, Error,
  Paging, Sorting,
} from '@modules/general/libraries/general-types';

export interface Category {
  id: number;
  module_id: number;
  parent_id: number;
  priority: number;
  count: number;
  date: string;
  member_id: number;
  level: number;
  media_id: number;
  subdomain_id: number;
  thumbnail_media_id: number;
  disable_in_webservice: boolean;
  title: string;
  description: string;
  icon_css: string;
  media: Media;
  thumbnail_media: Media;
  seo: Seo;
  object_name: string;
}

export interface CategoryCriteria {
  limit: number;
  offset: number;
  moduleId: number;
  parentId: number;
  disableInWebservice: boolean;
  sorting: Sorting[];
  keywords: string | null | undefined;
  subdomainId: number;
  locale: string | null | undefined;
}

export interface CategoryListEntity {
  data: Category[];
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
  criteria: CategoryCriteria;
}

export interface CategoryDetailEntity {
  data: Category | null | undefined;
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

export interface GetCategoryListAction {
  type: string;
  payload: GetCategoryListPayload;
}

export interface GetCategoryListPayload {
  criteria: CategoryCriteria;
}

export interface PutCategoryListPayload {
  categoryListEntity: CategoryListEntity;
  criteria: CategoryCriteria;
}
export interface PutCategoryListAction {
  type: string;
  payload: PutCategoryListPayload;
}

export interface CategoryStateListItem {
  items: Category[];
  paging: Paging;
  sorting: Sorting[];
  criteria: CategoryCriteria;
  pending: boolean;
  error: Error | null;
}

export interface CategoryStateList {
  [key: string]: CategoryStateListItem;
}

export interface PendingCategoryListPayload {
  pending: boolean;
  criteria: CategoryCriteria;
}

export interface PendingCategoryListAction {
  type: string;
  payload: PendingCategoryListPayload;
}

export interface ErrorCategoryListPayload {
  error: Error | null;
  criteria: CategoryCriteria;
}

export interface ErrorCategoryListAction {
  type: string;
  payload: ErrorCategoryListPayload;
}

export interface GetCategoryDetailAction {
  type: string;
  payload: GetCategoryDetailPayload;
}

export interface GetCategoryDetailPayload {
  id: number;
}

export interface PutCategoryDetailPayload {
  categoryDetail: CategoryDetailEntity;
  id: number;
}
export interface PutCategoryDetailAction {
  type: string;
  payload: PutCategoryDetailPayload;
}

export interface CategoryStateDetailItem {
  item: Category | null | undefined;
  id: number;
  pending: boolean;
  error: Error | null;
}

export interface CategoryStateDetail {
  [id: number]: CategoryStateDetailItem;
}

export interface PendingCategoryDetailPayload {
  pending: boolean;
  id: number;
}

export interface PendingCategoryDetailAction {
  type: string;
  payload: PendingCategoryDetailPayload;
}

export interface ErrorCategoryDetailPayload {
  error: Error | null;
  id: number;
}

export interface ErrorCategoryDetailAction {
  type: string;
  payload: ErrorCategoryDetailPayload;
}

export interface CategoryState {
  list: CategoryStateList;
  detail: CategoryStateDetail;
}