import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,

      primary: {
        main: "#3B82F6",
      },

      secondary: {
        main: "#06B6D4",
      },

      success: {
        main: "#22C55E",
      },

      warning: {
        main: "#F59E0B",
      },

      error: {
        main: "#EF4444",
      },

      background: {
        default: mode === "dark" ? "#0F172A" : "#F8FAFC",
        paper: mode === "dark" ? "#1E293B" : "#FFFFFF",
      },

      text: {
        primary: mode === "dark" ? "#F8FAFC" : "#0F172A",
        secondary: "#94A3B8",
      },
    },

    shape: {
      borderRadius: 12,
    },

    typography: {
      fontFamily: "Inter, sans-serif",
    },
  });