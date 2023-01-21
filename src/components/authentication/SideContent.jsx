import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import AuthPageCenterObject from "assets/images/AuthPageCenterObject.png";
import AuthPageRectangles from "assets/images/AuthPageRectangles.png";
import { Link, useLocation } from "react-router-dom";

export default function SideContent() {
  const pagePathName = useLocation().pathname;
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const isMedium = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const isLarge = useMediaQuery((theme) => theme.breakpoints.down("xl"));

  return (
    <Box
      sx={{
        backgroundImage: `url("${AuthPageRectangles}")`,
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Box display="flex" justifyContent="center" pb={2}>
          <img
            src={AuthPageCenterObject}
            alt="Girl holding laptop for online shopping"
            height="auto"
            width={
              isSmall
                ? "250px"
                : isMedium
                ? "300px"
                : isLarge
                ? "325px"
                : "100%"
            }
          />
        </Box>
        <Typography
          component="h3"
          color="white"
          fontSize={{
            sm: "1.25rem",
            md: "2.25rem",
            lg: "2.5rem",
            xl: "3rem",
          }}
          lineHeight={1}
        >
          Welcome to Exam Ground
        </Typography>
        {(pagePathName.includes("login") ||
          pagePathName.includes("signup")) && (
          <Box
            pt={2}
            sx={{
              minWidth: { md: "310px", lg: "460px", xl: "550px" },
            }}
          >
            <Button
              variant="contained"
              color="primary"
              fullWidth
              component={Link}
              to={pagePathName.includes("login") ? "/signup" : "/login"}
              sx={{
                fontWeight: "bold",
                color: "primary.main",
                backgroundColor: "white",
                "&:hover": {
                  backgroundColor: "white",
                },
              }}
            >
              {pagePathName.includes("login") ? "SIGN UP" : "LOGIN"}
            </Button>
          </Box>
        )}
      </Stack>
    </Box>
  );
}
