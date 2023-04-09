import {
  Box,
  Button,
  Divider,
  Paper,
  Radio,
  Stack,
  Typography,
} from "@mui/material";
import { useMemo, useRef } from "react";
import ReactHtmlParser from "react-html-parser";
import { useReactToPrint } from "react-to-print";

export default function ViewCheckedExam() {
  const componentRef = useRef();
  const exam = {
    id: 1,
    student: {
      id: 1,
      name: "Demo Student",
      email: "demoStudent@uni.edu.pk",
    },
    teacher: {
      id: 1,
      name: "Demo Teacher",
      email: "demoTeacher@uni.edu.pk",
    },
    title: "Exam 1",
    duration: 60,
    type: "mcq",
    // type: "subjective",
    eachMCQMark: 2,
    totalMarks: 10,
    marksObtained: 6,
    questions: [
      {
        question: "<p>What is the capital of France?</p>",
        options: ["Paris", "London", "Rome", "Berlin"],
        correctOption: "Paris",
        selectedOption: "Paris",
      },
      {
        question: "<p>What is the capital of England?</p>",
        options: ["Paris", "London", "Rome", "Berlin"],
        correctOption: "London",
        selectedOption: "London",
      },
      {
        question: "<p>What is the capital of Italy?</p>",
        options: ["Paris", "London", "Rome", "Berlin"],
        correctOption: "Rome",
        selectedOption: "London",
      },
      {
        question: "<p>What is the capital of Germany?</p>",
        options: ["Paris", "London", "Rome", "Berlin"],
        correctOption: "Berlin",
        selectedOption: "Berlin",
      },
      {
        question: "<p>What is the capital of Spain?</p>",
        options: ["Paris", "London", "Rome", "Berlin"],
        correctOption: "Madrid",
        selectedOption: "London",
      },
    ],
    // questions: [
    //   {
    //     question: "What is the value of x in the equation 2x + 5 = 15?",
    //     answer: "x = 5",
    //     marks: 5,
    //     obtainedMarks: 5,
    //   },
    //   {
    //     question: "Solve for y: 3y + 8 = 20",
    //     answer: "y = 4",
    //     marks: 5,
    //     obtainedMarks: 4,
    //   },
    //   {
    //     question: "What is the area of a rectangle with length 10 and width 5?",
    //     answer: "50",
    //     marks: 10,
    //     obtainedMarks: 10,
    //   },
    // ],
  };

  const generatePDF = useReactToPrint({
    content: () => componentRef.current,
  });

  const marginTopBottom = "15px";
  const marginLeftRight = "15px";
  const pageMargins = useMemo(() => {
    return `@page { margin: ${marginTopBottom} ${marginLeftRight} !important; }`;
  }, []);

  return (
    <Stack direction="column">
      <Box ml="auto" p={2} minWidth={200}>
        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={generatePDF}
        >
          Download Exam PDF
        </Button>
      </Box>
      <Paper sx={{ m: 2 }}>
        <style>{pageMargins}</style>
        <Stack direction="column" gap={2} p={4} ref={componentRef}>
          <Typography
            variant="h4"
            component="h1"
            fontWeight="bold"
            textAlign="center"
            gutterBottom
          >
            {exam.title}
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={2}>
            <Box minWidth={225}>
              <Typography variant="h6" component="h2">
                <strong>Teacher ID:</strong> {exam.teacher.id}
              </Typography>
            </Box>
            <Box minWidth={300}>
              <Typography variant="h6" component="h2">
                <strong>Teacher Name:</strong> {exam.teacher.name}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" component="h2">
                <strong>Teacher Email:</strong> {exam.teacher.email}
              </Typography>
            </Box>
          </Box>
          <Box display="flex" flexWrap="wrap" gap={2}>
            <Box minWidth={225}>
              <Typography variant="h6" component="h2">
                <strong>Student ID:</strong> {exam.student.id}
              </Typography>
            </Box>
            <Box minWidth={300}>
              <Typography variant="h6" component="h2">
                <strong>Student Name:</strong> {exam.student.name}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" component="h2">
                <strong>Student Email:</strong> {exam.student.email}
              </Typography>
            </Box>
          </Box>
          <Box display="flex" flexWrap="wrap" gap={2}>
            {exam.type === "mcq" && (
              <Box minWidth={225}>
                <Typography variant="h6" component="h2">
                  <strong>Each MCQ Marks</strong>: {exam.eachMCQMark}
                </Typography>
              </Box>
            )}
            <Box minWidth={225}>
              <Typography variant="h6" component="h2">
                <strong>Marks Obtained:</strong> {exam.marksObtained}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" component="h2">
                <strong>Total Marks:</strong> {exam.totalMarks}
              </Typography>
            </Box>
          </Box>
          <Divider variant="middle" />
          <Stack direction="column" gap={2}>
            {exam.questions.map((question, index) => (
              <Stack direction="column" gap={2} key={index}>
                <Box
                  display="flex"
                  alignItems="center"
                  gap={1}
                  className="question"
                >
                  <Typography component="p">{`${index + 1})`}</Typography>
                  {ReactHtmlParser(question.question)}
                  {question.correctOption &&
                  question.correctOption === question.selectedOption ? (
                    <span style={{ color: "green" }}>✔</span>
                  ) : (
                    <span style={{ color: "red" }}>✘</span>
                  )}
                </Box>
                {exam.type === "mcq" && (
                  <Box>
                    <Stack direction="row">
                      {question.options.map((option, index) => (
                        <Stack
                          direction="row"
                          alignItems="center"
                          gap={1}
                          key={index}
                        >
                          <Radio
                            checked={option === question.selectedOption}
                            disabled
                            color="primary"
                          />
                          <Typography
                            variant="body1"
                            component="p"
                            lineHeight={1}
                          >
                            {option}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>
                    {question.correctOption !== question.selectedOption && (
                      <Typography
                        variant="body1"
                        component="p"
                        lineHeight={1}
                        color="text.secondary"
                      >
                        <strong>Correct Answer:</strong>{" "}
                        {question.correctOption}
                      </Typography>
                    )}
                  </Box>
                )}
                {exam.type === "subjective" && (
                  <Stack direction="column" gap={2}>
                    <Box>
                      <Typography
                        variant="body1"
                        component="p"
                        fontWeight="bold"
                      >
                        Answer:
                      </Typography>
                      <Typography
                        variant="body1"
                        component="p"
                        justifyContent="justify"
                      >
                        {question.answer}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body1" component="p">
                        <strong>Marks:</strong> {question.marks}
                      </Typography>
                      <Typography variant="body1" component="p" lineHeight={1}>
                        <strong>Obtained Marks:</strong>{" "}
                        {question.obtainedMarks}
                      </Typography>
                    </Box>
                  </Stack>
                )}
                {exam.questions.length !== index + 1 && <Divider />}
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
}