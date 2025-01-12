import { Law, } from '@/modules/law/libraries/law-types';
import { News, } from '@/modules/news/libraries/news-types';
import { ReactNode, } from 'react';

export interface Menu {
  resourceName: string;
  subtitle?: string;
  link: string;
  submenu?: Menu[];
}

export interface FooterLink {
  title: string;
  link: string;
  icon?: string;
}

export interface ImageLogo {
  src: string;
  width: number;
  height: number;
}

export interface Category {
  title: string;
  image?: ImageLogo;
  link?: string;
  linkList: FooterLink[];
}

export interface SocialLink {
  link: string;
  icon: string;
}

export interface Map {
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  link: string;
}

export interface FooterInfo {
  socialLinkList: SocialLink[];
  map: Map;
}

export interface BottomLink {
  title: string;
  link: string;
}

export interface Footer {
  categoryList: Category[];
  info: FooterInfo;
  bottomLinkList: BottomLink;
}

export type LayoutProps = {
  children?: ReactNode;
  params?: any;
  submenu?: Submenu;
};

export interface Submenu {
  lawList?: Law[] | null | undefined;
  newsList?: News[] | null | undefined;
  reportList?: News[] | null | undefined;
}

export interface DisplayDateType {
  year: string;
  month: string;
  day: string;
}

export interface DashboardSubmenuLink {
  id: number;
  title: string;
  link: string;
  target?: string;
}

export interface DashboardSubmenuType {
  title: string;
  icon?: ReactNode;
  submenuList: DashboardSubmenuLink[];
}

export interface DashboardMenuItemType {
  id: number;
  title: string;
  link: string;
  icon?: ReactNode;
  submenu?: DashboardSubmenuType;
}

// --------------------------------------------------------------------------------------

export interface Layout {
  menu: MenuOrInfo;
  info: MenuOrInfo;
  socialMedia: SocialMedia;
}

export interface MenuOrInfo {
  data: MenuOrInfoItem[];
}

export interface MenuOrInfoItem {
  title: string;
  value: string;
  link: string;
  hasSubmenu?: boolean;
}

export interface SocialMedia {
  data: SocialMediaItem[];
}

export interface SocialMediaItem {
  link: string;
  icon: ReactNode;
}