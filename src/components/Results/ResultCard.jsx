import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "utils/httpRequest/axiosInstance";

function ResultCard() {
  // const result = {
  //   id: 1,
  //   examTitle: "Mathematics Test",
  //   studentName: "John Doe",
  //   courseCode: "MATH101",
  //   courseName: "Introduction to Mathematics",
  //   createdAt: new Date("2022-02-10T10:30:00"),
  //   obtainedMarks: 85,
  //   totalMarks: 100,
  // };
  const examId = useParams().id;
  const user = useSelector((state) => state?.auth);

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState({});
  const [course, setCourse] = useState({});
  const isStudent = user.userRole === "student";

  const getCourse = useCallback((id) => {
    axiosInstance
      .get(`/course/${id}`)
      .then((res) => {
        setCourse(res?.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const getResult = useCallback(() => {
    setLoading(true);
    axiosInstance
      .get("/answer/" + examId, {
        params: {
          populate: isStudent ? "exam,teacher" : "exam,student",
        },
      })
      .then((res) => {
        setResult(res?.data);
        getCourse(res?.data?.exam?.course);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message ?? "Something went wrong");
      });
  }, [examId, getCourse, isStudent]);

  useEffect(() => {
    getResult();
  }, [getResult]);

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
        Result
      </Typography>
      <Divider variant="middle" sx={{ mb: 1 }} />
      {loading ? (
        <Box textAlign="center" mt={2}>
          <CircularProgress />
        </Box>
      ) : (
        <Container maxWidth="md">
          <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
            <Stack direction="column" gap={2}>
              <Stack direction="row" gap={2}>
                <Typography variant="body1" fontWeight="bold">
                  Exam:
                </Typography>
                <Typography variant="body1">{result.exam?.title}</Typography>
              </Stack>
              <Stack direction="row" gap={2}>
                <Typography variant="body1" fontWeight="bold">
                  Course:
                </Typography>
                <Typography variant="body1">{`${course.code}: ${course?.title}`}</Typography>
              </Stack>
              <Stack direction="row" gap={2}>
                <Typography variant="body1" fontWeight="bold">
                  {isStudent ? `Teacher: ` : `Student: `}
                </Typography>
                <Typography variant="body1">
                  {isStudent ? result?.teacher?.name : result.student?.name}
                </Typography>
              </Stack>
              <Stack direction="row" gap={2}>
                <Typography variant="body1" fontWeight="bold">
                  Obtained Marks:
                </Typography>
                <Typography variant="body1">{result.obtainedMarks}</Typography>
              </Stack>
              <Stack direction="row" gap={2}>
                <Typography variant="body1" fontWeight="bold">
                  Total Marks:
                </Typography>
                <Typography variant="body1">
                  {result?.exam?.totalMarks}
                </Typography>
              </Stack>
              <Stack direction="row" gap={2}>
                <Typography variant="body1" fontWeight="bold">
                  Issued on:
                </Typography>
                <Typography variant="body1">
                  {dayjs(result.createdAt).format("LLL")}
                </Typography>
              </Stack>
            </Stack>
          </Paper>
        </Container>
      )}
    </>
  );
}

export default ResultCard;
