import { Box, Card, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import Carousel from "react-multi-carousel";

export default function Announcements({ announcements }) {
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
              key={announcement?._id}
              elevation={3}
              sx={{
                height: { xs: "175px", lg: "200px" },
                width: { lg: "300px", xl: "300px" },
                p: 2,
                m: 1,
              }}
            >
              <Stack direction="column" gap={1}>
                <Typography variant="subtitle1" textAlign="center">
                  <strong>Date: </strong>
                  {dayjs(announcement?.date).format("LL")}
                </Typography>
                <Typography variant="body1" fontWeight="bold">
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
                <Typography variant="body2" color="text.primary">
                  <strong>Course: </strong>
                  {`${announcement?.course?.title}`}
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
