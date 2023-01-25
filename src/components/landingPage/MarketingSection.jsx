import { Divider, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import AnalyzeExamMarketingSection from "assets/icons/AnalyzeExamMarketingSection.svg";
import CreateExamMarketingSection from "assets/icons/CreateExamMarketingSection.svg";
import UploadExamMarketingSection from "assets/icons/UploadExamMarketingSection.svg";

export default function MarketingSection() {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  return (
    <>
      <Grid container>
        <Grid item xs={12} md={4} px={3} py={{ xs: 1, md: 0 }}>
          <Stack direction="column" justifyContent="center" alignItems="center">
            <img
              src={CreateExamMarketingSection}
              alt="Create Exam Marketing Section"
              height="auto"
              width={isSmallScreen ? "125px" : "200px"}
            />
            <Typography
              variant="h5"
              component="h3"
              textAlign="center"
              fontWeight="bold"
            >
              Create
            </Typography>
            <Typography variant="body1" textAlign="center">
              Quickly create great looking tests using multiple question types
              and formatting options
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={4} px={3} py={1}>
          <Stack direction="column" justifyContent="center" alignItems="center">
            <img
              src={UploadExamMarketingSection}
              alt="Create Exam Marketing Section"
              height="auto"
              width={isSmallScreen ? "125px" : "200px"}
            />
            <Typography
              variant="h5"
              component="h3"
              textAlign="center"
              fontWeight="bold"
            >
              Upload
            </Typography>
            <Typography variant="body1" textAlign="center">
              Tests can either be published privately to a select group or open
              them up to everyone with a single link and registration page
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={4} px={3} py={1}>
          <Stack direction="column" justifyContent="center" alignItems="center">
            <img
              src={AnalyzeExamMarketingSection}
              alt="Create Exam Marketing Section"
              height="auto"
              width={isSmallScreen ? "125px" : "200px"}
            />
            <Typography
              variant="h5"
              component="h3"
              textAlign="center"
              fontWeight="bold"
            >
              Create
            </Typography>
            <Typography variant="body1" textAlign="center">
              Exam Ground instantly marks and grades your tests
            </Typography>
          </Stack>
        </Grid>
      </Grid>
      <Divider variant="middle" sx={{ my: 4 }} />
    </>
  );
}
