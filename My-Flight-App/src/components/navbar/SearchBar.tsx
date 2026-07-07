"use client";

import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSearchQuery } from "@/features/flights";

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.flights.searchQuery);

  const [value, setValue] = useState(searchQuery);

  useEffect(() => {
    const handle = setTimeout(() => {
      dispatch(setSearchQuery(value.trim()));
    }, 300);

    return () => clearTimeout(handle);
  }, [value, dispatch]);

  useEffect(() => {
    setValue(searchQuery);
  }, [searchQuery]);

  return (
    <TextField
      placeholder="Search by callsign, airline, or airport..."
      size="small"
      fullWidth
      value={value}
      onChange={(e) => setValue(e.target.value)}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
          endAdornment: value ? (
            <InputAdornment position="end">
              <IconButton size="small" onClick={() => setValue("")}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ) : undefined,
        },
      }}
    />
  );
}