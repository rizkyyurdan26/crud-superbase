<template>
  <div class="p-10 flex flex-col gap-3">
    <h1 class="font-bold text-lg">All Products</h1>

    <!-- Before Login -->
    <div v-if="!authStore.user">
      <router-link
        to="/login"
        class="border-2 w-fit px-3 py-1 rounded-lg border-blue-600 text-blue-700"
        >Login</router-link
      >
    </div>
    <!-- After Login -->
    <div v-if="authStore.user" class="flex gap-2 items-center">
      <p>Welcome, {{ authStore.user?.user_metadata?.username }}</p>
      <!-- <p>{{ authStore.user }}</p> -->
      <button
        @click="handleLogout"
        class="text-sm bg-gray-400 text-white px-2 py-px rounded"
      >
        Logout
      </button>
    </div>

    <router-link
      to="/create"
      class="border-2 w-fit px-3 py-1 rounded-lg border-cyan-600 text-cyan-700"
      >Create New</router-link
    >

    <DataTable
      :products="productStore.products"
      :error="productStore.error"
      :loading="productStore.loading"
      @detail="handleDetail"
      @delete="handleDelete"
      @edit="handleEdit"
    />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import DataTable from "../components/DataTable.vue";
import { useProductStore } from "../stores/product.store";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth.store";

const productStore = useProductStore();
const authStore = useAuthStore();
const router = useRouter();

const handleDetail = (id) => {
  router.push(`/product/${id}`);
};

const handleEdit = (item) => {
  if (!authStore.user) {
    return router.push("/login");
  }
  if (confirm(`Edit ${item.productName}?`)) {
     router.push(`/edit/${item.id}`);
  }
};

const handleDelete = async (item) => {
  if (!authStore.user) {
    return router.push("/login");
  }
  if (!authStore.isAdmin) {
    return alert("Forbidden, Admin Only");
  }
  if (confirm(`Delete ${item.productName} ?`)) {
    try {
      await productStore.deleteData(item.id);

      alert(`${item.productName} has been deleted`);
    } catch (err) {
      console.error("Failed Delete", err);
    }
  }
};

const handleLogout = async () => {
  if (confirm("Are you sure Logout")) {
    try {
      await authStore.logout();
      router.push("/login");
    } catch (err) {
      console.error("Logout Failed", err);
    }
  }
};

onMounted(async () => {
  try {
    await productStore.getAllData();
  } catch (err) {
    console.error("Failed get data", err);
  }
});
</script>
