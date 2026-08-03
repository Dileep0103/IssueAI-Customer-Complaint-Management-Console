import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { Paper, Typography } from "@mui/material";

function TrendLineChart({ complaints }) {
  const counts = {};

  complaints.forEach((complaint) => {
    const date = new Date(complaint.created_at).toLocaleDateString();

    counts[date] = (counts[date] || 0) + 1;
  });

  const data = Object.keys(counts)
    .sort((a, b) => new Date(a) - new Date(b))
    .map((date) => ({
      date,
      complaints: counts[date],
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
        Complaint Trend
      </Typography>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="date" />

          <YAxis allowDecimals={false} />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="complaints"
            stroke="#1976d2"
            strokeWidth={3}
            dot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
}

export default TrendLineChart;