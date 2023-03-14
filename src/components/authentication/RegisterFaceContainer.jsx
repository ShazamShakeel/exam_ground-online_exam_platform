import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  useMediaQuery,
} from "@mui/material";
import FaceIdLogo from "assets/images/FaceId-Logo.svg";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "store/slices/authSlice";

export default function RegisterFaceContainer() {
  const faceio = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLarge = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const loading = useSelector((state) => state.auth.loading);
  const email = useSelector((state) => state.auth.email);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    faceio.current = new faceIO(process.env.REACT_APP_FACEIO_PUBLIC_KEY);
    return () => {
      faceio.current = null;
    };
  }, []);

  const handleRegisterFaceId = () => {
    faceio.current
      .enroll({
        email,
      })
      .then((res) => {
        dispatch(updateProfile({ facialId: res.facialId }))
          .unwrap()
          .then(() => navigate("/dashboard"));
      })
      .catch((err) => console.log(err));
  };

  const handleSkip = () => {
    navigate("/dashboard");
  };

  return (
    <Box height="100%" display="flex" alignItems="center">
      <Container component="main" sx={{ maxWidth: { md: "550px" } }}>
        <Paper
          elevation={16}
          sx={{
            mx: { xs: 1, sm: 1.5, md: 2, lg: 4 },
            p: 1,
          }}
        >
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              onClick={handleSkip}
            >
              Skip
            </Button>
          </Box>
          <Stack
            height="100%"
            direction="column"
            alignItems="center"
            gap={{ xs: 1, md: 2 }}
          >
            <Box display="flex" justifyContent="center" py={4}>
              <img
                src={FaceIdLogo}
                alt="Face ID Logo"
                height="auto"
                width={isLarge ? "200px" : "150px"}
              />
            </Box>
            <Button
              variant="contained"
              onClick={handleRegisterFaceId}
              fullWidth
              disabled={loading}
            >
              {`${loading ? "Please Wait" : "Register Face ID"}`}
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
