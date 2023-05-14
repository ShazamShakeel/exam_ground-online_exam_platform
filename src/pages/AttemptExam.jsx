/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import ExamRulesPreview from "components/Exams/AttemptExam/ExamRulesPreview";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { editDiagram } from "services/Diagram-Editor";
import decodeHTML from "utils/helpers/decodeHTML";
import axiosInstance from "utils/httpRequest/axiosInstance";

let isSubmitted = false;
let isCheated = false;
let isSubmittedFunctionCalled = false;

export default function AttemptExam() {
  const navigate = useNavigate();
  const id = useParams().id;
  let diagramRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [isExamStarted, setIsExamStarted] = useState(false);
  const [time, setTime] = useState(0);
  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [duration, setDuration] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isMcqExam, setIsMcqExam] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [diagram, setDiagram] = useState("");

  const handleStartExam = () => {
    // eslint-disable-next-line no-restricted-globals
    if (screen.width > window.innerWidth) {
      return toast.info(
        "You are using multiple screens, please use only one screen to attempt the exam. Open Browser in full screen mode."
      );
    } else {
      setIsExamStarted(true);
    }
  };

  const handleAttemptedQuestion = () => {
    const question = questions[currentQuestionIndex];
    if (isMcqExam) {
      question.selectedOption = selectedOption;
    }
    if (!isMcqExam) {
      question.answer = answerText;
      question.diagram = diagram;
    }
    const newQuestions = [...questions];
    newQuestions[currentQuestionIndex] = question;
    if (isExamStarted && currentQuestionIndex + 1 < questions.length) {
      setQuestions(newQuestions);
      setCurrentQuestionIndex(
        (currentQuestionIndex) => currentQuestionIndex + 1
      );
    }
    setSelectedOption("");
    setAnswerText("");
    setDiagram("");
    return newQuestions;
  };

  const handleEditor = () => {
    const isFrame = document.getElementById("drawioFrame");
    if (isFrame) {
      isFrame.remove();
    }
  };

  const submitExam = () => {
    if (isSubmitted) return;
    if (isSubmittedFunctionCalled) return;
    isSubmittedFunctionCalled = true;

    document.removeEventListener("mouseleave", handleLeave);

    if (dayjs(exam.date).isBefore(dayjs(), "day")) {
      isCheated &&
        !isSubmitted &&
        toast.info("Exam is submitted due to cheating.");
      isSubmitted = true;
      handleEditor();
      navigate("/courses/" + exam.course.id, {
        replace: true,
      });
    } else {
      const _questions = handleAttemptedQuestion();
      const data = {
        exam: exam.id ?? exam._id,
        teacher: exam.teacher.id ?? exam.teacher._id,
        questions: _questions,
      };
      if (!isMcqExam) {
        data.status = "unchecked";
      }
      if (isMcqExam) {
        data.status = "checked";
        data.obtainedMarks = _questions.reduce((acc, question) => {
          if (question.selectedOption === question.correctOption) {
            return acc + (Number(exam.eachMcqMarks) ?? 0);
          }
          return acc;
        }, 0);
      }
      axiosInstance
        .post("/answer", data)
        .then(() => {
          if (isCheated && !isSubmitted)
            toast.info("Exam is submitted due to cheating.");

          if (!isCheated && !isSubmitted)
            toast.success(
              isMcqExam
                ? "Your exam has been submitted."
                : "Your exam has been submitted, you will be able to check your result after teacher checks your attempt."
            );

          isSubmitted = true;
          handleEditor();
          navigate("/results", {
            replace: true,
          });
        })
        .catch((err) => {
          toast.error(err.response.data.message ?? "Something went wrong");
        });
    }
  };

  useEffect(() => {
    exam && setTime(duration * 60);
  }, [exam, duration]);

  useEffect(() => {
    if (isExamStarted) {
      const intervalId = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [isExamStarted]);

  useEffect(() => {
    isExamStarted && time === 0 && submitExam();
  }, [isExamStarted, time]);

  useEffect(() => {
    if (isExamStarted) {
      document.addEventListener("mouseleave", handleLeave);
    }
  }, [isExamStarted]);

  const handleLeave = () => {
    isCheated = true;
    !isSubmitted && !isSubmittedFunctionCalled && submitExam();
  };

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get("/exam/" + id)
      .then((res) => {
        setExam(res.data);
        setQuestions(shuffleArray(res.data?.questions));
        setIsMcqExam(res.data?.type === "mcq");
        setDuration(+res.data?.duration);
      })
      .catch((err) => {
        toast.error(err.response.data.message ?? "Something went wrong");
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    isCheated = false;
    isSubmitted = false;
    isSubmittedFunctionCalled = false;
  }, []);

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  if (loading)
    return (
      <Box
        minHeight="100vh"
        minWidth="100vw"
        display="flex"
        justifyContent="center"
        alignItems="center"
        id="exam-container"
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Box id="exam-container">
      <Box minHeight="100vh" width="100vw" display="flex" alignItems="center">
        <Container
          component="main"
          maxWidth="lg"
          sx={{
            margin: "auto",
          }}
        >
          <Paper
            elevation={16}
            width="auto"
            sx={{
              p: 3,
              minHeight: "75vh",
              position: "relative",
              mx: { xs: 1, sm: 1.5, md: 2, lg: 4 },
            }}
          >
            {exam && !isExamStarted && (
              <ExamRulesPreview handleStartExam={handleStartExam} />
            )}
            {exam && isExamStarted && (
              <>
                <Typography
                  variant="h4"
                  component="h1"
                  textAlign="center"
                  color="primary"
                  fontWeight="bolder"
                >
                  {exam.title}
                </Typography>
                <Grid container>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" component="p">
                      <strong>Teacher: </strong>
                      {exam.teacher.name}
                    </Typography>
                    <Typography variant="h6" component="p">
                      <strong>Course: </strong>
                      {exam.course.title}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6} textAlign="right">
                    <Typography variant="h5" component="h1">
                      {`Time Left: ${hours < 10 ? "0" + hours : hours}:${
                        minutes < 10 ? "0" + minutes : minutes
                      }:${seconds < 10 ? "0" + seconds : seconds}`}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider variant="middle" sx={{ my: 2 }} />
              </>
            )}
            {exam && isExamStarted && (
              <>
                <Box
                  display="flex"
                  flexWrap="wrap"
                  alignItems="center"
                  gap={0.75}
                  sx={{
                    "& > *": {
                      m: 0.5,
                      fontSize: "1.5rem",
                    },
                  }}
                >
                  <strong>{`Q)`}</strong>
                  {decodeHTML(questions[currentQuestionIndex]?.question)}
                  {!isMcqExam && (
                    <strong>{`(${questions[currentQuestionIndex]?.marks})`}</strong>
                  )}
                </Box>
                {questions[currentQuestionIndex]?.diagram && (
                  <Box my={1}>
                    <img
                      src={questions[currentQuestionIndex]?.diagram}
                      alt="question"
                      width="250px"
                      height="auto"
                      style={{
                        padding: "1rem",
                        border: `2px solid ${grey[700]}`,
                        aspectRatio: "1/1",
                      }}
                    />
                  </Box>
                )}
                {isMcqExam && (
                  <FormControl sx={{ ml: 1, my: 2 }}>
                    <FormLabel id="options" sx={{ fontSize: "1.5rem" }}>
                      Options:
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="options"
                      name="options-group"
                      value={selectedOption}
                      onChange={(e) => setSelectedOption(e.target.value)}
                    >
                      {questions[currentQuestionIndex]?.options?.map(
                        (option) => (
                          <FormControlLabel
                            key={option}
                            value={option}
                            control={<Radio />}
                            label={option}
                          />
                        )
                      )}
                    </RadioGroup>
                  </FormControl>
                )}
                {!isMcqExam && (
                  <>
                    <TextField
                      label="Answer"
                      multiline
                      rows={4}
                      fullWidth
                      value={answerText}
                      onChange={(e) => setAnswerText(e.target.value)}
                      sx={{ my: 2 }}
                    />
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
                  </>
                )}
              </>
            )}
            <Box position="absolute" bottom="-4rem" right="0.75rem">
              {isExamStarted && currentQuestionIndex + 1 < questions.length && (
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ minWidth: 250 }}
                  onClick={handleAttemptedQuestion}
                >
                  Next
                </Button>
              )}
              {isExamStarted &&
                currentQuestionIndex + 1 === questions.length && (
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ minWidth: 250 }}
                    onClick={submitExam}
                  >
                    Submit
                  </Button>
                )}
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}

