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

export interface TechnologiesResponse {
  technologies: Technology[];
  pagination?: PaginationParams;
}

export interface TechnologyResponse {
  technology: Technology;
}
