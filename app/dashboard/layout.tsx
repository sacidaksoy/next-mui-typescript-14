import * as React from "react";
import { Box, CssBaseline } from "@mui/material";

import Navbar, { DrawerHeader } from "../ui/Navbar/Navbar";
import Sidebar from "../ui/Sidebar/Sidebar";
import DialogWrapper from "@/ui/Dialog/DialogWrapper";

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
      <Box component="main" sx={{ flexGrow: 1, height: "90vh", p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
      <DialogWrapper />
    </Box>
  );
}
