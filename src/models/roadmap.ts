// ----------------------------------------------------------------------

export interface Roadmap {
  id?: string;
  name: string;
  slogan: string;
  description: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface RoadmapTechnology {
  id?: string;
  roadmapId?: string;
  technology: string;
  description: string;
  image: string;
  tag: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export type RoadmapDetail = Roadmap & {
  technologies: RoadmapTechnology[];
};
