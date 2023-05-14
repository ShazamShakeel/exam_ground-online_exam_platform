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
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "utils/httpRequest/axiosInstance";

function AnnouncementForm() {
  const navigate = useNavigate();
  const id = useParams()?.id;
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState(null);
  const [courseError, setCourseError] = useState("");
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

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

    if (!title) return setTitleError("Title is required");
    else if (title.length < 5) return setTitleError("Title is too short");
    else setTitleError("");

    if (!description) return setDescriptionError("Description is required");
    else if (description.length < 10)
      return setDescriptionError("Description is too short");
    else setDescriptionError("");

    if (id) {
      axiosInstance
        .patch(`/announcement/${id}`, {
          course: course.id,
          title,
          description,
        })
        .then(() => {
          toast.success("Announcement updated successfully");
          navigate("/announcements");
        })
        .catch((err) => {
          toast.error(err.response.data.message ?? "Something went wrong");
        });
    } else {
      axiosInstance
        .post("/announcement", {
          course: course.id,
          title,
          description,
        })
        .then(() => {
          toast.success("Announcement created successfully");
          navigate("/announcements");
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
      axiosInstance.get(`/announcement/${id}`).then((res) => {
        setCourse(res?.data?.course);
        setTitle(res?.data?.title);
        setDescription(res?.data?.description);
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
        {id ? "Edit Announcement" : "Create Announcement"}
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
                Title
              </Typography>
              <TextField
                fullWidth
                size="small"
                name="title"
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={!!titleError}
                helperText={titleError}
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
            <Box textAlign="center" mt={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                {id ? "Update Announcement" : "Create Announcement"}
              </Button>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </>
  );
}

export default AnnouncementForm;
