import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Stack, Typography } from "@mui/material";
import CustomDataGrid from "components/CustomDataGrid";

function CourseStudentsDataGrid({
  loading = false,
  students = [],
  totalPages = 1,
}) {
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
      headerName: "Name",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => (
        <Typography variant="body1">{params?.row?.name}</Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 100,
      flex: 0.25,
      align: "center",
      headerAlign: "center",
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

export default CourseStudentsDataGrid;
