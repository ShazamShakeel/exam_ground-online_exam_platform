import {
  Box,
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
import { useLocation } from "react-router-dom";

// const emptyDiagram =
//   "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIxcHgiIGhlaWdodD0iMXB4IiB2aWV3Qm94PSItMC41IC0wLjUgMSAxIiBjb250ZW50PSImbHQ7bXhmaWxlIGhvc3Q9JnF1b3Q7ZW1iZWQuZGlhZ3JhbXMubmV0JnF1b3Q7IG1vZGlmaWVkPSZxdW90OzIwMjMtMDMtMTJUMDc6MTc6MTYuMzIxWiZxdW90OyBhZ2VudD0mcXVvdDs1LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzExMC4wLjAuMCBTYWZhcmkvNTM3LjM2JnF1b3Q7IGV0YWc9JnF1b3Q7SGVGSG1zOUl2VzVqalBsNVZqdmYmcXVvdDsgdmVyc2lvbj0mcXVvdDsyMS4wLjYmcXVvdDsgdHlwZT0mcXVvdDtlbWJlZCZxdW90OyZndDsmbHQ7ZGlhZ3JhbSBpZD0mcXVvdDtlbVlSU0REUmtEUDJZZDNFWnkzciZxdW90OyBuYW1lPSZxdW90O1BhZ2UtMSZxdW90OyZndDtkWkV4RDRNZ0VJVi9EYnRLWXV4c2JidDBjdWhNNGFxa3lCbkVxUDMxMVFDeHBPM0U4ZDNMdlhkQWFObk5aOFA2OW9vQ0ZNa1NNUk42SkZtV0ZrVytIaHRaSENteXhJSEdTT0ZGTzZqbEN6d01zbEVLR0NLaFJWUlc5akhrcURWd0d6Rm1ERTZ4N0lIS3UvcjVQV3NnVW15ZzVreDkwNXNVdGcxYjVEdS9nR3phNEp6bUI5ZTVNLzVzREk3YSsyblU0RG9kQzJOOGhxRmxBcWNQUkN0Q1M0Tm9YZFhOSmFqdFdXV1UvZlNuNnlNUGRnbExoS3dHdFAweFlTMTJzL1VTZlNhdDNnPT0mbHQ7L2RpYWdyYW0mZ3Q7Jmx0Oy9teGZpbGUmZ3Q7Ij48ZGVmcy8+PGcvPjwvc3ZnPg==";

export default function AddQuestion({
  open,
  setOpen,
  editQuestion,
  handleAddQuestion,
  handleUpdateQuestion,
}) {
  const examType = useLocation().pathname.split("/").includes("mcq-exam")
    ? "mcq"
    : "subjective";
  const editorRef = useRef(null);
  // let diagramRef = useRef(null);
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
  // const [diagram, setDiagram] = useState("");

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

  // const handleDiagramChange = (src) => {
  //   console.log(src);
  //   src && setDiagram(src);
  // };

  const onSubmit = (e) => {
    e.preventDefault();
    if (editorRef.current.getEditor().getLength() < 2) {
      return setQuestionInputError("Question is required");
    } else {
      setQuestionInputError("");
    }
    if (examType === "mcq") {
      if (!correctOption) {
        return setCorrectOptionError("Correct option is required");
      } else {
        setCorrectOptionError("");
      }
    }
    editQuestion
      ? handleUpdateQuestion({
          question,
          ...(examType === "mcq" && options),
        })
      : handleAddQuestion({
          question,
          ...(examType === "mcq" && options),
        });
    setOpen(false);
    setQuestion("");
    setQuestionInputError("");
    if (examType === "mcq") {
      setOptions([
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ]);
      setCorrectOption("");
      setCorrectOptionError("");
    }
  };

  useEffect(() => {
    examType === "mcq" &&
      setCorrectOption(options.find((option) => option.isCorrect)?.text);
  }, [examType, options]);

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
          {`Add ${examType === "mcq" ? "MCQ" : "Subjective"} Question`}
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
            {examType === "mcq" && (
              <>
                <Typography variant="h6" component="h2" fontWeight="bold">
                  Options:
                </Typography>
                {options.map((_, index) => (
                  <Stack
                    direction="row"
                    alignItems="center"
                    gap={1}
                    key={index}
                  >
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
              </>
            )}
            {/* <img
              src={diagram}
              alt="diagram"
              ref={diagramRef}
              height="auto"
              width="200px"
            /> */}
            {examType !== "mcq" && (
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    // DiagramEditor.editElement(
                    //   diagramRef.current,
                    //   null,
                    //   null,
                    //   null,
                    //   null,
                    //   handleDiagramChange
                    // );
                  }}
                >
                  Add Diagram
                </Button>
              </Box>
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
