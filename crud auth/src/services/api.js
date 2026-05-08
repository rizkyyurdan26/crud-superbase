import axios from "axios";

const BASE_URL = import.meta.env.VITE_SUPERBASE_URL;
const ANON_KEY = import.meta.env.VITE_SUPERBASE_ANON_KEY;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    apikey: ANON_KEY,
    Authorization: `Bearer ${ANON_KEY}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  },
});

export default api;
