import { yupResolver } from "@hookform/resolvers/yup";
import FaceIcon from "@mui/icons-material/Face";
import {
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as Yup from "yup";

export default function Login() {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please provide your university email")
      .matches(
        /^[a-zA-Z0-9_.+-]+@(numls|bahria|fast)\.edu.pk$/,
        "University email is incorrect"
      )
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(12, "Password must be less than 12 characters"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    console.log("onSubmit", data);
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
          {`Don't have an account ?`}
        </Typography>
        <Link to="/signup">
          <Button variant="contained" color="primary" size="small">
            Sign up
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
            Login to your account
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="column" gap={2}>
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
                    autoComplete="off"
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
                    autoComplete="off"
                    {...field}
                  />
                )}
              />
              <Link to="/forgot-password">
                <Typography
                  variant="body2"
                  textAlign="right"
                  color="primary"
                  mb={1}
                >
                  Forgot password?
                </Typography>
              </Link>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Login
              </Button>
              <Divider
                light
                variant="middle"
                sx={{ fontSize: "0.75rem", color: "text.secondary" }}
              >
                OR
              </Divider>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                endIcon={<FaceIcon />}
              >
                Login with Face ID
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </>
  );
}
