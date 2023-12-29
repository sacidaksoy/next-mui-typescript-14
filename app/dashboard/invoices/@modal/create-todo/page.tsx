"use client";

import Dialog from "@/ui/Dialog/Dialog";
import { TodoOlustur } from "../../forms";
import { usePathname } from "next/navigation";

export default function Page() {
  const pathname = usePathname();
  return (
    <Dialog
      dialog={{
        open: pathname === `/dashboard/invoices/create-todo`,
        title: "Todo Düzenle",
        // @ts-expect-error
        content: <TodoOlustur />,
      }}
    />
  );
}
