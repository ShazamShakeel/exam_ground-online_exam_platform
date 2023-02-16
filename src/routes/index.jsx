import Layout from "layout/Layout";
import NotFound from "pages/404";
import Dashboard from "pages/Dashboard";
import LandingPage from "pages/LandingPage";
import Login from "pages/Login";
import RegisterFace from "pages/RegisterFace";
import Settings from "pages/Settings";
import Signup from "pages/Signup";
import SignupVerification from "pages/SignupVerification";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import VerificationRoute from "./VerificationRoute";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LandingPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route index path="dashboard" element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="register-face" element={<RegisterFace />} />
      </Route>
      <Route element={<VerificationRoute />}>
        <Route index path="verification" element={<SignupVerification />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="*" element={<NotFound />} />
    </>
  )
);

export default routes;
