import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import CheckedExamsGrid from "components/TeacherExams/CheckedExamsGrid";
import ExamsGrid from "components/TeacherExams/ExamsGrid";
import UnCheckedExamsGrid from "components/TeacherExams/UnCheckedExamsGrid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TeacherExams() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("exams");
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (_, value) => {
    setSelectedTab(value);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Stack direction="column" gap={2}>
        <Box m="auto">
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            sx={{
              "& .MuiTab-root": {
                fontSize: "1.25rem",
              },
              "& .Mui-selected": {
                fontWeight: "bold",
              },
            }}
          >
            <Tab label="Exams" value="exams" />
            <Tab label="Unchecked Exams" value="uncheckedExams" />
            <Tab label="Checked Exams" value="checkedExams" />
          </Tabs>
        </Box>
        <Divider variant="middle" sx={{ mb: 2 }} />
        {selectedTab === "exams" ? (
          <>
            <Box>
              <Button
                variant="contained"
                onClick={handleOpen}
                sx={{ minWidth: 200 }}
              >
                Create Exam
              </Button>
            </Box>
            <ExamsGrid />
          </>
        ) : selectedTab === "uncheckedExams" ? (
          <UnCheckedExamsGrid />
        ) : selectedTab === "checkedExams" ? (
          <CheckedExamsGrid />
        ) : null}
      </Stack>
      <Dialog open={isOpen} onClose={handleClose} maxWidth="md">
        <DialogContent>
          <Stack direction="column" gap={4} p={2}>
            <Typography
              variant="h5"
              color="primary.primary"
              fontWeight="bold"
              textAlign="center"
            >
              Select Exam Type
            </Typography>
            <Stack direction="row" gap={4}>
              <Button
                variant="contained"
                onClick={() => {
                  navigate("create/mcq-exam");
                  handleClose();
                }}
                sx={{ minWidth: 200 }}
              >
                MCQ Exam
              </Button>
              <Divider variant="middle" orientation="vertical" flexItem />
              <Button
                variant="contained"
                onClick={() => {
                  navigate("create/subjective-exam");
                  handleClose();
                }}
                sx={{ minWidth: 200 }}
              >
                Subjective Exam
              </Button>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default TeacherExams;
