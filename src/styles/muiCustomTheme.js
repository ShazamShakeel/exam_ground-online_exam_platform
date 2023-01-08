import blue from "@mui/material/colors/blue";
import brown from "@mui/material/colors/brown";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    type: "light",
    primary: blue,
    secondary: brown,
    background: {
      default: "#F1F9FE",
    },
  },
  typography: {
    fontFamily: "Poppins",
    fontSize: 16,
  },
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
  overrides: {
    MuiButton: {
      root: {
        height: 50,
      },
    },
    MuiInputBase: {
      root: {
        height: 50,
      },
    },
  },
});

export default theme;
