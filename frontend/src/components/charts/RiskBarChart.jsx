import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { Paper, Typography } from "@mui/material";

function RiskBarChart({ complaints }) {
  const riskCounts = complaints.reduce((acc, complaint) => {
    const risk = complaint.risk_level || "Unknown";

    acc[risk] = (acc[risk] || 0) + 1;

    return acc;
  }, {});

  const data = Object.keys(riskCounts).map((key) => ({
    risk: key,
    count: riskCounts[key],
  }));

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        height: 400,
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" mb={2}>
        Risk Level Distribution
      </Typography>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="risk" />

          <YAxis allowDecimals={false} />

          <Tooltip />

          <Bar
            dataKey="count"
            fill="#1976d2"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}

export default RiskBarChart;