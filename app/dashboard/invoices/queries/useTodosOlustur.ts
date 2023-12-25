import { useMutation, useQueryClient } from "@tanstack/react-query";

import service from "@/service";

export const useTodosOlustur = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ payload }: { payload: unknown }) => {
      await service.post<Todos>("todos", payload);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
};
