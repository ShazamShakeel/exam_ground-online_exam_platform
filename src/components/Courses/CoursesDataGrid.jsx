import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PreviewIcon from "@mui/icons-material/Preview";
import { IconButton, Stack, Typography } from "@mui/material";
import CustomDataGrid from "components/CustomDataGrid";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CoursesDataGrid() {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.auth);
  const loading = false;
  const totalPages = 1;
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

  const handlePagination = (_, page) => {
    console.log("page", page);
  };

  const columns = [
    {
      field: "code",
      headerName: "Course Code",
      minWidth: 100,
      flex: 0.25,
      renderCell: (params) => (
        <Typography variant="body1">{params?.row?.code}</Typography>
      ),
    },
    {
      field: "name",
      headerName: "Course Name",
      minWidth: 200,
      flex: 1,
      renderCell: (params) => (
        <Typography variant="body1">{params?.row?.name}</Typography>
      ),
    },
    {
      field: "description",
      headerName: "Description",
      minWidth: 200,
      flex: 1,
      renderCell: (params) => (
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
          {params?.row?.description}
        </Typography>
      ),
    },
    {
      field: "students",
      headerName: "Students",
      minWidth: 75,
      flex: 0.25,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Typography variant="body1">{params?.row?.students}</Typography>
      ),
    },
    {
      field: "exams",
      headerName: "Exams",
      minWidth: 75,
      flex: 0.25,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Typography variant="body1">{params?.row?.exams}</Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      flex: 0.25,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <IconButton
            variant="contained"
            size="small"
            onClick={() => navigate(`/exams/checked/edit/${params?.row?.id}`)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            variant="contained"
            size="small"
            onClick={() => navigate(`${params?.row?.id}`)}
          >
            <PreviewIcon />
          </IconButton>
          <IconButton variant="contained" size="small">
            <DeleteIcon />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <CustomDataGrid
      loading={loading}
      rows={courses}
      columns={columns}
      totalPages={totalPages}
      handlePagination={handlePagination}
    />
  );
}