function shuffleArray(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const emptyDiagram =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIxMjVweCIgaGVpZ2h0PSI2NXB4IiB2aWV3Qm94PSItMC41IC0wLjUgMTI1IDY1IiBjb250ZW50PSImbHQ7bXhmaWxlIGhvc3Q9JnF1b3Q7ZW1iZWQuZGlhZ3JhbXMubmV0JnF1b3Q7IG1vZGlmaWVkPSZxdW90OzIwMjMtMDQtMTBUMDQ6MzY6MDQuMTkwWiZxdW90OyBhZ2VudD0mcXVvdDtNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvMTEyLjAuMC4wIFNhZmFyaS81MzcuMzYmcXVvdDsgZXRhZz0mcXVvdDtjdWxZSFJ6WVA5ZDRCQ2gtWVBPXyZxdW90OyB2ZXJzaW9uPSZxdW90OzIxLjEuNSZxdW90OyB0eXBlPSZxdW90O2VtYmVkJnF1b3Q7Jmd0OyZsdDtkaWFncmFtIGlkPSZxdW90O2VtWVJTRERSa0RQMllkM0VaeTNyJnF1b3Q7IG5hbWU9JnF1b3Q7UGFnZS0xJnF1b3Q7Jmd0O2paUEJib013RElhZmh1T2tRUVRxamx2YmRaZWRldGc1QlRlSkdqQUxvZEE5L1VMalFOZzBhYWVHNzNkK083YWJzRzA5SGd4djVUdFdvSlBzc1JvVHRrdXlMTjFzQ3Zjemtac25tK3pSQTJGVVJVRUxPS292SUJqQ2VsVkJ0d3EwaU5xcWRnMUxiQm9vN1lweFkzQlloNTFSVTFieWI3bUFWY1FFamlYWHYrbUhxcXdNcnlnVy9nWkt5SkE1TFo2OGN1TGxSUmpzRzhyWFlBTmVxWG13b1JvNnlTc2NJc1QyQ2RzYVJPdFA5YmdGUGJWVnJXcC8vVU9sa2p0N0M0OEl0UnBvN0g4YzZNS1Y2MzUyS0xTNytuSnlCekVkQWppanM0eVRGWjg5QnVHaHU4L3oyUVZrV1R2NmE2UUhvNTNpd3ZBNitMbWl2T1U2amNOUjZoL1B1M2NacHRwVEp3OVNXVGkydkp6VXdXMmxZOUxXbXVUT0dyek1zOHhudjdnNzFNRXJHQXRqaEtoYkI4QWFyTG01RUZKWnp2d1Yydkk4ei8zM3NPeE1Hc1l0bzMwcGlIRmFVekZiTCtOeEI1cFErRnhXNDY1RmZ6MjIvd1k9Jmx0Oy9kaWFncmFtJmd0OyZsdDsvbXhmaWxlJmd0OyI+PGRlZnMvPjxnPjxyZWN0IHg9IjIiIHk9IjIiIHdpZHRoPSIxMjAiIGhlaWdodD0iNjAiIHJ4PSI5IiByeT0iOSIgZmlsbD0icmdiKDI1NSwgMjU1LCAyNTUpIiBzdHJva2U9InJnYigwLCAwLCAwKSIgc3Ryb2tlLXdpZHRoPSI1IiBwb2ludGVyLWV2ZW50cz0iYWxsIi8+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTAuNSAtMC41KSI+PHN3aXRjaD48Zm9yZWlnbk9iamVjdCBwb2ludGVyLWV2ZW50cz0ibm9uZSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgcmVxdWlyZWRGZWF0dXJlcz0iaHR0cDovL3d3dy53My5vcmcvVFIvU1ZHMTEvZmVhdHVyZSNFeHRlbnNpYmlsaXR5IiBzdHlsZT0ib3ZlcmZsb3c6IHZpc2libGU7IHRleHQtYWxpZ246IGxlZnQ7Ij48ZGl2IHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sIiBzdHlsZT0iZGlzcGxheTogZmxleDsgYWxpZ24taXRlbXM6IHVuc2FmZSBjZW50ZXI7IGp1c3RpZnktY29udGVudDogdW5zYWZlIGNlbnRlcjsgd2lkdGg6IDExOHB4OyBoZWlnaHQ6IDFweDsgcGFkZGluZy10b3A6IDMycHg7IG1hcmdpbi1sZWZ0OiAzcHg7Ij48ZGl2IGRhdGEtZHJhd2lvLWNvbG9ycz0iY29sb3I6IHJnYigwLCAwLCAwKTsgIiBzdHlsZT0iYm94LXNpemluZzogYm9yZGVyLWJveDsgZm9udC1zaXplOiAwcHg7IHRleHQtYWxpZ246IGNlbnRlcjsiPjxkaXYgc3R5bGU9ImRpc3BsYXk6IGlubGluZS1ibG9jazsgZm9udC1zaXplOiAxMnB4OyBmb250LWZhbWlseTogSGVsdmV0aWNhOyBjb2xvcjogcmdiKDAsIDAsIDApOyBsaW5lLWhlaWdodDogMS4yOyBwb2ludGVyLWV2ZW50czogYWxsOyB3aGl0ZS1zcGFjZTogbm9ybWFsOyBvdmVyZmxvdy13cmFwOiBub3JtYWw7Ij48Yj48Zm9udCBzdHlsZT0iZm9udC1zaXplOiAyMnB4OyI+RGlhZ3JhbTwvZm9udD48L2I+PC9kaXY+PC9kaXY+PC9kaXY+PC9mb3JlaWduT2JqZWN0Pjx0ZXh0IHg9IjYyIiB5PSIzNiIgZmlsbD0icmdiKDAsIDAsIDApIiBmb250LWZhbWlseT0iSGVsdmV0aWNhIiBmb250LXNpemU9IjEycHgiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkRpYWdyYW08L3RleHQ+PC9zd2l0Y2g+PC9nPjwvZz48c3dpdGNoPjxnIHJlcXVpcmVkRmVhdHVyZXM9Imh0dHA6Ly93d3cudzMub3JnL1RSL1NWRzExL2ZlYXR1cmUjRXh0ZW5zaWJpbGl0eSIvPjxhIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTUpIiB4bGluazpocmVmPSJodHRwczovL3d3dy5kaWFncmFtcy5uZXQvZG9jL2ZhcS9zdmctZXhwb3J0LXRleHQtcHJvYmxlbXMiIHRhcmdldD0iX2JsYW5rIj48dGV4dCB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEwcHgiIHg9IjUwJSIgeT0iMTAwJSI+VGV4dCBpcyBub3QgU1ZHIC0gY2Fubm90IGRpc3BsYXk8L3RleHQ+PC9hPjwvc3dpdGNoPjwvc3ZnPg==";
