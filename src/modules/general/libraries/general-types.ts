import { ReactNode, } from 'react';
import {
  DefaultSession, ISODateString, User,
} from 'next-auth';
import {
  CollapseClasses,
  CollapseProps,
  GridSize, PaletteMode, SliderClasses, SliderProps, TextFieldClasses, TextFieldProps,
} from '@mui/material';
import { PanelVariant, SignInPopupStatusType, } from './constants';
import { SwiperProps, } from 'swiper/react';

export interface AboutUsType {
  icon: ReactNode;
  title: any;
  link: string;
}

export interface CompanyContactInfoItemType {
  label: any;
  value: any;
}

export interface CompanyContactInfoType {
  title: any;
  info: CompanyContactInfoItemType[];
}
export interface ContactUsDataType {
  icon: ReactNode;
  title: any;
  description?: any;
  contact?: any;
  postalCode?: any;
}
export interface Media {
  id?: number;
  path?: string;
  size?: number;
  title?: string;
  description?: string;
  width?: number;
  height?: number;
  link?: string;
  object_name?: string;
  author?: string;
}
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
  front_cover_media: FrontCoverMedia;
  media_list?: (Media)[] | null;
  object_name: string;
}

export interface FrontCoverMedia {
  author: string;
  description: string;
  height: number;
  id: number;
  link: string;
  path: string;
  size: number;
  thumbnail_path: string;
  title: string;
  type: string;
  width: number;
  object_name: string;
}

export interface Seo {
  title: string;
  description: string;
  keywords: string;
  url_keywords: string;
  page_url: string;
}

export interface Member {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  mobile: string;
  phone: string;
  avatar_url?: string;
  object_name: string;
}

export type LinkProps = {
  id: number;
  title: string;
  url: string;
};

export interface BreadCrumb {
  id: number;
  title: string;
  seo: Seo;
}

export interface Price {
  price: number;
  was_price: number;
  you_save_percent: number;
  you_save: number;
  transmit_price: number;
  direct_discount: number;
  base_price?: number;
  include_tax?: boolean;
  tax: number;
  currency: string;
  object_name: string;
}

export interface Paging {
  offset: number;
  limit: number;
  total: number;
  returned: number;
  has_more: boolean;
}

export interface Meta {
  title: string;
  description: string;
  term_of_use: string;
  copyright: string;
  version: string;
  contact: Contact;
  license: MetaLicense;
}
export interface Contact {
  name: string;
  url: string;
  email: string;
}
export interface MetaLicense {
  name: string;
  url: string;
}

export interface Error {
  error_code: number;
  error_message: string;
}

export interface BreadcrumbItem {
  title: string;
  link: string;
}

export interface Sorting {
  expression: string;
  ascending: boolean;
}

export interface DateRange {
  type: number;
  submit_date_from: string;
  submit_date_to: string;
}

export interface FileListEntity {
  file_name: string;
  extension: string;
  file_path: string;
  object_name: string;
}

export interface District {
  id: number;
  status: number;
  city_id: number;
  latitude: number;
  longitude: number;
  title: string;
  description: string;
  city: string;
  object_name: string;
}
export interface Neighbourhood {
  id: number;
  status: number;
  district_id: number;
  latitude: number;
  longitude: number;
  identifier_place_id: string;
  title: string;
  description: string;
  district: string;
  object_name: string;
}

export interface SessionUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  id?: number | null | undefined;
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  mobile: string | null | undefined;
}

export type MenuItem = {
  id: number;
  title: string;
  url: string;
};

export interface LoadingPayload {
}
export interface StartLoadingAction {
  type: string;
  payload: LoadingPayload;
}

export interface EndLoadingAction {
  type: string;
  payload: LoadingPayload;
}

export interface GeneralState {
  loading: boolean;
  refreshSession: boolean;
  refreshCredit: boolean;
  signInPopupStatus: SignInPopupStatusType;
  signInPopupCaller: string;
  dashboardCacheList: DashboardCacheList;
}

export interface UploadDocument {
  doc: File;
  preview?: File;
  title: string;
  description: string;
}

export interface DashboardSubmenuLink {
  resourceName: string;
  iconPath: string;
  link: string;
}

export interface DashboardSubmenu {
  resourceName: string;
  iconPath: string;
  links: DashboardSubmenuLink[];
}
export interface DashboardMenu {
  resourceName: string;
  iconPath: string;
  link: string;
  submenu: DashboardSubmenu;
}

export interface ChangePaletteModePayload {
  paletteMode: PaletteMode;
}
export interface ChangePaletteModeAction {
  type: string;
  payload: ChangePaletteModePayload;
}

export interface Voice {
  blob: Blob;
  url: string;
  type: string;
}

export interface ErrorDetail {
  status_code: number;
  error_message: string;
}

export interface AdvancedDefaultSession extends DefaultSession {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    expires?: ISODateString;
  };
}

