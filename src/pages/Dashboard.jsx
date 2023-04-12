import { CircularProgress, Divider, Typography } from "@mui/material";
import Announcements from "components/Dashboard/Announcements";
import Courses from "components/Dashboard/Courses";
import CoursesChart from "components/Dashboard/CoursesChart";
import Exams from "components/Dashboard/Exams";
import UncheckedExams from "components/Dashboard/UncheckedExams";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axiosInstance from "utils/httpRequest/axiosInstance";

function Dashboard() {
  const user = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    announcements: [],
    courses: [],
    exams: [],
    uncheckedExams: [],
  });

  const getDashboardData = useCallback(() => {
    setLoading(true);
    axiosInstance
      .get("/dashboard")
      .then((res) => {
        const data = res.data;
        if (user?.userRole === "student") {
          data.exams = data?.exams?.filter((exam) => {
            let examDate = new Date(exam.date);
            return dayjs(examDate).isSameOrAfter(dayjs(), "day");
          });
        }
        setData(data);
      })
      .catch((err) => {
        toast.error(err.response.data.message ?? "Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user?.userRole]);

  useEffect(() => {
    getDashboardData();
  }, [getDashboardData]);

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
      {loading ? (
        <Typography variant="h6" textAlign="center" mt={2}>
          <CircularProgress />
        </Typography>
      ) : (
        <>
          {user?.userRole === "student" && (
            <Announcements announcements={data.announcements} />
          )}
          {user?.userRole === "student" ? (
            <Courses courses={data.courses} />
          ) : (
            <CoursesChart courses={data.courses} />
          )}
          <Exams exams={data?.exams} />
          {user?.userRole === "teacher" && (
            <UncheckedExams uncheckedExams={data.uncheckedExams} />
          )}
        </>
      )}
    </>
  );
}

export default Dashboard;
