import axios from "axios";
import api from "./api";

export const authService = {
  async register(email, password, username) {
    const res = await api.post("/auth/v1/signup", {
      email: email,
      password: password,
      data: {
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
        Authorization: `Bearer {token}`,
      },
    });

    return res.data;
  },

  //   ========================
  //   If Need Recovery Email

  async sendResetPasswordEmail(email) {
    const res = await api.post("/auth/v1/recover", { email });
    return res.data;
  },

  async updatePassword(newPassword, recoveryToken) {
    const res = await axios.put(
      `${import.meta.env.VITE_SUPABASE_URL}/auth/v1/user`,
      { password: newPassword },
      {
        headers: {
          apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
          Authorization: `Bearer ${recoveryToken}`,
          "Content-Type": "application/json",
        },
      },
    );
    return res.data;
  },
};
