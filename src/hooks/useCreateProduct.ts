import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Product } from '@/lib/types/productType';
import axios from 'axios';

interface NewProduct extends Omit<Product, 'id'> {
  dateAdded: string;
}

// API service function
async function createProduct(product: NewProduct): Promise<Product> {
  const response = await axios.post('/api/products', product);
  if (!response) {
    throw new Error(`Failed to create product`);
  }
  return response.data.product;
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: (newProduct) => {
      // Invalidate and refetch products list
      queryClient.invalidateQueries({ queryKey: ['products'] });
      
      // Optionally add the new product to the cache immediately
      queryClient.setQueryData(['products'], (old: Product[]) => {
        return old ? [...old, newProduct] : [newProduct];
      });
      
      console.log('Product created successfully:', newProduct);
    },
    onError: (error) => {
      console.error('Failed to create product:', error);
    },
  });
}
