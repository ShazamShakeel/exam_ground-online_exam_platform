/* eslint-disable no-undef */
export default function handleFaceioError(errCode) {
  // Log all possible error codes during user interaction..
  // Refer to: https://faceio.net/integration-guide#error-codes
  // for a detailed overview when these errors are triggered.
  let error = "";
  switch (errCode) {
    case fioErrCode.PERMISSION_REFUSED:
      error = "Access to the Camera stream was denied by the end user";
      break;
    case fioErrCode.NO_FACES_DETECTED:
      error =
        "No faces were detected during the enroll or authentication process";
      break;
    case fioErrCode.UNRECOGNIZED_FACE:
      error = "Unrecognized face on this application's Facial Index";
      break;
    case fioErrCode.MANY_FACES:
      error = "Two or more faces were detected during the scan process";
      break;
    case fioErrCode.FACE_DUPLICATION:
      error =
        "User enrolled previously (facial features already recorded). Cannot enroll again!";
      break;
    case fioErrCode.PAD_ATTACK:
      error =
        "Presentation (Spoof) Attack (PAD) detected during the scan process";
      break;
    case fioErrCode.FACE_MISMATCH:
      error =
        "Calculated Facial Vectors of the user being enrolled do not matches";
      break;
    case fioErrCode.WRONG_PIN_CODE:
      error = "Wrong PIN code supplied by the user being authenticated";
      break;
    case fioErrCode.PROCESSING_ERR:
      error = "Server side error";
      break;
    case fioErrCode.UNAUTHORIZED:
      error =
        "Your application is not allowed to perform the requested operation (eg. Invalid ID, Blocked, Paused, etc.). Refer to the FACEIO Console for additional information";
      break;
    case fioErrCode.TERMS_NOT_ACCEPTED:
      error =
        "Terms & Conditions set out by FACEIO/host application rejected by the end user";
      break;
    case fioErrCode.UI_NOT_READY:
      error =
        "The FACEIO Widget could not be (or is being) injected onto the client DOM";
      break;
    case fioErrCode.SESSION_EXPIRED:
      error =
        "Client session expired. The first promise was already fulfilled but the host application failed to act accordingly";
      break;
    case fioErrCode.TIMEOUT:
      error =
        "Ongoing operation timed out (eg, Camera access permission, ToS accept delay, Face not yet detected, Server Reply, etc.)";
      break;
    case fioErrCode.TOO_MANY_REQUESTS:
      error =
        "Widget instantiation requests exceeded for freemium applications. Does not apply for upgraded applications";
      break;
    case fioErrCode.EMPTY_ORIGIN:
      error = "Origin or Referer HTTP request header is empty or missing";
      break;
    case fioErrCode.FORBIDDDEN_ORIGIN:
      error = "Domain origin is forbidden from instantiating fio.js";
      break;
    case fioErrCode.FORBIDDDEN_COUNTRY:
      error = "Country ISO-3166-1 Code is forbidden from instantiating fio.js";
      break;
    case fioErrCode.SESSION_IN_PROGRESS:
      error = "Another authentication or enrollment session is in progress";
      break;
    case fioErrCode.NETWORK_IO:
    default:
      error =
        "Error while establishing network connection with the target FACEIO processing node";
      break;
  }
  return error;
}
