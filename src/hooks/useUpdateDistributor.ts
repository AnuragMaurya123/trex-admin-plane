import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { DistributorFormData } from "@/validationSchema/distributorSchema"

interface UpdatePayload extends DistributorFormData {
  id: string
}

async function updateDistributorRequest({ id, ...data }: UpdatePayload) {
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/distributors/${id}`,
    data,
    {
      withCredentials: true,
    }
  )

  if (!response || !response.data) {
    throw new Error("Failed to update distributor")
  }

  return response.data.data
}

export function useUpdateDistributor() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateDistributorRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["distributors"] })
    },
  })
}
