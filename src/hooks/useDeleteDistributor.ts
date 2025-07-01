    import { useMutation, useQueryClient } from "@tanstack/react-query";
    import axios from "axios";

    export async function deleteDistributor(distributorId: string): Promise<void> {
    const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL!}/distributors/${distributorId}`,
        { withCredentials: true }
    );

    if (!response || response.status !== 200) {
        throw new Error("Failed to delete distributor");
    }
    }

    // Custom mutation hook
    export function useDeleteDistributor() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteDistributor,
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["distributors"] });
        },
        onError: (error) => {
        console.error("Delete error:", error);
        },
    });
    }
