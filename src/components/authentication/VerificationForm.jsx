import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useSelector } from "react-redux";
import ReactCodeInput from "react-verification-code-input";

export default function VerificationForm() {
  const loading = useSelector((state) => state.user.loading);
  const phoneNumber = useSelector((state) => state.user.data.user.phone ?? "");
  const [phoneOTP, setPhoneOTP] = useState("");

  return (
    <Container>
      <Stack
        direction="column"
        alignContent="center"
        justifyContent="center"
        height="100vh"
        maxWidth={{ sm: "250px", md: "310px", lg: "400px" }}
        m="auto"
        py={2}
        spacing={{ xs: 1.75, md: 2.4, lg: 3, xl: 6 }}
      >
        <Typography
          variant="h3"
          component="h2"
          fontWeight="bold"
          fontSize={{
            xs: "2.25rem",
            lg: "2.5rem",
            xl: "3rem",
          }}
        >
          Verification
        </Typography>
        <Typography variant="body1" color="primary">
          Please verify your email address
        </Typography>
        <ReactCodeInput
          autoFocus
          type="number"
          onChange={setPhoneOTP}
          className="code-input"
        />
        <Typography variant="body1" color="text.secondary">
          {`Please enter the verification code sent on ${phoneNumber}`}
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Typography color="text.secondary">
            {`Didn’t receive code?`}
          </Typography>
          <Button
            variant="text"
            sx={{
              fontWeight: "bold",
              textTransform: "none",
            }}
          >
            Resend Code
          </Button>
        </Box>
        <Button
          fullWidth
          disabled={loading || phoneOTP.length < 6}
          type="submit"
          variant="contained"
          color="primary"
          startIcon={loading && <CircularProgress size={20} thickness={6} />}
        >
          NEXT
        </Button>
      </Stack>
    </Container>
  );
}
