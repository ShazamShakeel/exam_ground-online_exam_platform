import LandingPage from "pages/LandingPage";
import Login from "pages/Login";
import RegisterFace from "pages/RegisterFace";
import Signup from "pages/Signup";
import SignupVerification from "pages/SignupVerification";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<LandingPage />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="signup-verification" element={<SignupVerification />} />
      <Route path="register-face" element={<RegisterFace />} />
    </>
  )
);

export default routes;
