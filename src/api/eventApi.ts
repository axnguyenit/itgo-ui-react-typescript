import { Event, ListResponse, PostData } from '~/models';
import { axios } from '~/utils';

// ----------------------------------------------------------------------

const eventApi = {
  getByInstructor(): Promise<ListResponse<Event>> {
    const url = '/api/events/get-by-instructor';
    return axios.get(url);
  },

  getByStudent(courseId: string): Promise<ListResponse<Event>> {
    const url = `api/events/get-by-student/${courseId}`;
    return axios.get(url);
  },

  add(data: Event): Promise<PostData> {
    const url = '/api/events';
    return axios.post(url, data);
  },

  update(data: Partial<Event>): Promise<PostData> {
    const url = `/api/events/${data.id}`;
    return axios.put(url, data);
  },

  remove(id: string): Promise<PostData> {
    const url = `/api/events/${id}`;
    return axios.delete(url);
  },

  checkValidUser(id: string): Promise<Partial<Event>> {
    const url = `/api/events/valid-user/${id}`;
    return axios.get(url);
  },
};

export default eventApi;