export interface AdvancedSession extends AdvancedDefaultSession {
  accessToken: string;
  refreshToken: string;
  error: string;
  expires: ISODateString;
}

export interface AdvancedUser extends User {
  firstName: string;
  lastName: string;
  mobile: string;
  accessToken: string;
  refreshToken: string;
  expires: string;
}

export type ServerPageProps = {
  params?: any;
  searchParams?: any;
};

export interface SortItem {
  title: string;
  expression: string;
  ascending: boolean;
}

export declare type SafeNumber = number | `${number}`;

export interface RepeatColumns {
  xs?: GridSize | boolean;
  sm?: GridSize | boolean;
  md?: GridSize | boolean;
  lg?: GridSize | boolean;
  xl?: GridSize | boolean;
}

export enum Gender {
  female = 0,
  male = 1
}

export enum StepperStatus {
  done = 0,
  running = 1,
  waiting = 2
}

export enum AlertStatus {
  success = 0,
  info = 1,
  warning = 2,
  error = 3
}

export enum FormatDateType {
  iso = 0,
  long = 1,
  short = 2
}

export interface OptionType {
  value: number;
  label: string;
}

export interface StepType {
  label: string;
  status: StepperStatus;
}

export interface TabOptionType {
  label: string;
  value: number;
}

export interface CardCheckboxPropsType {
  id: number;
  value: any;
  open: boolean;
}

export interface CardCheckboxGroupPropsType {
  label: string;
  body: ReactNode;
  action: ReactNode;
  value: any;
}

export type CardCheckboxGroupChange = {
  (value: any): void;
};

export interface SetCriteriaDatePayload {
  submitDateFrom?: string | null | undefined;
  submitDateTo?: string | null | undefined;
}

export interface SetCurrentPagePayload {
  currentPage: number;
}

export interface SetSortingPayload {
  sorting: Sorting;
}

export interface SetKeywordPayload {
  keyword: string;
}

export interface SetCurrentStepPayload {
  currentStep: number;
}

export interface SetOrderFormItemPayload {
  itemName: string;
  itemValue: any;
}

export interface SetOrderFormItemListPayload {
  values: any;
}

export interface CardCheckboxClasses {
  root?: string;
  base?: string;
  header?: string;
  content?: string;
  footer?: string;
  icon?: string;
}

export interface TableClassType {
  root?: string;
}

export interface TableCellType {
  value: ReactNode;
  label: string;
  width?: number;
  rtl?: string;
}

export interface TableCellClassType {
  root?: string;
}

export interface GeneralErrorType {
  error: boolean;
  message: string;
}
export interface OrderChild {
  id: number;
  parent_id: number;
  start_date?: string;
  submit_date?: string;
  object_name: string;
}
export interface OrderFinancial {
  receipt_date?: string;
  receipt_code?: string;
  renewal_auto_payment?: boolean;
  show_renewal_auto_payment?: boolean;
  credit_id?: number;
  payment_status?: number;
  payment_status_title?: string;
  payment_unique_id?: string;
  object_name: string;
}
export interface OrderOwner {
  first_name: string;
  last_name: string;
  phone?: string;
  fax?: string;
  email: string;
  address?: string;
  postal_code?: string;
  company: string;
  object_name: string;
}
export interface OrderNote {
  id: number;
  title: string;
  text?: string;
  date: string;
  object_name: string;
}

export enum OpenStatus {
  unknown = -1,
  closed = 0,
  open = 1
}
export interface DashboardCacheItem {
  userId: number;
  openStatus: OpenStatus;
  showFilter: boolean;
  showSort: boolean;
  filterCount: number;
  criteria: any;
  paging: Paging;
}

export interface DashboardCacheList {
  [key: string]: DashboardCacheItem;
}

export interface DashboardSidebarOpenStatusPayload {
  userId: number;
  storageKey: string;
  openStatus: OpenStatus;
}
export interface DashboardSidebarShowFilterPayload {
  userId: number;
  storageKey: string;
  showFilter: boolean;
}

export interface DashboardSidebarShowSortPayload {
  userId: number;
  storageKey: string;
  showSort: boolean;
}
export interface DashboardSidebarFilterCountPayload {
  userId: number;
  storageKey: string;
  filterCount: number;
}
export interface DashboardCriteriaPayload {
  userId: number;
  storageKey: string;
  criteria: any;
}
export interface DashboardSortPayload {
  userId: number;
  storageKey: string;
  sorting: Sorting[];
}
export interface DashboardCriteriaItemPayload {
  userId: number;
  storageKey: string;
  itemName: string;
  itemValue: any;
}

export interface DashboardCriteriaItemListPayload {
  userId: number;
  storageKey: string;
  values: any;
}

export interface DashboardCacheLoadPayload {
  userId: number;
  storageKey: string;
}

export interface DashboardPagingPayload {
  userId: number;
  storageKey: string;
  paging: Paging;
}

