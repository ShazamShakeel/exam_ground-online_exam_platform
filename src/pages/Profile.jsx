import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePassword,
  updateProfile,
  updateProfileImg,
} from "store/slices/authSlice";

function Profile() {
  const profileImageInputRef = useRef();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const imageLoading = useSelector((state) => state.auth.imageLoading);
  const user = useSelector((state) => state.auth);
  const [nameError, setNameError] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    setName(user?.name);
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.length < 3) {
      return setNameError("Name must be at least 3 characters long");
    } else if (name.length > 30) {
      return setNameError("Name is too long");
    } else setNameError("");
    if (password.length > 0 && password.length < 6) {
      return setPasswordError("Password must be at least 6 characters long");
    } else if (password.length > 30) {
      return setPasswordError("Password is too long");
    } else setPasswordError("");

    if (user.name !== name) {
      dispatch(updateProfile({ name }));
    }
    if (password) {
      dispatch(updatePassword({ password }));
    }
  };

  const handleProfileImage = (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    dispatch(updateProfileImg(formData));
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
        <Typography
          variant="h4"
          component="h1"
          fontWeight="bold"
          textAlign="center"
          color="primary"
          mb={2}
        >
          Profile
        </Typography>
        <Divider variant="middle" sx={{ mb: 2 }} />
        <Grid container spacing={2} height="auto" my={2}>
          <Grid item xs={12} md={6} height="auto">
            <Box
              width="100%"
              height="100%"
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <img
                src={user?.profileImg}
                alt="profile-cover"
                height="200px"
                width="200px"
                style={{
                  border: "1px solid grey",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <Button
                type="input"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => {
                  profileImageInputRef.current.click();
                }}
                disabled={imageLoading}
              >
                Change Profile Picture
              </Button>
              <input
                type="file"
                ref={profileImageInputRef}
                style={{ display: "none" }}
                id="update-product-image"
                hidden
                accept="image/x-png,image/png,image/jpeg,image/jpg"
                onChange={handleProfileImage}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack direction="column" spacing={1}>
              <Typography
                variant="h6"
                component="p"
                fontWeight="bold"
                color="text.secondary"
              >
                University
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={user.university}
                size="small"
                disabled
                inputProps={{
                  sx: {
                    textTransform: "uppercase",
                  },
                }}
              />
              <Typography
                variant="h6"
                component="p"
                fontWeight="bold"
                color="text.secondary"
              >
                {`${user.userRole === "student" ? "Student" : "Employee"} ID`}
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={user.universityId}
                size="small"
                disabled
              />
              <Typography
                variant="h6"
                component="p"
                fontWeight="bold"
                color="text.secondary"
              >
                Name
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={name}
                size="small"
                error={!!nameError}
                helperText={nameError && nameError}
                onChange={(e) => setName(e.target.value)}
              />
              <Typography
                variant="h6"
                component="p"
                fontWeight="bold"
                color="text.secondary"
              >
                University Email
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={user.email}
                size="small"
                disabled
              />
              <Typography
                variant="h6"
                component="p"
                fontWeight="bold"
                color="text.secondary"
              >
                Password
              </Typography>
              <TextField
                fullWidth
                type="password"
                variant="outlined"
                value={password}
                placeholder="*******"
                size="small"
                error={!!passwordError}
                helperText={passwordError && passwordError}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Box py={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  fullWidth
                  disabled={loading}
                >
                  {`${loading ? "Updating..." : "Update"}`}
                </Button>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default Profile;
