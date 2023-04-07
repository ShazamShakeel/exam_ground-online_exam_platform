import {
  Box,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import CoursePastExams from "components/Courses/CoursePastExams";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "utils/httpRequest/axiosInstance";

function Course() {
  const id = useParams()?.id ?? "";
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState({});

  useEffect(() => {
    axiosInstance
      .get(`/course/${id}`)
      .then((res) => {
        setCourse(res?.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setLoading(false);
      });
  }, [id]);

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

  const exams = [
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
          {course.code} - {course.title}
        </Typography>
        <Typography variant="body1" component="p" textAlign="center">
          {course.description}
        </Typography>
        <CoursePastExams exams={exams} />
      </Stack>
    </>
  );
}

export default Course;
