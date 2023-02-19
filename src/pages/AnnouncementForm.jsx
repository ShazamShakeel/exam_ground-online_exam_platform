import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

function AnnouncementForm() {
  const navigate = useNavigate();
  const id = useParams()?.id;
  const announcement = null;
  // const courses = [];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: announcement?.title || "",
      description: announcement?.description || "",
      courseId: announcement?.courseId || "",
    },
  });

  const onSubmit = (data) => {
    console.log("onSubmit", data);
    navigate("/announcements");
  };

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="column" gap={2}>
              <Box>
                <Typography variant="h6" color="primary" mb={1}>
                  Title
                </Typography>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Title"
                      size="small"
                      fullWidth
                      error={!!errors.title}
                      helperText={errors?.title?.message}
                      {...field}
                    />
                  )}
                />
              </Box>
              <Box>
                <Typography variant="h6" color="primary.main" mb={1}>
                  Description
                </Typography>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Description"
                      size="small"
                      fullWidth
                      multiline
                      rows={4}
                      placeholder="Write announcement description here"
                      error={!!errors.description}
                      helperText={errors?.description?.message}
                      {...field}
                    />
                  )}
                />
              </Box>
              <Box textAlign="center" mt={2}>
                <Button type="submit" variant="contained" color="primary">
                  Add announcement
                </Button>
              </Box>
            </Stack>
          </form>
        </Paper>
      </Container>
    </>
  );
}

export default AnnouncementForm;

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(10, "Title should be at least 10 characters long")
    .max(100, "Title is too long")
    .required("Title is required"),
  description: Yup.string()
    .min(10, "Description should be at least 10 characters long")
    .max(1000, "Description is too long")
    .required("Description is required"),
  courseId: Yup.string(),
});
