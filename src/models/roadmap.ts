import { PaginationParams } from '.';

export interface RoadmapDetail {
  _id?: string;
  id?: string;
  roadmapId: string;
  technology: string;
  description: string;
  image: string;
  tag: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface Roadmap {
  _id?: string;
  id?: string;
  name: string;
  slogan: string;
  description: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface RoadmapsResponse {
  roadmaps: Roadmap[];
  pagination?: PaginationParams;
}

export interface RoadmapResponse {
  roadmap: Roadmap & {
    technologies: RoadmapDetail[];
  };
}

export type RoadmapType = Roadmap & {
  technologies: RoadmapDetail[];
};