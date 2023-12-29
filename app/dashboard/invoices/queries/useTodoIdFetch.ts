import { useQuery } from "@tanstack/react-query";
import service from "@/service";

const queryKeys = {
  TODOS: "todos",
} as const;

async function getTodo(todoId: string) {
  const response = await service.get(`todos/${todoId}`).then((res) => res.data);
  return response;
}

export const useTodoIdFetch = ({
  params,
}: { params?: { todoId: string } } = {}) =>
  useQuery({
    queryKey: [queryKeys.TODOS, params],
    queryFn: () => getTodo(params?.todoId || ""),
  });
