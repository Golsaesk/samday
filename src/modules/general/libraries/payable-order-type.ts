import { PayableOrderType, } from './constants';
import {
  Meta, Paging, Price, Sorting,
} from './general-types';

export interface PayableOrderListEntity {
  status_code: number;
  object_type: string;
  time_taken: number;
  creation_date: string;
  url: string;
  message: string;
  error?: null;
  data?: (PayableOrder)[] | null;
  paging: Paging;
  sorting?: (Sorting)[] | null;
  meta: Meta;
}

export interface PayableOrder {
  id: number;
  title: string;
  submit_date: string;
  type: PayableOrderType;
  type_title: string;
  price: Price;
  status_title?: string | null | undefined;
  status?: number | null | undefined;
  duration: number;
  duration_unit?: string | null;
  due_date?: string | null;
  object_name: string;
}

export interface PayableOrderCriteria {
  limit: number;
  offset: number;
  locale?: string;
  sorting: Sorting[];
}