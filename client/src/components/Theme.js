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
  },
  typography: {
    tab: {
      textTransform: "none",
      fontFamily: "Roboto",
    },
  },
});
