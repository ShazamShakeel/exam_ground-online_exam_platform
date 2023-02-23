import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Typography } from "@mui/material";
import CustomDataGrid from "components/CustomDataGrid";
import { useNavigate } from "react-router-dom";

function ExamsGrid() {
  const navigate = useNavigate();
  const loading = false;
  const totalPages = 1;

  const exams = [
    {
      id: 1,
      title: "Midterm Exam",
      courseCode: "MATH101",
      courseName: "Calculus",
      studentAttempts: 120,
      examMarks: 80,
      duration: "2 hours",
      date: "2022-04-15",
    },
    {
      id: 2,
      title: "Final Exam",
      courseCode: "ENG101",
      courseName: "English Literature",
      studentAttempts: 150,
      examMarks: 70,
      duration: "3 hours",
      date: "2022-06-10",
    },
    {
      id: 3,
      title: "Quiz 1",
      courseCode: "CSC101",
      courseName: "Programming Fundamentals",
      studentAttempts: 180,
      examMarks: 95,
      duration: "1 hour",
      date: "2022-02-28",
    },
    {
      id: 4,
      title: "Term Paper",
      courseCode: "BIO101",
      courseName: "Biology",
      studentAttempts: 90,
      examMarks: 85,
      duration: "N/A",
      date: "2022-05-20",
    },
    {
      id: 5,
      title: "Midterm Exam",
      courseCode: "PHYS101",
      courseName: "Physics",
      studentAttempts: 100,
      examMarks: 75,
      duration: "2 hours",
      date: "2022-03-25",
    },
    {
      id: 6,
      title: "Final Exam",
      courseCode: "HIS101",
      courseName: "World History",
      studentAttempts: 120,
      examMarks: 80,
      duration: "3 hours",
      date: "2022-06-20",
    },
    {
      id: 7,
      title: "Quiz 2",
      courseCode: "CSC101",
      courseName: "Programming Fundamentals",
      studentAttempts: 200,
      examMarks: 90,
      duration: "1 hour",
      date: "2022-04-15",
    },
    {
      id: 8,
      title: "Midterm Exam",
      courseCode: "CHEM101",
      courseName: "Chemistry",
      studentAttempts: 80,
      examMarks: 70,
      duration: "2 hours",
      date: "2022-03-01",
    },
    {
      id: 9,
      title: "Final Exam",
      courseCode: "PSY101",
      courseName: "Psychology",
      studentAttempts: 110,
      examMarks: 85,
      duration: "3 hours",
      date: "2022-06-30",
    },
    {
      id: 10,
      title: "Midterm Exam",
      courseCode: "ECO101",
      courseName: "Economics",
      studentAttempts: 150,
      examMarks: 75,
      duration: "2 hours",
      date: "2022-03-15",
    },
  ];

  const columns = [
    {
      field: "title",
      headerName: "Title",
      minWidth: 150,
      flex: 0.5,
      renderCell: (params) => (
        <Typography variant="body1">{params?.row?.title}</Typography>
      ),
    },
    {
      field: "courseCode",
      headerName: "Course Code",
      minWidth: 100,
      flex: 0.25,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Typography variant="body1">{params?.row?.courseCode}</Typography>
      ),
    },
    {
      field: "courseName",
      headerName: "Course Name",
      minWidth: 150,
      flex: 0.5,
      renderCell: (params) => (
        <Typography variant="body1">{params?.row?.courseName}</Typography>
      ),
    },
    {
      field: "studentAttempts",
      headerName: "Student Attempts",
      minWidth: 150,
      flex: 0.25,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Typography variant="body1">{params?.row?.studentAttempts}</Typography>
      ),
    },
    {
      field: "examMarks",
      headerName: "Exam Marks",
      minWidth: 150,
      flex: 0.25,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Typography variant="body1">{params?.row?.examMarks}</Typography>
      ),
    },
    {
      field: "duration",
      headerName: "Duration",
      minWidth: 150,
      flex: 0.25,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Typography variant="body1">{params?.row?.duration}</Typography>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      minWidth: 150,
      flex: 0.25,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Typography variant="body1">{params?.row?.date}</Typography>
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
        <>
          <IconButton onClick={() => navigate(`edit/${params.row.id}`)}>
            <EditIcon />
          </IconButton>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const handlePagination = (_, page) => {
    console.log("page", page);
  };

  return (
    <Box p={2}>
      <CustomDataGrid
        loading={loading}
        rows={exams}
        columns={columns}
        totalPages={totalPages}
        handlePagination={handlePagination}
      />
    </Box>
  );
}

export default ExamsGrid;
