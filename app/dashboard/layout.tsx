import { Box, CssBaseline } from "@mui/material";
import { Suspense } from "react";

import Navbar, { DrawerHeader } from "../ui/Navbar/Navbar";
import Sidebar from "../ui/Sidebar/Sidebar";
import Loading from "./loading";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar />
      <Sidebar />
      <Suspense fallback={<Loading />}>
        <Box component="main" sx={{ flexGrow: 1, height: "90vh", p: 3 }}>
          <DrawerHeader />
          {children}
        </Box>
      </Suspense>
    </Box>
  );
}
