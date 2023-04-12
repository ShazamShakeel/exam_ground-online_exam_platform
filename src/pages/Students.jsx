import { Divider, Typography } from "@mui/material";
import CustomDataGrid from "components/CustomDataGrid";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "utils/httpRequest/axiosInstance";

function Students() {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);

  const columns = [
    {
      field: "universityId",
      headerName: "University ID",
      minWidth: 0.5,
      flex: 0.25,
      renderCell: (params) => (
        <Typography variant="body1" color="text.secondary">
          {params?.row?.universityId}
        </Typography>
      ),
    },
    {
      field: "name",
      headerName: "Student Name",
      minWidth: 150,
      flex: 0.75,
      renderCell: (params) => (
        <Typography variant="body1">{params?.row?.name}</Typography>
      ),
    },
    {
      field: "universityEmail",
      headerName: "University Email",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => (
        <Typography variant="body2">{params?.row?.email}</Typography>
      ),
    },
    {
      field: "university",
      headerName: "University",
      minWidth: 100,
      flex: 0.5,
      renderCell: (params) => (
        <Typography variant="body2" textTransform="uppercase">
          {params?.row?.university}
        </Typography>
      ),
    },
    // {
    //   field: "actions",
    //   headerName: "Actions",
    //   minWidth: 150,
    //   flex: 0.25,
    //   renderCell: () => (
    //     <Stack direction="row" spacing={1}>
    //       <IconButton variant="contained" size="small">
    //         <DeleteIcon />
    //       </IconButton>
    //     </Stack>
    //   ),
    // },
  ];

  const getTeacherStudents = () => {
    setLoading(true);
    axiosInstance
      .get("/course/students")
      .then((res) => {
        setStudents(res.data[0].students);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message ?? "Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getTeacherStudents();
  }, []);

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
        Students
      </Typography>
      <Divider variant="middle" sx={{ mb: 1 }} />
      <CustomDataGrid loading={loading} rows={students} columns={columns} />
    </>
  );
}

export default Students;
