"use client";

import { Card, CardContent, Typography, useTheme } from "@mui/material";

import {
  AreaChart,
  Area,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { FlightHistoryPoint } from "@/hooks/useFlightHistory";

interface Props {
  history: FlightHistoryPoint[];
}

export default function AltitudeChart({
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
          Altitude
        </Typography>

        <div
          style={{
            width: "100%",
            height: 170,
          }}
        >
          <ResponsiveContainer>
            <AreaChart data={history}>
              <defs>
                <linearGradient
                  id="altitudeFill"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#3b82f6"
                    stopOpacity={0.55}
                  />

                  <stop
                    offset="100%"
                    stopColor="#3b82f6"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

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

              <Area
                type="monotone"
                dataKey="altitude"
                stroke="#3b82f6"
                strokeWidth={3}
                fill="url(#altitudeFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
