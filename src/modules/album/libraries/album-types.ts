import {
  Media, Meta, Error, Paging, Sorting,
} from '@modules/general/libraries/general-types';

export interface Album {
  id: number;
  date: string;
  status: string;
  click_count: number;
  publish_date: string;
  title: string;
  description: string;
  keywords: string;
  photographer: string;
  media_list?: (Media)[] | null;
  object_name: string;
  back_cover_media?: Media | null;
  first_media?: Media;
  front_cover_media: Media | null;
}

export interface AlbumCriteria {
  limit: number;
  offset: number;
  categoryId: string | null;
  sorting: Sorting[];
  locale?: string;
}

export interface AlbumListEntity {
  data: Album[];
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
  criteria: AlbumCriteria;
}

export interface AlbumDetailEntity {
  data: Album | null | undefined;
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

export interface GetAlbumListAction {
  type: string;
  payload: GetAlbumListPayload;
}

export interface GetAlbumListPayload {
  criteria: AlbumCriteria;
}

export interface PutAlbumListPayload {
  albumListEntity: AlbumListEntity;
  criteria: AlbumCriteria;
}
export interface PutAlbumListAction {
  type: string;
  payload: PutAlbumListPayload;
}

export interface AlbumStateListItem {
  items: Album[];
  paging: Paging;
  sorting: Sorting[];
  criteria: AlbumCriteria;
  pending: boolean;
  error: Error | null;
}

export interface AlbumStateList {
  [key: string]: AlbumStateListItem;
}

export interface PendingAlbumListPayload {
  pending: boolean;
  criteria: AlbumCriteria;
}

export interface PendingAlbumListAction {
  type: string;
  payload: PendingAlbumListPayload;
}

export interface ErrorAlbumListPayload {
  error: Error | null;
  criteria: AlbumCriteria;
}

export interface ErrorAlbumListAction {
  type: string;
  payload: ErrorAlbumListPayload;
}

export interface GetAlbumDetailAction {
  type: string;
  payload: GetAlbumDetailPayload;
}

export interface GetAlbumDetailPayload {
  id: number;
}

export interface PutAlbumDetailPayload {
  albumDetail: AlbumDetailEntity;
  id: number;
}
export interface PutAlbumDetailAction {
  type: string;
  payload: PutAlbumDetailPayload;
}

export interface AlbumStateDetailItem {
  item: Album | null | undefined;
  id: number;
  pending: boolean;
  error: Error | null;
}

export interface AlbumStateDetail {
  [id: number]: AlbumStateDetailItem;
}

export interface PendingAlbumDetailPayload {
  pending: boolean;
  id: number;
}

export interface PendingAlbumDetailAction {
  type: string;
  payload: PendingAlbumDetailPayload;
}

export interface ErrorAlbumDetailPayload {
  error: Error | null;
  id: number;
}

export interface ErrorAlbumDetailAction {
  type: string;
  payload: ErrorAlbumDetailPayload;
}

export interface AlbumState {
  list: AlbumStateList;
  detail: AlbumStateDetail;
}
