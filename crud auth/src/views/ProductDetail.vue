<template>
  <div class="p-5 space-y-5">
    <h1 class="text-xl font-semibold">Detail data</h1>
    <button
      @click="router.back()"
      class="bg-slate-300 px-3 py-px rounded-lg font-medium"
    >
      back
    </button>
    <div class="overflow-x-auto">
      <table class="w-full min-w-lg table-fixed">
        <thead>
          <tr class="bg-cyan-600 text-white">
            <th class="py-2 border-r">Unique</th>
            <th class="border-r">Product Name</th>
            <th class="border-r">Quantity</th>
            <th>Location</th>
          </tr>
        </thead>

        <tbody>
          <tr v-if="store.loading.GetId">
            <td colspan="4" class="text-center py-2">Loading...</td>
          </tr>
          <tr v-if="store.error.GetId">
            <td colspan="4" class="text-center py-2">
              {{ store.error.GetId }}
            </td>
          </tr>
          <tr
            v-else
            v-for="item in store.detailData"
            :key="item.id"
            class="text-center"
          >
            <td class="break-all py-2">{{ item.sku }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.location }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useDataStore } from "../stores/data.store";
import { useRoute, useRouter } from "vue-router";

const store = useDataStore();
const route = useRoute();
const router = useRouter();

onMounted(async () => {
  await store.getDetailData(route.params.id);
//   console.log(store.detailData);
});
</script>
