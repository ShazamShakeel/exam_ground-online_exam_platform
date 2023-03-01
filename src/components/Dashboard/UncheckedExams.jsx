import { Box, Card, Divider, Stack, Typography } from "@mui/material";
import Carousel from "react-multi-carousel";

export default function UncheckedExams() {
  const uncheckedExams = [
    {
      id: 1,
      title: "Midterm Exam",
      courseCode: "MATH101",
      courseName: "Calculus",
      studentName: "demo user",
      examMarks: 80,
      duration: "2 hours",
      date: "2022-04-15",
      type: "subjective",
    },
    {
      id: 2,
      title: "Final Exam",
      courseCode: "ENG101",
      courseName: "English Literature",
      studentName: "demo user",
      examMarks: 70,
      duration: "3 hours",
      date: "2022-06-10",
      type: "mcq",
    },
    {
      id: 3,
      title: "Quiz 1",
      courseCode: "CSC101",
      courseName: "Programming Fundamentals",
      studentName: "demo user",
      examMarks: 95,
      duration: "1 hour",
      date: "2022-02-28",
      type: "mcq",
    },
    {
      id: 4,
      title: "Term Paper",
      courseCode: "BIO101",
      courseName: "Biology",
      studentName: "demo user",
      examMarks: 85,
      duration: "N/A",
      date: "2022-05-20",
      type: "subjective",
    },
    {
      id: 5,
      title: "Midterm Exam",
      courseCode: "PHYS101",
      courseName: "Physics",
      studentName: "demo user",
      examMarks: 75,
      duration: "2 hours",
      date: "2022-03-25",
      type: "mcq",
    },
    {
      id: 6,
      title: "Final Exam",
      courseCode: "HIS101",
      courseName: "World History",
      studentName: "demo user",
      examMarks: 80,
      duration: "3 hours",
      date: "2022-06-20",
      type: "subjective",
    },
    {
      id: 7,
      title: "Quiz 2",
      courseCode: "CSC101",
      courseName: "Programming Fundamentals",
      studentName: "demo user",
      examMarks: 90,
      duration: "1 hour",
      date: "2022-04-15",
      type: "subjective",
    },
    {
      id: 8,
      title: "Midterm Exam",
      courseCode: "CHEM101",
      courseName: "Chemistry",
      studentName: "demo user",
      examMarks: 70,
      duration: "2 hours",
      date: "2022-03-01",
      type: "mcq",
    },
    {
      id: 9,
      title: "Final Exam",
      courseCode: "PSY101",
      courseName: "Psychology",
      studentName: "demo user",
      examMarks: 85,
      duration: "3 hours",
      date: "2022-06-30",
      type: "mcq",
    },
    {
      id: 10,
      title: "Midterm Exam",
      courseCode: "ECO101",
      courseName: "Economics",
      studentName: "demo user",
      examMarks: 75,
      duration: "2 hours",
      date: "2022-06-30",
      type: "mcq",
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
                <Typography variant="body1">
                  <strong>Title: </strong>
                  {exam?.title ?? ""}
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
                  <strong>Student: </strong>
                  {exam?.studentName}
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
