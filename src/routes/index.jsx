import ResultCard from "components/Results/ResultCard";
import ExamForm from "components/TeacherExams/ExamForm";
import Layout from "layout/Layout";
import NotFound from "pages/404";
import AnnouncementForm from "pages/AnnouncementForm";
import Announcements from "pages/Announcements";
import AttemptExam from "pages/AttemptExam";
import Course from "pages/Course";
import CourseForm from "pages/CourseForm";
import Courses from "pages/Courses";
import Dashboard from "pages/Dashboard";
import DateSheetForm from "pages/DateSheetForm";
import DateSheets from "pages/DateSheets";
import Exams from "pages/Exams";
import LandingPage from "pages/LandingPage";
import Login from "pages/Login";
import Profile from "pages/Profile";
import RegisterFace from "pages/RegisterFace";
import Results from "pages/Results";
import Signup from "pages/Signup";
import SignupVerification from "pages/SignupVerification";
import Students from "pages/Students";
import ViewCheckedExam from "pages/ViewCheckedExam";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import TeacherRoute from "./TeacherRoute";
import VerificationRoute from "./VerificationRoute";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LandingPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route index path="dashboard" element={<Dashboard />} />

          <Route path="courses">
            <Route index element={<Courses />} />
            <Route path=":id" element={<Course />} />
            <Route element={<TeacherRoute />}>
              <Route path="create" element={<CourseForm />} />
              <Route path="edit/:id" element={<CourseForm />} />
            </Route>
          </Route>

          <Route path="exams">
            <Route index element={<Exams />} />
            <Route element={<TeacherRoute />}>
              <Route path="create/mcq-exam" element={<ExamForm />} />
              <Route path="create/subjective-exam" element={<ExamForm />} />
              <Route path="checked">
                <Route path="view">
                  <Route path=":id" element={<ViewCheckedExam />} />
                </Route>
              </Route>
            </Route>
          </Route>

          <Route path="results">
            <Route index element={<Results />} />
            <Route path=":id" element={<ResultCard />} />
          </Route>

          <Route path="datesheets">
            <Route index element={<DateSheets />} />
            <Route element={<TeacherRoute />}>
              <Route path="create" element={<DateSheetForm />} />
              <Route path="edit/:id" element={<DateSheetForm />} />
            </Route>
          </Route>

          <Route element={<TeacherRoute />}>
            <Route index path="students" element={<Students />} />
          </Route>

          <Route path="announcements">
            <Route index element={<Announcements />} />
            <Route element={<TeacherRoute />}>
              <Route path="create" element={<AnnouncementForm />} />
              <Route path="edit/:id" element={<AnnouncementForm />} />
            </Route>
          </Route>

          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="/exams/attempt/:id" element={<AttemptExam />} />

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
