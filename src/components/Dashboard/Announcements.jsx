import { Box, Card, Stack, Typography } from "@mui/material";
import Carousel from "react-multi-carousel";

export default function Announcements() {
  const announcements = [
    {
      id: 1,
      title: "System Maintenance",
      description:
        "Our system will be undergoing maintenance on March 1st from 8:00 PM to 10:00 PM. During this time, the system will be temporarily unavailable.",
      date: "2023-02-25",
    },
    {
      id: 2,
      title: "New Exam Added",
      description:
        "We have added a new exam on 'Introduction to Computer Science'. Please check the 'Exams' tab for more details.",
      date: "2023-02-18",
    },
    {
      id: 3,
      title: "Exam Schedule Change",
      description:
        "The exam on 'Database Management Systems' previously scheduled for March 5th has been rescheduled to March 12th. Please check the 'Exams' tab for more details.",
      date: "2023-02-16",
    },
    {
      id: 4,
      title: "Exam Results Available",
      description:
        "The results for the 'Operating Systems' exam are now available. Please check the 'Results' tab for more details.",
      date: "2023-02-14",
    },
    {
      id: 5,
      title: "System Upgrade",
      description:
        "We are upgrading our system to improve its performance and stability. During this time, the system may be temporarily unavailable. We apologize for any inconvenience.",
      date: "2023-02-11",
    },
    {
      id: 6,
      title: "New Feature Added",
      description:
        "We have added a new feature that allows you to bookmark questions during an exam. Please check the 'Features' tab for more details.",
      date: "2023-02-09",
    },
    {
      id: 7,
      title: "Exam Registration Open",
      description:
        "Registration for the 'Web Development' exam is now open. Please check the 'Exams' tab for more details.",
      date: "2023-02-06",
    },
    {
      id: 8,
      title: "Exam Cancellation",
      description:
        "The exam on 'Computer Networks' scheduled for March 8th has been cancelled. We apologize for any inconvenience.",
      date: "2023-02-04",
    },
    {
      id: 9,
      title: "New Exam Added",
      description:
        "We have added a new exam on 'Data Structures and Algorithms'. Please check the 'Exams' tab for more details.",
      date: "2023-02-01",
    },
    {
      id: 10,
      title: "System Downtime",
      description:
        "Our system will be down for maintenance on February 28th from 10:00 PM to 12:00 AM. During this time, the system will be unavailable.",
      date: "2023-01-28",
    },
  ];

  const responsive = {
    xxxl: {
      breakpoint: { max: 4000, min: 1920 },
      items: 6,
      partialVisibilityGutter: 50,
    },
    xxl: {
      breakpoint: { max: 1920, min: 1536 },
      items: 5,
      partialVisibilityGutter: 50,
    },
    xl: {
      breakpoint: { max: 1536, min: 1280 },
      items: 3,
      partialVisibilityGutter: 40,
    },
    lg: {
      breakpoint: { max: 1280, min: 1024 },
      items: 3,
      partialVisibilityGutter: 40,
    },
    md: {
      breakpoint: { max: 1024, min: 360 },
      items: 2,
      partialVisibilityGutter: 30,
    },
    xs: {
      breakpoint: { max: 360, min: 0 },
      items: 1,
      partialVisibilityGutter: 30,
    },
  };

  return (
    <Box my={2}>
      <Typography
        variant="h4"
        component="h2"
        fontWeight="bold"
        color="primary"
        mb={2}
      >
        Announcements
      </Typography>
      {announcements.length ? (
        <Carousel responsive={responsive}>
          {announcements.map((announcement) => (
            <Card
              key={announcement?.id}
              elevation={3}
              sx={{
                maxHeight: { xs: "200px", lg: "250px" },
                width: { lg: "300px", xl: "300px" },
                p: 2,
                m: 1,
              }}
            >
              <Stack direction="column" gap={1}>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  textAlign="center"
                >
                  {announcement?.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    // Addition lines for 2 line or multiline ellipsis
                    display: "-webkit-box !important",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    whiteSpace: "normal",
                  }}
                >
                  {announcement?.description}
                </Typography>
                <Typography variant="subtitle1" textAlign="right">
                  <strong>Date: </strong>
                  {announcement?.date}
                </Typography>
              </Stack>
            </Card>
          ))}
        </Carousel>
      ) : (
        <Typography variant="body1" color="text.secondary">
          No announcements
        </Typography>
      )}
    </Box>
  );
}
