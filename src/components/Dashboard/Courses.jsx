import { Box, Card, Divider, Stack, Typography } from "@mui/material";
import Carousel from "react-multi-carousel";
import { useNavigate } from "react-router-dom";

export default function Courses() {
  const navigate = useNavigate();
  const courses = [
    {
      id: 1,
      code: "COMP101",
      name: "Introduction to Computer Science",
      description:
        "An introduction to computer programming and problem solving.",
      students: 50,
      exams: 2,
    },
    {
      id: 2,
      code: "MATH201",
      name: "Calculus I",
      description:
        "Limits, derivatives, and integrals of algebraic, trigonometric, exponential, and logarithmic functions.",
      students: 40,
      exams: 3,
    },
    {
      id: 3,
      code: "PSYC101",
      name: "Introduction to Psychology",
      description:
        "An overview of the scientific study of behavior and mental processes.",
      students: 60,
      exams: 2,
    },
    {
      id: 4,
      code: "PHIL202",
      name: "Ethics",
      description: "The study of moral values and principles.",
      students: 30,
      exams: 2,
    },
    {
      id: 5,
      code: "ENGL101",
      name: "Composition I",
      description:
        "Fundamentals of writing, including grammar, mechanics, and organization.",
      students: 45,
      exams: 3,
    },
    {
      id: 6,
      code: "HIST201",
      name: "American History to 1865",
      description:
        "The history of the United States from pre-Columbian times to the end of the Civil War.",
      students: 35,
      exams: 2,
    },
    {
      id: 7,
      code: "BIOL101",
      name: "Introduction to Biology",
      description:
        "The study of living organisms and their interactions with the environment.",
      students: 55,
      exams: 2,
    },
    {
      id: 8,
      code: "SPAN101",
      name: "Beginning Spanish I",
      description: "An introduction to the Spanish language and culture.",
      students: 20,
      exams: 4,
    },
    {
      id: 9,
      code: "PHYS101",
      name: "Introduction to Physics",
      description: "The study of matter and energy and their interactions.",
      students: 40,
      exams: 3,
    },
    {
      id: 10,
      code: "ARTS101",
      name: "Art Appreciation",
      description: "An introduction to the history and appreciation of art.",
      students: 25,
      exams: 1,
    },
  ];

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
              key={course?.id}
              elevation={3}
              sx={{
                height: { xs: "200px", lg: "250px" },
                width: { lg: "300px", xl: "300px" },
                p: 2,
                m: 1,
                cursor: "pointer",
              }}
              onClick={() => navigate(`/courses/${course?.id}`)}
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
                  {course?.name}
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
                  <strong>Students: </strong>
                  {course?.students}
                </Typography>
                <Typography variant="subtitle1">
                  <strong>Exams: </strong>
                  {course?.exams}
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
