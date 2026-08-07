import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api"; 
 
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setError("");

      const response = await api.post("/auth/login", {
        username,
        password,
      });

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      navigate("/");
    } catch (err) {
      setError("Invalid username or password.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        bgcolor: "#f4f6f8",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          width: 400,
          borderRadius: 3,
        }}
      >
        <Stack spacing={3}>
          <Typography variant="h4" textAlign="center">
            Admin Login
          </Typography>

          <TextField
            label="Username"
            fullWidth
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

          <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

          {error && (
            <Alert severity="error">
              {error}
            </Alert>
          )}

          <Button
            variant="contained"
            size="large"
            onClick={handleLogin}
          >
            Login
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}

export default Login;