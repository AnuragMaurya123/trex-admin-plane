import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
import { PieDatum, PieStatCategory, RangeOption } from "@/lib/types/pieDiagramsType";
import { pieStatsData } from "@/lib/constants/pieDiagramsData";

// API call
const fetchStats = async (): Promise<Record<RangeOption, Record<PieStatCategory, PieDatum[]>>> => {
  //   const response = await axios.post('/api/get-products'); // If your API expects POST
  //   if (!response.data?.product) {
  //     throw new Error('No products found');
  //   }
  //   return response.data.product;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return pieStatsData;
};

// Hook
export function useGetPieStatsData() {
  return useQuery<Record<RangeOption, Record<PieStatCategory, PieDatum[]>>, Error>({
    queryKey: ["pieStats"],
    queryFn: fetchStats,
    staleTime: 1000 * 60 * 5, // optional: cache for 5 min
  });
}
