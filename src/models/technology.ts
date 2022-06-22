import { PaginationParams } from './common';

// ----------------------------------------------------------------------

export interface Technology {
  _id?: string;
  id?: string;
  name: string;
  image: string;
  tag: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface TechnologyResponse {
  technologies: Technology[];
  pagination?: PaginationParams;
}
