import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Divider,
  Chip,
  Grid,
  Paper,
  Stack,
} from "@mui/material";

import {
  Person,
  Email,
  Phone,
  Description,
  SmartToy,
} from "@mui/icons-material";

function ComplaintDialog({ open, complaint, onClose }) {
  if (!complaint) return null;

  // ----------------------------
  // Colors for Chips
  // ----------------------------
  const priorityColor =
    complaint.priority === "High"
      ? "error"
      : complaint.priority === "Medium"
      ? "warning"
      : "success";

  const riskColor =
    complaint.risk_level === "High"
      ? "error"
      : complaint.risk_level === "Medium"
      ? "warning"
      : "success";

  // ----------------------------
  // Parse Complaint Text
  // ----------------------------
  const text = complaint.complaint || "";

  const getValue = (label) => {
    const regex = new RegExp(`${label}:\\s*(.*)`);
    const match = text.match(regex);
    return match ? match[1].trim() : "Not Available";
  };

  const customerName = getValue("Customer Name");
  const email = getValue("Email");
  const phone = getValue("Phone");

  let complaintBody = text;

  const complaintMatch = text.match(
    /Complaint:\s*([\s\S]*?)Thank you\./
  );

  if (complaintMatch) {
    complaintBody = complaintMatch[1].trim();
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        📄 Complaint Details
      </DialogTitle>

      <DialogContent dividers>

        {/* Customer Information */}

        <Paper sx={{ p: 3, mb: 3 }}>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            mb={2}
          >
            <Person color="primary" />
            <Typography variant="h6">
              Customer Information
            </Typography>
          </Stack>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
              >
                <Person fontSize="small" />
                <Typography fontWeight="bold">
                  Name
                </Typography>
              </Stack>

              <Typography sx={{ mt: 1 }}>
                {customerName}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
              >
                <Email fontSize="small" />
                <Typography fontWeight="bold">
                  Email
                </Typography>
              </Stack>

              <Typography sx={{ mt: 1 }}>
                {email}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
              >
                <Phone fontSize="small" />
                <Typography fontWeight="bold">
                  Phone
                </Typography>
              </Stack>

              <Typography sx={{ mt: 1 }}>
                {phone}
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* AI Analysis */}

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography
            variant="h6"
            gutterBottom
          >
            AI Analysis
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            flexWrap="wrap"
          >
            <Chip
              label={complaint.category}
              color="primary"
            />

            <Chip
              label={complaint.priority}
              color={priorityColor}
            />

            <Chip
              label={complaint.risk_level}
              color={riskColor}
            />
          </Stack>
        </Paper>

        {/* Complaint */}

        <Paper sx={{ p: 3, mb: 3 }}>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            mb={2}
          >
            <Description color="primary" />

            <Typography variant="h6">
              Complaint
            </Typography>
          </Stack>

          <Divider sx={{ mb: 2 }} />

          <Typography
            sx={{
              whiteSpace: "pre-line",
            }}
          >
            {complaintBody}
          </Typography>
        </Paper>

        {/* AI Summary */}

        <Paper sx={{ p: 3 }}>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            mb={2}
          >
            <SmartToy color="primary" />

            <Typography variant="h6">
              AI Summary
            </Typography>
          </Stack>

          <Divider sx={{ mb: 2 }} />

          <Typography>
            {complaint.ai_summary}
          </Typography>
        </Paper>

      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          onClick={onClose}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ComplaintDialog;