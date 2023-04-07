import { yupResolver } from "@hookform/resolvers/yup";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CourseStudentsDataGrid from "components/Courses/CourseStudentsDataGrid";
import { useCallback, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "utils/httpRequest/axiosInstance";
import * as Yup from "yup";

function CourseForm() {
  const id = useParams()?.id;
  const navigate = useNavigate();
  const studentsFileInputRef = useRef();
  const user = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState({});
  const [courseStudents, setCourseStudents] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      code: "",
      title: "",
      description: "",
    },
  });

  const handleAddStudent = () => {
    if (courseStudents.find((s) => s.email === selectedStudent.email)) {
      setSelectedStudent("");
      return toast.error("Student already added");
    }
    setCourseStudents([...courseStudents, selectedStudent]);
    setSelectedStudent("");
  };

  const onSubmit = (data) => {
    if (!id) {
      axiosInstance
        .post("/course", {
          ...data,
          students: courseStudents.map((student) => student.email),
        })
        .then(() => {
          navigate("/courses");
        });
    } else {
      axiosInstance
        .patch("/course/" + id, {
          ...data,
          students: courseStudents.map((student) => student.email),
        })
        .then(() => {
          navigate("/courses");
        });
    }
  };

  useEffect(() => {
    axiosInstance
      .get(`/users`, {
        params: {
          role: "student",
          university: user?.university ?? "",
        },
      })
      .then((res) => {
        setAllStudents(res.data.results);
      });
  }, [user?.university]);

  useEffect(() => {
    if (id) {
      axiosInstance
        .get(`/course?_id=${id}&populate=students`)
        .then((res) => {
          const course = res.data.results[0];
          setCourse(course);
          reset({
            code: course?.code || "",
            title: course?.title || "",
            description: course?.description || "",
          });
          setCourseStudents(course?.students || []);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id, reset]);

  const handleRemoveStudent = useCallback(
    (id) => {
      setCourseStudents(courseStudents.filter((s) => s.id !== id));
    },
    [courseStudents]
  );

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
              name="code"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Course Code"
                  size="small"
                  error={!!errors.code}
                  helperText={errors?.code?.message}
                  sx={{
                    "& .MuiInputBase-input": {
                      bgcolor: "white",
                    },
                  }}
                  {...field}
                />
              )}
            />
          </Stack>

          <Stack direction="row" gap={2} width="100%">
            <Typography variant="h6" color="primary" minWidth="125px">
              Course Title
            </Typography>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Course Title"
                  size="small"
                  fullWidth
                  error={!!errors.title}
                  helperText={errors?.title?.message}
                  sx={{
                    "& .MuiInputBase-input": {
                      bgcolor: "white",
                    },
                  }}
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
                  sx={{
                    "& .MuiInputBase-root": {
                      bgcolor: "white",
                    },
                  }}
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
                value={`https://examground.com/course/join/${course?.id}`}
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
            <Autocomplete
              options={allStudents}
              sx={{ width: 300 }}
              value={selectedStudent}
              getOptionLabel={(option) => option.email ?? ""}
              isOptionEqualToValue={(option, value) =>
                option.email === value.email
              }
              onChange={(e, option) => {
                setSelectedStudent(option);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  label="Search Students"
                  placeholder="Enter student email"
                  sx={{ minWidth: 180, bgcolor: "white" }}
                />
              )}
            />
            <Button
              size="small"
              variant="contained"
              color="primary"
              disableElevation
              onClick={handleAddStudent}
              disabled={!selectedStudent}
            >
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
          students={courseStudents}
          handleRemoveStudent={handleRemoveStudent}
        />
      </Stack>
    </>
  );
}

export default CourseForm;

const validationSchema = Yup.object().shape({
  code: Yup.string()
    .min(4, "Course code should be at least 4 characters long")
    .max(8, "Course code is too long")
    .required("Course code is required"),
  title: Yup.string()
    .min(10, "Course name should be at least 10 characters long")
    .max(1000, "Course name is too long")
    .required("Course name is required"),
  description: Yup.string()
    .min(10, "Description is too short")
    .max(1000, "Description is too long"),
});
