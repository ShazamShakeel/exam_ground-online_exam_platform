import LandingPage from "pages/LandingPage";
import LoginPage from "pages/LoginPage";
import RegisterFace from "pages/RegisterFace";
import SignupPage from "pages/SignupPage";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<LandingPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="register-face" element={<RegisterFace />} />
    </>
  )
);

export default routes;
