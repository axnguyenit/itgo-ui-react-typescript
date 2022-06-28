import { PaginationParams } from './common';
import { User } from './user';

// ----------------------------------------------------------------------

export interface CourseDetail {
  _id?: string;
  id?: string;
  overview: string;
  requirements: string;
  targetAudiences: string;

  createdAt?: Date;
  updatedAt?: Date;
  [key: string]: any;
}

export interface Course {
  _id?: string;
  id?: string;
  instructor: Partial<User>;
  name: string;
  cover: string;
  price: number;
  priceSale: number;
  minStudent: number;
  tags: string[];
  details: Partial<CourseDetail>;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface CoursesResponse {
  courses: Course[];
  pagination?: PaginationParams;
}

export interface CourseResponse {
  course: Course;
}

export interface CourseData {
  id?: string;
  instructor?: string;
  name: string;
  cover: string;
  tags: string[];
  price: number;
  priceSale?: number;
  minStudent: number;
  overview: string;
  requirements: string;
  targetAudiences: string;
}