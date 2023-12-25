import Dialog from "./Dialog";

export default function DialogWrapper({
  searchParams,
  title,
  content,
}: {
  searchParams?: {
    showDialog?: string;
  };
  title: string;
  content: React.ReactNode;
}) {
  const showDialog = searchParams?.showDialog || "";
  return (
    <Dialog
      dialog={{
        open: showDialog === "open",
        title,
        // @ts-expect-error
        content,
      }}
    />
  );
}
