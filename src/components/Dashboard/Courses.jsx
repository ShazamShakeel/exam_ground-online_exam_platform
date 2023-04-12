import { Box, Card, Divider, Stack, Typography } from "@mui/material";
import Carousel from "react-multi-carousel";
import { useNavigate } from "react-router-dom";

export default function Courses({ courses }) {
  const navigate = useNavigate();

  const responsive = {
    xxxl: {
      breakpoint: { max: 4000, min: 1920 },
      items: 6,
      partialVisibilityGutter: 50,
    },
    xxl: {
      breakpoint: { max: 1920, min: 1536 },
      items: 5,
      partialVisibilityGutter: 50,
    },
    xl: {
      breakpoint: { max: 1536, min: 1280 },
      items: 3,
      partialVisibilityGutter: 40,
    },
    lg: {
      breakpoint: { max: 1280, min: 1024 },
      items: 3,
      partialVisibilityGutter: 40,
    },
    md: {
      breakpoint: { max: 1024, min: 360 },
      items: 2,
      partialVisibilityGutter: 30,
    },
    xs: {
      breakpoint: { max: 360, min: 0 },
      items: 1,
      partialVisibilityGutter: 30,
    },
  };

  return (
    <Box my={2}>
      <Typography
        variant="h4"
        component="h2"
        fontWeight="bold"
        color="primary"
        mb={2}
      >
        Courses
      </Typography>
      {courses.length ? (
        <Carousel responsive={responsive}>
          {courses.map((course) => (
            <Card
              key={course?._id ?? course?.id}
              elevation={3}
              sx={{
                height: { xs: "200px", lg: "250px" },
                width: { lg: "300px", xl: "300px" },
                p: 2,
                m: 1,
                cursor: "pointer",
              }}
              onClick={() => navigate(`/courses/${course?._id}`)}
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
        </Carousel>
      ) : (
        <Typography variant="body1" color="text.secondary">
          No courses found
        </Typography>
      )}
      <Divider variant="middle" sx={{ my: 2 }} />
    </Box>
  );
}
