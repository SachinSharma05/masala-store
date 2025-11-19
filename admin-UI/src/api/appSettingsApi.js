import { api } from "./axiosClient";

export const appSettingsApi = {
  get: () => api.get("/settings"),
  update: (formData) =>
    api.put("/settings", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};
