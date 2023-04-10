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
import blue from "@mui/material/colors/blue";
import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { useLocation } from "react-router-dom";
import { editDiagram } from "services/Diagram-Editor";

const emptyDiagram =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIxMjVweCIgaGVpZ2h0PSI2NXB4IiB2aWV3Qm94PSItMC41IC0wLjUgMTI1IDY1IiBjb250ZW50PSImbHQ7bXhmaWxlIGhvc3Q9JnF1b3Q7ZW1iZWQuZGlhZ3JhbXMubmV0JnF1b3Q7IG1vZGlmaWVkPSZxdW90OzIwMjMtMDQtMTBUMDQ6MzY6MDQuMTkwWiZxdW90OyBhZ2VudD0mcXVvdDtNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvMTEyLjAuMC4wIFNhZmFyaS81MzcuMzYmcXVvdDsgZXRhZz0mcXVvdDtjdWxZSFJ6WVA5ZDRCQ2gtWVBPXyZxdW90OyB2ZXJzaW9uPSZxdW90OzIxLjEuNSZxdW90OyB0eXBlPSZxdW90O2VtYmVkJnF1b3Q7Jmd0OyZsdDtkaWFncmFtIGlkPSZxdW90O2VtWVJTRERSa0RQMllkM0VaeTNyJnF1b3Q7IG5hbWU9JnF1b3Q7UGFnZS0xJnF1b3Q7Jmd0O2paUEJib013RElhZmh1T2tRUVRxamx2YmRaZWRldGc1QlRlSkdqQUxvZEE5L1VMalFOZzBhYWVHNzNkK083YWJzRzA5SGd4djVUdFdvSlBzc1JvVHRrdXlMTjFzQ3Zjemtac25tK3pSQTJGVVJVRUxPS292SUJqQ2VsVkJ0d3EwaU5xcWRnMUxiQm9vN1lweFkzQlloNTFSVTFieWI3bUFWY1FFamlYWHYrbUhxcXdNcnlnVy9nWkt5SkE1TFo2OGN1TGxSUmpzRzhyWFlBTmVxWG13b1JvNnlTc2NJc1QyQ2RzYVJPdFA5YmdGUGJWVnJXcC8vVU9sa2p0N0M0OEl0UnBvN0g4YzZNS1Y2MzUyS0xTNytuSnlCekVkQWppanM0eVRGWjg5QnVHaHU4L3oyUVZrV1R2NmE2UUhvNTNpd3ZBNitMbWl2T1U2amNOUjZoL1B1M2NacHRwVEp3OVNXVGkydkp6VXdXMmxZOUxXbXVUT0dyek1zOHhudjdnNzFNRXJHQXRqaEtoYkI4QWFyTG01RUZKWnp2d1Yydkk4ei8zM3NPeE1Hc1l0bzMwcGlIRmFVekZiTCtOeEI1cFErRnhXNDY1RmZ6MjIvd1k9Jmx0Oy9kaWFncmFtJmd0OyZsdDsvbXhmaWxlJmd0OyI+PGRlZnMvPjxnPjxyZWN0IHg9IjIiIHk9IjIiIHdpZHRoPSIxMjAiIGhlaWdodD0iNjAiIHJ4PSI5IiByeT0iOSIgZmlsbD0icmdiKDI1NSwgMjU1LCAyNTUpIiBzdHJva2U9InJnYigwLCAwLCAwKSIgc3Ryb2tlLXdpZHRoPSI1IiBwb2ludGVyLWV2ZW50cz0iYWxsIi8+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTAuNSAtMC41KSI+PHN3aXRjaD48Zm9yZWlnbk9iamVjdCBwb2ludGVyLWV2ZW50cz0ibm9uZSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgcmVxdWlyZWRGZWF0dXJlcz0iaHR0cDovL3d3dy53My5vcmcvVFIvU1ZHMTEvZmVhdHVyZSNFeHRlbnNpYmlsaXR5IiBzdHlsZT0ib3ZlcmZsb3c6IHZpc2libGU7IHRleHQtYWxpZ246IGxlZnQ7Ij48ZGl2IHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sIiBzdHlsZT0iZGlzcGxheTogZmxleDsgYWxpZ24taXRlbXM6IHVuc2FmZSBjZW50ZXI7IGp1c3RpZnktY29udGVudDogdW5zYWZlIGNlbnRlcjsgd2lkdGg6IDExOHB4OyBoZWlnaHQ6IDFweDsgcGFkZGluZy10b3A6IDMycHg7IG1hcmdpbi1sZWZ0OiAzcHg7Ij48ZGl2IGRhdGEtZHJhd2lvLWNvbG9ycz0iY29sb3I6IHJnYigwLCAwLCAwKTsgIiBzdHlsZT0iYm94LXNpemluZzogYm9yZGVyLWJveDsgZm9udC1zaXplOiAwcHg7IHRleHQtYWxpZ246IGNlbnRlcjsiPjxkaXYgc3R5bGU9ImRpc3BsYXk6IGlubGluZS1ibG9jazsgZm9udC1zaXplOiAxMnB4OyBmb250LWZhbWlseTogSGVsdmV0aWNhOyBjb2xvcjogcmdiKDAsIDAsIDApOyBsaW5lLWhlaWdodDogMS4yOyBwb2ludGVyLWV2ZW50czogYWxsOyB3aGl0ZS1zcGFjZTogbm9ybWFsOyBvdmVyZmxvdy13cmFwOiBub3JtYWw7Ij48Yj48Zm9udCBzdHlsZT0iZm9udC1zaXplOiAyMnB4OyI+RGlhZ3JhbTwvZm9udD48L2I+PC9kaXY+PC9kaXY+PC9kaXY+PC9mb3JlaWduT2JqZWN0Pjx0ZXh0IHg9IjYyIiB5PSIzNiIgZmlsbD0icmdiKDAsIDAsIDApIiBmb250LWZhbWlseT0iSGVsdmV0aWNhIiBmb250LXNpemU9IjEycHgiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkRpYWdyYW08L3RleHQ+PC9zd2l0Y2g+PC9nPjwvZz48c3dpdGNoPjxnIHJlcXVpcmVkRmVhdHVyZXM9Imh0dHA6Ly93d3cudzMub3JnL1RSL1NWRzExL2ZlYXR1cmUjRXh0ZW5zaWJpbGl0eSIvPjxhIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTUpIiB4bGluazpocmVmPSJodHRwczovL3d3dy5kaWFncmFtcy5uZXQvZG9jL2ZhcS9zdmctZXhwb3J0LXRleHQtcHJvYmxlbXMiIHRhcmdldD0iX2JsYW5rIj48dGV4dCB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEwcHgiIHg9IjUwJSIgeT0iMTAwJSI+VGV4dCBpcyBub3QgU1ZHIC0gY2Fubm90IGRpc3BsYXk8L3RleHQ+PC9hPjwvc3dpdGNoPjwvc3ZnPg==";

