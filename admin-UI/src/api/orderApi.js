import { api } from "./axiosClient";

export const orderApi = {
  getAll: () => api.get("/orders"),
  get: (id) => api.get(`/orders/${id}`),
  updateStatus: (id, status) =>
    api.put(`/orders/${id}/status`, status, {
      headers: { "Content-Type": "application/json" },
    }),
};
