import DeleteIcon from "@mui/icons-material/Delete";
import { Divider, IconButton, Stack, Typography } from "@mui/material";
import CustomDataGrid from "components/CustomDataGrid";
import { useSelector } from "react-redux";

function Students() {
  // const navigate = useNavigate();
  // const user = useSelector((state) => state.auth);
  const loading = useSelector((state) => state?.students?.loading ?? false);
  const totalPages = 1;
  const students = [
    {
      id: 1,
      studentId: "ABC123",
      name: "John Doe",
      university: "Example University",
      coursesEnrolled: 4,
    },
    {
      id: 2,
      studentId: "DEF456",
      name: "Jane Smith",
      university: "Another University",
      coursesEnrolled: 3,
    },
    {
      id: 3,
      studentId: "GHI789",
      name: "Bob Johnson",
      university: "Yet Another University",
      coursesEnrolled: 5,
    },
    {
      id: 4,
      studentId: "JKL012",
      name: "Samantha Lee",
      university: "Example University",
      coursesEnrolled: 2,
    },
    {
      id: 5,
      studentId: "MNO345",
      name: "David Garcia",
      university: "Another University",
      coursesEnrolled: 6,
    },
    {
      id: 6,
      studentId: "PQR678",
      name: "Emily Chen",
      university: "Yet Another University",
      coursesEnrolled: 4,
    },
    {
      id: 7,
      studentId: "STU901",
      name: "Michael Kim",
      university: "Example University",
      coursesEnrolled: 3,
    },
    {
      id: 8,
      studentId: "VWX234",
      name: "Lisa Patel",
      university: "Another University",
      coursesEnrolled: 7,
    },
    {
      id: 9,
      studentId: "YZA567",
      name: "Daniel Rodriguez",
      university: "Yet Another University",
      coursesEnrolled: 5,
    },
    {
      id: 10,
      studentId: "BCD890",
      name: "Maria Hernandez",
      university: "Example University",
      coursesEnrolled: 4,
    },
  ];

  const columns = [
    {
      field: "studentId",
      headerName: "Student ID",
      minWidth: 75,
      flex: 0.25,
      renderCell: (params) => (
        <Typography variant="body1" color="text.secondary">
          {params?.row?.studentId}
        </Typography>
      ),
    },
    {
      field: "name",
      headerName: "Description",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => (
        <Typography variant="body1">{params?.row?.name}</Typography>
      ),
    },
    {
      field: "university",
      headerName: "University",
      minWidth: 100,
      flex: 0.5,
      renderCell: (params) => (
        <Typography variant="body2">{params?.row?.university}</Typography>
      ),
    },
    {
      field: "courseEnrolled",
      headerName: "Courses Enrolled",
      minWidth: 150,
      flex: 0.25,
      renderCell: (params) => (
        <Typography variant="body2">{params?.row?.coursesEnrolled}</Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      flex: 0.25,
      renderCell: () => (
        <Stack direction="row" spacing={1}>
          <IconButton variant="contained" size="small">
            <DeleteIcon />
          </IconButton>
        </Stack>
      ),
    },
  ];

  const handlePagination = (_, page) => {
    console.log("page", page);
  };

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
      <CustomDataGrid
        loading={loading}
        rows={students}
        columns={columns}
        totalPages={totalPages}
        handlePagination={handlePagination}
      />
    </>
  );
}

export default Students;
