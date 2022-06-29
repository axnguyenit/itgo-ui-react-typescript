import { CourseData, CourseResponse, CoursesResponse, ListParams, StudentsResponse, User } from '~/models';
import { axios } from '~/utils';

// ----------------------------------------------------------------------

const courseApi = {
  getAll(params: ListParams): Promise<CoursesResponse> {
    const url = '/api/courses';
    return axios.get(url, { params });
  },

  get(id: string): Promise<CourseResponse> {
    const url = `/api/courses/${id}`;
    return axios.get(url);
  },

  add(data: CourseData): Promise<any> {
    const url = '/api/courses';
    return axios.post(url, data);
  },

  update(data: CourseData): Promise<any> {
    const url = `/api/courses/${data.id}`;
    return axios.put(url, data);
  },

  remove(id: string): Promise<any> {
    const url = `/api/courses/${id}`;
    return axios.delete(url);
  },

  getStudents(id: string): Promise<StudentsResponse> {
    const url = `/api/classes/${id}`;
    return axios.get(url);
  },
};

export default courseApi;
