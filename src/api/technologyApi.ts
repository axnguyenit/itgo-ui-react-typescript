import { ListParams, Technology, TechnologyResponse } from '~/models';
import { axios } from '~/utils';

// ----------------------------------------------------------------------

const technologiesApi = {
  getAll(params: ListParams): Promise<TechnologyResponse> {
    const url = '/api/technologies';
    return axios.get(url, { params });
  },

  get(id: string): Promise<Technology> {
    const url = `/api/technologies/${id}`;
    return axios.get(url);
  },

  add(data: Technology): Promise<any> {
    const url = '/api/technologies';
    return axios.post(url, data);
  },

  update(data: Partial<Technology>): Promise<any> {
    const url = `/api/technologies/${data.id}`;
    return axios.put(url, data);
  },

  remove(id: string): Promise<any> {
    const url = `/api/technologies/${id}`;
    return axios.delete(url);
  },
};

export default technologiesApi;
