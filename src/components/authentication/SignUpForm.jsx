import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Container,
  MenuItem,
  Paper,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "store/slices/authSlice";
import * as Yup from "yup";

export default function SignUpForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const loading = useSelector((state) => state?.auth?.loading);
  const [selectedTab, setSelectedTab] = useState("teacher");

  const validationSchema = Yup.object().shape({
    employeeId: Yup.string().when([], {
      is: () => selectedTab === "teacher",
      then: Yup.string().required("Required").min(6).max(12),
      otherwise: Yup.string().notRequired(),
    }),
    studentId: Yup.string().when([], {
      is: () => selectedTab === "student",
      then: Yup.string().required("Required").min(6).max(12),
      otherwise: Yup.string().notRequired(),
    }),
    firstName: Yup.string().required("Required").max(12),
    lastName: Yup.string().required("Required").max(12),
    university: Yup.string().required("Required"),
    email: Yup.string().when([], {
      is: () => selectedTab === "teacher",
      then: Yup.string()
        .required("Email is required")
        .email("Please provide your university email")
        .matches(
          /^[a-zA-Z0-9_.+-]+@(numl|bahria|fast)\.edu.pk$/,
          "University email is incorrect"
        ),
      otherwise: Yup.string()
        .required("Email is required")
        .email("Please provide your university email")
        .matches(
          /^[a-zA-Z0-9_.+-]+@(numls|bahria|fast)\.edu.pk$/,
          "University email is incorrect"
        ),
    }),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/,
        "Password must contain at least one letter and one number"
      )
      .min(8, "Password must be at least 8 characters")
      .max(16, "Password must be at most 16 characters"),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must be match"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      employeeId: "",
      studentId: "",
      firstName: "",
      lastName: "",
      university: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data) => {
    dispatch(
      signup({
        email: data?.email ?? "",
        name: data?.firstName + " " + data?.lastName ?? "",
        universityId: data?.employeeId ?? data?.studentId ?? "",
        role: selectedTab === "teacher" ? "teacher" : "student",
        university: data?.university ?? "",
        password: data?.password ?? "",
      })
    )
      .unwrap()
      .then(() => {
        navigate("/verification");
      });
  };

  const handleTabChange = (_, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box
      height="100%"
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      alignItems={{ md: "center" }}
      gap={2}
    >
      {isSmall && (
        <Stack
          direction="row"
          gap={2}
          justifyContent="flex-end"
          alignItems="center"
          maxHeight="80px"
          pt={{ xs: 1, sm: 2 }}
          pr={{ xs: 1, sm: 2 }}
        >
          <Typography variant="body2" component="h2">
            Already have an account ?
          </Typography>
          <Link to="/login">
            <Button variant="contained" color="primary">
              Login
            </Button>
          </Link>
        </Stack>
      )}
      <Container component="main">
        <Paper
          elevation={16}
          sx={{
            p: { xs: 1, sm: 1.5, md: 2, lg: 4 },
            mx: { xs: 1, sm: 1.5, md: 2, lg: 4 },
          }}
        >
          <Typography
            variant="h6"
            component="h1"
            textAlign="center"
            fontWeight="bold"
            color="primary"
            m={1}
            fontSize={{ sm: "1.25rem", md: "2rem", lg: "2.75rem", xl: "3rem" }}
          >
            Sign up
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="column" gap={2}>
              <Box m="auto">
                <Tabs value={selectedTab} onChange={handleTabChange}>
                  <Tab label="Teacher" value="teacher" />
                  <Tab label="Student" value="student" />
                </Tabs>
              </Box>
              {selectedTab === "teacher" && (
                <Controller
                  name="employeeId"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      name="employeeId"
                      label="Employee Id"
                      size="small"
                      fullWidth
                      error={!!errors.employeeId}
                      helperText={errors?.employeeId?.message}
                      {...field}
                    />
                  )}
                />
              )}
              {selectedTab === "student" && (
                <Controller
                  name="studentId"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      name="studentId"
                      label="Student Id"
                      size="small"
                      fullWidth
                      error={!!errors.studentId}
                      helperText={errors?.studentId?.message}
                      {...field}
                    />
                  )}
                />
              )}
              <Stack direction={{ xs: "column", md: "row" }} gap={2}>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      name="firstName"
                      label="First Name"
                      size="small"
                      fullWidth
                      error={!!errors.firstName}
                      helperText={errors?.firstName?.message}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      name="lastName"
                      label="Last Name"
                      size="small"
                      fullWidth
                      error={!!errors.lastName}
                      helperText={errors?.lastName?.message}
                      {...field}
                    />
                  )}
                />
              </Stack>
              <Controller
                name="university"
                control={control}
                render={({ field }) => (
                  <TextField
                    name="university"
                    label="University"
                    size="small"
                    fullWidth
                    select
                    error={!!errors.university}
                    helperText={errors?.university?.message}
                    {...field}
                  >
                    <MenuItem value="numl">NUML</MenuItem>
                    <MenuItem value="bahria">Bahria</MenuItem>
                    <MenuItem value="fast">FAST</MenuItem>
                  </TextField>
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    name="email"
                    label="Email"
                    size="small"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    name="password"
                    label="Password"
                    type="password"
                    size="small"
                    fullWidth
                    error={!!errors.password}
                    helperText={errors?.password?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <TextField
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    size="small"
                    fullWidth
                    error={!!errors.confirmPassword}
                    helperText={errors?.confirmPassword?.message}
                    {...field}
                  />
                )}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ fontWeight: "bold" }}
                disabled={loading}
              >
                {loading ? "Signing Up" : "Sign up"}
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
