import {
  User,
  ListParams,
  InstructorsResponse,
  UsersResponse,
  Register,
  ChangePassword,
  Login,
  LoginResponse,
  MyAccount,
  AccessToken,
  RefreshToken,
} from '@/models';
import { axios } from '@/utils';

const userApi = {
  getAll(params: ListParams): Promise<UsersResponse> {
    const url = '/api/users';
    return axios.get(url, { params });
  },

  get(id: string): Promise<User> {
    const url = `/api/users/user/${id}`;
    return axios.get(url);
  },

  register(data: Register): Promise<any> {
    const url = '/api/auth/register';
    return axios.post(url, data);
  },

  login(data: Login): Promise<LoginResponse> {
    const url = '/api/auth/login';
    return axios.post(url, data);
  },

  refreshToken(data: RefreshToken): Promise<AccessToken> {
    const url = '/api/auth/refresh-token';
    return axios.post(url, data);
  },

  myAccount(): Promise<MyAccount> {
    const url = `/api/users/my-account`;
    return axios.get(url);
  },

  update(data: Partial<User>): Promise<any> {
    const url = `/api/users/${data.id}`;
    return axios.put(url, data);
  },

  getAllInstructors(params: ListParams): Promise<InstructorsResponse> {
    const url = '/api/instructors';
    return axios.get(url, { params });
  },

  requestVerifyEmail(data: { email: string }): Promise<any> {
    const url = '/api/auth/verify';
    return axios.post(url, data);
  },

  verifyEmail(id: string, token: string): Promise<any> {
    const url = `/api/auth/verify/${id}/${token}`;
    return axios.get(url);
  },

  changePassword(data: ChangePassword): Promise<any> {
    const url = `/api/users/change-password`;
    return axios.post(url, data);
  },

  forgotPassword(data: { email: string }): Promise<any> {
    const url = '/api/auth/forgot-password';
    return axios.post(url, data);
  },

  checkRequestResetPassword(id: string, token: string): Promise<any> {
    const url = `/api/auth/reset-password/${id}/${token}`;
    return axios.get(url);
  },

  resetPassword(
    data: { email: string },
    id: string,
    token: string
  ): Promise<any> {
    const url = `/api/auth/reset-password/${id}/${token}`;
    return axios.post(url, data);
  },
};

export default userApi;
