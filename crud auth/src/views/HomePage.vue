<template>
  <div class="flex flex-col p-5 gap-5 items-start">
    <h1 class="text-xl font-semibold">Data Products</h1>
    <router-link
      to="/create"
      class="border-2 border-cyan-600 px-2 rounded text-cyan-700"
      >Create New</router-link
    >
    <div class="w-full">
      <DataTable
        :data="store.mainData"
        :loading="store.loading.Get"
        :error="store.error.Get"
        @detail="handleDetail"
        @update="handleUpdate"
        @delete="handleDelete"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useDataStore } from "../stores/data.store";
import DataTable from "../components/DataTable.vue";
import { useRouter } from "vue-router";

const store = useDataStore();
const router = useRouter();


const handleDetail = (id) => {
  router.push(`/product/${id}`);
};

const handleUpdate = (item) => {
  if (confirm(`Want to edit ${item.name}?`)) {
    router.push(`/update/${item.id}`);
  }
};

const handleDelete = async (item) => {
  if (confirm(`Delete this ${item.name}?`)) {
    await store.deleteDataId(item.id);
    if (store.success.Delete) {
      alert(`Data ${item.name} has been delete`);
      return;
    }
  }
};


onMounted(async () => {
  await store.getAllData();
  // console.log(store.mainData)
});
</script>
