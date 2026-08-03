import { useEffect, useState } from "react";
import AppSnackbar from "../components/AppSnackbar";
import {
  Typography,
  CircularProgress,
  Grid,
  TextField,
  InputAdornment,
  Paper,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import api from "../api/api";
import ComplaintTable from "../components/ComplaintTable";
import StatCard from "../components/StatCard";
import ComplaintDialog from "../components/ComplaintDialog";

import DescriptionIcon from "@mui/icons-material/Description";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ComputerIcon from "@mui/icons-material/Computer";
import DeleteConfirmDialog from "../components/DeleteConfirmDialog";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { CSVLink } from "react-csv";

function Dashboard() {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [riskFilter, setRiskFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [loading, setLoading] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
  open: false,
  message: "",
  severity: "success",
});
const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
const [complaintToDelete, setComplaintToDelete] = useState(null);

  // Fetch all complaints
  const fetchComplaints = async () => {
    try {
      setLoading(true);

      const response = await api.get("/complaints/");
      setComplaints(response.data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // Delete complaint
  const handleDelete = (id) => {
  setComplaintToDelete(id);
  setDeleteDialogOpen(true);
};

const confirmDelete = async () => {
  try {
    await api.delete(`/complaints/${complaintToDelete}`);

    setSnackbar({
      open: true,
      message: "Complaint deleted successfully.",
      severity: "success",
    });

    fetchComplaints();
  } catch (error) {
    console.error("Delete failed:", error);

    setSnackbar({
      open: true,
      message: "Failed to delete complaint.",
      severity: "error",
    });
  } finally {
    setDeleteDialogOpen(false);
    setComplaintToDelete(null);
  }
};
  // View complaint
  const handleView = async (id) => {
    try {
      const response = await api.get(`/complaints/${id}`);

      setSelectedComplaint(response.data);
      setDialogOpen(true);
    } catch (error) {
      console.error("Failed to fetch complaint:", error);
    setSnackbar({
      open: true,
      message: "Unable to load complaint details.",
      severity: "error",
    });
    }
  };

  // Loading Spinner
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

  // Dashboard statistics
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

  // Search + Filters
  const filteredComplaints = complaints.filter((complaint) => {
    const query = search.toLowerCase();

    const matchesSearch =
      (complaint.customer_name || "")
        .toLowerCase()
        .includes(query) ||
      (complaint.category || "")
        .toLowerCase()
        .includes(query) ||
      (complaint.complaint || "")
        .toLowerCase()
        .includes(query);

    const matchesCategory =
      categoryFilter === "All" ||
      complaint.category === categoryFilter;

    const matchesPriority =
      priorityFilter === "All" ||
      complaint.priority === priorityFilter;

    const matchesRisk =
      riskFilter === "All" ||
      complaint.risk_level === riskFilter;

    const matchesStatus =
      statusFilter === "All" ||
      complaint.status === statusFilter;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesPriority &&
      matchesRisk &&
      matchesStatus
    );
  });
  const csvHeaders = [
  { label: "ID", key: "id" },
  { label: "Customer Name", key: "customer_name" },
  { label: "Category", key: "category" },
  { label: "Priority", key: "priority" },
  { label: "Risk Level", key: "risk_level" },
  { label: "Status", key: "status" },
  { label: "Complaint", key: "complaint" },
  { label: "AI Summary", key: "ai_summary" },
  { label: "Created At", key: "created_at" },
];

const exportPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("AI Complaint Management Report", 14, 18);

  doc.setFontSize(10);
  doc.text(
    `Generated: ${new Date().toLocaleString()}`,
    14,
    26
  );

  autoTable(doc, {
    startY: 35,
    head: [[
      "ID",
      "Customer",
      "Category",
      "Priority",
      "Risk",
      "Status",
    ]],
    body: filteredComplaints.map((item) => [
      item.id,
      item.customer_name,
      item.category,
      item.priority,
      item.risk_level,
      item.status,
    ]),
    theme: "grid",
    headStyles: {
      fillColor: [25, 118, 210],
    },
    styles: {
      fontSize: 9,
    },
  });

  doc.save(
    `Complaint_Report_${
      new Date().toISOString().split("T")[0]
    }.pdf`
  );
};
  return (
  <>
  <Typography variant="h4" mb={3}>
    Dashboard
  </Typography>

    {/* Statistics Cards */}
    <Grid container spacing={3} sx={{mt: 2, mb: 3,}}>
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
        color="#f57c00"
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

    {/* Search Box */}
    <Paper
      elevation={2}
      sx={{
        p: 2,
        mb: 3,
        borderRadius: 2,
      }}
    >
      <TextField
        fullWidth
        label="Search complaints"
        placeholder="Search by customer, category, or complaint..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
      />
    </Paper>

    {/* Filters */}
    <Paper
      elevation={2}
      sx={{
        p: 2,
        mb: 3,
        borderRadius: 2,
      }}
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={categoryFilter}
              label="Category"
              onChange={(e) =>
                setCategoryFilter(e.target.value)
              }
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Billing">Billing</MenuItem>
              <MenuItem value="Technical">Technical</MenuItem>
              <MenuItem value="Account">Account</MenuItem>
              <MenuItem value="Delivery">Delivery</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
              value={priorityFilter}
              label="Priority"
              onChange={(e) =>
                setPriorityFilter(e.target.value)
              }
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Risk Level</InputLabel>
            <Select
              value={riskFilter}
              label="Risk Level"
              onChange={(e) =>
                setRiskFilter(e.target.value)
              }
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">
                In Progress
              </MenuItem>
              <MenuItem value="Resolved">Resolved</MenuItem>
              <MenuItem value="Closed">Closed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
<Box
  sx={{
    display: "flex",
    justifyContent: "flex-end",
    gap: 2,
    mb: 2,
  }}
>
  <CSVLink
    data={filteredComplaints}
    headers={csvHeaders}
    filename={`complaints_${
      new Date().toISOString().split("T")[0]
    }.csv`}
    style={{ textDecoration: "none" }}
  >
    <Button
      variant="contained"
      color="success"
    >
      Export CSV
    </Button>
  </CSVLink>

  <Button
    variant="contained"
    color="error"
    onClick={exportPDF}
  >
    Export PDF
  </Button>
</Box>

    {/* Complaint Table */}
    {filteredComplaints.length > 0 ? (
      <ComplaintTable
        complaints={filteredComplaints}
        onDelete={handleDelete}
        onView={handleView}
      />
    ) : (
      <Paper
        sx={{
          p: 4,
          textAlign: "center",
          borderRadius: 2,
        }}
      >
        <Typography color="text.secondary">
          No complaints found.
        </Typography>
      </Paper>
    )}

    {/* View Dialog */}
    <ComplaintDialog
      open={dialogOpen}
      complaint={selectedComplaint}
      onClose={() => setDialogOpen(false)}
    />
    <DeleteConfirmDialog
      open={deleteDialogOpen}
      onClose={() => {
        setDeleteDialogOpen(false);
        setComplaintToDelete(null);
      }}
      onConfirm={confirmDelete}
    />
    <AppSnackbar
      open={snackbar.open}
      message={snackbar.message}
      severity={snackbar.severity}
      onClose={() =>
        setSnackbar({
          ...snackbar,
          open: false,
        })
      }
    />
  </>
);
}

export default Dashboard;