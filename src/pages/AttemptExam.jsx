import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import ExamRulesPreview from "components/Exams/AttemptExam/ExamRulesPreview";
import { useEffect, useState } from "react";

export default function AttemptExam() {
  const [isExamStarted, setIsExamStarted] = useState(false);

  const [time, setTime] = useState(0);

  const exam = {
    id: "EXAM-001",
    title: "Introduction to Python Programming",
    course: {
      id: "COURSE-001",
      title: "Python Programming",
      teacher: {
        id: "TEACHER-001",
        name: "John Doe",
      },
    },
    questions: [
      {
        id: "Q-001",
        question:
          "What is the output of the following Python code?\n\nprint(2 + 2 * 3)",
        options: [
          {
            id: "OPT-001",
            text: "6",
            is_correct: true,
          },
          {
            id: "OPT-002",
            text: "8",
            is_correct: false,
          },
          {
            id: "OPT-003",
            text: "10",
            is_correct: false,
          },
          {
            id: "OPT-004",
            text: "12",
            is_correct: false,
          },
        ],
      },
      {
        id: "Q-002",
        question:
          "What is the output of the following Python code?\n\nprint('hello' + 'world')",
        options: [
          {
            id: "OPT-005",
            text: "helloworld",
            is_correct: true,
          },
          {
            id: "OPT-006",
            text: "hello world",
            is_correct: false,
          },
          {
            id: "OPT-007",
            text: "hello\nworld",
            is_correct: false,
          },
          {
            id: "OPT-008",
            text: "Syntax Error",
            is_correct: false,
          },
        ],
      },
      {
        id: "Q-003",
        question: "Which of the following data types is mutable in Python?",
        options: [
          {
            id: "OPT-009",
            text: "tuple",
            is_correct: false,
          },
          {
            id: "OPT-010",
            text: "list",
            is_correct: true,
          },
          {
            id: "OPT-011",
            text: "set",
            is_correct: true,
          },
          {
            id: "OPT-012",
            text: "string",
            is_correct: false,
          },
        ],
      },
    ],
    duration: 60,
  };

  const handleStartExam = () => {
    setIsExamStarted(true);
    enterFullScreen();
  };

  const enterFullScreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
  };

  useEffect(() => {
    setTime(exam.duration * 60);
  }, [exam.duration]);

  useEffect(() => {
    if (isExamStarted) {
      const intervalId = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [isExamStarted]);

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  return (
    <Box id="exam-container">
      <Box height="100vh" display="flex" alignItems="center">
        <Container component="main" maxWidth="md" sx={{ margin: "auto" }}>
          <Paper
            elevation={16}
            width="auto"
            sx={{
              mx: { xs: 1, sm: 1.5, md: 2, lg: 4 },
              p: 2,
            }}
          >
            {exam && !isExamStarted && (
              <ExamRulesPreview handleStartExam={handleStartExam} />
            )}
            {exam && isExamStarted && (
              <>
                <Grid container>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h5" component="h1">
                      {exam.title}
                    </Typography>
                    <Typography variant="body1">{exam.course.title}</Typography>
                    <Typography variant="body1">
                      {exam.course.teacher.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h5" component="h1">
                      {`Time Left ${hours < 10 ? "0" + hours : hours}:${
                        minutes < 10 ? "0" + minutes : minutes
                      }:${seconds < 10 ? "0" + seconds : seconds}`}
                    </Typography>
                  </Grid>
                </Grid>
              </>
            )}
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}
