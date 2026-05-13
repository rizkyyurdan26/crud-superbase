<template>
  <div
    class="flex w-full h-screen mx-auto items-center justify-center bg-gradient-to-b from-cyan-600 to-cyan-100"
  >
    <div
      class="flex flex-col gap-5 bg-white/70 rounded-xl py-5 px-10 shadow-xl"
    >
      <h1 class="font-bold text-lg">
        {{ isRegister ? "Register Form" : "Login Form" }}
      </h1>
      <p v-if="authStore.error" class="text-red-500">{{ authStore.error }}</p>

      <form @submit.prevent="handleRegLog" class="flex flex-col gap-3">
        <!-- Password -->
        <div v-if="isRegister" class="flex flex-col gap-1">
          <label>Username:</label>
          <input
            type="text"
            required
            placeholder="example name"
            class="border border-slate-400 rounded px-2 py-1 focus:outline-none"
            v-model="inputUsername"
          />
        </div>

        <!-- Email -->
        <div class="flex flex-col gap-1">
          <label>Email:</label>
          <input
            type="email"
            required
            placeholder="example@gmail.com"
            class="border border-slate-400 rounded px-2 py-1 focus:outline-none"
            v-model="inputEmail"
          />
        </div>

        <!-- Password -->
        <div class="flex flex-col gap-1">
          <label>Password:</label>
          <input
            type="password"
            required
            placeholder="********"
            class="border border-slate-400 rounded px-2 py-1 focus:outline-none"
            v-model="inputPassword"
          />
        </div>

        <!-- Password -->
        <div v-if="isRegister" class="flex flex-col gap-1">
          <label>Repeat Password:</label>
          <input
            type="password"
            required
            placeholder="********"
            class="border border-slate-400 rounded px-2 py-1 focus:outline-none"
            v-model="inputRepeatPassword"
          />
        </div>

        <!-- Button -->
        <div class="flex gap-2 items-center">
          <input type="checkbox" v-model="isChecked" />
          <p class="text-sm text-black/80">Agree all terms and condition</p>
        </div>

        <button
          type="submit"
          :disabled="!isChecked"
          :class="[
            'bg-cyan-600 text-white py-1 rounded-lg',
            isChecked ? 'cursor-pointer' : 'bg-gray-500 cursor-not-allowed',
          ]"
        >
          {{authStore.loading ? 'Processing...' : ( isRegister ? "Register" : "Login" )}}
        </button>

        <p class="text-center">
          {{ isRegister ? "Have an account?" : "Don't have account?" }}
          <router-link
            class="text-blue-600 underline"
            :to="isRegister ? '/login' : '/register'"
            >{{ isRegister ? "Login" : "Register" }}</router-link
          >
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth.store";

const route = useRoute();
const router = useRouter()

const inputEmail = ref("");
const inputUsername = ref("");
const inputPassword = ref("");
const inputRepeatPassword = ref("");
const isChecked = ref(false);

const isRegister = computed(() => {
  return route.path === "/register";
});

const authStore = useAuthStore();

const handleRegLog = async () => {
  if (isRegister.value) {
    if (inputPassword.value !== inputRepeatPassword.value) {
      return alert("Make sure your password & repeat password!");
    }
    try {
      await authStore.register(
        inputEmail.value,
        inputPassword.value,
        inputUsername.value,
      );

      alert('Register success ✅\nPlease Login')
      router.push('/login')
    } catch (err) {
      console.error("Register Failed", err);
    }
  } else {
    try{
        await authStore.login(inputEmail.value, inputPassword.value)
        router.push('/')
    }catch (err){
        console.error('Login Failed', err)
    }
  }
};
</script>
