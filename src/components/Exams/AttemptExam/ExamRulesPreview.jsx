import { Box, Button, Stack, Typography } from "@mui/material";

export default function ExamRulesPreview({ handleStartExam }) {
  return (
    <Stack direction="column" gap={2}>
      <Typography variant="h5" component="h1" textAlign="center">
        Attention
      </Typography>
      <Typography variant="body1">
        - Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
        tempore quod ipsam itaque beatae labore fuga similique, sequi
        laudantium, sed ex animi officiis nisi odit qui. Fugiat enim magnam
        eveniet.
      </Typography>
      <Typography variant="body1">
        - Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
        tempore quod ipsam itaque beatae labore fuga similique, sequi
        laudantium, sed ex animi officiis nisi odit qui. Fugiat enim magnam
        eveniet.
      </Typography>
      <Typography variant="body1">
        - Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
        tempore quod ipsam itaque beatae labore fuga similique, sequi
        laudantium, sed ex animi officiis nisi odit qui. Fugiat enim magnam
        eveniet.
      </Typography>
      <Box textAlign="center" mt={2}>
        <Button variant="contained" onClick={handleStartExam}>
          Start
        </Button>
      </Box>
    </Stack>
  );
}
