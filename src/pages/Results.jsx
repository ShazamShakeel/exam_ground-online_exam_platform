import PreviewIcon from "@mui/icons-material/Preview";
import { Divider, IconButton, Stack, Typography } from "@mui/material";
import CustomDataGrid from "components/CustomDataGrid";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "utils/httpRequest/axiosInstance";

function Results() {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.auth);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  // const results = [
  //   {
  //     id: 1,
  //     examTitle: "Mathematics Test",
  //     studentName: "John Doe",
  //     courseCode: "MATH101",
  //     courseName: "Introduction to Mathematics",
  //     createdAt: new Date("2022-02-10T10:30:00"),
  //     obtainedMarks: 85,
  //     totalMarks: 100,
  //   },
  //   {
  //     id: 2,
  //     examTitle: "Physics Quiz",
  //     studentName: "Jane Smith",
  //     courseCode: "PHYS102",
  //     courseName: "Fundamentals of Physics",
  //     createdAt: new Date("2022-02-11T12:15:00"),
  //     obtainedMarks: 70,
  //     totalMarks: 80,
  //   },
  //   {
  //     id: 3,
  //     examTitle: "Chemistry Test",
  //     studentName: "Bob Johnson",
  //     courseCode: "CHEM101",
  //     courseName: "General Chemistry",
  //     createdAt: new Date("2022-02-12T14:20:00"),
  //     obtainedMarks: 75,
  //     totalMarks: 90,
  //   },
  //   {
  //     id: 4,
  //     examTitle: "English Essay",
  //     studentName: "Sarah Lee",
  //     courseCode: "ENGL101",
  //     courseName: "Introduction to English Literature",
  //     createdAt: new Date("2022-02-13T16:45:00"),
  //     obtainedMarks: 90,
  //     totalMarks: 100,
  //   },
  //   {
  //     id: 5,
  //     examTitle: "Biology Test",
  //     studentName: "Mike Brown",
  //     courseCode: "BIOL101",
  //     courseName: "Biology Fundamentals",
  //     createdAt: new Date("2022-02-14T09:00:00"),
  //     obtainedMarks: 80,
  //     totalMarks: 100,
  //   },
  //   {
  //     id: 6,
  //     examTitle: "History Exam",
  //     studentName: "Chris Green",
  //     courseCode: "HIST101",
  //     courseName: "World History",
  //     createdAt: new Date("2022-02-15T11:30:00"),
  //     obtainedMarks: 65,
  //     totalMarks: 80,
  //   },
  //   {
  //     id: 7,
  //     examTitle: "Geography Test",
  //     studentName: "Lisa Kim",
  //     courseCode: "GEOG101",
  //     courseName: "Introduction to Geography",
  //     createdAt: new Date("2022-02-16T13:45:00"),
  //     obtainedMarks: 70,
  //     totalMarks: 90,
  //   },
  //   {
  //     id: 8,
  //     examTitle: "Computer Science Quiz",
  //     studentName: "David Brown",
  //     courseCode: "COMP101",
  //     courseName: "Introduction to Computer Science",
  //     createdAt: new Date("2022-02-17T15:20:00"),
  //     obtainedMarks: 75,
  //     totalMarks: 80,
  //   },
  //   {
  //     id: 9,
  //     examTitle: "Spanish Test",
  //     studentName: "Sofia Hernandez",
  //     courseCode: "SPAN101",
  //     courseName: "Spanish Language and Culture",
  //     createdAt: new Date("2022-02-18T08:30:00"),
  //     obtainedMarks: 90,
  //     totalMarks: 100,
  //   },
  //   {
  //     id: 10,
  //     examTitle: "Art History Exam",
  //     studentName: "Ethan Taylor",
  //     courseCode: "ARTH101",
  //     courseName: "Introduction to Art History",
  //     createdAt: new Date("2022-02-19T10:15:00"),
  //     obtainedMarks: 90,
  //     totalMarks: 100,
  //   },
  // ];

  const getResults = useCallback(() => {
    setLoading(true);
    axiosInstance
      .get("/answer/checked", {
        params: {
          populate:
            user.userRole === "student" ? "exam,teacher" : "exam,student",
        },
      })
      .then((res) => {
        let results = res?.data?.results;
        if (user.userRole === "student") {
          results = results.reverse();
        }
        setResults(results);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message ?? "Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user.userRole]);

  useEffect(() => {
    getResults();
  }, [getResults]);

  const columns = [
    {
      field: "exam",
      headerName: "Exam",
      minWidth: 200,
      flex: 0.75,
      renderCell: (params) => (
        <Typography variant="body1">{params?.row?.exam?.title}</Typography>
      ),
    },
    {
      field: "studentName",
      headerName: "Student Name",
      minWidth: 150,
      flex: 0.5,
      hide: user.userRole === "student" ? true : false,
      renderCell: (params) => (
        <Typography variant="body1">{params?.row?.student?.name}</Typography>
      ),
    },
    {
      field: "studentEmail",
      headerName: "Student Email",
      minWidth: 250,
      flex: 0.5,
      hide: user.userRole === "student" ? true : false,
      renderCell: (params) => (
        <Typography variant="body1">{params?.row?.student?.email}</Typography>
      ),
    },
    {
      field: "teacherName",
      headerName: "Teacher",
      minWidth: 150,
      flex: 0.5,
      hide: user.userRole === "teacher" ? true : false,
      renderCell: (params) => (
        <Typography variant="body1">{params?.row?.teacher?.name}</Typography>
      ),
    },
    {
      field: "totalMarks",
      headerName: "Total Marks",
      minWidth: 150,
      flex: 0.25,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Typography variant="body1">{params?.row?.exam?.totalMarks}</Typography>
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
      field: "date",
      headerName: "Date",
      minWidth: 210,
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Typography variant="body1">
          {dayjs(params?.row?.createdAt).format("lll")}
        </Typography>
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
            onClick={() => navigate(`${params?.row?.id}`)}
          >
            <PreviewIcon />
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
        Results
      </Typography>
      <Divider variant="middle" sx={{ mb: 1 }} />
      <CustomDataGrid loading={loading} rows={results} columns={columns} />
    </>
  );
}

export default Results;
