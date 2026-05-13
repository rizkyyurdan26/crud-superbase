<template>
  <router-view></router-view>
</template>

<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "./stores/auth.store";

const authStore = useAuthStore()

onMounted(async () => {
  await authStore.getUser()
});
</script>
