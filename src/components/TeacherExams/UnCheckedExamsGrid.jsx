import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Typography } from "@mui/material";
import CustomDataGrid from "components/CustomDataGrid";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "utils/httpRequest/axiosInstance";

function UnCheckedExamsGrid() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [exams, setExams] = useState([]);

  const getExams = () => {
    axiosInstance
      .get("/answer/unchecked", {
        params: {
          populate: "student,exam.course",
          sortBy: "-createdAt",
        },
      })
      .then((res) => {
        setExams(res.data.results);
      })
      .catch((err) => {
        toast.error(err.response.data.message ?? "Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    setLoading(true);
    axiosInstance
      .delete(`/answer/${id}`)
      .then(() => {
        toast.success("Successfully Deleted");
        getExams();
      })
      .catch((err) => {
        toast.error(err.response.data.message ?? "Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getExams();
  }, []);

  const columns = [
    {
      field: "type",
      headerName: "Type",
      minWidth: 100,
      flex: 0.25,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Typography variant="body1" textTransform="capitalize">
          {params?.row?.exam?.type}
        </Typography>
      ),
    },
    {
      field: "title",
      headerName: "Title",
      minWidth: 150,
      flex: 0.5,
      renderCell: (params) => (
        <Typography variant="body1">{params?.row?.exam?.title}</Typography>
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
        <Typography variant="body1">
          {params?.row?.exam?.course?.code}
        </Typography>
      ),
    },
    {
      field: "courseName",
      headerName: "Course Name",
      minWidth: 150,
      flex: 0.5,
      renderCell: (params) => (
        <Typography variant="body1">
          {params?.row?.exam?.course?.title}
        </Typography>
      ),
    },
    {
      field: "studentName",
      headerName: "Student Name",
      minWidth: 125,
      flex: 0.25,
      renderCell: (params) => (
        <Typography variant="body1">{params?.row?.student?.name}</Typography>
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
      field: "duration",
      headerName: "Duration",
      minWidth: 150,
      flex: 0.25,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Typography variant="body1">
          {params?.row?.exam?.duration} minutes
        </Typography>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      minWidth: 200,
      flex: 0.25,
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
        <>
          <IconButton onClick={() => navigate(`check/${params.row.id}`)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box p={2}>
      <CustomDataGrid loading={loading} rows={exams} columns={columns} />
    </Box>
  );
}

export default UnCheckedExamsGrid;
