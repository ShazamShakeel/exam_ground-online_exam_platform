import { useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid";
import RegisterFaceContainer from "components/authentication/RegisterFaceContainer";
import AuthSideContent from "components/authentication/SideContent";

export default function SignupVerification() {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("md"));
  return (
    <Grid container component="main" height="100vh">
      {!isSmall && (
        <Grid item md={6} backgroundColor="rgba(6, 142, 207, 0.9)">
          <AuthSideContent />
        </Grid>
      )}
      <Grid item xs={12} md={6}>
        <RegisterFaceContainer />
      </Grid>
    </Grid>
  );
}
