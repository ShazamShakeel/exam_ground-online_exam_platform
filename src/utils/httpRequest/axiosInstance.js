import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL,
  baseURL: "http://localhost:3002/v1",
});

axiosInstance.interceptors.request.use(
  // Do something before request is sent
  (req) => {
    if (localStorage.getItem("token")) {
      req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    }
    return req;
  },
  // Do something with request error
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
