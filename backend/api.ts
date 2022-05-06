import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:9200/",
  headers: {
    "content-type": "application/json",
  },
});

export default api;
