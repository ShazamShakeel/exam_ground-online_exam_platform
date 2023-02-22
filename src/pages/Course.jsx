import {
  Box,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import CoursePastExams from "components/Courses/CoursePastExams";

function Course() {
  const loading = false;

  const course = {
    id: 1,
    code: "COMP101",
    name: "Introduction to Computer Science",
    description: "An introduction to computer programming and problem solving.",
    studentsCount: 50,
    examsCount: 2,
    students: [
      {
        id: 1,
        studentId: "ABC123",
        name: "John Doe",
        university: "Example University",
        coursesEnrolled: 4,
      },
      {
        id: 2,
        studentId: "DEF456",
        name: "Jane Smith",
        university: "Another University",
        coursesEnrolled: 3,
      },
      {
        id: 3,
        studentId: "GHI789",
        name: "Bob Johnson",
        university: "Yet Another University",
        coursesEnrolled: 5,
      },
      {
        id: 4,
        studentId: "JKL012",
        name: "Samantha Lee",
        university: "Example University",
        coursesEnrolled: 2,
      },
      {
        id: 5,
        studentId: "MNO345",
        name: "David Garcia",
        university: "Another University",
        coursesEnrolled: 6,
      },
      {
        id: 6,
        studentId: "PQR678",
        name: "Emily Chen",
        university: "Yet Another University",
        coursesEnrolled: 4,
      },
      {
        id: 7,
        studentId: "STU901",
        name: "Michael Kim",
        university: "Example University",
        coursesEnrolled: 3,
      },
      {
        id: 8,
        studentId: "VWX234",
        name: "Lisa Patel",
        university: "Another University",
        coursesEnrolled: 7,
      },
      {
        id: 9,
        studentId: "YZA567",
        name: "Daniel Rodriguez",
        university: "Yet Another University",
        coursesEnrolled: 5,
      },
      {
        id: 10,
        studentId: "BCD890",
        name: "Maria Hernandez",
        university: "Example University",
        coursesEnrolled: 4,
      },
    ],
    exams: [
      {
        id: 1,
        title: "Midterm Exam",
        courseCode: "MATH101",
        courseName: "Calculus",
        examMarks: 80,
        duration: "2 hours",
        date: "2022-04-15",
      },
      {
        id: 2,
        title: "Final Exam",
        courseCode: "ENG101",
        courseName: "English Literature",
        examMarks: 70,
        duration: "3 hours",
        date: "2022-06-10",
      },
      {
        id: 3,
        title: "Quiz 1",
        courseCode: "CSC101",
        courseName: "Programming Fundamentals",
        examMarks: 95,
        duration: "1 hour",
        date: "2022-02-28",
      },
      {
        id: 4,
        title: "Term Paper",
        courseCode: "BIO101",
        courseName: "Biology",
        examMarks: 85,
        duration: "N/A",
        date: "2022-05-20",
      },
      {
        id: 5,
        title: "Midterm Exam",
        courseCode: "PHYS101",
        courseName: "Physics",
        examMarks: 75,
        duration: "2 hours",
        date: "2022-03-25",
      },
      {
        id: 6,
        title: "Final Exam",
        courseCode: "HIS101",
        courseName: "World History",
        examMarks: 80,
        duration: "3 hours",
        date: "2022-06-20",
      },
      {
        id: 7,
        title: "Quiz 2",
        courseCode: "CSC101",
        courseName: "Programming Fundamentals",
        examMarks: 90,
        duration: "1 hour",
        date: "2022-04-15",
      },
      {
        id: 8,
        title: "Midterm Exam",
        courseCode: "CHEM101",
        courseName: "Chemistry",
        examMarks: 70,
        duration: "2 hours",
        date: "2022-03-01",
      },
      {
        id: 9,
        title: "Final Exam",
        courseCode: "PSY101",
        courseName: "Psychology",
        examMarks: 85,
        duration: "3 hours",
        date: "2022-06-30",
      },
      {
        id: 10,
        title: "Midterm Exam",
        courseCode: "ECO101",
        courseName: "Economics",
        examMarks: 75,
        duration: "2 hours",
        date: "2022-03-15",
      },
    ],
  };

  if (loading) {
    return (
      <Box
        height="200px"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    );
  }

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
        Course
      </Typography>
      <Divider variant="middle" sx={{ mb: 1 }} />
      <Stack direction="column" gap={2} p={2}>
        <Typography
          variant="h5"
          component="h2"
          fontWeight="bold"
          textAlign="center"
        >
          {course.code} - {course.name}
        </Typography>
        <Typography variant="body1" component="p" textAlign="center">
          {course.description}
        </Typography>
        <CoursePastExams exams={course.exams} examsCount={course.examsCount} />
      </Stack>
    </>
  );
}

export default Course;
