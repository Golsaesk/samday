import {
  Meta,
  Error, Paging, Sorting,
} from '@modules/general/libraries/general-types';

export interface Country {
  id: number;
  priority: number;
  status: number;
  status_title: string;
  capital_id?: number | null;
  timezone_id: string;
  calling_code: number;
  continent?: number | null;
  title: string;
  description: string;
  capital: string;
  object_name: string;
  iso_two: string;
}

export interface CountryCriteria {
  limit: number;
  offset: number;
  sorting: Sorting[];
  status?: number;
  keywords?: string;
  locale?: string;
}

export interface CountryListEntity {
  data: Country[];
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
  criteria: CountryCriteria;
}

export interface CountryDetailEntity {
  data: Country | null | undefined;
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

export interface GetCountryListAction {
  type: string;
  payload: GetCountryListPayload;
}

export interface GetCountryListPayload {
  criteria: CountryCriteria;
}

export interface PutCountryListPayload {
  CountryListEntity: CountryListEntity;
  criteria: CountryCriteria;
}
export interface PutCountryListAction {
  type: string;
  payload: PutCountryListPayload;
}

export interface CountryStateListItem {
  items: Country[];
  paging: Paging;
  sorting: Sorting[];
  criteria: CountryCriteria;
  pending: boolean;
  error: Error | null;
}

export interface CountryStateList {
  [key: string]: CountryStateListItem;
}

export interface PendingCountryListPayload {
  pending: boolean;
  criteria: CountryCriteria;
}

export interface PendingCountryListAction {
  type: string;
  payload: PendingCountryListPayload;
}

export interface ErrorCountryListPayload {
  error: Error | null;
  criteria: CountryCriteria;
}

export interface ErrorCountryListAction {
  type: string;
  payload: ErrorCountryListPayload;
}

export interface GetCountryDetailAction {
  type: string;
  payload: GetCountryDetailPayload;
}

export interface GetCountryDetailPayload {
  id: number;
}

export interface PutCountryDetailPayload {
  CountryDetail: CountryDetailEntity;
  id: number;
}
export interface PutCountryDetailAction {
  type: string;
  payload: PutCountryDetailPayload;
}

export interface CountryStateDetailItem {
  item: Country | null | undefined;
  id: number;
  pending: boolean;
  error: Error | null;
}

export interface CountryStateDetail {
  [id: number]: CountryStateDetailItem;
}

export interface PendingCountryDetailPayload {
  pending: boolean;
  id: number;
}

export interface PendingCountryDetailAction {
  type: string;
  payload: PendingCountryDetailPayload;
}

export interface ErrorCountryDetailPayload {
  error: Error | null;
  id: number;
}

export interface ErrorCountryDetailAction {
  type: string;
  payload: ErrorCountryDetailPayload;
}

export interface CountryState {
  list: CountryStateList;
  detail: CountryStateDetail;
}
