import api from "./api";

export const authService = {
  async register(email, password, username) {
    const res = await api.post("/auth/v1/signup", {
      email: email,
      password: password,
      headers: {
        username: username,
      },
    });
    return res.data;
  },

  async login(email, password) {
    const res = await api.post("/auth/v1/token?grant_type=password", {
      email: email,
      password: password,
    });
    return res.data;
  },

  async logout() {
    const res = await api.post("/auth/v1/logout");
    return res.data;
  },

  async getUser() {
    const token = localStorage.getItem("access_token");
    if (!token) return null;

    const res = await api.get("/auth/v1/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },
};
