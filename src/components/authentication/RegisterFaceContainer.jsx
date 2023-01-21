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
import { useNavigate } from "react-router-dom";

export default function RegisterFaceContainer() {
  const faceio = useRef(null);
  const navigate = useNavigate();
  const isLarge = useMediaQuery((theme) => theme.breakpoints.up("md"));

  useEffect(() => {
    // eslint-disable-next-line no-undef
    faceio.current = new faceIO(process.env.REACT_APP_FACEIO_PUBLIC_KEY);
  }, []);

  const handleRegisterFaceId = () => {
    faceio.current
      .authenticate()
      .then((res) => {
        console.log(res);
        navigate("dashboard");
      })
      .catch((err) => console.log(err));
  };

  const handleSkip = () => {
    console.log("click");
    navigate("dashboard");
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
            >
              Register Face ID
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
