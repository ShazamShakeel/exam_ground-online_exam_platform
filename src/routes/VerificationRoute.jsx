import { memo } from "react";
import { Navigate, Outlet } from "react-router-dom";

function VerificationRoute() {
  const token = localStorage.getItem("token");
  const isVerified = localStorage.getItem("isVerified");

  if (token && isVerified === "false") {
    return <Outlet />;
  }

  return <Navigate to="/login" />;
}

export default memo(VerificationRoute);
