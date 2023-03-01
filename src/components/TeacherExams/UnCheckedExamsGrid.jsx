import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Typography } from "@mui/material";
import CustomDataGrid from "components/CustomDataGrid";
import { useNavigate } from "react-router-dom";

function UnCheckedExamsGrid() {
  const navigate = useNavigate();
  const loading = false;
  const totalPages = 1;

  const uncheckedExams = [
    {
      id: 1,
      title: "Midterm Exam",
      courseCode: "MATH101",
      courseName: "Calculus",
      studentName: "demo user",
      examMarks: 80,
      duration: "2 hours",
      date: "2022-04-15",
      type: "subjective",
    },
    {
      id: 2,
      title: "Final Exam",
      courseCode: "ENG101",
      courseName: "English Literature",
      studentName: "demo user",
      examMarks: 70,
      duration: "3 hours",
      date: "2022-06-10",
      type: "mcq",
    },
    {
      id: 3,
      title: "Quiz 1",
      courseCode: "CSC101",
      courseName: "Programming Fundamentals",
      studentName: "demo user",
      examMarks: 95,
      duration: "1 hour",
      date: "2022-02-28",
      type: "mcq",
    },
    {
      id: 4,
      title: "Term Paper",
      courseCode: "BIO101",
      courseName: "Biology",
      studentName: "demo user",
      examMarks: 85,
      duration: "N/A",
      date: "2022-05-20",
      type: "subjective",
    },
    {
      id: 5,
      title: "Midterm Exam",
      courseCode: "PHYS101",
      courseName: "Physics",
      studentName: "demo user",
      examMarks: 75,
      duration: "2 hours",
      date: "2022-03-25",
      type: "mcq",
    },
    {
      id: 6,
      title: "Final Exam",
      courseCode: "HIS101",
      courseName: "World History",
      studentName: "demo user",
      examMarks: 80,
      duration: "3 hours",
      date: "2022-06-20",
      type: "subjective",
    },
    {
      id: 7,
      title: "Quiz 2",
      courseCode: "CSC101",
      courseName: "Programming Fundamentals",
      studentName: "demo user",
      examMarks: 90,
      duration: "1 hour",
      date: "2022-04-15",
      type: "subjective",
    },
    {
      id: 8,
      title: "Midterm Exam",
      courseCode: "CHEM101",
      courseName: "Chemistry",
      studentName: "demo user",
      examMarks: 70,
      duration: "2 hours",
      date: "2022-03-01",
      type: "mcq",
    },
    {
      id: 9,
      title: "Final Exam",
      courseCode: "PSY101",
      courseName: "Psychology",
      studentName: "demo user",
      examMarks: 85,
      duration: "3 hours",
      date: "2022-06-30",
      type: "mcq",
    },
    {
      id: 10,
      title: "Midterm Exam",
      courseCode: "ECO101",
      courseName: "Economics",
      studentName: "demo user",
      examMarks: 75,
      duration: "2 hours",
      date: "2022-06-30",
      type: "mcq",
    },
  ];

  const columns = [
    {
      field: "type",
      headerName: "Type",
      minWidth: 100,
      flex: 0.25,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Typography variant="body1">
          {params?.row?.type === "mcq"
            ? "MCQ"
            : params?.row?.type === "subjective"
            ? "Subjective"
            : "N/A"}
        </Typography>
      ),
    },
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
      field: "studentName",
      headerName: "Student Name",
      minWidth: 125,
      flex: 0.25,
      renderCell: (params) => (
        <Typography variant="body1">{params?.row?.studentName}</Typography>
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
          <IconButton onClick={() => navigate(`unchecked/${params.row.id}`)}>
            <EditIcon />
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
        rows={uncheckedExams}
        columns={columns}
        totalPages={totalPages}
        handlePagination={handlePagination}
      />
    </Box>
  );
}

export default UnCheckedExamsGrid;
