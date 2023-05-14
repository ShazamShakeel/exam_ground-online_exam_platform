import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Typography } from "@mui/material";
import CustomDataGrid from "components/CustomDataGrid";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "utils/httpRequest/axiosInstance";

function ExamsGrid() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [exams, setExams] = useState([]);

  const getExams = () => {
    axiosInstance
      .get("/exam", {
        params: {
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
      .delete(`/exam/${id}`)
      .then(() => {
        toast.success("Exam deleted successfully");
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
      renderCell: (params) => (
        <Typography variant="body1" textTransform="capitalize">
          {params?.row?.type}
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
        <Typography variant="body1">{params?.row?.course?.code}</Typography>
      ),
    },
    {
      field: "courseName",
      headerName: "Course Name",
      minWidth: 150,
      flex: 0.5,
      renderCell: (params) => (
        <Typography variant="body1">{params?.row?.course?.title}</Typography>
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
        <Typography variant="body1">{params?.row?.totalMarks}</Typography>
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
        <Typography variant="body1">{params?.row?.duration} minutes</Typography>
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
          {dayjs(params?.row?.date).format("lll")}
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
          <IconButton
            onClick={() =>
              navigate(
                `edit/${
                  params.row.type === "mcq" ? "mcq-exam" : "subjective-exam"
                }/${params.row.id}`
              )
            }
          >
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

export default ExamsGrid;
