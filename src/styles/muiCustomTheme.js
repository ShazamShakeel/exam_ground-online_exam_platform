import blue from "@mui/material/colors/blue";
import brown from "@mui/material/colors/brown";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    type: "light",
    primary: blue,
    secondary: brown,
    background: {
      default: "#EDF7FB",
    },
  },
  typography: {
    fontFamily: "Poppins",
    fontSize: 16,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 360,
      md: 1024,
      lg: 1280,
      xl: 1536,
    },
  },
  shape: {
    borderRadius: 20,
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
