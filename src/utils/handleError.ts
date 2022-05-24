import { Error } from '@/models';
export default function handleError(error: any): Error {
  const newError = error.response?.data as Error;
  return newError;
}
