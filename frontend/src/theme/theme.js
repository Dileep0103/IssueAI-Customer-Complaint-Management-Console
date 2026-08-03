import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#1976d2",
    },

    secondary: {
      main: "#2e7d32",
    },

    background: {
      default: "#f4f6f8",
      paper: "#ffffff",
    },
  },

  typography: {
    fontFamily: "Inter, sans-serif",
  },

  shape: {
    borderRadius: 12,
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#90caf9",
    },

    secondary: {
      main: "#81c784",
    },

    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
  },

  typography: {
    fontFamily: "Inter, sans-serif",
  },

  shape: {
    borderRadius: 12,
  },
});
