import { Box, Button, Paper, Stack, useMediaQuery } from "@mui/material";
import FaceIdLogo from "assets/images/FaceId-Logo.svg";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterFace() {
  const faceio = useRef(null);
  const navigate = useNavigate();
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));

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
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Paper
        sx={{ p: 2, width: { sm: "300px", md: "400px" } }}
        variant="outlined"
      >
        <Box display="flex" justifyContent="flex-end" width="100%">
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={handleSkip}
            sx={{ maxWidth: "25px" }}
          >
            Skip
          </Button>
        </Box>
        <Stack
          direction="column"
          alignItems="center"
          spacing={{ xs: 1, md: 2 }}
          p={{ xs: 2, md: 4, lg: 6 }}
        >
          <Box display="flex" justifyContent="center" my={2}>
            <img
              src={FaceIdLogo}
              alt="Face ID Logo"
              height="auto"
              width={isDesktop ? "200px" : "150px"}
            />
          </Box>
          <Button variant="contained" onClick={handleRegisterFaceId} fullWidth>
            Register Face ID
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
