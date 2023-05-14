import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 2,
        minHeight: "100vh",
        minWidth: "100vw",
        backgroundColor: "primary.main",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          color: "white",
          lineHeight: 1,
          fontSize: {
            xs: "3em",
            md: "4em",
          },
        }}
      >
        404
      </Typography>
      <Typography
        variant="h6"
        sx={{
          color: "white",
          lineHeight: 1,
          fontSize: {
            xs: "1em",
            md: "2em",
          },
        }}
      >
        The page you’re looking for doesn’t exist.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{
          color: "primary.main",
          backgroundColor: "white",
          fontWeight: "bolder",
          "&:hover": {
            backgroundColor: "white",
          },
        }}
        onClick={() => navigate("/dashboard")}
      >
        Back to Dashboard
      </Button>
    </Box>
  );
}
