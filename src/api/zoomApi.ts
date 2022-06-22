import { axios } from '~/utils';

// ----------------------------------------------------------------------

const zoomApi = {
  getSignature(data: Partial<Event>): Promise<string> {
    const url = '/api/zoom';
    return axios.post(url, data);
  },
};

export default zoomApi;
