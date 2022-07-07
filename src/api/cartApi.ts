import { AddToCartResponse, CartData, CartItem, ListResponse, PostData } from '~/models';
import { axios } from '~/utils';

// ----------------------------------------------------------------------

const cartApi = {
  get(): Promise<ListResponse<CartItem>> {
    const url = '/api/cart';
    return axios.get(url);
  },

  add(data: CartData): Promise<AddToCartResponse> {
    const url = '/api/cart';
    return axios.post(url, data);
  },

  removeItem(id: string): Promise<PostData> {
    const url = `/api/cart/${id}`;
    return axios.delete(url);
  },
};

export default cartApi;
