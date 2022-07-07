import { ListParams, ListResponse, OrderItem } from '~/models';
import { axios } from '~/utils';

// ----------------------------------------------------------------------

const orderApi = {
  getAll(params: ListParams): Promise<ListResponse<OrderItem>> {
    const url = '/api/orders';
    return axios.get(url, { params });
  },

  getByUser(params: ListParams): Promise<ListResponse<OrderItem>> {
    const url = '/api/orders/my-orders';
    return axios.get(url, { params });
  },
};

export default orderApi;
