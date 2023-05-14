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

function Announcements() {
  const navigate = useNavigate();
  const userRole = useSelector((state) => state.auth.userRole);
  const [loading, setLoading] = useState(true);
  const [announcements, setAnnouncements] = useState([]);

  const getAnnouncements = () => {
    setLoading(true);
    axiosInstance
      .get("/announcement", {
        params: {
          populate: "course",
          sortBy: "-updatedAt",
        },
      })
      .then((res) => {
        setAnnouncements(res.data.results);
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
      .delete("/announcement/" + id)
      .then(() => {
        toast.success("Announcement deleted successfully");
        getAnnouncements();
      })
      .catch((err) => {
        toast.error(err.response.data.message ?? "Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getAnnouncements();
  }, []);

  const columns = [
    {
      field: "title",
      headerName: "Title",
      minWidth: 150,
      flex: 0.75,
      renderCell: (params) => (
        <Typography variant="body1">{params?.row?.title}</Typography>
      ),
    },
    {
      field: "description",
      headerName: "Description",
      minWidth: 250,
      flex: 1,
      renderCell: (params) => (
        <Typography
          variant="body2"
          color="text.secondary"
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
      field: "course",
      headerName: "Course",
      minWidth: 150,
      flex: 0.5,
      renderCell: (params) => (
        <Typography variant="body2">{`${params?.row?.course?.code}: ${params?.row?.course?.title}`}</Typography>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      minWidth: 100,
      flex: 0.25,
      renderCell: (params) => (
        <Typography variant="body2">
          {dayjs(params?.row?.date).format("LL")}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      flex: 0.25,
      hide: userRole === "student",
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
        Announcements
      </Typography>
      <Divider variant="middle" sx={{ mb: 1 }} />
      {userRole === "teacher" && (
        <Stack direction="row" my={2}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate("create")}
          >
            Add New Announcement
          </Button>
        </Stack>
      )}
      <CustomDataGrid
        loading={loading}
        rows={announcements}
        columns={columns}
      />
    </>
  );
}

export default Announcements;
