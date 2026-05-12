<template>
  <div class=" flex flex-col gap-3 p-10">
    <h1 class="font-bold text-lg">All Products</h1>
    <router-link
      to="/create"
      class="w-fit border-2 border-cyan-600 rounded-lg text-cyan-700 px-2"
      >Create new</router-link
    >
    <DataTable
      :data="dataStore.mainData"
      @detail="handleDetail"
      @delete="handleDelete"
      @edit="handleEdit"
    />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import DataTable from "../components/DataTable.vue";
import { useDataStore } from "../stores/data.store";
import { useRouter } from "vue-router";

const dataStore = useDataStore();
const router = useRouter();

const handleDetail = (id) => {
  router.push(`/product/${id}`);
};

const handleDelete = async (item) => {
  if (confirm(`Are your sure Delete: ${item.name}`)) {
    await dataStore.deleteDataId(item.id);
    if (dataStore.success.Delete){
      alert(`Data ${item.name} success Deleted ✅`)
      return
    }
  }
};

const handleEdit = async (item) => {
  if (confirm(`Are your sure Edit: ${item.name}`)) {
    router.push(`/edit/${item.id}`)
  }
};

onMounted(async () => {
  await dataStore.getAllData();
});
</script>
