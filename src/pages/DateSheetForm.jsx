import { yupResolver } from "@hookform/resolvers/yup";
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
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

function DateSheetForm() {
  const navigate = useNavigate();
  const id = useParams()?.id;
  const datesheet = null;
  const courses = [
    {
      id: 1,
      code: "COMP101",
      name: "Introduction to Computer Science",
      description:
        "An introduction to computer programming and problem solving.",
      students: 50,
      exams: 2,
    },
    {
      id: 2,
      code: "MATH201",
      name: "Calculus I",
      description:
        "Limits, derivatives, and integrals of algebraic, trigonometric, exponential, and logarithmic functions.",
      students: 40,
      exams: 3,
    },
    {
      id: 3,
      code: "PSYC101",
      name: "Introduction to Psychology",
      description:
        "An overview of the scientific study of behavior and mental processes.",
      students: 60,
      exams: 2,
    },
  ];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      examTitle: datesheet?.examTitle || "",
      course: datesheet?.course || null,
      date: datesheet?.date || null,
    },
  });

  const onSubmit = (data) => {
    console.log("onSubmit", data);
    navigate("/datesheets");
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="column" gap={2}>
              <Box>
                <Typography variant="h6" color="primary" mb={1}>
                  Exam Title
                </Typography>
                <Controller
                  name="examTitle"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Exam Title"
                      size="small"
                      fullWidth
                      error={!!errors.examTitle}
                      helperText={errors?.examTitle?.message}
                      {...field}
                    />
                  )}
                />
              </Box>
              <Box>
                <Typography variant="h6" color="primary.main" mb={1}>
                  Course
                </Typography>
                <Controller
                  name="course"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      value={value}
                      options={courses}
                      getOptionLabel={(option) => option.name}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      onChange={(_, data) => onChange(data)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Course"
                          size="small"
                          error={!!errors.course}
                          helperText={errors?.course?.message}
                        />
                      )}
                    />
                  )}
                />
              </Box>
              <Box>
                <Typography variant="h6" color="primary" mb={1}>
                  Exam Date
                </Typography>
                <Controller
                  name="date"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <MobileDateTimePicker
                        label="Date"
                        value={value}
                        onChange={(value) => {
                          onChange(value);
                        }}
                        renderInput={(params) => (
                          <TextField
                            fullWidth
                            {...params}
                            placeholder="MM/DD/YYYY HH:MM:SS AM"
                            error={!!errors.date}
                            helperText={errors?.date?.message}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  )}
                />
              </Box>
              <Box textAlign="center" mt={2}>
                <Button type="submit" variant="contained" color="primary">
                  {id ? "Update Date Sheet" : "Add Date Sheet"}
                </Button>
              </Box>
            </Stack>
          </form>
        </Paper>
      </Container>
    </>
  );
}

export default DateSheetForm;

const validationSchema = Yup.object().shape({
  examTitle: Yup.string()
    .min(10, "Title should be at least 10 characters long")
    .max(100, "Title is too long")
    .required("Title is required"),
  course: Yup.object().required("Course is required").nullable(),
  date: Yup.date()
    .min(new Date(), "Start date must be greater than current date.")
    .required("Date is required")
    .nullable(),
});
