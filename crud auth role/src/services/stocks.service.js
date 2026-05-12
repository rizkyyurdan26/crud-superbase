import api from "./api";

export const dataResourcheService = {
  async getAll() {
    const res = await api.get("/rest/v1/stocks?select=*");
    // console.log(res)
    return res.data;
  },
  async getId(id) {
    const res = await api.get(`/rest/v1/stocks?id=eq.${id}&select=*`);
    // console.log(res.data)
    return res.data;
  },
  async create(payload) {
    const res = await api.post("/rest/v1/stocks", payload);
    return res.data;
  },
  async edit(id, payload) {
    const res = await api.patch(`/rest/v1/stocks?id=eq.${id}`, payload);
    return res.data;
  },
  async delete(id) {
    const res = await api.delete(`/rest/v1/stocks?id=eq.${id}`);
    return res.data;
  },
};
