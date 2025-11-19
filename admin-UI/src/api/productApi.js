import { api } from "./axiosClient";

export const productApi = {
  getAll: () => api.get("/products"),
  get: (id) => api.get(`/products/${id}`),
  create: (data) =>
    api.post("/products", data, { headers: { "Content-Type": "multipart/form-data" } }),
  update: (id, data) =>
    api.put(`/products/${id}`, data, { headers: { "Content-Type": "multipart/form-data" } }),
  delete: (id) => api.delete(`/products/${id}`),
};
