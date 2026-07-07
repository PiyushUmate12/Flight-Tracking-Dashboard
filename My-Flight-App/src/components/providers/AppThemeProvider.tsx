"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { useMemo } from "react";

import { useAppSelector } from "@/store/hooks";
import { getTheme } from "@/theme/theme";

export default function AppThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const mode = useAppSelector(
    (state) => state.theme.mode
  );

  const theme = useMemo(
    () => getTheme(mode),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}