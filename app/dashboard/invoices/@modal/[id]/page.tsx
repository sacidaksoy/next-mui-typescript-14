"use client";

import Dialog from "@/ui/Dialog/Dialog";
import { useTodoIdFetch } from "../../queries/useTodoIdFetch";
import { TodoDuzenle } from "../../forms";
import { usePathname } from "next/navigation";
import { Box, CircularProgress, Typography } from "@mui/material";

export default function Page({ params }: { params: { id: string } }) {
  const todo = useTodoIdFetch({ params: { todoId: params.id } });
  const pathname = usePathname();

  return (
    <Dialog
      dialog={{
        open: pathname === `/dashboard/invoices/${params.id}`,
        loading: todo.isLoading,
        error: todo.isError,
        title: "Todo Düzenle",
        // @ts-expect-error
        content: <TodoDuzenle todo={todo.data} />,
      }}
    />
  );
}
