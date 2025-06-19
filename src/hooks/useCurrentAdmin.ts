
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Admin } from "@/lib/types/adminType";

export function useCurrentAdmin() {
  return useQuery<Admin>({
    queryKey: ["currentAdmin"],
    queryFn: async () => {
      const res = await axios.get("/api/auth/me"); 
      return res.data;
    },
    staleTime: 1000 * 60 * 5, 
  });
}
