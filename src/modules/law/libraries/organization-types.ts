import {
  Meta, Error, Paging, Sorting,
} from '@modules/general/libraries/general-types';

export interface Organization {
  id: number;
  title: string;
  email: string;
  logo?: null;
  priority: number;
  object_name: string;
}

export interface OrganizationCriteria {
  limit: number;
  offset: number;
  sorting: Sorting[];
  locale: string;
}

export interface OrganizationListEntity {
  data: Organization[];
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
  criteria: OrganizationCriteria;
}

export interface OrganizationDetailEntity {
  data: Organization | null | undefined;
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
