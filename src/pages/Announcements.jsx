import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Divider, IconButton, Stack, Typography } from "@mui/material";
import StyledMuiDataGrid from "components/CustomDataGrid";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Announcements() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);
  const loading = useSelector(
    (state) => state?.announcements?.loading ?? false
  );
  const totalPages = 1;
  const announcements = [
    {
      id: 1,
      title: "System Maintenance",
      description:
        "Our system will be undergoing maintenance on March 1st from 8:00 PM to 10:00 PM. During this time, the system will be temporarily unavailable.",
      date: "2023-02-25",
    },
    {
      id: 2,
      title: "New Exam Added",
      description:
        "We have added a new exam on 'Introduction to Computer Science'. Please check the 'Exams' tab for more details.",
      date: "2023-02-18",
    },
    {
      id: 3,
      title: "Exam Schedule Change",
      description:
        "The exam on 'Database Management Systems' previously scheduled for March 5th has been rescheduled to March 12th. Please check the 'Exams' tab for more details.",
      date: "2023-02-16",
    },
    {
      id: 4,
      title: "Exam Results Available",
      description:
        "The results for the 'Operating Systems' exam are now available. Please check the 'Results' tab for more details.",
      date: "2023-02-14",
    },
    {
      id: 5,
      title: "System Upgrade",
      description:
        "We are upgrading our system to improve its performance and stability. During this time, the system may be temporarily unavailable. We apologize for any inconvenience.",
      date: "2023-02-11",
    },
    {
      id: 6,
      title: "New Feature Added",
      description:
        "We have added a new feature that allows you to bookmark questions during an exam. Please check the 'Features' tab for more details.",
      date: "2023-02-09",
    },
    {
      id: 7,
      title: "Exam Registration Open",
      description:
        "Registration for the 'Web Development' exam is now open. Please check the 'Exams' tab for more details.",
      date: "2023-02-06",
    },
    {
      id: 8,
      title: "Exam Cancellation",
      description:
        "The exam on 'Computer Networks' scheduled for March 8th has been cancelled. We apologize for any inconvenience.",
      date: "2023-02-04",
    },
    {
      id: 9,
      title: "New Exam Added",
      description:
        "We have added a new exam on 'Data Structures and Algorithms'. Please check the 'Exams' tab for more details.",
      date: "2023-02-01",
    },
    {
      id: 10,
      title: "System Downtime",
      description:
        "Our system will be down for maintenance on February 28th from 10:00 PM to 12:00 AM. During this time, the system will be unavailable.",
      date: "2023-01-28",
    },
  ];

  const columns = [
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
      field: "description",
      headerName: "Description",
      minWidth: 250,
      flex: 2,
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
      field: "date",
      headerName: "Date",
      minWidth: 100,
      flex: 0.25,
      renderCell: (params) => (
        <Typography variant="body2">{params?.row?.date}</Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      flex: 0.25,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <IconButton
            variant="contained"
            size="small"
            onClick={() => navigate(`edit/${params?.row?.id}`)}
          >
            <EditIcon />
          </IconButton>
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
        Announcements
      </Typography>
      <Divider variant="middle" sx={{ mb: 1 }} />
      <Stack direction="row" my={2}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("create")}
        >
          Add New Announcement
        </Button>
      </Stack>
      <StyledMuiDataGrid
        loading={loading}
        rows={announcements}
        columns={columns}
        totalPages={totalPages}
        handlePagination={handlePagination}
      />
    </>
  );
}

export default Announcements;
