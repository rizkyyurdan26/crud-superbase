<template>
  <div class="p-5">
    <h1 class="font-bold text-lg mb-5">All Data Transactions</h1>

    <!-- Create Button -->
    <router-link
      to="/create"
      class="px-4 py-1 border-2 border-cyan-600 text-cyan-700 rounded-lg"
      >Create New</router-link
    >

    <!-- Table Data -->
    <Table
      :data="store.dataResource"
      :loading="store.loading.Get"
      :error="store.error.Get"
      @detail="handleDetail"
      @delete="handleDelete"
      @edit="handleEdit"
      section="home"
    />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useDataStore } from "../stores/maindata.store";
import Table from "../components/Table.vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "../stores/auth.store";

const store = useDataStore();
const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const handleDetail = (id) => {
  router.push(`/product/${id}`);
};

const handleDelete = async (item) => {
  if (!authStore.isAdmin){
    alert('Admin only!!')
    return
  }else{
    if (confirm(`Are you sure delete: ${item.productName}`)) {
      await store.deleteData(item.id);
  
      if (store.success.Delete)
        alert(`Data ${item.productName} has been deleted ✅`);
    }
  }
};

const handleEdit = (item) => {
  if (confirm(`Are you sure edit: ${item.productName}`)) {
    router.push(`/edit/${item.id}`);
  }
};

onMounted(async () => {
  await store.getAllData();
});
</script>
