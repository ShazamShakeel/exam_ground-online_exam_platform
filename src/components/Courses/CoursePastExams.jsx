import { Box, Card, Stack, Typography } from "@mui/material";
import Carousel from "react-multi-carousel";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CoursePastExams({ exams }) {
  const navigate = useNavigate();
  const userRole = useSelector((state) => state?.auth?.userRole);
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
                cursor: "pointer",
              }}
              onClick={() =>
                navigate(
                  userRole === "teacher"
                    ? `/exams/edit/${exam?.id}`
                    : `/exams/${exam?.id}`
                )
              }
            >
              <Stack direction="column" gap={1}>
                <Typography variant="subtitle1" textAlign="center">
                  <strong>Date: </strong>
                  {exam?.date ?? ""}
                </Typography>
                <Typography variant="body1">
                  <strong>Title: </strong>
                  {exam?.title ?? ""}
                </Typography>
                <Typography variant="body2">
                  <strong>Course Code: </strong>
                  {exam?.courseCode ?? ""}
                </Typography>
                <Typography variant="body1">
                  <strong>Course: </strong>
                  {exam?.courseName ?? ""}
                </Typography>
                <Typography variant="subtitle1">
                  <strong>Duration: </strong>
                  {exam?.duration ?? ""}
                </Typography>
              </Stack>
            </Card>
          ))}
        </Carousel>
      ) : (
        <Typography variant="body1" color="text.secondary">
          No courses found
        </Typography>
      )}
    </Box>
  );
}
