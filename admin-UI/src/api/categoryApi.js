import { api } from "./axiosClient";

export const categoryApi = {
  getAll: () => api.get("/categories"),
  get: (id) => api.get(`/categories/${id}`),
  create: (data) => api.post("/categories", data),
  update: (id, data) => api.put(`/categories/${id}`, data),
  delete: (id) => api.delete(`/categories/${id}`),
};
