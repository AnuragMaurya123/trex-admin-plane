import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Variables } from "@/lib/types/variablesType";

export function useGetVariable() {
  return useQuery<Variables>({
    queryKey: ["variables"],
    queryFn: async () => {
      const accessToken = localStorage.getItem("accessToken");

      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL!}/variables/listofvariables`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });

      return res.data.data as Variables;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
