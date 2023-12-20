import { useQuery } from "@tanstack/react-query";
import service from "@/service";

const queryKeys = {
  TODOS: "todos",
} as const;

interface ParamsProps {
  start?: number;
  limit?: number;
}

async function getTodos(params: ParamsProps) {
  const { start = 0, limit = 10 } = params;
  const response = await service.get<Todos[]>(
    `todos/?_start=${start}&_limit=${limit}`
  );
  return response.data;
}

export const useTodos = ({ params }: { params?: ParamsProps } = {}) =>
  useQuery({
    queryKey: [queryKeys.TODOS, params],
    queryFn: () => getTodos(params || {}),
  });
