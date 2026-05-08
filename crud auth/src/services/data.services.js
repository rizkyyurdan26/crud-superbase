import api from "./api";

export const dataService = {
  async getAll() {
    const res = await api.get("/stocks?select=*");
    return res.data;
  },
  async getDataId(id) {
    const res = await api.get(`/stocks?id=eq.${id}&select=*`);
    return res.data;
  },
  async createData(payload) {
    const res = await api.post("/stocks", payload);
    return res.data;
  },
  async updateData(id, payload) {
    const res = await api.patch(`/stocks?id=eq.${id}`, payload);
    return res.data;
  },
  async deleteData(id) {
    const res = await api.delete(`/stocks?id=eq.${id}`);
    return res.data;
  },
};
