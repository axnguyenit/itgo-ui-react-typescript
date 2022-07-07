import { Application, ListParams, ListResponse, PostData } from '~/models';
import { axios } from '~/utils';

// ----------------------------------------------------------------------

const applicationApi = {
  getAll(params: ListParams): Promise<ListResponse<Application>> {
    const url = '/api/applications';
    return axios.get(url, { params });
  },

  get(id: string): Promise<Application> {
    const url = `/api/applications/${id}`;
    return axios.get(url);
  },

  add(data: Application): Promise<PostData> {
    const url = '/api/applications';
    return axios.post(url, data);
  },

  approve(id: string): Promise<PostData> {
    const url = `/api/applications/${id}/approve`;
    return axios.post(url);
  },

  deny(id: string): Promise<PostData> {
    const url = `/api/applications/${id}/deny`;
    return axios.post(url);
  },

  removeItem(id: string): Promise<PostData> {
    const url = `/api/applications/${id}`;
    return axios.delete(url);
  },
};

export default applicationApi;
