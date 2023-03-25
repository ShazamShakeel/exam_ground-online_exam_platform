import { Box, Button, Card, Divider, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function StudentExams() {
  const navigate = useNavigate();
  const exams = [
    {
      id: 1,
      title: "Midterm Exam",
      courseCode: "MATH101",
      courseName: "Calculus",
      studentAttempts: 120,
      examMarks: 80,
      duration: "2 hours",
      date: "2022-04-15",
    },
    {
      id: 2,
      title: "Final Exam",
      courseCode: "ENG101",
      courseName: "English Literature",
      studentAttempts: 150,
      examMarks: 70,
      duration: "3 hours",
      date: "2022-06-10",
    },
    {
      id: 3,
      title: "Quiz 1",
      courseCode: "CSC101",
      courseName: "Programming Fundamentals",
      studentAttempts: 180,
      examMarks: 95,
      duration: "1 hour",
      date: "2022-02-28",
    },
    {
      id: 4,
      title: "Term Paper",
      courseCode: "BIO101",
      courseName: "Biology",
      studentAttempts: 90,
      examMarks: 85,
      duration: "N/A",
      date: "2022-05-20",
    },
    {
      id: 5,
      title: "Midterm Exam",
      courseCode: "PHYS101",
      courseName: "Physics",
      studentAttempts: 100,
      examMarks: 75,
      duration: "2 hours",
      date: "2022-03-25",
    },
    {
      id: 6,
      title: "Final Exam",
      courseCode: "HIS101",
      courseName: "World History",
      studentAttempts: 120,
      examMarks: 80,
      duration: "3 hours",
      date: "2022-06-20",
    },
    {
      id: 7,
      title: "Quiz 2",
      courseCode: "CSC101",
      courseName: "Programming Fundamentals",
      studentAttempts: 200,
      examMarks: 90,
      duration: "1 hour",
      date: "2022-04-15",
    },
    {
      id: 8,
      title: "Midterm Exam",
      courseCode: "CHEM101",
      courseName: "Chemistry",
      studentAttempts: 80,
      examMarks: 70,
      duration: "2 hours",
      date: "2022-03-01",
    },
    {
      id: 9,
      title: "Final Exam",
      courseCode: "PSY101",
      courseName: "Psychology",
      studentAttempts: 110,
      examMarks: 85,
      duration: "3 hours",
      date: "2022-06-30",
    },
    {
      id: 10,
      title: "Midterm Exam",
      courseCode: "ECO101",
      courseName: "Economics",
      studentAttempts: 150,
      examMarks: 75,
      duration: "2 hours",
      date: "2022-03-15",
    },
  ];

  return (
    <>
      <Typography
        variant="h4"
        component="h1"
        fontWeight="bold"
        textAlign="center"
        color="primary"
        py={1}
      >
        Exams
      </Typography>
      <Divider variant="middle" sx={{ mb: 1 }} />
      <Stack direction="column" gap={2}>
        <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
          {exams.map((exam) => (
            <Card
              key={exam?.id}
              elevation={3}
              sx={{
                height: { xs: "200px", lg: "250px" },
                width: { lg: "300px", xl: "300px" },
                m: 1,
              }}
            >
              <Stack direction="column" gap={1} p={2}>
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
                  <strong>Duration: </strong>
                  {exam?.duration}
                </Typography>
              </Stack>
              <Box textAlign="right" pr={2}>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => navigate(`/exams/attempt/${exam.id}`)}
                  sx={{ mt: 2 }}
                >
                  Attempt Exam
                </Button>
              </Box>
            </Card>
          ))}
        </Box>
        <Box textAlign="center">
          <Button color="primary" size="large">
            Load More
          </Button>
        </Box>
      </Stack>
    </>
  );
}

export default StudentExams;
