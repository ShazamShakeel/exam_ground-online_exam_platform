import { Box, Container, Grid, Typography, useMediaQuery } from "@mui/material";
import Candidates from "assets/icons/Candidates.svg";
import Teachers from "assets/icons/Teachers.svg";

export default function UsersSection() {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Box py={2} bgcolor="white">
      <Typography variant="h4" textAlign="center" py={2}>
        Who uses <strong>Exam Ground</strong>
      </Typography>
      <Container maxWidth="md">
        <Grid container spacing={4} my={2}>
          <Grid
            item
            xs={12}
            md={6}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={2}
          >
            <img
              src={Candidates}
              alt="Candidates"
              height="auto"
              width={isSmallScreen ? "125px" : "200px"}
            />
            <Typography
              variant="h4"
              component="h3"
              textAlign="center"
              fontWeight="bold"
            >
              Individuals
            </Typography>
            <Typography variant="body1" textAlign="justify">
              Create fun social quizzes that you can post on your website, blog
              or other social media site. If you prefer privacy the advanced
              email options allow you to quickly send private quizzes to your
              friends. The review feature allows your friends to review their
              answers after they have completed the quiz.
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={2}
          >
            <img
              src={Teachers}
              alt="Teachers"
              height="auto"
              width={isSmallScreen ? "125px" : "200px"}
            />
            <Typography
              variant="h4"
              component="h3"
              textAlign="center"
              fontWeight="bold"
            >
              Individuals
            </Typography>
            <Typography variant="body1" textAlign="justify">
              {`Quickly create courses or online tests for your students. You can
              make your test public or just publish it for your class or school
              with our private test options. The premium account will allow you
              to upload media and have unlimited questions. The auto-grading
              function will save you time and allow you to concentrate on what's
              important.`}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
