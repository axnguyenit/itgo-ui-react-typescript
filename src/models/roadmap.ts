import { PaginationParams } from '.';

// ----------------------------------------------------------------------

export interface RoadmapDetail {
  id?: string;
  roadmapId?: string;
  technology: string;
  description: string;
  image: string;
  tag: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface Roadmap {
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

export type RoadmapType = Roadmap & {
  technologies: RoadmapDetail[];
};

export interface RoadmapResponse {
  roadmap: RoadmapType;
}
