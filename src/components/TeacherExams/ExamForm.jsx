import {
  Box,
  Button,
  Checkbox,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { useLocation } from "react-router-dom";
import AddQuestion from "./AddQuestion";
import UseOCR from "./UseOCR";

export default function ExamForm() {
  const examType = useLocation().pathname.split("/").includes("mcq-exam")
    ? "mcq"
    : "subjective";
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [editQuestionIndex, setEditQuestionIndex] = useState("");
  const [editQuestion, setEditQuestion] = useState(null);
  const [duration, setDuration] = useState(0);
  const [browserSecurity, setBrowserSecurity] = useState(false);
  const [eachMcqMarks, setEachMcqMarks] = useState(0);
  const [totalMarks, setTotalMarks] = useState(0);

  const handleAddQuestion = (question) => {
    setQuestions((prevQuestions) => [...prevQuestions, question]);
  };

  const handleDeleteQuestion = (index) => {
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      newQuestions.splice(index, 1);
      return newQuestions;
    });
  };

  const handleUpdateQuestion = (question) => {
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      newQuestions[editQuestionIndex] = question;
      setEditQuestionIndex("");
      setEditQuestion(null);
      return newQuestions;
    });
  };

  const handleSubmit = () => {
    console.log("submit", {
      title,
      duration,
      browserSecurity,
      questions,
      type: examType === "mcq" ? "mcq" : "subjective",
      ...(examType === "mcq" ? eachMcqMarks : totalMarks),
    });
  };

  useEffect(() => {
    console.log(questions);
  }, [questions]);

  return (
    <>
      <Stack direction="column" gap={2}>
        <Typography
          variant="h4"
          component="h1"
          fontWeight="bold"
          textAlign="center"
          color="primary"
          py={1}
        >
          Create MCQ Based Exam
        </Typography>
        <Divider variant="middle" sx={{ mb: 1 }} />
        <UseOCR />
        <Divider variant="middle" sx={{ mb: 1 }} />
        <Stack direction="row" alignItems="center" gap={2}>
          <Typography variant="h5" fontWeight="bold" color="primary">
            Title:
          </Typography>
          <TextField
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter exam title"
            size="small"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: "white",
              },
            }}
          />
        </Stack>
        {examType === "mcq" ? (
          <Stack direction="row" alignItems="center" gap={2}>
            <Typography
              variant="h5"
              fontWeight="bold"
              color="primary"
              minWidth={200}
            >
              Each MCQ Marks:
            </Typography>
            <TextField
              variant="outlined"
              value={eachMcqMarks}
              onChange={(e) => setEachMcqMarks(e.target.value)}
              placeholder="Enter each MCQ marks"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "white",
                },
              }}
            />
          </Stack>
        ) : (
          <Stack direction="row" alignItems="center" gap={2}>
            <Typography
              variant="h5"
              fontWeight="bold"
              color="primary"
              minWidth={200}
            >
              Total Marks:
            </Typography>
            <TextField
              variant="outlined"
              value={eachMcqMarks}
              onChange={(e) => setTotalMarks(e.target.value)}
              placeholder="Enter each MCQ marks"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "white",
                },
              }}
            />
          </Stack>
        )}
        <Stack direction="row" alignItems="center" gap={2}>
          <Typography
            variant="h5"
            fontWeight="bold"
            color="primary"
            minWidth={200}
          >
            Duration:
          </Typography>
          <TextField
            variant="outlined"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Enter exam duration"
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: "white",
              },
            }}
          />
        </Stack>
        <Stack direction="row" alignItems="center" gap={2}>
          <Typography
            variant="h5"
            fontWeight="bold"
            color="primary"
            minWidth={200}
          >
            Browser Security:
          </Typography>
          <Checkbox
            checked={browserSecurity}
            onChange={(e) => setBrowserSecurity(e.target.checked)}
            sx={{
              "&.MuiCheckbox-root": {
                padding: "0 !important",
              },
            }}
          />
        </Stack>
      </Stack>
      <Divider variant="middle" sx={{ my: 1 }} />

      <Stack direction="column" my={2}>
        <Box maxWidth={200}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
            fullWidth
            size="large"
          >
            Add Question
          </Button>
        </Box>
        <AddQuestion
          open={open}
          setOpen={setOpen}
          editQuestion={editQuestion}
          handleAddQuestion={handleAddQuestion}
          handleUpdateQuestion={handleUpdateQuestion}
        />
      </Stack>

      <Stack direction="column" gap={2}>
        {questions.map((question, index) => (
          <Paper key={index} sx={{ p: 2 }}>
            <Stack direction="column" gap={1}>
              <Typography variant="h6" fontWeight="bold" color="primary">
                Question:
              </Typography>
              <Box className="question" sx={{ pl: 2 }}>
                {ReactHtmlParser(question.question)}
              </Box>
            </Stack>
            {examType === "mcq" && (
              <>
                <Stack direction="column" gap={1}>
                  <Typography variant="h6" fontWeight="bold" color="primary">
                    Options:
                  </Typography>
                  {question.options.map((option, index) => (
                    <Stack
                      direction="row"
                      alignItems="center"
                      gap={1}
                      key={index}
                      sx={{ pl: 2 }}
                    >
                      <Typography variant="body1">{`${index + 1})`}</Typography>
                      <Typography variant="body1">{option.text}</Typography>
                    </Stack>
                  ))}
                </Stack>
                <Stack direction="row" alignItems="center" gap={2}>
                  <Typography variant="h6" fontWeight="bold" color="primary">
                    Correct Option:
                  </Typography>
                  <Typography variant="body1">
                    {question.options.find((option) => option.isCorrect)?.text}
                  </Typography>
                </Stack>
              </>
            )}
            <Stack direction="row" justifyContent="flex-end" gap={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setEditQuestionIndex(index);
                  setEditQuestion(question);
                  setOpen(true);
                }}
              >
                Update
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDeleteQuestion(index)}
              >
                Delete
              </Button>
            </Stack>
          </Paper>
        ))}
      </Stack>
      <Divider variant="middle" sx={{ my: 1 }} />
      <Box display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleSubmit}
        >
          Create Exam
        </Button>
      </Box>
    </>
  );
}
