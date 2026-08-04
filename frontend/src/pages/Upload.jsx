import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

import api from "../api/api";

function Upload() {
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);

  const MAX_FILE_SIZE = 10 * 1024 * 1024;

  const validateFile = (file) => {
    if (!file) return false;

    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("File size must be less than 10 MB.");
      return false;
    }

    setError("");
    setSelectedFile(file);
    return true;
  };

  const handleFileChange = (e) => {
    validateFile(e.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    if (e.dataTransfer.files.length > 0) {
      validateFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a PDF file.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const formData = new FormData();
      formData.append("file", selectedFile);

      await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(
        "Complaint uploaded successfully! Redirecting to Dashboard..."
      );

      setSelectedFile(null);

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      console.error(err);
      setError("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <Box sx={{ p: 3 }}>
        <Typography
          variant="h4"
          sx={{ mb: 3 }}
        >
          Upload Complaint PDF
        </Typography>
        
      <Paper
        elevation={4}
        sx={{
          maxWidth: 760,
          mx: "auto",
          p: 4,
          borderRadius: 4,
        }}
      >
        <Stack spacing={3}>
          <Paper
            variant="outlined"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            sx={{
              p: 6,
              textAlign: "center",
              borderStyle: "dashed",
              borderWidth: 2,
              borderColor: dragging ? "primary.main" : "grey.400",
              bgcolor: dragging
                ? "action.hover"
                : "background.default",
              transition: "all .3s ease",
              borderRadius: 3,
              cursor: "pointer",
            }}
          >
            <CloudUploadIcon
              sx={{
                fontSize: 72,
                color: "primary.main",
                mb: 2,
              }}
            />

            <Typography
              variant="h5"
              fontWeight={600}
              gutterBottom
            >
              Drag & Drop PDF Here
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                mb: 3,
              }}
            >
              or click below to browse
            </Typography>

            <Button
              component="label"
              variant="contained"
              size="large"
              disabled={loading}
            >
              Choose PDF

              <input
                hidden
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
              />
            </Button>
          </Paper>

          {selectedFile && (
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                borderRadius: 2,
              }}
            >
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
              >
                <PictureAsPdfIcon
                  color="error"
                  fontSize="large"
                />

                <Box>
                  <Typography fontWeight="bold">
                    {selectedFile.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {(selectedFile.size / 1024).toFixed(2)} KB
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          )}

          {loading ? (
            <Stack
              alignItems="center"
              spacing={2}
            >
              <CircularProgress />

              <Typography>
                Uploading complaint...
              </Typography>
            </Stack>
          ) : (
            <Button
              variant="contained"
              size="large"
              onClick={handleUpload}
              disabled={!selectedFile}
              sx={{
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
              }}
            >
              Upload Complaint
            </Button>
          )}

          {message && (
            <Alert severity="success">
              {message}
            </Alert>
          )}

          {error && (
            <Alert severity="error">
              {error}
            </Alert>
          )}
        </Stack>
      </Paper>
    </Box>
  );
}

export default Upload;