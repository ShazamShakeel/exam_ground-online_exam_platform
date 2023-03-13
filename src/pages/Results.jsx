import DeleteIcon from "@mui/icons-material/Delete";
import PreviewIcon from "@mui/icons-material/Preview";
import { Divider, IconButton, Stack, Typography } from "@mui/material";
import CustomDataGrid from "components/CustomDataGrid";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Results() {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.auth);
  const loading = false;
  const totalPages = 1;
  const results = [
    {
      id: 1,
      examTitle: "Mathematics Test",
      studentName: "John Doe",
      courseCode: "MATH101",
      courseName: "Introduction to Mathematics",
      createdAt: new Date("2022-02-10T10:30:00"),
      obtainedMarks: 85,
      totalMarks: 100,
    },
    {
      id: 2,
      examTitle: "Physics Quiz",
      studentName: "Jane Smith",
      courseCode: "PHYS102",
      courseName: "Fundamentals of Physics",
      createdAt: new Date("2022-02-11T12:15:00"),
      obtainedMarks: 70,
      totalMarks: 80,
    },
    {
      id: 3,
      examTitle: "Chemistry Test",
      studentName: "Bob Johnson",
      courseCode: "CHEM101",
      courseName: "General Chemistry",
      createdAt: new Date("2022-02-12T14:20:00"),
      obtainedMarks: 75,
      totalMarks: 90,
    },
    {
      id: 4,
      examTitle: "English Essay",
      studentName: "Sarah Lee",
      courseCode: "ENGL101",
      courseName: "Introduction to English Literature",
      createdAt: new Date("2022-02-13T16:45:00"),
      obtainedMarks: 90,
      totalMarks: 100,
    },
    {
      id: 5,
      examTitle: "Biology Test",
      studentName: "Mike Brown",
      courseCode: "BIOL101",
      courseName: "Biology Fundamentals",
      createdAt: new Date("2022-02-14T09:00:00"),
      obtainedMarks: 80,
      totalMarks: 100,
    },
    {
      id: 6,
      examTitle: "History Exam",
      studentName: "Chris Green",
      courseCode: "HIST101",
      courseName: "World History",
      createdAt: new Date("2022-02-15T11:30:00"),
      obtainedMarks: 65,
      totalMarks: 80,
    },
    {
      id: 7,
      examTitle: "Geography Test",
      studentName: "Lisa Kim",
      courseCode: "GEOG101",
      courseName: "Introduction to Geography",
      createdAt: new Date("2022-02-16T13:45:00"),
      obtainedMarks: 70,
      totalMarks: 90,
    },
    {
      id: 8,
      examTitle: "Computer Science Quiz",
      studentName: "David Brown",
      courseCode: "COMP101",
      courseName: "Introduction to Computer Science",
      createdAt: new Date("2022-02-17T15:20:00"),
      obtainedMarks: 75,
      totalMarks: 80,
    },
    {
      id: 9,
      examTitle: "Spanish Test",
      studentName: "Sofia Hernandez",
      courseCode: "SPAN101",
      courseName: "Spanish Language and Culture",
      createdAt: new Date("2022-02-18T08:30:00"),
      obtainedMarks: 90,
      totalMarks: 100,
    },
    {
      id: 10,
      examTitle: "Art History Exam",
      studentName: "Ethan Taylor",
      courseCode: "ARTH101",
      courseName: "Introduction to Art History",
      createdAt: new Date("2022-02-19T10:15:00"),
      obtainedMarks: 90,
      totalMarks: 100,
    },
  ];
  const handlePagination = (_, page) => {
    console.log("page", page);
  };

  const columns = [
    {
      field: "studentName",
      headerName: "Student Name",
      minWidth: 150,
      flex: 0.5,
      hide: user.userRole === "student" ? true : false,
      renderCell: (params) => (
        <Typography variant="body1">{params?.row?.studentName}</Typography>
      ),
    },
    {
      field: "courseCode",
      headerName: "Course Code",
      minWidth: 125,
      flex: 0.25,
      renderCell: (params) => (
        <Typography variant="body1">{params?.row?.courseCode}</Typography>
      ),
    },
    {
      field: "courseName",
      headerName: "Course Name",
      minWidth: 200,
      flex: 1,
      renderCell: (params) => (
        <Typography variant="body1">{params?.row?.courseName}</Typography>
      ),
    },
    {
      field: "examTitle",
      headerName: "Exam Title",
      minWidth: 200,
      flex: 0.75,
      renderCell: (params) => (
        <Typography variant="body1">{params?.row?.examTitle}</Typography>
      ),
    },
    {
      field: "obtainedMarks",
      headerName: "Obtained Marks",
      minWidth: 150,
      flex: 0.25,
      renderCell: (params) => (
        <Typography variant="body1">{params?.row?.obtainedMarks}</Typography>
      ),
    },
    {
      field: "totalMarks",
      headerName: "Total Marks",
      minWidth: 150,
      flex: 0.25,
      renderCell: (params) => (
        <Typography variant="body1">{params?.row?.totalMarks}</Typography>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      minWidth: 210,
      flex: 0.5,
      renderCell: (params) => (
        <Typography variant="body1">
          {dayjs(params?.row?.createdAt).format("DD MMM, YYYY [at] hh:mm A")}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      flex: 0.25,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <IconButton
            variant="contained"
            size="small"
            onClick={() => navigate(`${params?.row?.id}`)}
          >
            <PreviewIcon />
          </IconButton>
          {user.userRole === "teacher" && (
            <IconButton variant="contained" size="small">
              <DeleteIcon />
            </IconButton>
          )}
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
        Results
      </Typography>
      <Divider variant="middle" sx={{ mb: 1 }} />
      <CustomDataGrid
        loading={loading}
        rows={results}
        columns={columns}
        totalPages={totalPages}
        handlePagination={handlePagination}
      />
    </>
  );
}

export default Results;
