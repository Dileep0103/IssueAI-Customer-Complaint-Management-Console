import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Paper, Typography } from "@mui/material";

const COLORS = [
  "#1976d2",
  "#2e7d32",
  "#ed6c02",
  "#d32f2f",
  "#7b1fa2",
  "#00838f",
];

function CategoryPieChart({ complaints }) {
  const categoryCounts = complaints.reduce((acc, complaint) => {
    const category = complaint.category || "Unknown";

    acc[category] = (acc[category] || 0) + 1;

    return acc;
  }, {});

  const data = Object.keys(categoryCounts).map((key) => ({
    name: key,
    value: categoryCounts[key],
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
        Complaint Categories
      </Typography>

      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Paper>
  );
}

export default CategoryPieChart;