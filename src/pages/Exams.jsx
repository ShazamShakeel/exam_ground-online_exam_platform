import StudentExams from "components/Exams/StudentExams";
import TeacherExams from "components/Exams/TeacherExams";
import { useSelector } from "react-redux";

function Exams() {
  const userRole = useSelector((state) => state.auth.userRole);
  if (userRole === "student") {
    return <StudentExams />;
  }

  return <TeacherExams />;
}

export default Exams;
