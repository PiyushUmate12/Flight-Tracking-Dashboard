import { Skeleton, Box } from "@mui/material";

export default function MapSkeleton() {
  return (
    <Box sx={{ width: "100%", height: "100%", p: 2 }}>
      <Skeleton
        variant="rounded"
        width="100%"
        height="100%"
        animation="wave"
        sx={{
          borderRadius: 4,
        }}
      />
    </Box>
  );
}