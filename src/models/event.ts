import { PaginationParams } from '.';
import { Course } from './course';

export interface Event {
  _id?: string;
  id?: string;
  title: string;
  instructor: string;
  course: Partial<Course>;
  description: string;
  textColor: string;
  start: Date;
  end: Date;
  meetingNumber: string;
  passwordMeeting: string;

  cover?: string;
  role?: number;
  name?: string;
  email?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface EventResponse {
  events: Event[];
  pagination?: PaginationParams;
}