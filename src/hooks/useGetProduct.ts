import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
import { Product } from "@/lib/types/productType";
import { dummyProducts } from "@/lib/constants/productData";


// API call
const fetchProducts = async (): Promise<Product[]> => {
  //   const response = await axios.post('/api/get-products'); // If your API expects POST
  //   if (!response.data?.product) {
  //     throw new Error('No products found');
  //   }
  //   return response.data.product;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return dummyProducts;
};

// Hook
export function useGetProduct() {
  return useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5, // optional: cache for 5 min
  });
}
