import {
  Meta,
  Error, Paging, Sorting,
} from '@modules/general/libraries/general-types';

export interface Province {
  id: number;
  title: string;
  priority: number;
  status: number;
  status_title: string;
  province_id: number;
  latitude: number;
  longitude: number;
  calling_code?: null;
  description: string;
  object_name: string;
}

export interface ProvinceCriteria {
  limit: number;
  offset: number;
  countryId: number | null;
  locale?: string;
  sorting: Sorting[];
}

export interface ProvinceListEntity {
  data: Province[];
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
  criteria: ProvinceCriteria;
}

export interface ProvinceDetailEntity {
  data: Province | null | undefined;
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

export interface ProvinceListStateItem {
  items: Province[];
  paging: Paging;
  sorting: Sorting[];
  criteria: ProvinceCriteria;
  pending: boolean;
  error: Error | null;
}

export interface ProvinceDetailStateItem {
  item: Province | null | undefined;
  id: string;
  pending: boolean;
  error: Error | null;
}

export interface ProvinceDetailState {
  [id: string]: ProvinceDetailStateItem;
}

export interface ProvinceListState {
  [key: string]: ProvinceListStateItem;
}

export interface ProvinceState {
  detail: ProvinceDetailState;
  list: ProvinceListState;
}
