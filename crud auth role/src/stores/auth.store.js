import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { authService } from "../services/auth.service";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const errorCode = ref(null);
  const token = ref(localStorage.getItem("access_token") || null);

  const isAdmin = computed(() => {
    return user.value?.user_metadata?.role === "admin";
  });

  async function register(email, password, username) {
    loading.value = true;
    error.value = null;

    try {
      const data = await authService.register(email, password, username);
      return data;
    } catch (err) {
      error.value =
        err.response?.data?.msg ||
        err.response?.data?.message ||
        err.message ||
        "Register Failed";
      console.error("Register Failed Detail:", err.response?.data || err);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function login(email, password) {
    loading.value = true;
    error.value = null;

    try {
      const data = await authService.login(email, password);
      user.value = data.user;
      token.value = data.access_token;
      localStorage.setItem("access_token", data.access_token);

      return data;
    } catch (err) {
      const supabaseError =
        err.response?.data?.error_description ||
        err.response?.data.msg ||
        err.response?.data.message;

      if (supabaseError === "Invalid login credentials") {
        error.value = "Incorrect email or password";
      } else {
        error.value = supabaseError || "Login Failed";
      }
      console.error("Login Failed Detail:", err.response?.data || err);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function getUser() {
    if (!token) return null;

    loading.value = true;
    error.value = false;

    try {
      const data = await authService.getUser();
      user.value = data;
    } catch (err) {
      console.error("Session is not valid", err);
      error.value = "Session is not valid";

      logout();
    } finally {
      loading.value = false;
    }
  }

  async function logout() {
    loading.value = true;
    error.value = null;

    try {
      await authService.logout();
    } catch (err) {
      console.error("Logout Failed", err);
      error.value = "Request timeout";
    } finally {
      token.value = null;
      user.value = null;
      localStorage.removeItem("access_token");
      loading.value = false;
    }
  }

  return {
    user,
    loading,
    error,
    errorCode,
    token,
    isAdmin,

    register,
    login,
    logout,
    getUser,
  };
});
