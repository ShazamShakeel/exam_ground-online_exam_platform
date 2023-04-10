import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import blue from "@mui/material/colors/blue";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function CoursesChart({ courses }) {
  const navigate = useNavigate();
  // const courses = [
  //   {
  //     id: 1,
  //     code: "COMP101",
  //     name: "Introduction to Computer Science",
  //     description:
  //       "An introduction to computer programming and problem solving.",
  //     students: 50,
  //     exams: 2,
  //   },
  //   {
  //     id: 2,
  //     code: "MATH201",
  //     name: "Calculus I",
  //     description:
  //       "Limits, derivatives, and integrals of algebraic, trigonometric, exponential, and logarithmic functions.",
  //     students: 40,
  //     exams: 3,
  //   },
  //   {
  //     id: 3,
  //     code: "PSYC101",
  //     name: "Introduction to Psychology",
  //     description:
  //       "An overview of the scientific study of behavior and mental processes.",
  //     students: 60,
  //     exams: 2,
  //   },
  //   {
  //     id: 4,
  //     code: "PHIL202",
  //     name: "Ethics",
  //     description: "The study of moral values and principles.",
  //     students: 30,
  //     exams: 2,
  //   },
  //   {
  //     id: 5,
  //     code: "ENGL101",
  //     name: "Composition I",
  //     description:
  //       "Fundamentals of writing, including grammar, mechanics, and organization.",
  //     students: 45,
  //     exams: 3,
  //   },
  //   {
  //     id: 6,
  //     code: "HIST201",
  //     name: "American History to 1865",
  //     description:
  //       "The history of the United States from pre-Columbian times to the end of the Civil War.",
  //     students: 35,
  //     exams: 2,
  //   },
  //   {
  //     id: 7,
  //     code: "BIOL101",
  //     name: "Introduction to Biology",
  //     description:
  //       "The study of living organisms and their interactions with the environment.",
  //     students: 55,
  //     exams: 2,
  //   },
  //   {
  //     id: 8,
  //     code: "SPAN101",
  //     name: "Beginning Spanish I",
  //     description: "An introduction to the Spanish language and culture.",
  //     students: 20,
  //     exams: 4,
  //   },
  //   {
  //     id: 9,
  //     code: "PHYS101",
  //     name: "Introduction to Physics",
  //     description: "The study of matter and energy and their interactions.",
  //     students: 40,
  //     exams: 3,
  //   },
  //   {
  //     id: 10,
  //     code: "ARTS101",
  //     name: "Art Appreciation",
  //     description: "An introduction to the history and appreciation of art.",
  //     students: 25,
  //     exams: 1,
  //   },
  // ];

  const data = {
    labels: courses.map((course) => course.code),
    datasets: [
      {
        label: "Students",
        data: courses.map((course) => course.students.length),
        fill: false,
        borderColor: blue[700],
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          title: (tooltipItems) => {
            const courseIndex = tooltipItems[0]?.dataIndex;
            return courses[courseIndex]?.name;
          },
        },
      },
      legend: {
        position: "top",
      },
    },
    onClick: (_, activeElements) => {
      if (activeElements.length) {
        const courseIndex = activeElements[0]?.index;
        navigate(`/courses/${courses[courseIndex]?._id}`);
      }
    },
  };

  return (
    <Box my={2}>
      <Typography variant="h4" component="h2" fontWeight="bold" color="primary">
        Courses
      </Typography>
      <Box sx={{ minHeight: { xs: 300, md: 400 }, position: "relative" }}>
        <Line options={options} data={data} />
      </Box>
    </Box>
  );
}
