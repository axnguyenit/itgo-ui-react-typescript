import { Course, CourseData, ListParams, ListResponse, User } from '~/models';
import { axios } from '~/utils';

// ----------------------------------------------------------------------

const courseApi = {
  getAll(params: ListParams): Promise<ListResponse<Course>> {
    const url = '/api/courses';
    return axios.get(url, { params });
  },

  get(id: string): Promise<Course> {
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

  getStudents(id: string): Promise<ListResponse<Partial<User>>> {
    const url = `/api/classes/${id}`;
    return axios.get(url);
  },
};

export default courseApi;
