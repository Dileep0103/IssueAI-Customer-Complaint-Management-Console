import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Stack,
  Select,
  MenuItem,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

import api from "../api/api";

function ComplaintTable({ complaints, onDelete, onView }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "error";
      case "Medium":
        return "warning";
      default:
        return "success";
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case "High":
        return "error";
      case "Medium":
        return "warning";
      default:
        return "success";
    }
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "warning";
      case "In Progress":
        return "info";
      case "Resolved":
        return "success";
      case "Closed":
        return "default";
      default:
        return "default";
    }
  };
  const handleStatusChange = async (id, status) => {
  try {
    await api.put(`/complaints/${id}/status`, {
      status,
    });

    window.location.reload();
  } catch (error) {
    console.error(error);
    alert("Failed to update status.");
  }
};

  return (
    <TableContainer component={Paper} elevation={3}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>ID</strong></TableCell>
            <TableCell><strong>Customer</strong></TableCell>
            <TableCell><strong>Category</strong></TableCell>
            <TableCell><strong>Priority</strong></TableCell>
            <TableCell><strong>Risk</strong></TableCell>
            <TableCell><strong>Actions</strong></TableCell>
            <TableCell><strong>Status</strong></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {complaints.map((complaint) => (
            <TableRow
              key={complaint.id}
              hover
            >
              <TableCell>{complaint.id}</TableCell>

              <TableCell>
                {complaint.customer_name}
              </TableCell>

              <TableCell>
                {complaint.category}
              </TableCell>

              <TableCell>
                <Chip
                  label={complaint.priority}
                  color={getPriorityColor(
                    complaint.priority
                  )}
                  size="small"
                />
              </TableCell>

              <TableCell>
                <Chip
                  label={complaint.risk_level}
                  color={getRiskColor(
                    complaint.risk_level
                  )}
                  size="small"
                />
              </TableCell>
              <TableCell>
              <Stack spacing={1}>
                <Chip
                  label={complaint.status}
                  color={getStatusColor(complaint.status)}
                  size="small"
                />

                <Select
                  size="small"
                  value={complaint.status}
                  onChange={(e) =>
                    handleStatusChange(
                      complaint.id,
                      e.target.value
                    )
                  }
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="In Progress">
                    In Progress
                  </MenuItem>
                  <MenuItem value="Resolved">
                    Resolved
                  </MenuItem>
                  <MenuItem value="Closed">
                    Closed
                  </MenuItem>
                </Select>
              </Stack>
            </TableCell>
              <TableCell>
                <Stack direction="row">
                  <IconButton 
                  color="primary"
                  onClick={() => onView(complaint.id)}
                  >
                    <VisibilityIcon />
                  </IconButton>

                  <IconButton
                      color="error"
                      onClick={() => onDelete(complaint.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ComplaintTable;