export interface DashboardSidebarType {
  sidebarStatus: OpenStatus;
  showFilter: boolean;
  showSort: boolean;
}

export interface SetSidebarSortStatusPayload {
  showSort: boolean;
}

export interface SetSidebarFilterStatusPayload {
  showFilter: boolean;
}

export interface SetSidebarStatusPayload {
  sidebarStatus: OpenStatus;
}

export interface ListLayoutContentType {
  list?: ReactNode;
  sidebar?: ReactNode;
  drawer?: ReactNode;
}

export interface CriteriaDate {
  from: string | 'reset';
  to: string | 'reset';
}

export interface RadioGroupOptionType {
  label: string;
  value: any;
}
export interface CheckboxListItemType {
  label: string;
  value: any;
}

export enum FileInputAcceptType {
  png = 'image/png',
  jpg = 'image/jpg',
  jpeg = 'image/jpeg',
  pdf = 'application/pdf'
}

export interface Base64Type {
  base64String: string;
  fileName: string;
  mimeType: string;
}

export interface TableLegendItemType {
  icon: ReactNode;
  title: string;
}

export interface TableLegendClassType {
  root?: string;
  header?: string;
  markList?: string;
  markItem?: string;
}

export type Direction = 'ltr' | 'rtl';

export interface SelectInputOptionType {
  id: number;
  label: string;
  value: any;
  dir?: Direction;
}

export interface SelectInputClassesType {
  root?: string;
  textfield?: Partial<TextFieldClasses>;
  list?: string;
}

export type SelectInputProps = TextFieldProps & {
  tabIndex?: number;
  onSelectChange?: any;
  classes?: SelectInputClassesType;
  options: SelectInputOptionType[] | null;
  defaultValue?: any;
  value: any;
  collapseProps?: CollapseProps;
  searchPlaceholder?: string;
  noBorder?: boolean;
  fullAdornment?: string;
  adornmentText?: string;
  searchable?: boolean;
  alignToParent?: boolean;
  dir?: Direction;
  popupLabel?: string;
  loading?: boolean;
  defaultValueClickable?: boolean;
  openCollapse?: boolean;
};

export interface SliderInputClassesType {
  root?: string;
  label?: string;
  slider?: Partial<SliderClasses>;
}

export interface SliderInputProps extends SliderProps {
  label: any;
  classes?: SliderInputClassesType;
}

export interface ErrorCollapseClassesType extends Partial<CollapseClasses> {
  container?: string;
  title?: string;
  error?: string;
}

export interface ErrorCollapseProps extends Partial<CollapseProps> {
  errorList?: string[];
  classes?: ErrorCollapseClassesType;
  variant?: 'error' | 'warning' | 'info';
}

export interface PanelClassType {
  root?: string;
  title?: string;
}

export interface PanelProps {
  title?: ReactNode;
  fullWidth?: boolean;
  children?: ReactNode;
  variant: PanelVariant;
  classes?: PanelClassType;
  fullMobileWidth?: boolean;
  headerFrontSide?: ReactNode;
}

export interface LastOrderOwnerInfo {
  id?: number;
  signature_firstname: string;
  signature_lastname: string;
  firstname: string;
  firstname_en: string;
  lastname: string;
  lastname_en: string;
  email: string;
  phone: string;
  company: string;
  user_country_id: number;
  user_state: string;
  user_city: string;
  postal_code: string;
  address: string;
  object_name?: string;
}

export interface LastOrderOwnerInfoEntity {
  status_code: number;
  object_type: string;
  time_taken: number;
  creation_date: string;
  url: string;
  message: string;
  error?: Error;
  data: LastOrderOwnerInfo;
  meta: Meta;
}

export interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
  hidden?: boolean;
}

export interface OrderBrief {
  id: number;
  price: number;
  date: string | null | undefined;
  title: string | null | undefined;
  status: number;
  status_title: string;
  url: string;
}

export interface RefreshSessionPayload {
  refreshSession: boolean;
}

export interface RefreshCreditPayload {
  refreshCredit: boolean;
}

export interface SignInPopupStatusPayload {
  signInPopupStatus: SignInPopupStatusType;
}

export interface SignInPopupCallerPayload {
  signInPopupCaller: string;
}

export interface ButtonTextLinkType {
  text: string;
  link: string;
}

export interface TableLabelType {
  text: string;
  weight: number;
  align: 'center' | 'left' | 'right' | 'justify' | 'inherit' | undefined;
}

export interface DashboardLinks {
  title: any;
  link: string;
  shortName: any;
}

export interface CustomSwiperClassesType {
  root?: string;
  swiper?: string;
  prev?: string;
  next?: string;
}

export interface CustomSwiperPropsType extends SwiperProps {
  children: ReactNode;
  classes?: CustomSwiperClassesType;
  slidesLength: number;
  fadeNavigationButtons?: boolean;
  centerBottomNavigationButtons?: boolean;
}