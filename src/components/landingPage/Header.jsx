import { Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";

export default function Header() {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const token = localStorage.getItem("token");
  return (
    <Stack
      component="header"
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      p={{ xs: 1, md: 2 }}
      backgroundColor="white"
      height="60px"
    >
      <Stack direction="row" alignItems="center" spacing={{ xs: 1, md: 2 }}>
        <img
          src={require("assets/images/Logo.png")}
          alt="Exam Ground Site Logo"
          height={isSmall ? "30px" : "40px"}
          width="auto"
        />
        <Typography variant="h5" component="h1" fontWeight="bold">
          Exam Ground
        </Typography>
      </Stack>
      {token ? (
        <Button
          component={Link}
          to="/dashboard"
          variant="contained"
          size={isSmall ? "small" : "medium"}
        >
          Dashboard
        </Button>
      ) : (
        <Stack direction="row" alignItems="center" spacing={{ xs: 1, md: 2 }}>
          <Button
            component={Link}
            to="/signup"
            variant="contained"
            color="secondary"
            size={isSmall ? "small" : "medium"}
          >
            Sign Up
          </Button>
          <Button
            component={Link}
            to="/login"
            variant="contained"
            color="primary"
            size={isSmall ? "small" : "medium"}
          >
            Login
          </Button>
        </Stack>
      )}
    </Stack>
  );
}
