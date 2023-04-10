import {
  Autocomplete,
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "utils/httpRequest/axiosInstance";

function DateSheetForm() {
  const navigate = useNavigate();
  const id = useParams()?.id;
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState(null);
  const [courseError, setCourseError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [date, setDate] = useState(null);
  const [dateError, setDateError] = useState("");

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

  const handleSubmit = () => {
    if (!course) return setCourseError("Course is required");
    else setCourseError("");

    if (!description) return setDescriptionError("Description is required");
    else if (description.length < 10)
      return setDescriptionError("Description is too short");
    else setDescriptionError("");

    if (!date) return setDateError("Date is required");
    else setDateError("");

    if (id) {
      axiosInstance
        .patch(`/datesheet/${id}`, {
          course: course.id,
          description,
          date,
        })
        .then(() => {
          toast.success("Date Sheet updated successfully");
          navigate("/datesheets");
        })
        .catch((err) => {
          toast.error(err.response.data.message ?? "Something went wrong");
        });
    } else {
      axiosInstance
        .post("/datesheet", {
          course: course.id,
          description,
          date,
        })
        .then(() => {
          toast.success("Date Sheet added successfully");
          navigate("/datesheets");
        })
        .catch((err) => {
          toast.error(err.response.data.message ?? "Something went wrong");
        });
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  useEffect(() => {
    id &&
      axiosInstance.get(`/datesheet/${id}`).then((res) => {
        setCourse(res?.data?.course);
        setDescription(res?.data?.description);
        setDate(res?.data?.date);
      });
  }, [id]);

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
        {id ? "Edit Date Sheet" : "Add Date Sheet"}
      </Typography>
      <Divider variant="middle" sx={{ mb: 1 }} />
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            m: 2,
            p: 2,
          }}
        >
          <Stack direction="column" gap={2}>
            <Box>
              <Typography variant="h6" color="primary.main" mb={1}>
                Course
              </Typography>
              <Autocomplete
                value={course}
                options={courses}
                getOptionLabel={(option) => option.title}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(_, value) => setCourse(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Course"
                    size="small"
                    error={!!courseError}
                    helperText={courseError}
                  />
                )}
              />
            </Box>
            <Box>
              <Typography variant="h6" color="primary" mb={1}>
                Description
              </Typography>
              <TextField
                fullWidth
                size="small"
                name="description"
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                error={!!descriptionError}
                helperText={descriptionError}
              />
            </Box>
            <Box>
              <Typography variant="h6" color="primary" mb={1}>
                Exam Date
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date"
                  value={date}
                  onChange={(value) => {
                    setDate(value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      {...params}
                      error={!!dateError}
                      helperText={dateError}
                    />
                  )}
                />
              </LocalizationProvider>
            </Box>
            <Box textAlign="center" mt={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                {id ? "Update Date Sheet" : "Add Date Sheet"}
              </Button>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </>
  );
}

export default DateSheetForm;
