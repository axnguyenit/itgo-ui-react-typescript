import { Payment } from '~/models';
import { axios } from '~/utils';

// ----------------------------------------------------------------------

const paymentApi = {
  add(data: Payment): Promise<any> {
    const url = `/api/payments`;
    return axios.post(url, data);
  },
  getPayUrl(): Promise<any> {
    const url = '/api/payments/url';
    return axios.get(url);
  },
};

export default paymentApi;
