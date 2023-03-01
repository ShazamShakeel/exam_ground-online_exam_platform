import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CourseStudentsDataGrid from "components/Courses/CourseStudentsDataGrid";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

function CourseForm() {
  const studentsFileInputRef = useRef();
  const navigate = useNavigate();
  const id = useParams()?.id;
  const [studentEmail, setStudentEmail] = useState("");
  const loading = false;
  const course = null;
  const students = [
    {
      id: 1,
      studentId: "ABC123",
      name: "John Doe",
      university: "Example University",
      coursesEnrolled: 4,
    },
    {
      id: 2,
      studentId: "DEF456",
      name: "Jane Smith",
      university: "Another University",
      coursesEnrolled: 3,
    },
    {
      id: 3,
      studentId: "GHI789",
      name: "Bob Johnson",
      university: "Yet Another University",
      coursesEnrolled: 5,
    },
    {
      id: 4,
      studentId: "JKL012",
      name: "Samantha Lee",
      university: "Example University",
      coursesEnrolled: 2,
    },
    {
      id: 5,
      studentId: "MNO345",
      name: "David Garcia",
      university: "Another University",
      coursesEnrolled: 6,
    },
    {
      id: 6,
      studentId: "PQR678",
      name: "Emily Chen",
      university: "Yet Another University",
      coursesEnrolled: 4,
    },
    {
      id: 7,
      studentId: "STU901",
      name: "Michael Kim",
      university: "Example University",
      coursesEnrolled: 3,
    },
    {
      id: 8,
      studentId: "VWX234",
      name: "Lisa Patel",
      university: "Another University",
      coursesEnrolled: 7,
    },
    {
      id: 9,
      studentId: "YZA567",
      name: "Daniel Rodriguez",
      university: "Yet Another University",
      coursesEnrolled: 5,
    },
    {
      id: 10,
      studentId: "BCD890",
      name: "Maria Hernandez",
      university: "Example University",
      coursesEnrolled: 4,
    },
  ];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      courseCode: course?.courseCode || "",
      courseName: course?.courseName || "",
      description: course?.description || "",
    },
  });

  const onSubmit = (data) => {
    console.log("onSubmit", data);
    navigate("/courses");
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
        {id ? "Edit Course" : "Create Course"}
      </Typography>
      <Divider variant="middle" sx={{ mb: 1 }} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" gap={2} p={2} width="100%">
          <Stack direction="row" gap={2} width="100%">
            <Typography
              variant="h6"
              color="primary"
              minWidth="125px"
              sx={{ verticalAlign: "center" }}
            >
              Course Code
            </Typography>
            <Controller
              name="courseCode"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Course Code"
                  size="small"
                  error={!!errors.courseCode}
                  helperText={errors?.courseCode?.message}
                  sx={{ bgcolor: "white" }}
                  {...field}
                />
              )}
            />
          </Stack>

          <Stack direction="row" gap={2} width="100%">
            <Typography variant="h6" color="primary" minWidth="125px">
              Course Name
            </Typography>
            <Controller
              name="courseName"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Course Name"
                  size="small"
                  fullWidth
                  error={!!errors.courseName}
                  helperText={errors?.courseName?.message}
                  sx={{ bgcolor: "white" }}
                  {...field}
                />
              )}
            />
          </Stack>

          <Stack direction="row" gap={2}>
            <Typography variant="h6" color="primary" minWidth="125px" mb={1}>
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
                  sx={{ bgcolor: "white" }}
                  {...field}
                />
              )}
            />
          </Stack>
          {id && (
            <Stack direction="row" gap={2}>
              <Typography variant="h6" color="primary" minWidth="125px">
                Course Link
              </Typography>
              <TextField
                size="small"
                fullWidth
                value={`https://examground.com/course/join/MTUxMjY2NjU2NzUz`}
                sx={{ bgcolor: "white" }}
              />
            </Stack>
          )}
          <Box textAlign="center" my={2}>
            <Button type="submit" variant="contained" color="primary">
              {id ? "Update Course" : "Add Course"}
            </Button>
          </Box>
        </Stack>
      </form>
      <Divider variant="middle" sx={{ mb: 1 }} />
      <Stack direction="column" gap={2} p={2} width="100%">
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent={{ xs: "center", md: "space-between" }}
          gap={2}
          p={2}
          width="100%"
        >
          <Stack direction="row" gap={2}>
            <TextField
              label="Add Student"
              size="small"
              placeholder="Enter student email to add"
              value={studentEmail}
              onChange={(e) => setStudentEmail(e.target.value)}
              sx={{ minWidth: 180, bgcolor: "white" }}
            />
            <Button variant="contained" color="primary" disableElevation>
              Add Student
            </Button>
          </Stack>
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                studentsFileInputRef.current.click();
              }}
            >
              Upload Students File
            </Button>
            <input
              ref={studentsFileInputRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              hidden
            />
          </Box>
        </Stack>
        <CourseStudentsDataGrid
          loading={loading}
          students={id ? students : []}
        />
      </Stack>
    </>
  );
}

export default CourseForm;

const validationSchema = Yup.object().shape({
  courseCode: Yup.string()
    .min(4, "Course code should be at least 4 characters long")
    .max(8, "Course code is too long")
    .required("Course code is required"),
  courseName: Yup.string()
    .min(10, "Course name should be at least 10 characters long")
    .max(1000, "Course name is too long")
    .required("Course name is required"),
  description: Yup.string()
    .min(10, "Description is too short")
    .max(1000, "Description is too long"),
});
