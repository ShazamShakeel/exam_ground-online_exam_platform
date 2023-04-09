import {
  Box,
  Button,
  Card,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "utils/httpRequest/axiosInstance";

function CoursesCardsWithPagination() {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getCourses = useCallback(() => {
    setLoading(true);
    axiosInstance
      .get(`course`, {
        params: {
          populate: "teacher",
          page,
          limit: 10,
        },
      })
      .then((response) => {
        setCourses((prevCourses) => [...prevCourses, ...response.data.results]);
        setTotalPages(response.data.totalPages);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page]);

  const handlePagination = () => {
    setPage((page) => page + 1);
  };

  useEffect(() => {
    getCourses();
  }, [getCourses, page]);

  return (
    <Stack direction="column" gap={2}>
      <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
        {courses.map((course) => (
          <Card
            component={Link}
            to={`/courses/${course?.id}`}
            key={course?.id}
            elevation={3}
            sx={{
              height: { xs: 200, lg: 250 },
              width: 300,
              p: 2,
              m: 1,
            }}
          >
            <Stack direction="column" gap={1}>
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
                fontStyle="italic"
              >
                {course?.code}
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                {course?.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  // Addition lines for 2 line or multiline ellipsis
                  display: "-webkit-box !important",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  whiteSpace: "normal",
                }}
              >
                {course?.description}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Teacher: </strong>
                {course?.teacher?.name}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Class Students: </strong>
                {course?.students?.length}
              </Typography>
            </Stack>
          </Card>
        ))}
      </Box>

      {loading && (
        <Box
          height="200px"
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress />
        </Box>
      )}

      {page < totalPages && (
        <Box textAlign="center">
          <Button color="primary" size="large" onClick={handlePagination}>
            Load More
          </Button>
        </Box>
      )}
    </Stack>
  );
}

export default CoursesCardsWithPagination;
