import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PreviewIcon from "@mui/icons-material/Preview";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import CustomDataGrid from "components/CustomDataGrid";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "utils/httpRequest/axiosInstance";

export default function CoursesDataGrid() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const getCourses = useCallback(() => {
    setLoading(true);
    axiosInstance
      .get(`course`, {
        params: {
          teacher: localStorage.getItem("userId"),
        },
      })
      .then((response) => {
        setCourses(response.data.results ?? []);
        setTotalPages(response.data.totalPages);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    axiosInstance.delete(`course/${id}`).then(() => {
      toast.success("Course deleted successfully");
      getCourses();
    });
  };

  useEffect(() => {
    getCourses();
  }, [getCourses]);

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
      field: "title",
      headerName: "Course Title",
      minWidth: 200,
      flex: 0.75,
      renderCell: (params) => (
        <Typography variant="body1">{params?.row?.title}</Typography>
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
        <Typography variant="body1">{params?.row?.students.length}</Typography>
      ),
    },
    // {
    //   field: "exams",
    //   headerName: "Exams",
    //   minWidth: 75,
    //   flex: 0.25,
    //   headerAlign: "center",
    //   align: "center",
    //   renderCell: (params) => (
    //     <Typography variant="body1">{params?.row?.exams}</Typography>
    //   ),
    // },
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
            onClick={() => navigate(`edit/${params?.row?.id}`)}
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
          <IconButton
            variant="contained"
            size="small"
            onClick={() => handleDelete(params?.row?.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <>
      <Stack direction="row" my={2}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("create")}
        >
          Add New Course
        </Button>
      </Stack>
      <CustomDataGrid
        loading={loading}
        rows={courses}
        columns={columns}
        totalPages={totalPages}
      />
    </>
  );
}
