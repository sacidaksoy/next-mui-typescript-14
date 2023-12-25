import { useMutation, useQueryClient } from "@tanstack/react-query";

import service from "@/service";

export const useTodosDuzenle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      todo,
      payload,
    }: {
      todo: Todos;
      payload: unknown;
    }) => {
      await service.patch<Todos>(`todos/${todo.id}`, payload);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
};
