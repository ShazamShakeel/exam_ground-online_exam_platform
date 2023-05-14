import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn);

  return (
    <Box component="main" height={{ xs: "auto", md: "calc(100vh - 60px)" }}>
      <Grid container height="100%" py={{ xs: 2, md: 0 }}>
        <Grid
          item
          xs={12}
          md={6}
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={2}
          p={3}
        >
          <Typography
            variant="h4"
            component="h1"
            fontWeight="bold"
            textAlign="center"
          >
            Easiest way to make exams
          </Typography>
          <Typography variant="h5" component="h2" textAlign="center">
            Exam ground is the best software platform for exams in your
            institution. We make life easier for thousands of teachers, schools
            and companies everyday.
          </Typography>
          <Button
            component={Link}
            variant="contained"
            color="primary"
            size="large"
            to={isLoggedIn ? "/dashboard" : "/signup"}
            sx={{
              maxWidth: { xs: "150px", md: "200px" },
            }}
          >
            {isLoggedIn ? "Go to Dashboard" : "Get started for free"}
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          px={3}
        >
          <img
            src={require("assets/images/HeroSection.png")}
            alt="Hero Section"
          />
        </Grid>
      </Grid>
      <Divider variant="middle" sx={{ mb: 4 }} />
    </Box>
  );
}
