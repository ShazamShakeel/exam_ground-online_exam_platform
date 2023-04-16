import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Stack, Typography } from "@mui/material";
import CustomDataGrid from "components/CustomDataGrid";
import { memo } from "react";

function CourseStudentsDataGrid({
  loading = false,
  students = [],
  handleRemoveStudent,
}) {
  const columns = [
    {
      field: "id",
      headerName: "Student ID",
      minWidth: 125,
      flex: 0.5,
      renderCell: (params) => (
        <Typography variant="body1" color="text.secondary">
          {params?.row?.universityId}
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
      field: "email",
      headerName: "Email",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => (
        <Typography variant="body1">{params?.row?.email}</Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 100,
      flex: 0.25,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <IconButton
            variant="contained"
            size="small"
            onClick={() => handleRemoveStudent(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <>
      <CustomDataGrid loading={loading} rows={students} columns={columns} />
    </>
  );
}

export default memo(CourseStudentsDataGrid);
