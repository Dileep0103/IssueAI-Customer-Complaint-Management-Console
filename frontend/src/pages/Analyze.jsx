import { useState } from "react";
import api from "../api/api";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
  Typography,
  Chip,
  Divider,
} from "@mui/material";

function Analyze() {
  const [complaint, setComplaint] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!complaint.trim()) {
      setError("Please enter a complaint.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const response = await api.post("/analyze", {
        complaint: complaint,
      });

      // Store only the analysis object
      setResult(response.data.analysis);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze complaint.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" mb={3}>
        Analyze Complaint
      </Typography>

      <Paper
        elevation={3}
        sx={{
          maxWidth: 800,
          mx: "auto",
          p: 4,
          borderRadius: 3,
        }}
      >
        <Stack spacing={3}>
          <Typography variant="h6">
            Enter Customer Complaint
          </Typography>

          <TextField
            multiline
            rows={8}
            fullWidth
            label="Complaint"
            placeholder="Type or paste the customer complaint here..."
            value={complaint}
            onChange={(e) => {
              setComplaint(e.target.value);
              setResult(null);
              setError("");
            }}
          />

          <Button
            variant="contained"
            size="large"
            onClick={handleAnalyze}
            disabled={loading || !complaint.trim()}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Analyze Complaint"
            )}
          </Button>

          {error && (
            <Alert severity="error">
              {error}
            </Alert>
          )}

          {result && (
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 2,
                bgcolor: "#fafafa",
              }}
            >
              <Typography variant="h5" gutterBottom>
                AI Analysis Result
              </Typography>

              <Divider sx={{ mb: 3 }} />

              <Stack spacing={3}>
                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    Category
                  </Typography>

                  <Chip
                    label={result.category}
                    color="primary"
                  />
                </Box>

                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    Priority
                  </Typography>

                  <Chip
                    label={result.priority}
                    color={
                      result.priority === "High"
                        ? "error"
                        : result.priority === "Medium"
                        ? "warning"
                        : "success"
                    }
                  />
                </Box>

                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    Risk Level
                  </Typography>

                  <Chip
                    label={result.risk_level}
                    color={
                      result.risk_level === "High"
                        ? "error"
                        : result.risk_level === "Medium"
                        ? "warning"
                        : "success"
                    }
                  />
                </Box>

                <Divider />

                <Box>
                  <Typography variant="h6" gutterBottom>
                    AI Summary
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{
                      whiteSpace: "pre-line",
                      lineHeight: 1.8,
                    }}
                  >
                    {result.summary}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          )}
        </Stack>
      </Paper>
    </Box>
  );
}

export default Analyze;