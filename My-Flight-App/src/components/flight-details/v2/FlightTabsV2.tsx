"use client";

import { useState } from "react";
import { Box, Button } from "@mui/material";

interface Props {
  onChange: (tab: number) => void;
}

const tabs = ["Overview", "Analytics", "History"];

export default function FlightTabsV2({ onChange }: Props) {
  const [selected, setSelected] = useState(0);

  return (
    <Box
      sx={{
        mt: 1.5,
        display: "flex",
        bgcolor: "action.hover",
        borderRadius: 2,
        p: 0.4,
      }}
    >
      {tabs.map((tab, index) => (
        <Button
          key={tab}
          fullWidth
          onClick={() => {
            setSelected(index);
            onChange(index);
          }}
          sx={{
            minHeight: 32,
            py: 0.8,
            fontSize: 12,
            textTransform: "none",
            borderRadius: 1.5,

            color: selected === index ? "primary.contrastText" : "text.secondary",
            bgcolor: selected === index ? "primary.main" : "transparent",
          }}
        >
          {tab}
        </Button>
      ))}
    </Box>
  );
}
