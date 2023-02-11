import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const isVerified = localStorage.getItem("isVerified");
  const token = localStorage.getItem("token");

  if (isVerified && token) {
    return <Outlet />;
  }

  if (!isVerified && token) {
    return <Navigate to="/signup-verification" />;
  }

  return <Navigate to="/login" />;
}
