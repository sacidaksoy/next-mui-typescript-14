import { useMutation, useQueryClient } from "@tanstack/react-query";

import service from "@/service";

export const useTodosSil = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ todos }: { todos: Todos }) => {
      await service.delete<Todos>(`todos/${todos.id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
};
