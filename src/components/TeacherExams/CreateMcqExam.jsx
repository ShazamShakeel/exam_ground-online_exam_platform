import { Divider, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddQuestion from "./AddQuestion";

export default function CreateMcqExam() {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);

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

  const handleUpdateQuestion = (index, question) => {
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      newQuestions[index] = question;
      return newQuestions;
    });
  };

  useEffect(() => {
    console.log(questions);
  }, [questions]);

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
        Create MCQ Based Exam
      </Typography>
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
      <Divider variant="middle" sx={{ my: 1 }} />
      <Stack direction="column" spacing={2}>
        <AddQuestion
          questionType={"mcq"}
          handleAddQuestion={handleAddQuestion}
        />
      </Stack>
    </>
  );
}
