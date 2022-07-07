import { Payment, PaymentURL, PostData } from '~/models';
import { axios } from '~/utils';

// ----------------------------------------------------------------------

const paymentApi = {
  add(data: Payment): Promise<PostData> {
    const url = `/api/payments`;
    return axios.post(url, data);
  },
  getPayUrl(): Promise<PaymentURL> {
    const url = '/api/payments/url';
    return axios.get(url);
  },
};

export default paymentApi;