export default function AddQuestion({
  open,
  setOpen,
  editQuestion,
  handleAddQuestion,
  handleUpdateQuestion,
}) {
  const isMcqExam = useLocation().pathname.split("/").includes("mcq-exam");
  const editorRef = useRef(null);
  let diagramRef = useRef(null);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState("");
  const [questionInputError, setQuestionInputError] = useState("");
  const [correctOptionError, setCorrectOptionError] = useState("");
  const [diagram, setDiagram] = useState("");
  const [marks, setMarks] = useState(0);
  const [marksError, setMarksError] = useState("");

  const handleOptionChange = (index, event) => {
    const newOptions = [...options];
    newOptions[index] = event.target.value;
    setOptions(newOptions);
  };

  const handleCheckboxChange = (index) => {
    setCorrectOption(options[index]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (editorRef.current.getEditor().getLength() < 2)
      return setQuestionInputError("Question is required");
    else setQuestionInputError("");
    if (isMcqExam)
      if (!correctOption)
        return setCorrectOptionError("Please select correct option");
      else setCorrectOptionError("");
    if (!isMcqExam)
      if (marks < 1) return setMarksError("Marks should be greater than 0");
      else setMarksError("");

    editQuestion
      ? handleUpdateQuestion({
          question,
          ...(!isMcqExam && { diagram, marks }),
          ...(isMcqExam && { options, correctOption }),
        })
      : handleAddQuestion({
          question,
          ...(!isMcqExam && { diagram, marks }),
          ...(isMcqExam && { options, correctOption }),
        });
    setOpen(false);
    setQuestion("");
    setQuestionInputError("");
    if (isMcqExam) {
      setOptions(["", "", "", ""]);
      setCorrectOption("");
      setCorrectOptionError("");
    } else {
      setDiagram("");
      setMarks(0);
    }
  };

  useEffect(() => {
    if (editQuestion) {
      setQuestion(editQuestion.question);
      if (isMcqExam) {
        setOptions(editQuestion.options);
        setCorrectOption(editQuestion?.correctOption ?? "");
      }
      if (!isMcqExam) {
        setDiagram(editQuestion?.diagram ?? "");
        setMarks(editQuestion?.marks ?? 0);
      }
    }
  }, [editQuestion, isMcqExam]);

  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md">
      <form onSubmit={onSubmit}>
        <DialogTitle textAlign="center" fontWeight="bold" color="primary">
          {`Add ${isMcqExam ? "MCQ" : "Subjective"} Question`}
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
            {isMcqExam && (
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
                      value={options[index]}
                      onChange={(e) => handleOptionChange(index, e)}
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Correct"
                      checked={
                        !!correctOption.length &&
                        options[index] === correctOption
                      }
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
            {!isMcqExam && (
              <Stack direction="row" alignItems="center" gap={1}>
                <Typography variant="h6" component="h2" fontWeight="bold">
                  Marks:
                </Typography>
                <TextField
                  type="number"
                  value={marks}
                  size="small"
                  onChange={(e) => setMarks(e.target.value)}
                  required
                  inputProps={{ min: 0 }}
                  error={!!marksError}
                  helperText={marksError}
                />
              </Stack>
            )}
            <Stack direction="row" alignItems="center" gap={1}>
              {diagram && (
                <img
                  src={diagram}
                  alt="diagram"
                  ref={diagramRef}
                  height="auto"
                  width="250px"
                  style={{
                    padding: "1rem",
                    border: `2px solid ${blue[500]}`,
                    aspectRatio: "1/1",
                  }}
                />
              )}
              {!isMcqExam && (
                <Stack direction="column" alignItems="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      diagram
                        ? editDiagram(diagramRef.current, setDiagram)
                        : setDiagram(emptyDiagram);
                    }}
                  >
                    {diagram ? "Edit Diagram" : "Add Diagram"}
                  </Button>
                  {diagram && (
                    <Button onClick={() => setDiagram("")}>
                      Remove Diagram
                    </Button>
                  )}
                </Stack>
              )}
            </Stack>
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
