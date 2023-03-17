import EditIcon from "@mui/icons-material/Edit";
import PreviewIcon from "@mui/icons-material/Preview";
import { Box, IconButton, Typography } from "@mui/material";
import CustomDataGrid from "components/CustomDataGrid";
import { useNavigate } from "react-router-dom";

function CheckedExamsGrid() {
  const navigate = useNavigate();
  const loading = false;
  const totalPages = 1;

  const checkedExams = [
    {
      id: 1,
      title: "Midterm Exam",
      courseCode: "MATH101",
      courseName: "Calculus",
      studentName: "demo user",
      examMarks: 80,
      duration: "2 hours",
      date: "2022-04-15",
      type: "mcq",
      obtainedMarks: Math.floor(Math.random() * 81) + 20,
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
      type: "subjective",
      obtainedMarks: Math.floor(Math.random() * 71) + 30,
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
      obtainedMarks: Math.floor(Math.random() * 96) + 4,
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
      obtainedMarks: Math.floor(Math.random() * 86) + 15,
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
      obtainedMarks: Math.floor(Math.random() * 76) + 24,
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
      obtainedMarks: Math.floor(Math.random() * 81) + 20,
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
      type: "mcq",
      obtainedMarks: Math.floor(Math.random() * 91) + 9,
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
      obtainedMarks: Math.floor(Math.random() * 91) + 9,
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
      obtainedMarks: Math.floor(Math.random() * 91) + 9,
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
      field: "obtainedMarks",
      headerName: "Obtained Marks",
      minWidth: 150,
      flex: 0.25,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Typography variant="body1">{params?.row?.obtainedMarks}</Typography>
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
          <IconButton onClick={() => navigate(`checked/view/${params.row.id}`)}>
            <PreviewIcon />
          </IconButton>
          {params.row.type === "subjective" && (
            <IconButton
              onClick={() => navigate(`checked/edit/${params.row.id}`)}
            >
              <EditIcon />
            </IconButton>
          )}
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
        rows={checkedExams}
        columns={columns}
        totalPages={totalPages}
        handlePagination={handlePagination}
      />
    </Box>
  );
}

export default CheckedExamsGrid;
