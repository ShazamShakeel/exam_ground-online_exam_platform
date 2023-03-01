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
import ProfileAvatarPlaceholder from "assets/images/ProfileAvatarPlaceholder.png";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

function Profile() {
  const profileImageInputRef = useRef();
  const user = useSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    setName(user?.name);
    setProfileImage(user?.profileImage ?? "");
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit", { name }, { password });
  };

  const handleProfileImage = (e) => {
    console.log(e.target.files[0]);
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
                src={profileImage ? profileImage : ProfileAvatarPlaceholder}
                alt="profile-cover"
                height="200px"
                width="200px"
                style={{ border: "1px solid grey", borderRadius: "50%" }}
              />
              <Button
                type="input"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => {
                  profileImageInputRef.current.click();
                }}
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
                ID
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={user.userId}
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
                onChange={(e) => setName(e.target.value)}
              />
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
              />
              <Typography
                variant="h6"
                component="p"
                fontWeight="bold"
                color="text.secondary"
              >
                email
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
                >
                  Update Profile
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
