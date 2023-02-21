import { Divider, Typography } from "@mui/material";
import CoursesCardsWithPagination from "components/Courses/CoursesCardsWithPagination";
import { useSelector } from "react-redux";

function Courses() {
  const user = useSelector((state) => state.auth);
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
        Courses
      </Typography>
      <Divider variant="middle" sx={{ mb: 1 }} />
      <CoursesCardsWithPagination />

      {/* {user.userRole === "student" ? (
        <CoursesCardsWithPagination />
      ) : (
        <CoursesDataGrid />
      )} */}
    </>
  );
}

export default Courses;
