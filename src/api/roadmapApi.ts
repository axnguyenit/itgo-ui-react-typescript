import {
  ListParams,
  Roadmap,
  RoadmapResponse,
  RoadmapsResponse,
} from '~/models';
import { axios } from '~/utils';

// ----------------------------------------------------------------------

const roadmapApi = {
  getAll(params: ListParams): Promise<RoadmapsResponse> {
    const url = '/api/roadmaps';
    return axios.get(url, { params });
  },

  get(id: string): Promise<RoadmapResponse> {
    const url = `/api/roadmaps/${id}`;
    return axios.get(url);
  },

  add(data: Roadmap): Promise<any> {
    const url = '/api/roadmaps';
    return axios.post(url, data);
  },

  update(data: Partial<Roadmap>): Promise<any> {
    const url = `/api/roadmaps/${data.id}`;
    return axios.put(url, data);
  },

  remove(id: string): Promise<any> {
    const url = `/api/roadmaps/${id}`;
    return axios.delete(url);
  },
};

export default roadmapApi;
