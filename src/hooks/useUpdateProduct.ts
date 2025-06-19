import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Product } from '@/lib/types/productType';
import axios from 'axios';

// API service function
async function updateProduct(product: Product): Promise<Product> {
  if (!product.id) {
    throw new Error('Product ID is required for update');
  }

  const response = await axios.put(`/api/products/${product.id}`, product);

  if (!response) {
    throw new Error(`Failed to update product`);
  }

  return response.data.product;
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProduct,

    // 1️⃣  Optimistic update
    async onMutate(updatedProduct: Product) {
      // Cancel any outgoing fetches for the list so we don’t overwrite our optimistic update
      await queryClient.cancelQueries({ queryKey: ['products'] });

      // Snapshot the previous data so we can roll back if the request fails
      const previousProducts = queryClient.getQueryData<Product[]>(['products']);

      // Optimistically update the list
      queryClient.setQueryData<Product[]>(['products'], (old) => {
        if (!old) return [updatedProduct];               // list wasn’t in cache yet
        return old.map((p) => (p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p));
      });

      // Also optimistically update any “product detail” query
      queryClient.setQueryData<Product>(['product', updatedProduct.id], (old) =>
        old ? { ...old, ...updatedProduct } : updatedProduct,
      );

      // Return context for potential rollback
      return { previousProducts };
    },

    // 2️⃣  Roll back on error
    onError(_err, _vars, ctx) {
      if (ctx?.previousProducts) {
        queryClient.setQueryData(['products'], ctx.previousProducts);
      }
    },

    // 3️⃣  Finalize on success
    onSuccess(updatedProduct) {
      // Ensure both caches now hold the server‑confirmed object
      queryClient.setQueryData<Product>(['product', updatedProduct.id], updatedProduct);
      queryClient.setQueryData<Product[]>(['products'], (old) => {
        if (!old) return [updatedProduct];
        return old.map((p) => (p.id === updatedProduct.id ? updatedProduct : p));
      });
    },

    // 4️⃣  Always re‑validate
    onSettled(_data, _err, vars) {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', vars.id] });
    },
  });
}
