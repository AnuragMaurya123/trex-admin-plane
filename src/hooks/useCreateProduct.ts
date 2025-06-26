// src/hooks/useCreateProduct.ts

import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { Product } from "@/lib/types/productType";
import axios from "axios";

interface NewProduct extends Omit<Product, "id"> {
  dateAdded: string;
}

async function createProduct(product: NewProduct): Promise<Product> {
  const accessToken = localStorage.getItem("accessToken");
  const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL!}/product/create`, product, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });
  return response.data.data as Product;
}

// 👇 Accept mutation options here
export function useCreateProduct(
  options?: UseMutationOptions<Product, Error, NewProduct>
) {
  const queryClient = useQueryClient();

  return useMutation<Product, Error, NewProduct>({
    mutationFn: createProduct,
    onSuccess: (newProduct, ...args) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });

      queryClient.setQueryData(["products"], (old: Product[] | undefined) => {
        return old ? [...old, newProduct] : [newProduct];
      });

      // 👇 Call user's onSuccess if provided
      options?.onSuccess?.(newProduct, ...args);
    },
    onError: (error, ...args) => {
      console.error("Create product failed", error);
      // 👇 Call user's onError if provided
      options?.onError?.(error, ...args);
    },
  });
}
