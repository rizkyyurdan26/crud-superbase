<template>
  <div class="flex flex-col gap-5 p-10">
    <h1 class="font-bold text-lg">Product Detail</h1>
    <router-link
      to="/"
      class="w-fit border-2 border-cyan-600 rounded-lg text-cyan-700 px-2"
      >Back</router-link
    >
    <DataTable :data="dataDetail" />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import DataTable from "../components/DataTable.vue";
import { useRoute, useRouter } from "vue-router";
import { useDataStore } from "../stores/data.store";

const route = useRoute();
const dataStore = useDataStore();

const dataDetail = computed(() => {
  if (!dataStore.mainData) return null;

  return dataStore.mainData.filter((item) => item.id == route.params.id);
});

onMounted(async () => {
  if (dataStore.mainData.length === 0) {
    await dataStore.getAllData();
  }
});
</script>
