import ReactHtmlParser from "react-html-parser";

const decodeHTML = (str) => {
  return String(str).includes("&lt;")
    ? ReactHtmlParser(ReactHtmlParser(str).toString())
    : ReactHtmlParser(str);
};

export default decodeHTML;
