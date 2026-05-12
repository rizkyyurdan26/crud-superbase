<template>
  <div class="w-full h-screen flex items-center justify-center">
    <div class="p-10 bg-cyan-600 rounded-xl max-w-md w-full">
      <h1 class="text-white font-bold text-xl">
        {{ isRegister ? "Register Form" : "Login Form" }}
      </h1>
      <p class="text-white/80">Please fill all fields</p>

      <form
        @submit.prevent="handleSubmit"
        class="flex flex-col items-start gap-2 mt-5"
      >
        <!-- username -->
        <div v-if="isRegister" class="flex flex-col gap-2">
          <label class="text-white">Username:</label>
          <input
            type="text"
            required
            placeholder="example@gmail.com"
            v-model="inputUsername"
            class="border border-slate-300 text-white px-2 py-1 rounded-lg focus:outline-none"
          />
        </div>

        <!-- email -->
        <div class="flex flex-col gap-2">
          <label class="text-white">Email:</label>
          <input
            type="email"
            required
            placeholder="example@gmail.com"
            v-model="inputEmail"
            class="border border-slate-300 text-white px-2 py-1 rounded-lg focus:outline-none"
          />
        </div>

        <!-- Password -->
        <div class="flex flex-col gap-2">
          <label class="text-white">Password:</label>
          <input
            type="password"
            required
            placeholder="*******"
            v-model="inputPassword"
            class="border border-slate-300 text-white px-2 py-1 rounded-lg focus:outline-none"
          />
        </div>

        <!-- Repeat Password -->
        <div v-if="isRegister" class="flex flex-col gap-2">
          <label class="text-white">Repeat Password:</label>
          <input
            type="password"
            required
            placeholder="*******"
            v-model="inputRepeat"
            class="border border-slate-300 text-white px-2 py-1 rounded-lg focus:outline-none"
          />
        </div>

        <!-- button -->
        <div class="mt-5">
          <div class="flex items center gap-2">
            <input type="checkbox" required v-model="isChecked" />
            <p class="text-sm text-white">Agree all terms and policy</p>
          </div>

          <button
            type="submit"
            :title="!isChecked ? 'Please Checklist' : ''"
            :disabled="!isChecked"
            :class="[
              'mt-5 text-white border-2 border-white rounded-lg px-5 py-1',
              isChecked ? 'cursor-pointer' : 'cursor-not-allowed opacity-50',
            ]"
          >
            {{ isRegister ? "Register" : "Login" }}
          </button>
        </div>

        <!-- Question -->
        <router-link
          :to="isRegister ? '/login' : '/register'"
          class="text-white"
          >{{
            isRegister
              ? "Already have an account? Login"
              : "Don't have account? Register"
          }}</router-link
        >
      </form>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth.store";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const isRegister = computed(() => {
  return route.path === "/register";
});
const isChecked = ref(false);

const inputUsername = ref("");
const inputEmail = ref("");
const inputPassword = ref("");
const inputRepeat = ref("");

const handleSubmit = async () => {
  if (inputPassword.value.length < 8 || !/\d/.test(inputPassword.value)) {
    alert("Password must be at least 8 characters and contain a number");
    return;
  }
  if (isRegister.value) {
    if (inputPassword.value !== inputRepeat.value) {
      alert("Make sure your password");
      return;
    }

    await authStore.handleRegister(
      inputEmail.value,
      inputPassword.value,
      inputUsername.value,
    );

    if (authStore.successRegister) {
      alert("Register Success ✅\nPlease Login");
      router.push("/login");

      inputEmail.value = "";
      inputPassword.value = "";
      inputUsername.value = "";
    } else {
      alert("Register Failed" + authStore.error.Register);
    }
  } else {
    const res = await authStore.handleLogin(
      inputEmail.value,
      inputPassword.value,
    );
    if (res) {
      router.push("/");
    } else {
      alert("Your Email of Password is Wrong!!" + authStore.error.Login);
    }
  }
};
</script>
