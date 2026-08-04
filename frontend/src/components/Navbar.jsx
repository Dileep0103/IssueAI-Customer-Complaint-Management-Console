import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Tooltip,
} from "@mui/material";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

function Navbar({ darkMode, setDarkMode }) {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    handleMenuClose();
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
        }}
      >
      <Box
  sx={{
    display: "flex",
    alignItems: "center",
    gap: 1.5,
  }}
>
  <Avatar
    sx={{
      width: 42,
      height: 42,
      bgcolor: "#ffffff",
      color: "#1976d2",
      fontSize: "1.4rem",
      fontWeight: "bold",
      boxShadow: 2,
    }}
  >
    🤖
  </Avatar>

  <Typography
    variant="h5"
    sx={{
      fontWeight: 800,
      letterSpacing: 1.2,
      userSelect: "none",
    }}
  >
    <Box
      component="span"
      sx={{
        color: "#FFD54F",
      }}
    >
      Issue
    </Box>
    <Box
      component="span"
      sx={{
        color: "#fff",
      }}
    >
     AI
    </Box>
  </Typography>
</Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexWrap: "nowrap",
            whiteSpace: "nowrap",
          }}
        >
          {/* Theme Toggle */}
          <Tooltip
            title={
              darkMode
                ? "Switch to Light Mode"
                : "Switch to Dark Mode"
            }
          >
            <IconButton
              color="inherit"
              onClick={() =>
                setDarkMode(!darkMode)
              }
            >
              {darkMode ? (
                <LightModeIcon />
              ) : (
                <DarkModeIcon />
              )}
            </IconButton>
          </Tooltip>

          <Typography>
            Admin
          </Typography>

          <IconButton
            color="inherit"
            onClick={handleMenuOpen}
          >
            <Avatar
              sx={{
                bgcolor: "secondary.main",
              }}
            >
              A
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
          >
            <MenuItem disabled>
              👤 Admin
            </MenuItem>

            <Divider />

            <MenuItem onClick={handleLogout}>
              🚪 Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;