"use client"

import { Backdrop, CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <Backdrop
      open
      sx={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Backdrop>
  );
}
