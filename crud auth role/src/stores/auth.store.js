import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { authService } from "../services/auth.service";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const isAuth = ref(!!localStorage.getItem("access_token"));

  const loading = ref({
    Login: false,
    Register: false,
    Logout: false,
    Check: false,
  });

  const error = ref({
    Login: null,
    Register: null,
    Logout: null,
    Check: null,
  });

  const successRegister = ref(false);

  const isAdmin = computed(() => {
    return user.value?.user_metadata?.role === "admin";
  });

  async function handleLogin(email, password) {
    loading.value.Login = true;
    error.value.Login = null;

    try {
      const data = await authService.login(email, password);
      user.value = data.user;
      isAuth.value = true;

      localStorage.setItem("access_token", data.access_token);
      return data;
    } catch (err) {
      error.value.Login =
        err.response?.data?.message || err.message || "Login Failed";
    } finally {
      loading.value.Login = false;
    }
  }

  async function handleRegister(email, password, username) {
    loading.value.Register = true;
    error.value.Register = null;
    successRegister.value = false;

    try {
      await authService.register(email, password, username);
      successRegister.value = true;
      return true;
    } catch (err) {
      error.value.Register =
        err.response?.data?.message || err.message || "Register Failed";
    } finally {
      loading.value.Register = false;
    }
  }

  async function handleLogout() {
    loading.value.Logout = true;
    error.value.Logout = null;

    try {
      await authService.logout();

      user.value = null;
      isAuth.value = false;
      localStorage.removeItem("access_token");
    } catch (err) {
      error.value.Logout =
        err.response?.data?.message || err.message || "Logout Failed";
    } finally {
      loading.value.Logout = false;
    }
  }

  async function checkSession() {
    loading.value.Check = true;
    error.value.Check = null;

    try {
      const token = localStorage.getItem("access_token");
      if (token) {
        const userData = await authService.getUser();
        user.value = userData;
        isAuth.value = true;
      }
    } catch (err) {
      error.value.Check =
        err.response?.data?.message || err.message || "User Not Found";
      user.value = null;
      isAuth.value = false;
      localStorage.removeItem("access_token");
    } finally {
      loading.value.Check = false;
    }
  }

  return {
    user,
    isAuth,
    loading,
    error,
    successRegister,
    isAdmin,
    handleLogin,
    handleRegister,
    handleLogout,
    checkSession,
  };
});
