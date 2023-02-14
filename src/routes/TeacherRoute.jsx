import { Navigate, Outlet } from "react-router-dom";

export default function TeacherRoute() {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");
  const isVerified = localStorage.getItem("isVerified");

  if (token && userRole === "teacher" && isVerified === "true") {
    return <Outlet />;
  }

  if (token && userRole === "teacher" && isVerified === "false") {
    return <Navigate to="/verification" />;
  }

  return <Navigate to="/login" />;
}
