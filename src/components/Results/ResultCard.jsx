import { Container, Divider, Paper, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";

function ResultCard() {
  const result = {
    id: 1,
    examTitle: "Mathematics Test",
    studentName: "John Doe",
    courseCode: "MATH101",
    courseName: "Introduction to Mathematics",
    createdAt: new Date("2022-02-10T10:30:00"),
    obtainedMarks: 85,
    totalMarks: 100,
  };

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
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
          <Typography
            variant="h5"
            component="h3"
            fontWeight="bold"
            textAlign="center"
          >
            {result.studentName}
          </Typography>
          <Stack direction="column" gap={2}>
            <Stack direction="row" gap={2}>
              <Typography variant="body1" fontWeight="bold">
                Course ID:
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {result.courseCode}
              </Typography>
            </Stack>
            <Stack direction="row" gap={2}>
              <Typography variant="body1" fontWeight="bold">
                Course Name:
              </Typography>
              <Typography variant="body1">{result.courseName}</Typography>
            </Stack>
            <Stack direction="row" gap={2}>
              <Typography variant="body1" fontWeight="bold">
                Exam:
              </Typography>
              <Typography variant="body1">{result.examTitle}</Typography>
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
              <Typography variant="body1">{result.totalMarks}</Typography>
            </Stack>
            <Stack direction="row" gap={2}>
              <Typography variant="body1" fontWeight="bold">
                Issued on:
              </Typography>
              <Typography variant="body1">
                {dayjs(result.createdAt).format("DD MMM, YYYY [at] hh:mm A")}
              </Typography>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </>
  );
}

export default ResultCard;
