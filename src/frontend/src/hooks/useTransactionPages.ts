import { useQuery } from "@tanstack/react-query";
import type { TransactionPage } from "../backend";
import { useActor } from "./useActor";

export function useGetTransactionPages() {
  const { actor, isFetching } = useActor();

  return useQuery<TransactionPage[]>({
    queryKey: ["transactionPages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTransactionPages();
    },
    enabled: !!actor && !isFetching,
  });
}
