import { ListParams, OrderResponse } from '@/models';
import { axios } from '@/utils';

const orderApi = {
  getAll(params: ListParams): Promise<OrderResponse> {
    const url = '/api/orders';
    return axios.get(url, { params });
  },

  getByUser(params: ListParams): Promise<OrderResponse> {
    const url = '/api/orders/my-orders';
    return axios.get(url, { params });
  },
};

export default orderApi;
