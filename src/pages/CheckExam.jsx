import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import grey from "@mui/material/colors/grey";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
import decodeHTML from "utils/helpers/decodeHTML";
import axiosInstance from "utils/httpRequest/axiosInstance";

export default function CheckExam() {
  const id = useParams()?.id;
  const navigate = useNavigate();
  const componentRef = useRef();
  const uploadPdfRef = useRef();
  const [loading, setLoading] = useState(true);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [exam, setExam] = useState({});
  const [questions, setQuestions] = useState([]);
  const [marksObtained, setMarksObtained] = useState(0);

  const getExam = useCallback(() => {
    setLoading(true);
    axiosInstance
      .get("/answer/" + id)
      .then((res) => {
        setExam(res.data);
        setQuestions(res.data?.questions);
      })
      .catch((err) => {
        toast.error(err.response.data.message ?? "Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const uploadResult = () => {
    setLoading(true);
    axiosInstance
      .patch("/answer/" + id, {
        status: "checked",
        obtainedMarks: marksObtained,
        questions,
      })
      .then(() => {
        toast.success("Exam result uploaded successfully");
        navigate("/exams");
      })
      .catch((err) => {
        toast.error(err.response.data.message ?? "Something went wrong");
      });
  };

  useEffect(() => {
    getExam();
  }, [getExam]);

  useEffect(() => {
    const marks = questions.reduce((acc, question) => {
      return acc + (question?.obtainedMarks ? +question?.obtainedMarks : 0);
    }, 0);
    setMarksObtained(marks);
  }, [questions]);

  const handleUploadPdf = (pdf) => {
    setUploadLoading(true);
    const formData = new FormData();
    formData.append("file", pdf);
    axiosInstance
      .post("/answer/" + id + "/upload-pdf", formData)
      .then((res) => {
        toast.success("Exam PDF uploaded successfully");
        setExam({ ...exam, examPdf: res.data.examPdf });
      })
      .catch((err) => {
        toast.error(err.response.data.message ?? "Something went wrong");
      })
      .finally(() => {
        setUploadLoading(false);
      });
  };

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
            disabled={uploadLoading}
          >
            {uploadLoading ? "Uploading" : "Upload Exam PDF"}
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
                <strong>Student Name:</strong> {exam?.student?.name}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" component="h2">
                <strong>Student Email:</strong> {exam?.student?.email}
              </Typography>
            </Box>
          </Box>
          <Typography variant="h6" component="h2">
            <strong>Course:</strong>{" "}
            {`${exam?.exam?.course?.code}: - ${exam?.exam?.course?.title}`}
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={2}>
            <Box>
              <Typography variant="h6" component="h2">
                <strong>Total Marks:</strong> {exam?.exam?.totalMarks}
              </Typography>
            </Box>
            <Box minWidth={225}>
              <Typography variant="h6" component="h2">
                <strong>Marks Obtained:</strong>{" "}
                {marksObtained ?? exam?.obtainedMarks}
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
                  {` ( ${question?.marks} )`}
                </Box>
                <Stack direction="column" gap={2}>
                  <Box>
                    <Typography variant="body1" component="p" fontWeight="bold">
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
                  <Box
                    display="flex"
                    flexWrap="wrap"
                    alignItems="center"
                    gap={2}
                  >
                    <Typography
                      variant="body1"
                      component="p"
                      lineHeight={1}
                      fontWeight="bold"
                    >
                      Obtained Marks:
                    </Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      value={question?.obtainedMarks ?? 0}
                      onChange={(e) => {
                        const newQuestions = [...questions];
                        newQuestions[index].obtainedMarks = e.target.value;
                        setQuestions(newQuestions);
                      }}
                      inputProps={{
                        min: 0,
                        max: +question?.marks,
                      }}
                    />
                  </Box>
                </Stack>
                {exam?.questions?.length !== index + 1 && <Divider />}
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Paper>
      <Stack direction="row" justifyContent="flex-end" mx={2}>
        <Box minWidth={200}>
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={uploadResult}
          >
            Submit Result
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
}
