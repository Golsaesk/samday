import {
  Meta, Paging, Sorting, Error, Album,
} from '@modules/general/libraries/general-types';

export interface Box {
  id: number;
  title: string;
  body: string;
  lcid: number;
  album?: Album;
  direction: string;
  subdomain_id: number;
  last_update: string;
  object_name: string;
}

export interface BoxListEntity {
  status_code: string;
  object_type: string;
  time_taken: number;
  creation_date: string;
  url: string;
  message: string;
  error?: null;
  data: Box[];
  paging: Paging;
  sorting: Sorting[];
  meta: Meta;
}

export interface BoxDetailEntity {
  data: Box | null | undefined;
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

export interface BoxCriteria {
  limit: number;
  offset: number;
  pageId: string | null;
  sorting: Sorting[];
  searchKeywords: string | null | undefined;
  locale?: string;
}

export interface GetBoxListAction {
  type: string;
  payload: GetBoxListPayload;
}

export interface GetBoxListPayload {
  criteria: BoxCriteria;
}

export interface PutBoxListPayload {
  boxListEntity: BoxListEntity;
  criteria: BoxCriteria;
}
export interface PutBoxListAction {
  type: string;
  payload: PutBoxListPayload;
}

export interface BoxStateListItem {
  items: Box[];
  paging: Paging;
  sorting: Sorting[];
  criteria: BoxCriteria;
  pending: boolean;
  error: Error | null;
}

export interface BoxStateList {
  [key: string]: BoxStateListItem;
}

export interface PendingBoxListPayload {
  pending: boolean;
  criteria: BoxCriteria;
}

export interface PendingBoxListAction {
  type: string;
  payload: PendingBoxListPayload;
}

export interface ErrorBoxListPayload {
  error: Error | null;
  criteria: BoxCriteria;
}

export interface ErrorBoxListAction {
  type: string;
  payload: ErrorBoxListPayload;
}

export interface GetBoxDetailAction {
  type: string;
  payload: GetBoxDetailPayload;
}

export interface GetBoxDetailPayload {
  id: number;
}

export interface PutBoxDetailPayload {
  boxDetail: BoxDetailEntity;
  id: number;
}
export interface PutBoxDetailAction {
  type: string;
  payload: PutBoxDetailPayload;
}

export interface BoxStateDetailItem {
  item: Box | null | undefined;
  id: number;
  pending: boolean;
  error: Error | null;
}

export interface BoxStateDetail {
  [id: number]: BoxStateDetailItem;
}

export interface PendingBoxDetailPayload {
  pending: boolean;
  id: number;
}

export interface PendingBoxDetailAction {
  type: string;
  payload: PendingBoxDetailPayload;
}

export interface ErrorBoxDetailPayload {
  error: Error | null;
  id: number;
}

export interface ErrorBoxDetailAction {
  type: string;
  payload: ErrorBoxDetailPayload;
}

export interface BoxState {
  list: BoxStateList;
  detail: BoxStateDetail;
}