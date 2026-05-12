<template>
  <div class="overflow-x-auto p-5">
    <h1 class="font-bold text-lg mb-5">
      Product Detail: {{ productDetail?.[0]?.name }}
    </h1>

    <!-- Btn Back -->
    <router-link
      to="/"
      class="rounded border-2 px-1 border-cyan-600 text-cyan-700"
      >Back</router-link
    >

    <!-- Table Detail -->
    <table class="w-full min-w-lg mt-5 table-fixed">
      <thead>
        <tr class="bg-cyan-500 text-white">
          <th class="py-2 border-r">Unique</th>
          <th class="border-r">Product Name</th>
          <th class="border-r">Quantity</th>
          <th class="border-r">Location</th>
        </tr>
      </thead>

      <tbody>
        <tr v-if="store.loading.GetId" class="text-center">
          <td colspan="4" class="text-center text-lg py-2">Loading..</td>
        </tr>
        <tr v-else-if="store.error.GetId" class="text-center">
          <td colspan="4" class="text-center text-lg py-2">
            {{ store.error.GetId }}
          </td>
        </tr>
        <tr class="text-center" v-for="item in productDetail" :key="item.id">
          <td class="py-2 break-all">{{ item.sku }}</td>
          <td>{{ item.productName }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.location }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useDataStore } from "../stores/maindata.store";

const route = useRoute();
const store = useDataStore();
const productDetail = ref(null);

onMounted(async () => {
  productDetail.value = await store.getDataId(route.params.id);
});
</script>
