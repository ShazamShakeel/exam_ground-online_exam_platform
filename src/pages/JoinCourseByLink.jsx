import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "utils/httpRequest/axiosInstance";

export default function JoinCourseByLink() {
  const id = useParams().id;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdded, setIsAdded] = useState(true);
  const [course, setCourse] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axiosInstance
      .get(`course/${id}/join-by-link`)
      .then((response) => {
        setCourse(response.data);
        setIsAdded(true);
      })
      .catch((err) => {
        setError(
          err.response.data.message ??
            "Something went wrong, Please try again later"
        );
        toast.error(
          err.response.data.message ??
            "Something went wrong, Please try again later"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      {loading && <CircularProgress />}
      {isAdded && course && (
        <Container maxWidth="md">
          <Paper
            sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}
          >
            <>
              <Typography
                variant="h4"
                component="h1"
                color="primary"
                textAlign="center"
              >
                You have successfully joined the course
              </Typography>
              <Typography variant="h5" component="h2" textAlign="center">
                {`${course.code}: ${course.title}`}
              </Typography>
              <Box textAlign="center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate("/courses")}
                >
                  Go to Courses
                </Button>
              </Box>
            </>
          </Paper>
        </Container>
      )}
    </Box>
  );
}
