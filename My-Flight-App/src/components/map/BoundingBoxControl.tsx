"use client";

import { Box, Button, Tooltip } from "@mui/material";
import CropFreeIcon from "@mui/icons-material/CropFree";
import ClearIcon from "@mui/icons-material/Clear";

interface Props {
  active: boolean;
  hasBox: boolean;
  onToggle: () => void;
  onClear: () => void;
}

export default function BoundingBoxControl({
  active,
  hasBox,
  onToggle,
  onClear,
}: Props) {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 12,
        left: 12,
        zIndex: 5,
        display: "flex",
        gap: 1,
      }}
    >
      <Tooltip title={active ? "Click and drag on the map to draw a box" : "Draw a bounding box to filter flights"}>
        <Button
          size="small"
          variant={active ? "contained" : "outlined"}
          startIcon={<CropFreeIcon fontSize="small" />}
          onClick={onToggle}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            bgcolor: active ? "primary.main" : "background.paper",
          }}
        >
          {active ? "Drawing…" : "Draw Area"}
        </Button>
      </Tooltip>

      {hasBox && (
        <Tooltip title="Clear bounding box">
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={onClear}
            sx={{ minWidth: 0, px: 1, borderRadius: 2 }}
          >
            <ClearIcon fontSize="small" />
          </Button>
        </Tooltip>
      )}
    </Box>
  );
}