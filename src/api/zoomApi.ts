import { Signature, SignatureData } from '~/models';
import { axios } from '~/utils';

// ----------------------------------------------------------------------

const zoomApi = {
  getSignature(data: SignatureData): Promise<Signature> {
    const url = '/api/zoom';
    return axios.post(url, data);
  },
};

export default zoomApi;
