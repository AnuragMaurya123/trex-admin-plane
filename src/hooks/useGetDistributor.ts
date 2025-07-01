import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Distributor } from "@/lib/types/orderType"; // adjust path as needed

// Fetch function to get all distributors
async function fetchDistributors(): Promise<Distributor[]> {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL!}/distributors/distributors`,
    {
      withCredentials: true,
    }
  );

  if (!response || !response.data) {
    throw new Error("Failed to fetch distributors");
  }

  return response.data.data as Distributor[];
}

// Custom hook to use in DistributorList
export function useGetDistributors() {
  return useQuery<Distributor[], Error>({
    queryKey: ["distributors"],
    queryFn: fetchDistributors,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1, // Retry once on error
  });
}
