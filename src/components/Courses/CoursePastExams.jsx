import { Box, Button, Card, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import Carousel from "react-multi-carousel";
import { useNavigate } from "react-router-dom";
const localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

export default function CoursePastExams({ exams }) {
  const navigate = useNavigate();
  const responsive = {
    xxxl: {
      breakpoint: { max: 4000, min: 1920 },
      items: 6,
      partialVisibilityGutter: 50,
    },
    xxl: {
      breakpoint: { max: 1920, min: 1536 },
      items: 5,
      partialVisibilityGutter: 50,
    },
    xl: {
      breakpoint: { max: 1536, min: 1280 },
      items: 3,
      partialVisibilityGutter: 40,
    },
    lg: {
      breakpoint: { max: 1280, min: 1024 },
      items: 3,
      partialVisibilityGutter: 40,
    },
    md: {
      breakpoint: { max: 1024, min: 360 },
      items: 2,
      partialVisibilityGutter: 30,
    },
    xs: {
      breakpoint: { max: 360, min: 0 },
      items: 1,
      partialVisibilityGutter: 30,
    },
  };

  return (
    <Box my={2}>
      <Typography
        variant="h5"
        component="h2"
        fontWeight="bold"
        color="primary"
        mb={1}
      >
        Previous Exams
      </Typography>
      {exams.length ? (
        <Carousel responsive={responsive}>
          {exams.map((exam) => (
            <Card
              key={exam?.id}
              elevation={3}
              sx={{
                height: { xs: "200px", lg: "250px" },
                width: { lg: "300px", xl: "300px" },
                p: 2,
                m: 1,
              }}
              position="relative"
            >
              <Stack direction="column" gap={1}>
                <Typography variant="subtitle1" textAlign="center">
                  <strong>Date: </strong>
                  {dayjs(exam?.date).format("LL") ?? ""}
                </Typography>
                <Typography variant="body1">
                  <strong>Title: </strong>
                  {exam?.title ?? ""}
                </Typography>
                <Typography variant="body1">
                  <strong>Teacher </strong>
                  {exam?.teacher?.name ?? ""}
                </Typography>
                <Typography variant="body1">
                  <strong>Total Marks: </strong>
                  {exam?.totalMarks ?? ""}
                </Typography>
                <Typography variant="subtitle1">
                  <strong>Duration: </strong>
                  {`${exam?.duration ?? ""} minutes`}
                </Typography>
              </Stack>
              <Box position="absolute" bottom="1rem" right="1rem">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/exams/attempt/${exam?.id}`)}
                >
                  Practice
                </Button>
              </Box>
            </Card>
          ))}
        </Carousel>
      ) : (
        <Typography variant="body1" color="text.secondary">
          Course has no previous exams
        </Typography>
      )}
    </Box>
  );
}
