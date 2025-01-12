import {
  Meta,
  Error, Paging, Sorting,
} from '@modules/general/libraries/general-types';

export interface City {
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
  province: string;
}

export interface CityCriteria {
  limit: number;
  offset: number;
  provinceId: number | null;
  locale?: string;
  sorting: Sorting[];
}

export interface CityListEntity {
  data: City[];
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
  criteria: CityCriteria;
}

export interface CityDetailEntity {
  data: City | null | undefined;
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

export interface CityListStateItem {
  items: City[];
  paging: Paging;
  sorting: Sorting[];
  criteria: CityCriteria;
  pending: boolean;
  error: Error | null;
}

export interface CityDetailStateItem {
  item: City | null | undefined;
  id: string;
  pending: boolean;
  error: Error | null;
}

export interface CityDetailState {
  [id: string]: CityDetailStateItem;
}

export interface CityListState {
  [key: string]: CityListStateItem;
}

export interface CityState {
  detail: CityDetailState;
  list: CityListState;
}
