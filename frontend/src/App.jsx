import { useState, useMemo, useEffect } from "react";
import { Box, Toolbar } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { lightTheme, darkTheme } from "./theme/theme";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Analyze from "./pages/Analyze";
import ComplaintAssistant from "./pages/ComplaintAssistant";
import Analytics from "./pages/Analytics";
import Login from "./pages/Login";

function App() {
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem(
      "theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  const theme = useMemo(
    () => (darkMode ? darkTheme : lightTheme),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box sx={{ display: "flex" }}>
        {/* Navbar */}
        {!isLoginPage && (
          <Navbar
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        )}

        {/* Sidebar */}
        {!isLoginPage && <Sidebar />}

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "background.default",
            minHeight: "100vh",
          }}
        >
          {!isLoginPage && <Toolbar />}

          <Box
            sx={{
              px: isLoginPage ? 0 : 3,
              py: isLoginPage ? 0 : 2,
            }}
          >
            <Routes>
              {/* Public */}
              <Route
                path="/login"
                element={<Login />}
              />

              {/* Protected */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/upload"
                element={
                  <ProtectedRoute>
                    <Upload />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/analyze"
                element={
                  <ProtectedRoute>
                    <Analyze />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/ComplaintAssistant"
                element={
                  <ProtectedRoute>
                    <ComplaintAssistant />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/analytics"
                element={
                  <ProtectedRoute>
                    <Analytics />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;