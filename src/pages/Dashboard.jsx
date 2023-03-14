import { Divider, Typography } from "@mui/material";
import Announcements from "components/Dashboard/Announcements";
import Courses from "components/Dashboard/Courses";
import CoursesChart from "components/Dashboard/CoursesChart";
import Exams from "components/Dashboard/Exams";
import UncheckedExams from "components/Dashboard/UncheckedExams";
import { useSelector } from "react-redux";

function Dashboard() {
  const user = useSelector((state) => state.auth);

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
        Welcome, {user?.name}
      </Typography>
      <Divider variant="middle" sx={{ mb: 1 }} />
      {user?.userRole === "student" && <Announcements />}
      {user?.userRole === "student" ? <Courses /> : <CoursesChart />}
      <Exams />
      {user?.userRole === "teacher" && <UncheckedExams />}
    </>
  );
}

export default Dashboard;
