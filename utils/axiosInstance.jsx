import axios from "axios";

// const backendBaseURL = "https://unusual-jade-jeans.cyclic.app"
// const backendBaseURL = "https://comilla-website-backend.onrender.com";
const backendBaseURL = "http://localhost:9000";

const axiosInstance = axios.create({
    baseURL: backendBaseURL,
});

export default axiosInstance;
