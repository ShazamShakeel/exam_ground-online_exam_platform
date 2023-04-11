import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper,
  Radio,
  Stack,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
import decodeHTML from "utils/helpers/decodeHTML";
import axiosInstance from "utils/httpRequest/axiosInstance";

export default function ViewCheckedExam() {
  const id = useParams()?.id ?? "";
  const componentRef = useRef();
  const uploadPdfRef = useRef();
  const [loading, setLoading] = useState(true);
  const [exam, setExam] = useState({});
  const [isMcqExam, setIsMcqExam] = useState(false);

  const getExam = useCallback(() => {
    axiosInstance
      .get("/answer/" + id)
      .then((res) => {
        setExam(res.data);
        setIsMcqExam(res.data?.exam?.type === "mcq");
      })
      .catch((err) => {
        toast.error(err.response.data.message ?? "Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleUploadPdf = (pdf) => {
    const formData = new FormData();
    formData.append("file", pdf);
    axiosInstance
      .post("/answer/" + id + "/upload-pdf", formData)
      .then(() => {
        toast.success("Exam PDF uploaded successfully");
        getExam();
      })
      .catch((err) => {
        toast.error(err.response.data.message ?? "Something went wrong");
      });
  };

  useEffect(() => {
    getExam();
  }, [getExam]);

  const generatePDF = useReactToPrint({
    content: () => componentRef.current,
  });

  const marginTopBottom = "15px";
  const marginLeftRight = "15px";
  const pageMargins = useMemo(() => {
    return `@page { margin: ${marginTopBottom} ${marginLeftRight} !important; }`;
  }, []);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={2}>
        <CircularProgress />
      </Box>
    );

  return (
    <Stack direction="column">
      <Stack direction="row" justifyContent="space-between" mx={2}>
        <Box>
          <Button
            size="large"
            variant="contained"
            onClick={() => uploadPdfRef.current.click()}
          >
            Upload Exam PDF
          </Button>
          <input
            type="file"
            ref={uploadPdfRef}
            style={{ display: "none" }}
            onChange={(e) => {
              handleUploadPdf(e.target.files[0]);
            }}
          />
          {exam?.examPdf && (
            <Button
              size="large"
              variant="contained"
              component="a"
              href={exam?.examPdf}
              target="_blank"
              download
              sx={{ ml: 2 }}
            >
              Download Uploaded PDF
            </Button>
          )}
        </Box>
        <Box minWidth={200}>
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={generatePDF}
          >
            Generate Exam PDF
          </Button>
        </Box>
      </Stack>
      <Paper sx={{ m: 2 }}>
        <style>{pageMargins}</style>
        <Stack direction="column" gap={2} p={4} ref={componentRef}>
          <Typography
            variant="h4"
            component="h1"
            fontWeight="bold"
            textAlign="center"
            gutterBottom
          >
            {exam?.exam?.title}
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={2}>
            <Box minWidth={300}>
              <Typography variant="h6" component="h2">
                <strong>Teacher Name:</strong> {exam?.teacher?.name}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" component="h2">
                <strong>Teacher Email:</strong> {exam?.teacher?.email}
              </Typography>
            </Box>
          </Box>
          <Box display="flex" flexWrap="wrap" gap={2}>
            <Box minWidth={300}>
              <Typography variant="h6" component="h2">
                <strong>Student Name:</strong> {exam?.student?.name}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" component="h2">
                <strong>Student Email:</strong> {exam?.student?.email}
              </Typography>
            </Box>
          </Box>
          <Box display="flex" flexWrap="wrap" gap={2}>
            {isMcqExam && (
              <Box minWidth={225}>
                <Typography variant="h6" component="h2">
                  <strong>Each MCQ Marks</strong>: {exam?.exam?.eachMcqMarks}
                </Typography>
              </Box>
            )}
            <Box minWidth={225}>
              <Typography variant="h6" component="h2">
                <strong>Marks Obtained:</strong> {exam?.obtainedMarks}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" component="h2">
                <strong>Total Marks:</strong> {exam?.exam?.totalMarks}
              </Typography>
            </Box>
          </Box>
          <Divider variant="middle" />
          <Stack direction="column" gap={2}>
            {exam?.questions?.map((question, index) => (
              <Stack direction="column" gap={2} key={index}>
                <Box
                  display="flex"
                  alignItems="center"
                  gap={1}
                  className="question"
                >
                  <Typography component="p">{`${index + 1})`}</Typography>
                  {decodeHTML(question?.question ?? "")}
                  {isMcqExam &&
                    (question?.correctOption &&
                    question?.correctOption === question?.selectedOption ? (
                      <span style={{ color: "green" }}>✔</span>
                    ) : (
                      <span style={{ color: "red" }}>✘</span>
                    ))}
                </Box>
                {isMcqExam && (
                  <Box>
                    <Stack direction="row">
                      {question?.options?.map((option, index) => (
                        <Stack
                          direction="row"
                          alignItems="center"
                          gap={1}
                          key={index}
                        >
                          <Radio
                            checked={option === question?.selectedOption}
                            disabled
                            color="primary"
                          />
                          <Typography
                            variant="body1"
                            component="p"
                            lineHeight={1}
                          >
                            {option}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>
                    {question?.correctOption !== question?.selectedOption && (
                      <Typography variant="body1" color="text.secondary">
                        <strong>Correct Answer:</strong>{" "}
                        {question?.correctOption}
                      </Typography>
                    )}
                  </Box>
                )}
                {!isMcqExam && (
                  <Stack direction="column" gap={2}>
                    <Box>
                      <Typography
                        variant="body1"
                        component="p"
                        fontWeight="bold"
                      >
                        Answer:
                      </Typography>
                      <Typography
                        variant="body1"
                        component="p"
                        justifyContent="justify"
                      >
                        {question?.answer}
                      </Typography>
                      {question?.diagram && (
                        <img
                          src={question?.diagram}
                          alt="diagram"
                          height="auto"
                          width="300px"
                          style={{
                            padding: "1rem",
                            border: `2px solid ${grey[300]}`,
                            aspectRatio: "1/1",
                          }}
                        />
                      )}
                    </Box>
                    <Box>
                      <Typography variant="body1" component="p">
                        <strong>Marks:</strong> {question?.marks}
                      </Typography>
                      <Typography variant="body1" component="p" lineHeight={1}>
                        <strong>Obtained Marks:</strong>{" "}
                        {question?.obtainedMarks}
                      </Typography>
                    </Box>
                  </Stack>
                )}
                {exam?.questions?.length !== index + 1 && <Divider />}
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
}
