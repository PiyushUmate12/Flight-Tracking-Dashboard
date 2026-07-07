"use client";

import { Card, CardContent, Typography, useTheme } from "@mui/material";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

import { FlightHistoryPoint } from "@/hooks/useFlightHistory";

interface Props {
  history: FlightHistoryPoint[];
}

export default function SpeedChart({
  history,
}: Props) {
  const theme = useTheme();

  return (
    <Card
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
        borderRadius: 3,
        border: 1,
        borderColor: "divider",
      }}
    >
      <CardContent
        sx={{
          p: 2,
          "&:last-child": {
            pb: 2,
          },
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 15,
            mb: 2,
          }}
        >
          Speed
        </Typography>

        <div
          style={{
            width: "100%",
            height: 170,
          }}
        >
          <ResponsiveContainer>
            <LineChart data={history}>
              <CartesianGrid
                vertical={false}
                stroke="currentColor"
                opacity={0.16}
              />

              <XAxis
                dataKey="time"
                tick={{
                  fill: "currentColor",
                  fontSize: 10,
                }}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                tick={{
                  fill: "currentColor",
                  fontSize: 10,
                }}
                tickLine={false}
                axisLine={false}
              />

              <Tooltip
                contentStyle={{
                  background: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 10,
                  color: theme.palette.text.primary,
                }}
              />

              <Line
                type="monotone"
                dataKey="speed"
                stroke="#22c55e"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
