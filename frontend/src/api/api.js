import axios from "axios";

const api = axios.create({
  baseURL: "https://issueai-customer-complaint-management.onrender.com",
});

export default api;
