"use client";

import { useAppSelector } from "@/lib/hooks";
import Dialog from "./Dialog";

export default function DialogWrapper() {
  const dialogs = useAppSelector((state) => state.app.dialogs);

  return (
    <>
      {dialogs.map((dialog, index) => (
        <Dialog key={`dialog-${index}`} dialog={dialog} />
      ))}
    </>
  );
}
