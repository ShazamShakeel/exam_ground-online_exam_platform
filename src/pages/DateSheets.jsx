import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Divider, IconButton, Stack, Typography } from "@mui/material";
import CustomDataGrid from "components/CustomDataGrid";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "utils/httpRequest/axiosInstance";
const localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

function DateSheets() {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.auth);
  const [loading, setLoading] = useState(true);
  const [datesheets, setDatesheets] = useState([]);

  const getDateSheets = () => {
    setLoading(true);
    axiosInstance
      .get("/datesheet", {
        params: {
          populate: "course",
          sortBy: "-updatedAt",
        },
      })
      .then((res) => {
        setDatesheets(res?.data.results);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message ?? "Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    axiosInstance
      .delete(`/datesheet/${id}`)
      .then(() => {
        toast.success("DateSheet deleted successfully");
        getDateSheets();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      });
  };

  useEffect(() => {
    getDateSheets();
  }, []);

  const columns = [
    {
      field: "code",
      headerName: "Course Code",
      minWidth: 150,
      flex: 0.25,
      renderCell: (params) => (
        <Typography variant="body1">{params?.row?.course?.code}</Typography>
      ),
    },
    {
      field: "title",
      headerName: "Course Name",
      minWidth: 150,
      flex: 0.5,
      renderCell: (params) => (
        <Typography variant="body1">{params?.row?.course?.title}</Typography>
      ),
    },
    {
      field: "description",
      headerName: "Description",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => (
        <Typography variant="body1">{params?.row?.description}</Typography>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      minWidth: 150,
      flex: 0.25,
      renderCell: (params) => (
        <Typography variant="body1">
          {dayjs(params?.row?.date).format("LL")}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      flex: 0.25,
      hide: user.userRole === "student" ? true : false,
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
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
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
        DateSheets
      </Typography>
      <Divider variant="middle" sx={{ mb: 1 }} />
      {user.userRole === "teacher" && (
        <Stack direction="row" my={2}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate("create")}
          >
            Add New Date Sheet
          </Button>
        </Stack>
      )}
      <CustomDataGrid loading={loading} rows={datesheets} columns={columns} />
    </>
  );
}

export default DateSheets;
