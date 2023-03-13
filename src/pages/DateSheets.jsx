import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Divider, IconButton, Stack, Typography } from "@mui/material";
import CustomDataGrid from "components/CustomDataGrid";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function DateSheets() {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.auth);
  const loading = false;
  const totalPages = 1;
  const datesheets = [
    {
      id: 1,
      examTitle: "Midterm Exam",
      courseCode: "CSE101",
      courseName: "Introduction to Computer Science",
      date: "2023-03-01",
    },
    {
      id: 2,
      examTitle: "Final Exam",
      courseCode: "CSE102",
      courseName: "Data Structures and Algorithms",
      date: "2023-04-15",
    },
    {
      id: 3,
      examTitle: "Quiz 1",
      courseCode: "ENG101",
      courseName: "English Composition",
      date: "2023-03-10",
    },
    {
      id: 4,
      examTitle: "Quiz 2",
      courseCode: "MAT101",
      courseName: "Calculus and Analytic Geometry",
      date: "2023-03-20",
    },
    {
      id: 5,
      examTitle: "Midterm Exam",
      courseCode: "PHY101",
      courseName: "Mechanics and Waves",
      date: "2023-04-05",
    },
    {
      id: 6,
      examTitle: "Final Exam",
      courseCode: "PHY102",
      courseName: "Electricity and Magnetism",
      date: "2023-05-20",
    },
    {
      id: 7,
      examTitle: "Quiz 1",
      courseCode: "BIO101",
      courseName: "General Biology",
      date: "2023-03-15",
    },
    {
      id: 8,
      examTitle: "Quiz 2",
      courseCode: "CHE101",
      courseName: "General Chemistry",
      date: "2023-04-01",
    },
    {
      id: 9,
      examTitle: "Midterm Exam",
      courseCode: "ECO101",
      courseName: "Principles of Economics",
      date: "2023-04-10",
    },
    {
      id: 10,
      examTitle: "Final Exam",
      courseCode: "FIN101",
      courseName: "Financial Accounting",
      date: "2023-05-10",
    },
  ];
  const handlePagination = (_, page) => {
    console.log("page", page);
  };

  const columns = [
    {
      field: "examTitle",
      headerName: "Exam Title",
      minWidth: 150,
      flex: 0.75,
      renderCell: (params) => (
        <Typography variant="body1">{params?.row?.examTitle}</Typography>
      ),
    },
    {
      field: "courseName",
      headerName: "Course Name",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => (
        <Typography variant="body1">{params?.row?.courseName}</Typography>
      ),
    },
    {
      field: "courseCode",
      headerName: "Course Code",
      minWidth: 150,
      flex: 0.25,
      renderCell: (params) => (
        <Typography variant="body1">{params?.row?.courseCode}</Typography>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      minWidth: 150,
      flex: 0.25,
      renderCell: (params) => (
        <Typography variant="body1">{params?.row?.date}</Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      flex: 0.25,
      hide: user.userRole === "student" ? true : false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <IconButton
            variant="contained"
            size="small"
            onClick={() => navigate(`edit/${params?.row?.id}`)}
          >
            <EditIcon />
          </IconButton>
          <IconButton variant="contained" size="small">
            <DeleteIcon />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <>
      <Typography
        variant="h4"
        component="h1"
        fontWeight="bold"
        textAlign="center"
        color="primary"
        py={1}
      >
        DateSheets
      </Typography>
      <Divider variant="middle" sx={{ mb: 1 }} />
      {user.userRole === "teacher" && (
        <Stack direction="row" my={2}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate("create")}
          >
            Add New Date Sheet
          </Button>
        </Stack>
      )}
      <CustomDataGrid
        loading={loading}
        rows={datesheets}
        columns={columns}
        totalPages={totalPages}
        handlePagination={handlePagination}
      />
    </>
  );
}

export default DateSheets;
