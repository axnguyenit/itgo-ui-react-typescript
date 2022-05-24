import { ReactNode } from 'react';

export interface VariantType {
  duration?: number;
  durationOut?: number;
  durationIn?: number;
  ease?: string | number[];
  easeIn?: string | number[];
  easeOut?: string | number[];
  colors?: string[];
  staggerIn?: number;
  distance?: number;
}

export interface PaginationParams {
  _limit: number;
  _page: number;
  _totalRows: number;
}

export interface ListParams {
  _page?: number;
  _limit?: number;

  [key: string]: any;
}

export interface MenuItem {
  title: string;
  path: string;
  icon?: ReactNode;
  children?: MenuItem[];
}

export interface SubMenu {
  subheader: string;
  items: MenuItem[];
}

export interface Menu {
  title?: string;
  icon?: ReactNode;
  path: string;
  children?: SubMenu[];
}

export interface Error {
  errors: {
    msg: string;
  }[];
}

export interface CartData {
  total: number;
  courseId: string;
}

export type ColorType =
  | 'inherit'
  | 'default'
  | 'primary'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

export type Color =
  | 'primary'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';
