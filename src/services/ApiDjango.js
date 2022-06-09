import axios from "axios";

const apiDjango = axios.create({
  baseURL: "http://localhost:8000/",
});

export default apiDjango;