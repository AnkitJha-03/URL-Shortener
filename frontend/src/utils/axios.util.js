import axios from "axios";

const axios_instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  timeout: 10000,
});

axios_instance.interceptors.response.use(
  (response) => response, // pass through success responses

  (error) => {
    // Handle errors globally
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error("Backend error:", error.response.data);
    } else if (error.request) {
      // Request made but no response received
      console.error("No response from server");
      alert("No response from server");
    } else {
      // Something else happened
      console.error("Axios error:", error.message);
    }

    // returned a rejected promise so you can handle errors locally too
    return Promise.reject(error);
  }
);

export default axios_instance;
