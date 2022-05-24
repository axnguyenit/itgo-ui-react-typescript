import { CartData, CartResponse } from '@/models';
import { axios } from '@/utils';

const cartApi = {
  get(): Promise<CartResponse> {
    const url = '/api/cart';
    return axios.get(url);
  },

  add(data: CartData): Promise<any> {
    const url = '/api/cart';
    return axios.post(url, data);
  },

  removeItem(id: string): Promise<any> {
    const url = `/api/cart/${id}`;
    return axios.delete(url);
  },
};

export default cartApi;
