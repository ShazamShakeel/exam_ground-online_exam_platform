import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactCodeInput from "react-verification-code-input";
import { userEmailVerification } from "store/slices/authSlice";

export default function VerificationForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);
  const email = useSelector((state) => state.auth.email);
  const [emailOTP, setEmailOTP] = useState("");

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
          onChange={setEmailOTP}
          className="code-input"
        />
        <Typography variant="body1" color="text.secondary">
          {`Please enter the verification code sent on ${email}`}
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
          disabled={loading || emailOTP.length < 6}
          type="submit"
          variant="contained"
          color="primary"
          startIcon={loading && <CircularProgress size={20} thickness={6} />}
          onClick={() => {
            dispatch(
              userEmailVerification({
                isVerified: true,
              })
            );
            navigate("/register-face");
          }}
        >
          NEXT
        </Button>
      </Stack>
    </Container>
  );
}
