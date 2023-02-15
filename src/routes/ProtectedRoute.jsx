import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const isVerified = localStorage.getItem("isVerified");
  const token = localStorage.getItem("token");

  if (token && isVerified === "true") {
    return <Outlet />;
  }

  if (token && isVerified === "false") {
    return <Navigate to="/verification" />;
  }

  return <Navigate to="/login" />;
}
