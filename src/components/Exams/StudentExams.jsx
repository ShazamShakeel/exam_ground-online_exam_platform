import {
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "utils/httpRequest/axiosInstance";
const isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
dayjs.extend(isSameOrAfter);

function StudentExams() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [exams, setExams] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/exam")
      .then((res) => {
        let exams = res.data;
        exams = exams.filter((exam) => {
          let examDate = new Date(exam.date);
          return dayjs(examDate).isSameOrAfter(dayjs(), "day");
        });
        setExams(exams);
      })
      .catch((err) => {
        toast.error(err.response.data.message ?? "Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <CircularProgress />
        </Box>
      ) : (
        <Stack direction="column" gap={2}>
          {exams.length ? (
            <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
              {exams.map((exam) => (
                <Card
                  key={exam?._id ?? exam?.id}
                  elevation={3}
                  sx={{
                    height: { xs: "250px", lg: "300px" },
                    width: { lg: "300px", xl: "300px" },
                    m: 1,
                    position: "relative",
                  }}
                >
                  <Stack direction="column" gap={1} p={2}>
                    <Typography variant="subtitle1" textAlign="center">
                      <strong>Date: </strong>
                      {dayjs(exam?.date).format("lll")}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Title: </strong>
                      {exam?.title ?? ""}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Course: </strong>
                      {`${exam?.course?.code}: ${exam?.course?.title}`}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Teacher: </strong>
                      {exam?.teacher?.name}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Total Marks: </strong>
                      {exam?.totalMarks}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Duration: </strong>
                      {exam?.duration}
                    </Typography>
                  </Stack>
                  <Box position="absolute" bottom="0.75rem" right="0.75rem">
                    <Button
                      size="small"
                      variant="contained"
                      disabled={dayjs(exam?.date).isSameOrAfter(dayjs())}
                      onClick={() =>
                        navigate(`/exams/attempt/${exam.id ?? exam._id}`)
                      }
                      sx={{ mt: 2 }}
                    >
                      Attempt Exam
                    </Button>
                  </Box>
                </Card>
              ))}
            </Box>
          ) : (
            <Typography
              variant="h6"
              textAlign="center"
              mt={2}
              color="text.secondary"
            >
              No exam today
            </Typography>
          )}
        </Stack>
      )}
    </>
  );
}

export default StudentExams;
