import { useEffect, useState } from "react";
import { Typography, Grid, CircularProgress, Box } from "@mui/material";

import api from "../api/api";
import StatCard from "../components/StatCard";
import CategoryPieChart from "../components/charts/CategoryPieChart";
import RiskBarChart from "../components/charts/RiskBarChart";

import DescriptionIcon from "@mui/icons-material/Description";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ComputerIcon from "@mui/icons-material/Computer";

import TrendLineChart from "../components/charts/TrendLineChart";

function Analytics() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComplaints = async () => {
    try {
      const response = await api.get("/complaints/");
      setComplaints(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="60vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  const total = complaints.length;

  const highRisk = complaints.filter(
    (c) => c.risk_level === "High"
  ).length;

  const billing = complaints.filter(
    (c) => c.category === "Billing"
  ).length;

  const technical = complaints.filter(
    (c) => c.category === "Technical"
  ).length;

  return (
    <>
      <Typography variant="h4" mb={3}>
        Analytics
      </Typography>

      <Grid container spacing={3} mb={3} sx={{ mt: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StatCard
            title="Total Complaints"
            value={total}
            icon={<DescriptionIcon />}
            color="#1976d2"
        />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StatCard
            title="High Risk"
            value={highRisk}
            icon={<WarningAmberIcon />}
            color="#d32f2f"
        />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StatCard
            title="Billing"
            value={billing}
            icon={<ReceiptLongIcon />}
            color="#ed6c02"
        />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StatCard
            title="Technical"
            value={technical}
            icon={<ComputerIcon />}
            color="#2e7d32"
        />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid size={{ xs: 12, lg: 6 }}>
            <CategoryPieChart complaints={complaints} />
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
            <RiskBarChart complaints={complaints} />
        </Grid>
       </Grid>
       <Grid container spacing={3} mt={1} sx={{ mt: 3 }}>
            <Grid size={{ xs: 12 }}>
                <TrendLineChart complaints={complaints} />
            </Grid>
        </Grid>
    </>
  );
}

export default Analytics;