import { yupResolver } from "@hookform/resolvers/yup";
import FaceIcon from "@mui/icons-material/Face";
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "store/slices/authSlice";
import * as Yup from "yup";

export default function LoginForm() {
  const faceio = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please provide your university email")
      .matches(
        /^[a-zA-Z0-9_.+-]+@(numl|bahria|fast)\.edu.pk$/,
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
    console.log({ data });
    dispatch(
      userLogin({
        token: "token",
        id: "123456",
        email: "teacher@university.edu.pk",
        name: "Teacher",
        userId: "123456",
        userRole: "student",
        university: "University",
        isVerified: true,
      })
    );
    navigate("/dashboard");
  };

  const handleLoginWithFaceId = () => {
    faceio.current
      .authenticate()
      .then((res) => {
        console.log(res);
        navigate("/dashboard");
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    // eslint-disable-next-line no-undef
    faceio.current = new faceIO(process.env.REACT_APP_FACEIO_PUBLIC_KEY);
  }, []);

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
          <Link to="/signup">
            <Button variant="contained" color="primary">
              Signup
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
            mt={1}
            mb={3}
            fontSize={{ xs: "2rem", lg: "2.75rem", xl: "3rem" }}
          >
            Login
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="column" gap={3}>
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
                    error={!!errors.password}
                    helperText={errors?.password?.message}
                    autoComplete="off"
                    {...field}
                  />
                )}
              />
              <Link to="/forgot-password">
                <Typography variant="body2" textAlign="right" color="primary">
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
                onClick={handleLoginWithFaceId}
              >
                Login with Face ID
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
