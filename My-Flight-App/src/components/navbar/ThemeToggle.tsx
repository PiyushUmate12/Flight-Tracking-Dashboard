"use client";

import IconButton from "@mui/material/IconButton";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleTheme } from "@/features/theme/themeSlice";

export default function ThemeToggle() {
  const dispatch = useAppDispatch();

  const mode = useAppSelector(
    (state) => state.theme.mode
  );

  return (
    <IconButton
  color="inherit"
  onClick={() => dispatch(toggleTheme())}
  sx={{
    color: "text.primary",
  }}
>
  {mode === "dark" ? (
    <LightModeIcon />
  ) : (
    <DarkModeIcon />
  )}
</IconButton>
  );
}