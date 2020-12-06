import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core/styles";

// custom styling for later
export default createMuiTheme({
  palette: {
    primary: {
      light: "#5f5fc4",
      main: "#283593",
      dark: "#001064",
      contrastText: "#fff",
    },
    secondary: {
      light: "#e7ff8c",
      main: "#b2ff59",
      dark: "#7ecb20",
      contrastText: "#000",
    },
    success: {
      light: "#81c784",
      main: "#4caf50",
      dark: "#388e3c",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff",
    },
    warning: {
      light: "#ffb74d",
      main: "#ff9800",
      dark: "#f57c00",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
  },
  typography: {
    tab: {
      textTransform: "none",
      fontFamily: "Roboto",
    },
  },
});
