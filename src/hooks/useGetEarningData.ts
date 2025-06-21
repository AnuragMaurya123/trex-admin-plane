import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
import { EarningsDatum, RangeOption } from "@/lib/types/pieDiagramsType";
import { earnings } from "@/lib/constants/pieDiagramsData";


// API call
const fetchStats = async (): Promise<Record<RangeOption, EarningsDatum[]>> => {
  //   const response = await axios.post('/api/get-products'); // If your API expects POST
  //   if (!response.data?.product) {
  //     throw new Error('No products found');
  //   }
  //   return response.data.product;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return earnings;
};

// Hook
export function useGetEarningData() {
  return useQuery<Record<RangeOption, EarningsDatum[]>, Error>({
    queryKey: ["earning"],
    queryFn: fetchStats,
    staleTime: 1000 * 60 * 5, // optional: cache for 5 min
  });
}
