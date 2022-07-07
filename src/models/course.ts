import { User } from './user';

// ----------------------------------------------------------------------

export interface CourseDetail {
  id?: string;
  overview: string;
  requirements: string;
  targetAudiences: string;

  createdAt?: Date;
  updatedAt?: Date;
  [key: string]: any;
}

export interface Course {
  id?: string;
  _id?: string;
  instructor?: Partial<User>;
  name: string;
  cover: string;
  price: number;
  priceSale: number;
  minStudent?: number;
  tags?: string[];
  details?: Partial<CourseDetail>;

  createdAt?: Date;
  updatedAt?: Date;
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
