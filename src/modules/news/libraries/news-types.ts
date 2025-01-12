import { Category, } from '@modules/category/libraries/category-types';
import {
  Media, Album, Seo,
  Meta, Error, Paging,
  Sorting,
} from '@modules/general/libraries/general-types';
export interface News {
  id: number;
  title: string;
  lead: string;
  body: string;
  media: Media;
  media_alternate: Media;
  type_id: string;
  type_title: string;
  output_id: string;
  output_title: string;
  publish_date: string;
  source: string;
  click_count: number;
  subdomain_id: number;
  up_title: string;
  sub_title: string;
  brief_title: string;
  album_id: number;
  urgency: string;
  urgency_title: string;
  publish_date_shamsi: string;
  tag_list?: (string)[];
  related_news_list?: (RelatedNews)[] | null;
  album: Album;
  seo: Seo;
  category_list?: (Category)[] | null;
  object_name: string;
}

export interface RelatedNews {
  id: number;
  title: string;
  up_title: string;
  lead: string;
  publish_date: string;
  media: Media;
  seo: Seo;
  object_name: string;
}

export interface NewsCriteria {
  limit: number;
  offset: number;
  typeIds: string | null;
  outputIds: string | null;
  categoryIds: string | null;
  keywords: string | null | undefined;
  tags?: string;
  sorting: Sorting[];
  subdomainId: number;
  locale: string;
}

export interface NewsListEntity {
  data: News[];
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
  criteria: NewsCriteria;
}

export interface NewsDetailEntity {
  data: News | null | undefined;
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

export interface NewsListStateItem {
  items: News[];
  paging: Paging;
  sorting: Sorting[];
  criteria: NewsCriteria;
  pending: boolean;
  error: Error | null;
}

export interface NewsDetailStateItem {
  item: News | null | undefined;
  id: number;
  pending: boolean;
  error: Error | null;
}

export interface NewsDetailState {
  [id: number]: NewsDetailStateItem;
}

export interface NewsListState {
  [key: string]: NewsListStateItem;
}

export interface NewsState {
  detail: NewsDetailState;
  list: NewsListState;
}
