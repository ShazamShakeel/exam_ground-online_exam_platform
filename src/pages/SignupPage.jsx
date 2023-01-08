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
} from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as Yup from "yup";

export default function SignupPage() {
  const [selectedTab, setSelectedTab] = useState("teacher");

  const validationSchema = Yup.object().shape({
    employeeId: Yup.string().when([], {
      is: () => selectedTab === "teacher",
      then: Yup.string().required("Required").min(4).max(6),
      otherwise: Yup.string().notRequired(),
    }),
    studentId: Yup.string().when([], {
      is: () => selectedTab === "student",
      then: Yup.string().required("Required").min(4).max(6),
      otherwise: Yup.string().notRequired(),
    }),
    firstName: Yup.string().required("Required").max(12),
    lastName: Yup.string().required("Required").max(12),
    university: Yup.string().required("Required"),
    email: Yup.string()
      .required("Email is required")
      .email("Please provide your university email")
      .matches(
        /^[a-zA-Z0-9_.+-]+@(numl|bahria|fast)\.edu.pk$/,
        "University email is incorrect"
      ),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(12, "Password must be less than 12 characters"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must be match"
    ),
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
    console.log("onSubmit", data);
  };

  const handleTabChange = (_, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="end"
        alignItems="center"
        maxHeight="80px"
        p={{ xs: 1, sm: 2, md: 3, lg: 4 }}
      >
        <Typography variant="body2" component="h2">
          Already have an account ?
        </Typography>
        <Link to="/login">
          <Button variant="contained" color="primary" size="small">
            Login
          </Button>
        </Link>
      </Stack>
      <Container component="main" maxWidth="sm" mx="auto">
        <Paper
          variant="outlined"
          sx={{
            p: { xs: 1, sm: 1.5, md: 2 },
          }}
        >
          <Stack direction="row" justifyContent="center">
            <img
              src={require("assets/images/Site-Logo.png")}
              alt="login"
              height="150px"
              width="175px"
            />
          </Stack>
          <Typography
            variant="h6"
            component="h1"
            textAlign="center"
            fontWeight="bold"
            color="primary"
            mb={2}
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
              <Stack direction="row" gap={2}>
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
                    autoFocus
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
                    label="confirmPassword"
                    type="password"
                    size="small"
                    fullWidth
                    autoFocus
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
              >
                Sign up
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </>
  );
}
