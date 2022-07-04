import axios from 'axios';
import { Error } from '~/models';
export default function handleError(error: any): Error {
  if (!axios.isAxiosError(error))
    return { errors: [{ msg: 'Something went wrong, try again!' }] };

  const newError = error.response?.data as Error;
  return newError;
}
