import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5059/api",
  withCredentials: true // ⬅ this handles cookies automatically
});
