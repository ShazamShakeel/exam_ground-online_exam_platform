import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import scanImage from "assets/images/ScanImage.png";
import { useRef, useState } from "react";
import Tesseract from "tesseract.js";

function UseOCR() {
  const inputRef = useRef();
  const [image, setImage] = useState("");
  const [text, setText] = useState("");
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const handleChange = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
    setProgress(0);
    setShowButton(true);
  };

  const handleClick = () => {
    setShowButton(false);
    setLoading(true);
    Tesseract.recognize(image, "eng", {
      logger: (obj) => {
        setProgress(obj?.progress);
      },
    })
      .then((result) => {
        let text = result?.data.text;
        setText(text);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <Typography variant="h5" fontWeight="bold" color="primary">
        Use OCR:
      </Typography>
      <Stack direction="row" alignItems="center" justifyContent="space-evenly">
        <Stack
          direction="row"
          justifyContent="center"
          alignContent="center"
          minHeight="250px"
          minWidth="250px"
        >
          <img
            src={image ? image : scanImage}
            alt="OCR-Input"
            width="250px"
            height="250px"
            onClick={() => {
              inputRef.current.click();
            }}
            style={{ cursor: "pointer" }}
          />
          <input ref={inputRef} type="file" onChange={handleChange} hidden />
        </Stack>
        <Stack direction="column" justifyContent="center">
          {loading && <CircularProgress />}
          {showButton && (
            <Button
              variant="contained"
              size="large"
              onClick={handleClick}
              disabled={!image}
            >
              Convert
            </Button>
          )}
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          minHeight="250px"
          minWidth="250px"
        >
          <textarea
            readOnly
            value={text}
            style={{ minWidth: "400px", minHeight: "250px" }}
          />
        </Stack>
      </Stack>
    </>
  );
}

export default UseOCR;
