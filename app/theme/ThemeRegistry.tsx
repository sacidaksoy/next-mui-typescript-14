"use client";

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material/styles";
import { NextAppDirEmotionCacheProvider } from "./EmotionCache";

const defaultTheme = createTheme();

export const themeOptions: ThemeOptions = {
  typography: {},
  palette: {
    background: {
      default: "#f2f2f2",
    },
    primary: {
      main: "#E88D14",
    },
    secondary: {
      main: "#D85604",
    },
    pwc: {
      primary: defaultTheme.palette.augmentColor({
        color: {
          main: "#E88D14",
        },
        name: "pwc",
      }),
      secondary: defaultTheme.palette.augmentColor({
        color: {
          main: "#D85604",
        },
        name: "pwc",
      }),
    },
  },
};

const theme = createTheme(themeOptions);

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
