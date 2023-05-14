import { Box, Container, Grid, Typography, useMediaQuery } from "@mui/material";
import AutoGrading from "assets/icons/AutoGrading.svg";
import Clock from "assets/icons/Clock.svg";
import Mobile from "assets/icons/Mobile.svg";
import MultipleQuestion from "assets/icons/MultipleQuestion.svg";
import OCR from "assets/icons/OCR.svg";
import Report from "assets/icons/Report.svg";
import Schedule from "assets/icons/Schedule.svg";
import Secured from "assets/icons/Secured.svg";
import TabMonitoring from "assets/icons/TabMonitoring.svg";
import World from "assets/icons/World.svg";

export default function FeatureSection() {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Box py={2}>
      <Typography variant="h4" textAlign="center" py={2}>
        Why choose <strong>Exam Ground</strong>
      </Typography>
      <Container maxWidth="md">
        <Grid container spacing={4} my={2}>
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={1}
          >
            <img
              src={AutoGrading}
              alt="feature1"
              height="auto"
              width={isSmallScreen ? "75px" : "100px"}
            />
            <Typography
              variant="h5"
              textAlign="center"
              fontWeight="bold"
              color="text.secondary"
            >
              Auto-Grading
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={1}
          >
            <img
              src={Report}
              alt="feature1"
              height="auto"
              width={isSmallScreen ? "75px" : "100px"}
            />
            <Typography
              variant="h5"
              textAlign="center"
              fontWeight="bold"
              color="text.secondary"
            >
              Report
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={1}
          >
            <img
              src={Schedule}
              alt="feature1"
              height="auto"
              width={isSmallScreen ? "75px" : "100px"}
            />
            <Typography
              variant="h5"
              textAlign="center"
              fontWeight="bold"
              color="text.secondary"
            >
              Schedule Test
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={1}
          >
            <img
              src={MultipleQuestion}
              alt="feature1"
              height="auto"
              width={isSmallScreen ? "75px" : "100px"}
            />
            <Typography
              variant="h5"
              textAlign="center"
              fontWeight="bold"
              color="text.secondary"
            >
              Multiple Questions
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={1}
          >
            <img
              src={Mobile}
              alt="feature1"
              height="auto"
              width={isSmallScreen ? "75px" : "100px"}
            />
            <Typography
              variant="h5"
              textAlign="center"
              fontWeight="bold"
              color="text.secondary"
            >
              Mobile Ready
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={1}
          >
            <img
              src={World}
              alt="feature1"
              height="auto"
              width={isSmallScreen ? "75px" : "100px"}
            />
            <Typography
              variant="h5"
              textAlign="center"
              fontWeight="bold"
              color="text.secondary"
            >
              Access Anywhere
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={1}
          >
            <img
              src={OCR}
              alt="feature1"
              height="auto"
              width={isSmallScreen ? "75px" : "100px"}
            />
            <Typography
              variant="h5"
              textAlign="center"
              fontWeight="bold"
              color="text.secondary"
            >
              OCR Test
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={1}
          >
            <img
              src={TabMonitoring}
              alt="feature1"
              height="auto"
              width={isSmallScreen ? "75px" : "100px"}
            />
            <Typography
              variant="h5"
              textAlign="center"
              fontWeight="bold"
              color="text.secondary"
            >
              Tab Monitoring
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={1}
          >
            <img
              src={Clock}
              alt="feature1"
              height="auto"
              width={isSmallScreen ? "75px" : "100px"}
            />
            <Typography
              variant="h5"
              textAlign="center"
              fontWeight="bold"
              color="text.secondary"
            >
              Timed Test
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={1}
          >
            <img
              src={Secured}
              alt="feature1"
              height="auto"
              width={isSmallScreen ? "75px" : "100px"}
            />
            <Typography
              variant="h5"
              textAlign="center"
              fontWeight="bold"
              color="text.secondary"
            >
              Secured
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
