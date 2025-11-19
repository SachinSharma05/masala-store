import { api } from "./axiosClient";

export const authApi = {
  login: (data) =>
    api.post("/auth/login", data, { withCredentials: true }),

  register: (data) =>
    api.post("/auth/register", data, { withCredentials: true }),

  logout: () =>
    api.post("/auth/logout", {}, { withCredentials: true }),

  me: () =>
    api.get("/auth/me", { withCredentials: true }),

  update: (data) =>
    apiClient.put("/auth/update", data, { withCredentials: true }),
};
