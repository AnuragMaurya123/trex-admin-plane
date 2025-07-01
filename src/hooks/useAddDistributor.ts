import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Distributor } from "@/lib/types/orderType"; // adjust the path if needed

// Mutation function to create a new distributor
async function addDistributor(distributor: Omit<Distributor, "_id">): Promise<Distributor> {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL!}/distributors/create`,
    distributor,
    {
      withCredentials: true,
    }
  );

  if (!response || !response.data) {
    throw new Error("Failed to add distributor");
  }

  return response.data;
}

// Custom hook to use in DistributorForm
export function useAddDistributor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addDistributor,

    // Optimistic update
    onMutate: async (newDistributor) => {
      await queryClient.cancelQueries({ queryKey: ["distributors"] });

      const previousDistributors = queryClient.getQueryData<Distributor[]>(["distributors"]);

      queryClient.setQueryData<Distributor[]>(["distributors"], (old = []) => [
        ...old,
        { _id: `temp-${Date.now()}`, ...newDistributor },
      ]);

      return { previousDistributors };
    },

    onError: (_err, _newData, context) => {
      if (context?.previousDistributors) {
        queryClient.setQueryData(["distributors"], context.previousDistributors);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["distributors"] });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["distributors"] });
    },
  });
}
