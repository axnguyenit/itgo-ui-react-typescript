import { ListParams, ListResponse, PostData, Roadmap, RoadmapDetail } from '~/models';
import { axios } from '~/utils';

// ----------------------------------------------------------------------

const roadmapApi = {
  getAll(params: ListParams): Promise<ListResponse<Roadmap>> {
    const url = '/api/roadmaps';
    return axios.get(url, { params });
  },

  get(id: string): Promise<RoadmapDetail> {
    const url = `/api/roadmaps/${id}`;
    return axios.get(url);
  },

  add(data: Roadmap): Promise<PostData> {
    const url = '/api/roadmaps';
    return axios.post(url, data);
  },

  update(data: Partial<Roadmap>): Promise<PostData> {
    const url = `/api/roadmaps/${data.id}`;
    return axios.put(url, data);
  },

  remove(id: string): Promise<PostData> {
    const url = `/api/roadmaps/${id}`;
    return axios.delete(url);
  },
};

export default roadmapApi;
