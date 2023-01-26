import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      display="flex"
      justifyContent="center"
      bgcolor="secondary.dark"
    >
      <Typography variant="body1" color="white" my={1}>
        © 2023 Exam Ground™. All rights reserved.
      </Typography>
    </Box>
  );
}
