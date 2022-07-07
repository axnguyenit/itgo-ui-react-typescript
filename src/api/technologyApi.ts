import { ListParams, ListResponse, PostData, Technology } from '~/models';
import { axios } from '~/utils';

// ----------------------------------------------------------------------

const technologiesApi = {
  getAll(params: ListParams): Promise<ListResponse<Technology>> {
    const url = '/api/technologies';
    return axios.get(url, { params });
  },

  get(id: string): Promise<Technology> {
    const url = `/api/technologies/${id}`;
    return axios.get(url);
  },

  add(data: Technology): Promise<PostData> {
    const url = '/api/technologies';
    return axios.post(url, data);
  },

  update(data: Partial<Technology>): Promise<PostData> {
    const url = `/api/technologies/${data.id}`;
    return axios.put(url, data);
  },

  remove(id: string): Promise<PostData> {
    const url = `/api/technologies/${id}`;
    return axios.delete(url);
  },
};

export default technologiesApi;
