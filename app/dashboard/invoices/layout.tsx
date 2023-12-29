export default function DashboardLayout({
  children,
  modal,
}: {
  modal: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
