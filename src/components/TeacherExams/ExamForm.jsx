import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import blue from "@mui/material/colors/blue";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import decodeHTML from "utils/helpers/decodeHTML";
import axiosInstance from "utils/httpRequest/axiosInstance";
import AddQuestion from "./AddQuestion";
import UseOCR from "./UseOCR";

export default function ExamForm() {
  const navigate = useNavigate();
  const id = useParams()?.id;
  const isSubjectiveExam = useLocation()
    .pathname.split("/")
    .includes("subjective-exam");
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState(null);
  const [courseError, setCourseError] = useState("");
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [questions, setQuestions] = useState([]);
  const [editQuestionIndex, setEditQuestionIndex] = useState("");
  const [editQuestion, setEditQuestion] = useState(null);
  const [duration, setDuration] = useState(0);
  const [durationError, setDurationError] = useState("");
  const [eachMcqMarks, setEachMcqMarks] = useState(0);
  const [eachMcqMarksError, setEachMcqMarksError] = useState("");
  const [totalMarks, setTotalMarks] = useState(0);
  const [totalMarksError, setTotalMarksError] = useState("");
  const [date, setDate] = useState(new Date());
  const [dateError, setDateError] = useState("");

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

  const getCourses = () => {
    axiosInstance
      .get("/course")
      .then((res) => {
        setCourses(res?.data.results);
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message ??
            "Something went wrong while fetching courses"
        );
      });
  };

  const createExam = () => {
    axiosInstance
      .post("/exam", {
        course: course.id,
        title,
        duration,
        date,
        questions,
        type: isSubjectiveExam ? "subjective" : "mcq",
        ...(!isSubjectiveExam && { eachMcqMarks }),
        totalMarks: isSubjectiveExam
          ? totalMarks
          : eachMcqMarks * questions.length,
      })
      .then(() => {
        toast.success("Exam created successfully");
        navigate("/exams");
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message ??
            "Something went wrong while creating exam"
        );
      });
  };

  const updateExam = () => {
    axiosInstance
      .patch(`/exam/${id}`, {
        course: course.id,
        title,
        duration,
        date,
        questions,
        type: isSubjectiveExam ? "subjective" : "mcq",
        ...(!isSubjectiveExam && { eachMcqMarks }),
        totalMarks: isSubjectiveExam
          ? totalMarks
          : eachMcqMarks * questions.length,
      })
      .then(() => {
        toast.success("Exam updated successfully");
        navigate("/exams");
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message ??
            "Something went wrong while updating exam"
        );
      });
  };

  const handleSubmit = () => {
    if (!course) return setCourseError("Course is required");
    else setCourseError("");
    if (!title) return setTitleError("Title is required");
    else setTitleError("");
    if (!isSubjectiveExam && !eachMcqMarks)
      return setEachMcqMarksError("Each MCQ Marks is required");
    else if (!isSubjectiveExam && eachMcqMarks < 1)
      return setEachMcqMarksError("Each MCQ Marks must be greater than 0");
    else setEachMcqMarksError("");
    if (!duration) return setDurationError("Duration is required");
    else if (duration < 1)
      return setDurationError("Duration must be greater than 0");
    else setDurationError("");
    if (isSubjectiveExam && !totalMarks)
      return setTotalMarksError("Total Marks is required");
    else if (isSubjectiveExam && totalMarks < 1)
      return setTotalMarksError("Total Marks must be greater than 0");
    else setTotalMarksError("");
    if (!date) return setDateError("Date is required");
    if (!questions.length)
      return toast.error("Please add at least one question");

    id ? updateExam() : createExam();
  };

  useEffect(() => {
    getCourses();
  }, []);

  useEffect(() => {
    id &&
      axiosInstance
        .get(`/exam/${id}`)
        .then((res) => {
          setCourse(res?.data?.course);
          setTitle(res?.data?.title);
          setDuration(res?.data?.duration);
          setQuestions(res?.data?.questions);
          setEachMcqMarks(res?.data?.eachMcqMarks);
          setTotalMarks(res?.data?.totalMarks);
          setDate(new Date(res?.data?.date));
        })
        .catch((err) => {
          toast.error(
            err?.response?.data?.message ??
              "Something went wrong while fetching exam"
          );
        });
  }, [id]);

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
          {`${id ? "Edit" : "Create"} ${
            isSubjectiveExam ? "Subjective" : "MCQ"
          } Exam`}
        </Typography>
        <Divider variant="middle" sx={{ mb: 1 }} />
        <UseOCR />
        <Divider variant="middle" sx={{ mb: 1 }} />
        <Stack direction="row" alignItems="center" gap={2}>
          <Typography variant="h6" fontWeight="bold" color="primary">
            Course:
          </Typography>
          <Box width="100%">
            <Autocomplete
              value={course}
              options={courses}
              getOptionLabel={(option) => `${option.code}: ${option.title}`}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(_, value) => setCourse(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Course"
                  size="small"
                  fullWidth
                  error={!!courseError}
                  helperText={courseError}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "white",
                    },
                  }}
                />
              )}
            />
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center" gap={2}>
          <Typography variant="h6" fontWeight="bold" color="primary">
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
            error={!!titleError}
            helperText={titleError}
          />
        </Stack>
        {!isSubjectiveExam ? (
          <Stack direction="row" alignItems="center" gap={2}>
            <Typography variant="h6" fontWeight="bold" color="primary">
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
              error={!!eachMcqMarksError}
              helperText={eachMcqMarksError}
            />
          </Stack>
        ) : (
          <Stack direction="row" alignItems="center" gap={2}>
            <Typography variant="h6" fontWeight="bold" color="primary">
              Total Marks:
            </Typography>
            <TextField
              variant="outlined"
              value={totalMarks}
              onChange={(e) => setTotalMarks(e.target.value)}
              placeholder="Enter each MCQ marks"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "white",
                },
              }}
              error={!!totalMarksError}
              helperText={totalMarksError}
            />
          </Stack>
        )}
        <Stack direction="row" alignItems="center" gap={2}>
          <Typography variant="h6" fontWeight="bold" color="primary">
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
            error={!!durationError}
            helperText={durationError}
          />
        </Stack>
        <Stack direction="row" alignItems="center" gap={2}>
          <Typography
            variant="h6"
            fontWeight="bold"
            color="primary"
            minWidth={100}
          >
            Exam Date:
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              value={date}
              onChange={(value) => {
                setDate(value);
              }}
              disablePast
              renderInput={(params) => (
                <TextField
                  fullWidth
                  size="small"
                  {...params}
                  error={!!dateError}
                  helperText={dateError}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "white",
                    },
                  }}
                />
              )}
            />
          </LocalizationProvider>
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
              <Typography variant="body1" fontWeight="bold" color="primary">
                Question:
              </Typography>
              <Box className="question" sx={{ pl: 2 }}>
                {decodeHTML(question?.question)}
              </Box>
            </Stack>
            {isSubjectiveExam ? (
              <>
                <Stack direction="row" alignItems="center" gap={2}>
                  <Typography variant="body1" fontWeight="bold" color="primary">
                    Marks:
                  </Typography>
                  <Typography variant="body1">{question.marks}</Typography>
                </Stack>
                {question.diagram && (
                  <Stack direction="column" alignItems="center" gap={2}>
                    <Typography variant="h6" fontWeight="bold" color="primary">
                      Diagram:
                    </Typography>
                    <img
                      src={question.diagram}
                      alt="diagram"
                      height="auto"
                      width="250px"
                      style={{
                        padding: "1rem",
                        border: `2px solid ${blue[500]}`,
                        aspectRatio: "1/1",
                      }}
                    />
                  </Stack>
                )}
              </>
            ) : (
              <>
                <Stack direction="column" gap={1}>
                  <Typography variant="body1" fontWeight="bold" color="primary">
                    Options:
                  </Typography>
                  {question?.options?.map((option, index) => (
                    <Stack
                      direction="row"
                      alignItems="center"
                      gap={1}
                      key={index}
                      sx={{ pl: 2 }}
                    >
                      <Typography variant="body1">{`${index + 1})`}</Typography>
                      <Typography variant="body1">{option}</Typography>
                    </Stack>
                  ))}
                </Stack>
                <Stack direction="row" alignItems="center" gap={2}>
                  <Typography variant="body1" fontWeight="bold" color="primary">
                    Correct Option:
                  </Typography>
                  <Typography variant="body1">
                    {question?.correctOption}
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
          {id ? "Update Exam" : "Create Exam"}
        </Button>
      </Box>
    </>
  );
}
