import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { AdminLoginInput } from '@/validationSchema/loginSchema';


const login = async (values: AdminLoginInput):Promise<string> => {
  const response = await axios.post(
    "https://jsonplaceholder.typicode.com/users",
    values,
    { timeout: 10_000 }
  );
  return response.data.message;
};

export function useLogin() {
  return useMutation<string,  AxiosError<{ message: string }>, AdminLoginInput>({
    mutationFn: login,
    retry: (failureCount, error) => {
      if (error.response?.status === 404) return false;
      return failureCount < 2;
    },
  });
}
