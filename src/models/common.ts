import { ReactNode } from 'react';

// ----------------------------------------------------------------------

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
  limit: number;
  page: number;
  totalRows: number;
}

export interface ListParams {
  page?: number;
  limit?: number;

  [key: string]: any;
}

export interface MenuItem {
  title: string;
  path: string;
  icon?: ReactNode;
  children?: MenuItem[];
}

export interface ListResponse<T> {
  results: T[];
  pagination?: PaginationParams;
}

export interface PostData<T = any> {
  result?: T;
  msg: string;
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

export interface PaymentOption {
  value: string;
  title: string;
  description: string;
  icons: string[];
}

export type CalendarView =
  | 'dayGridMonth'
  | 'timeGridWeek'
  | 'timeGridDay'
  | 'listWeek';

export interface CalendarArg {
  start: Date;
  end: Date;
}

export interface BreadcrumbsLink {
  name: string;
  href?: string;
}

export interface HeaderLabel {
  id?: string;
  label: string;
  alignRight: boolean;
}
