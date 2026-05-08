import api from "./api";

export const stocksService = {
  async getAll() {
    const res = await api.get("/stocks?select=*");
    return res.data;
  },
  async getId(id) {
    const res = await api.get(`/stocks?id=eq.${id}&select=*`);
    return res.data;
  },
  async create(payload) {
    const res = await api.post(`/stocks`, payload);
    return res.data;
  },
  async update(id, payload) {
    const res = await api.patch(`/stocks?id=eq.${id}`, payload);

    return res.data;
  },
  async delete(id) {
    const res = await api.delete(`/stocks?id=eq.${id}`);

    return res.data;
  },
};
