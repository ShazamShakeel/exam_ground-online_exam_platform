import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";

export default function AddQuestion({
  open,
  setOpen,
  editQuestion,
  handleAddQuestion,
  handleUpdateQuestion,
}) {
  const editorRef = useRef(null);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
  ]);
  const [correctOption, setCorrectOption] = useState("");
  const [questionInputError, setQuestionInputError] = useState("");
  const [correctOptionError, setCorrectOptionError] = useState("");

  const handleOptionChange = (index, event) => {
    const newOptions = [...options];
    newOptions[index].text = event.target.value;
    setOptions(newOptions);
  };

  const handleCheckboxChange = (index) => {
    const newOptions = options.map((option, i) => ({
      ...option,
      isCorrect: i === index ? true : false,
    }));
    setOptions(newOptions);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (editorRef.current.getEditor().getLength() < 2) {
      return setQuestionInputError("Question is required");
    } else {
      setQuestionInputError("");
    }
    if (!correctOption) {
      return setCorrectOptionError("Correct option is required");
    } else {
      setCorrectOptionError("");
    }
    editQuestion
      ? handleUpdateQuestion({
          question,
          options,
        })
      : handleAddQuestion({
          question,
          options,
        });
    setOpen(false);
    setQuestion("");
    setOptions([
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
    ]);
    setCorrectOption("");
    setQuestionInputError("");
    setCorrectOptionError("");
  };

  useEffect(() => {
    setCorrectOption(options.find((option) => option.isCorrect)?.text);
  }, [options]);

  useEffect(() => {
    if (editQuestion) {
      setQuestion(editQuestion.question);
      setOptions(editQuestion.options);
    }
  }, [editQuestion]);

  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md">
      <form onSubmit={onSubmit}>
        <DialogTitle textAlign="center" fontWeight="bold" color="primary">
          Add MCQ
        </DialogTitle>
        <DialogContent sx={{ width: 800 }}>
          <Stack direction="column" gap={1}>
            <Typography variant="h6" component="h2" fontWeight="bold">
              Question:
            </Typography>
            <ReactQuill
              theme="snow"
              ref={editorRef}
              value={question}
              onChange={setQuestion}
              placeholder="Write your question here..."
            />
            {questionInputError && (
              <Typography color="error">{questionInputError}</Typography>
            )}
            <Typography variant="h6" component="h2" fontWeight="bold">
              Options:
            </Typography>
            {options.map((_, index) => (
              <Stack direction="row" alignItems="center" gap={1} key={index}>
                <Typography variant="body1">{`${index + 1})`}</Typography>
                <TextField
                  fullWidth
                  required
                  multiline
                  value={options[index]?.text}
                  onChange={(e) => handleOptionChange(index, e)}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Correct"
                  checked={options[index].isCorrect}
                  onChange={() => handleCheckboxChange(index)}
                />
              </Stack>
            ))}
            <Stack direction="row" alignItems="center" gap={1} mt={1}>
              <Typography variant="h6" fontWeight="bold">
                Correct Option:
              </Typography>
              <Typography variant="h6">{correctOption}</Typography>
            </Stack>
            {correctOptionError && (
              <Typography color="error">{correctOptionError}</Typography>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
