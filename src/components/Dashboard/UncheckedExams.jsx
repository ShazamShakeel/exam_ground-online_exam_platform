import { Box, Card, Divider, Stack, Typography } from "@mui/material";
import Carousel from "react-multi-carousel";

export default function UncheckedExams() {
  const uncheckedExams = [
    {
      id: 1,
      courseCode: "COMP101",
      courseName: "Introduction to Computer Science",
      studentAttempts: 50,
      examMarks: 90,
      duration: "2 hours",
      date: "2022-05-01",
    },
    {
      id: 2,
      courseCode: "MATH201",
      courseName: "Calculus I",
      studentAttempts: 30,
      examMarks: 85,
      duration: "1.5 hours",
      date: "2022-05-04",
    },
    {
      id: 3,
      courseCode: "CHEM101",
      courseName: "Introductory Chemistry",
      studentAttempts: 100,
      examMarks: 75,
      duration: "2.5 hours",
      date: "2022-05-06",
    },
    {
      id: 4,
      courseCode: "PHYS101",
      courseName: "General Physics I",
      studentAttempts: 60,
      examMarks: 80,
      duration: "2 hours",
      date: "2022-05-08",
    },
    {
      id: 5,
      courseCode: "ENG101",
      courseName: "Introduction to English Literature",
      studentAttempts: 45,
      examMarks: 95,
      duration: "2 hours",
      date: "2022-05-10",
    },
    {
      id: 6,
      courseCode: "HIST101",
      courseName: "World History to 1500",
      studentAttempts: 80,
      examMarks: 70,
      duration: "2.5 hours",
      date: "2022-05-13",
    },
    {
      id: 7,
      courseCode: "PSYCH101",
      courseName: "Introduction to Psychology",
      studentAttempts: 70,
      examMarks: 85,
      duration: "2 hours",
      date: "2022-05-16",
    },
    {
      id: 8,
      courseCode: "ART101",
      courseName: "Introduction to Visual Arts",
      studentAttempts: 20,
      examMarks: 60,
      duration: "1.5 hours",
      date: "2022-05-19",
    },
    {
      id: 9,
      courseCode: "SOC101",
      courseName: "Introduction to Sociology",
      studentAttempts: 55,
      examMarks: 80,
      duration: "2 hours",
      date: "2022-05-22",
    },
    {
      id: 10,
      courseCode: "BIO101",
      courseName: "Introduction to Biology",
      studentAttempts: 90,
      examMarks: 95,
      duration: "2.5 hours",
      date: "2022-05-25",
    },
  ];

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
        variant="h4"
        component="h2"
        fontWeight="bold"
        color="primary"
        mb={2}
      >
        Unchecked Exams
      </Typography>
      {uncheckedExams.length ? (
        <Carousel responsive={responsive}>
          {uncheckedExams.map((exam) => (
            <Card
              key={exam?.id}
              elevation={3}
              sx={{
                height: { xs: "200px", lg: "250px" },
                width: { lg: "300px", xl: "300px" },
                p: 2,
                m: 1,
              }}
            >
              <Stack direction="column" gap={1}>
                <Typography variant="subtitle1" textAlign="center">
                  <strong>Date: </strong>
                  {exam?.date}
                </Typography>
                <Typography variant="body2">
                  <strong>Course Code: </strong>
                  {exam?.courseCode}
                </Typography>
                <Typography variant="body1">
                  <strong>Course: </strong>
                  {exam?.courseName}
                </Typography>
                <Typography variant="subtitle1">
                  <strong>Students: </strong>
                  {exam?.studentAttempts}
                </Typography>
                <Typography variant="subtitle1">
                  <strong>Duration: </strong>
                  {exam?.duration}
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
      <Divider variant="middle" sx={{ my: 2 }} />
    </Box>
  );
}
